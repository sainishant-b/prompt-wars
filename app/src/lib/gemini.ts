import { GoogleGenerativeAI } from "@google/generative-ai";
import { KNOWLEDGE_BASE } from "./knowledge-base";
import { getLanguage } from "./language";
import { styleInstructionFor } from "./adaptive";
import type { KnowledgeLevel, LanguageCode, Message } from "./types";

const MODEL_NAME = "gemini-1.5-flash";

export function buildSystemPrompt(
  language: LanguageCode,
  level: KnowledgeLevel,
): string {
  const lang = getLanguage(language);
  const styleInstruction = styleInstructionFor(level);

  return `You are Matdata Mitra (Voter Friend), a civic education assistant for Indian elections. You help citizens understand the election process, their rights, and what to do when problems arise.

# Knowledge Base (authoritative)

${KNOWLEDGE_BASE}

# Response Language
Respond ONLY in ${lang.geminiName}. Do not switch languages mid-response unless quoting a legal term, which should appear in English in parentheses after the translation. UI labels (NOTA, EVM, EPIC, ECI, cVIGIL, BLO, ERO) may stay in English as proper acronyms.

# Knowledge Level Adaptation
${styleInstruction}

# Style Rules
- Be conversational and friendly, like an informed guide — not a textbook.
- Use bullet points and numbered steps for procedures.
- For voter rights or grievances, ALWAYS end with the relevant helpline (Voter Helpline 1950 or cVIGIL app) when applicable.
- NEVER invent legal section numbers, articles, or rule numbers. Only cite what is in the knowledge base above.
- If asked something outside Indian elections, politely redirect to the election topic.
- If asked something not covered in the knowledge base, say you don't have that specific detail and recommend calling 1950 or visiting eci.gov.in.
- Keep first response to a question short (≤6 short paragraphs or ≤12 bullet points). User can ask for more detail.

# Tone
Patient, respectful, encouraging. The user may be a first-time voter or unsure of their rights. Treat questions seriously regardless of how basic they seem.`;
}

export interface StreamChatParams {
  messages: Message[];
  language: LanguageCode;
  level: KnowledgeLevel;
  apiKey: string;
  signal?: AbortSignal;
}

export async function* streamChat(
  params: StreamChatParams,
): AsyncGenerator<string> {
  const { messages, language, level, apiKey, signal } = params;

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    systemInstruction: buildSystemPrompt(language, level),
  });

  const history = messages.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const lastMessage = messages[messages.length - 1];
  if (!lastMessage || lastMessage.role !== "user") {
    throw new Error("Last message must be from user");
  }

  const chat = model.startChat({ history });
  const result = await chat.sendMessageStream(lastMessage.content);

  for await (const chunk of result.stream) {
    if (signal?.aborted) break;
    const text = chunk.text();
    if (text) yield text;
  }
}
