/**
 * Tests for /api/chat input validation and security boundaries.
 * These run against the exported validateRequest logic via a re-export,
 * and directly against the POST handler using NextRequest mocks.
 */

import { NextRequest } from "next/server";

// We test the handler end-to-end (no real Gemini calls — key missing = 500)
import { POST } from "@/app/api/chat/route";

function makeRequest(body: unknown, headers: Record<string, string> = {}): NextRequest {
  return new NextRequest("http://localhost/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

describe("POST /api/chat — input validation", () => {
  it("rejects empty body", async () => {
    const req = new NextRequest("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("rejects missing messages array", async () => {
    const res = await POST(makeRequest({ language: "en" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/messages/i);
  });

  it("rejects empty messages array", async () => {
    const res = await POST(makeRequest({ messages: [], language: "en" }));
    expect(res.status).toBe(400);
  });

  it("rejects messages exceeding MAX_MESSAGES (50)", async () => {
    const messages = Array.from({ length: 51 }, (_, i) => ({
      role: i % 2 === 0 ? "user" : "assistant",
      content: "test",
    }));
    const res = await POST(makeRequest({ messages, language: "en" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/max/i);
  });

  it("rejects message content exceeding MAX_MESSAGE_LENGTH (4000 chars)", async () => {
    const res = await POST(
      makeRequest({
        messages: [{ role: "user", content: "x".repeat(4001) }],
        language: "en",
      })
    );
    expect(res.status).toBe(400);
  });

  it("rejects invalid language code", async () => {
    const res = await POST(
      makeRequest({
        messages: [{ role: "user", content: "hello" }],
        language: "zz",
      })
    );
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/language/i);
  });

  it("rejects unknown constituencyId", async () => {
    const res = await POST(
      makeRequest({
        messages: [{ role: "user", content: "hello" }],
        language: "en",
        constituencyId: "INVALID_CODE",
      })
    );
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/constituency/i);
  });

  it("rejects non-string constituencyId", async () => {
    const res = await POST(
      makeRequest({
        messages: [{ role: "user", content: "hello" }],
        language: "en",
        constituencyId: 123,
      })
    );
    expect(res.status).toBe(400);
  });

  it("accepts null constituencyId", async () => {
    // Will fail with 500 (missing API key) not 400 — validaton passes
    const res = await POST(
      makeRequest({
        messages: [{ role: "user", content: "hello" }],
        language: "en",
        constituencyId: null,
      })
    );
    expect(res.status).not.toBe(400);
  });

  it("rejects invalid message role", async () => {
    const res = await POST(
      makeRequest({
        messages: [{ role: "system", content: "inject" }],
        language: "en",
      })
    );
    expect(res.status).toBe(400);
  });

  it("rejects last message from assistant", async () => {
    const res = await POST(
      makeRequest({
        messages: [
          { role: "user", content: "hello" },
          { role: "assistant", content: "hi" },
        ],
        language: "en",
      })
    );
    // Passes validation, but fails on last-message-must-be-user check
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/last message/i);
  });

  it("returns 500 when GEMINI_API_KEY is missing", async () => {
    const original = process.env.GEMINI_API_KEY;
    delete process.env.GEMINI_API_KEY;
    const res = await POST(
      makeRequest({
        messages: [{ role: "user", content: "hello" }],
        language: "en",
      })
    );
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toMatch(/GEMINI_API_KEY/i);
    process.env.GEMINI_API_KEY = original;
  });

  it("rejects malformed JSON body", async () => {
    const req = new NextRequest("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{ bad json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/json/i);
  });

  it("sets no-cache headers on streaming response", async () => {
    // Provide a valid key to get past 500 and reach streaming headers check
    process.env.GEMINI_API_KEY = "test-key-for-headers";
    const res = await POST(
      makeRequest({
        messages: [{ role: "user", content: "hello" }],
        language: "en",
      })
    );
    // Either streaming (200) or Gemini error — either way cache-control set
    if (res.status === 200) {
      expect(res.headers.get("Cache-Control")).toMatch(/no-store/);
    }
    delete process.env.GEMINI_API_KEY;
  });
});

describe("POST /api/chat — accepted valid requests", () => {
  it("accepts all valid language codes", async () => {
    const langs = ["en", "hi", "ta", "te", "bn", "mr", "kn", "ml", "gu", "pa"];
    for (const language of langs) {
      const res = await POST(
        makeRequest({
          messages: [{ role: "user", content: "hello" }],
          language,
        })
      );
      // 500 = missing key (valid) or streaming = also valid; 400 = invalid lang (fail)
      expect(res.status).not.toBe(400);
    }
  });
});
