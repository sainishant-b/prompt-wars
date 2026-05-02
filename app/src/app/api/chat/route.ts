import { NextRequest } from "next/server";
import { streamChat } from "@/lib/gemini";
import { detectKnowledgeLevel } from "@/lib/adaptive";
import { isValidLanguage } from "@/lib/language";
import type { ChatRequest, Message } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_MESSAGES = 50;
const MAX_MESSAGE_LENGTH = 4000;

function isValidMessage(m: unknown): m is Message {
  if (!m || typeof m !== "object") return false;
  const msg = m as Record<string, unknown>;
  return (
    (msg.role === "user" || msg.role === "assistant") &&
    typeof msg.content === "string" &&
    msg.content.length > 0 &&
    msg.content.length <= MAX_MESSAGE_LENGTH
  );
}

function validateRequest(body: unknown): ChatRequest | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid body" };
  }
  const b = body as Record<string, unknown>;

  if (!Array.isArray(b.messages) || b.messages.length === 0) {
    return { error: "messages must be a non-empty array" };
  }
  if (b.messages.length > MAX_MESSAGES) {
    return { error: `messages exceeds max of ${MAX_MESSAGES}` };
  }
  if (!b.messages.every(isValidMessage)) {
    return { error: "Invalid message format" };
  }

  if (typeof b.language !== "string" || !isValidLanguage(b.language)) {
    return { error: "Invalid or unsupported language" };
  }

  return {
    messages: b.messages as Message[],
    language: b.language,
  };
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Server is missing GEMINI_API_KEY" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const validated = validateRequest(body);
  if ("error" in validated) {
    return new Response(JSON.stringify({ error: validated.error }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { messages, language } = validated;
  const lastMessage = messages[messages.length - 1];
  if (lastMessage.role !== "user") {
    return new Response(
      JSON.stringify({ error: "Last message must be from user" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const level = detectKnowledgeLevel(messages);
  const encoder = new TextEncoder();
  const abort = request.signal;

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of streamChat({
          messages,
          language,
          level,
          apiKey,
          signal: abort,
        })) {
          if (abort.aborted) break;
          controller.enqueue(encoder.encode(chunk));
        }
        controller.close();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        controller.enqueue(
          encoder.encode(`\n\n[Error: ${message}]`),
        );
        controller.close();
      }
    },
    cancel() {
      // client disconnected; abort signal handles upstream cancellation
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "X-Knowledge-Level": level,
    },
  });
}
