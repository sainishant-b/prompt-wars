import type { KnowledgeLevel, Message } from "./types";

const EXPERT_PATTERNS = [
  /section\s*\d+/i,
  /article\s*3\d{2}/i,
  /rpa\s*19[5][01]/i,
  /vvpat/i,
  /epic/i,
  /rule\s*49/i,
  /form\s*[678]a?/i,
  /returning officer/i,
  /electoral roll/i,
  /presiding officer/i,
  /tendered vote/i,
  /model code of conduct/i,
  /mcc/i,
  /single transferable vote/i,
];

const INTERMEDIATE_PATTERNS = [
  /eci/i,
  /election commission/i,
  /lok sabha/i,
  /rajya sabha/i,
  /vidhan sabha/i,
  /constituency/i,
  /nota/i,
  /postal ballot/i,
  /booth/i,
  /candidate/i,
  /nomination/i,
];

export function detectKnowledgeLevel(messages: Message[]): KnowledgeLevel {
  const userText = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join(" ");

  if (userText.length === 0) return "novice";

  const expertHits = EXPERT_PATTERNS.reduce(
    (n, p) => n + (p.test(userText) ? 1 : 0),
    0,
  );
  if (expertHits >= 2) return "expert";

  const intermediateHits = INTERMEDIATE_PATTERNS.reduce(
    (n, p) => n + (p.test(userText) ? 1 : 0),
    0,
  );
  if (expertHits >= 1 || intermediateHits >= 2) return "intermediate";

  return "novice";
}

export function styleInstructionFor(level: KnowledgeLevel): string {
  switch (level) {
    case "novice":
      return "User is a first-time or novice voter. Use simple, plain language. Avoid jargon. Use short sentences and step-by-step lists. Define any legal term you must mention. Use everyday analogies.";
    case "intermediate":
      return "User has some familiarity with elections. Use clear language; you may reference common terms (NOTA, EVM, ECI) without lengthy definitions. Add legal section numbers as parenthetical references.";
    case "expert":
      return "User is well-informed (mentions section numbers, legal references, or specific procedures). Use precise legal terminology. Cite section numbers (e.g., Section 49A, Article 324) inline. Be concise; skip elementary background.";
  }
}
