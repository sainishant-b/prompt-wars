import { buildSystemPrompt } from "../gemini";
import type { KnowledgeLevel, LanguageCode, Message } from "../types";

const DEFAULT_BASE_URL = "https://api.voidai.app/v1";
const DEFAULT_MODEL = "gpt-4o-mini";

export interface VoidStreamParams {
  messages: Message[];
  language: LanguageCode;
  level: KnowledgeLevel;
  apiKey: string;
  signal?: AbortSignal;
  constituencyId?: string | null;
}

export async function* streamChatVoid(
  params: VoidStreamParams,
): AsyncGenerator<string> {
  const { messages, language, level, apiKey, signal, constituencyId } = params;

  const baseUrl = process.env.VOID_BASE_URL || DEFAULT_BASE_URL;
  const model = process.env.VOID_MODEL || DEFAULT_MODEL;

  const systemPrompt = buildSystemPrompt(language, level, constituencyId);

  const body = {
    model,
    stream: true,
    messages: [
      { role: "system", content: systemPrompt },
      ...messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ],
  };

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok || !res.body) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Void AI request failed (${res.status}): ${errText}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    if (signal?.aborted) {
      reader.cancel().catch(() => {});
      break;
    }
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let idx;
    while ((idx = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, idx).trim();
      buffer = buffer.slice(idx + 1);
      if (!line || !line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (payload === "[DONE]") return;
      try {
        const json = JSON.parse(payload) as {
          choices?: Array<{ delta?: { content?: string } }>;
        };
        const delta = json.choices?.[0]?.delta?.content;
        if (delta) yield delta;
      } catch {
        // ignore malformed chunk
      }
    }
  }
}
