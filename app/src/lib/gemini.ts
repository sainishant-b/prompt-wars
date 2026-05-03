import { GoogleGenerativeAI } from "@google/generative-ai";
import { KNOWLEDGE_BASE } from "./knowledge-base";
import { getLanguage } from "./language";
import { styleInstructionFor } from "./adaptive";
import { getConstituency, type Constituency } from "./constituencies";
import type { KnowledgeLevel, LanguageCode, Message } from "./types";

const MODEL_NAME = "gemini-1.5-flash";

function constituencyContextBlock(c: Constituency): string {
  const cands = c.candidates2024
    .map(
      (k) =>
        `  - ${k.name} (${k.partyShort}): age ${k.age}, ${k.educationLevel}, declared assets ₹${k.declaredAssetsCrore} crore, liabilities ₹${k.liabilitiesLakh} lakh, ${k.criminalCases} criminal case${k.criminalCases === 1 ? "" : "s"}.`,
    )
    .join("\n");
  return `# User's Constituency Context (USE THIS to personalise answers)

The user is voting in **${c.name}** (PC code ${c.id}), state of ${c.state}.

- Total electors: ${c.totalElectors.toLocaleString("en-IN")}
- 2024 Lok Sabha polling phase: ${c.pollingPhase}
- 2024 polling date: ${c.pollingDate}
- 2024 counting date: ${c.countingDate}
- Sitting MP (post-2024): ${c.sittingMP} (${c.sittingMPParty})
- 2019 result: ${c.history.winner} (${c.history.winnerParty}) won, turnout ${c.history.turnoutPercent}%, margin ${c.history.marginPercent}%
- Major candidates in 2024:
${cands}
- Booth finder for this constituency: ${c.boothFinderURL}
- Accepted alternate photo IDs at this booth: ${c.alternateIDs.join(", ")}.

When the user asks about their MP, polling date, candidates, or "my booth", answer with the data above. Do NOT speculate beyond it — if a detail isn't here, say so and point them to electoralsearch.eci.gov.in.`;
}

export function buildSystemPrompt(
  language: LanguageCode,
  level: KnowledgeLevel,
  constituencyId?: string | null,
): string {
  const lang = getLanguage(language);
  const styleInstruction = styleInstructionFor(level);
  const constituency = constituencyId ? getConstituency(constituencyId) : undefined;
  const constituencyBlock = constituency
    ? "\n\n" + constituencyContextBlock(constituency) + "\n"
    : "";

  return `You are Matdata Mitra (Voter Friend), a civic education assistant for Indian elections. You help citizens understand the election process, their rights, and what to do when problems arise.

# Knowledge Base (authoritative)

${KNOWLEDGE_BASE}
${constituencyBlock}
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
- When the user has selected a constituency (see "User's Constituency Context" above), reference it where relevant — phrase like "In your constituency, ${constituency?.name ?? "..."}, the polling date is..." rather than generic "the polling date is...".

# Tone
Patient, respectful, encouraging. The user may be a first-time voter or unsure of their rights. Treat questions seriously regardless of how basic they seem.`;
}

export interface StreamChatParams {
  messages: Message[];
  language: LanguageCode;
  level: KnowledgeLevel;
  apiKey: string;
  signal?: AbortSignal;
  constituencyId?: string | null;
}

async function* streamChatGemini(
  params: StreamChatParams,
): AsyncGenerator<string> {
  const { messages, language, level, apiKey, signal, constituencyId } = params;

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    systemInstruction: buildSystemPrompt(language, level, constituencyId),
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

export async function* streamChat(
  params: StreamChatParams,
): AsyncGenerator<string> {
  const provider = (process.env.AI_PROVIDER || "gemini").toLowerCase();
  if (provider === "void") {
    const { streamChatVoid } = await import("./providers/void");
    yield* streamChatVoid(params);
    return;
  }
  yield* streamChatGemini(params);
}
