import { detectKnowledgeLevel, styleInstructionFor } from "@/lib/adaptive";
import type { Message } from "@/lib/types";

describe("detectKnowledgeLevel", () => {
  it("returns 'novice' for empty history", () => {
    expect(detectKnowledgeLevel([])).toBe("novice");
  });

  it("returns 'novice' for simple beginner question", () => {
    const messages: Message[] = [
      { role: "user", content: "How do I vote? I'm 18 now." },
    ];
    expect(detectKnowledgeLevel(messages)).toBe("novice");
  });

  it("returns 'intermediate' for messages mentioning a single common term like NOTA", () => {
    const messages: Message[] = [
      { role: "user", content: "What is NOTA in the EVM and how does the ECI handle it?" },
    ];
    expect(detectKnowledgeLevel(messages)).toBe("intermediate");
  });

  it("returns 'expert' when user cites multiple legal sections", () => {
    const messages: Message[] = [
      {
        role: "user",
        content:
          "Can you explain Section 49A and Article 324 in the context of Rule 49MB?",
      },
    ];
    expect(detectKnowledgeLevel(messages)).toBe("expert");
  });

  it("returns 'expert' for VVPAT plus EPIC mention", () => {
    const messages: Message[] = [
      {
        role: "user",
        content: "Is the VVPAT count cross-verified per assembly segment, and how does it affect EPIC reconciliation?",
      },
    ];
    expect(detectKnowledgeLevel(messages)).toBe("expert");
  });

  it("ignores assistant messages when detecting level", () => {
    const messages: Message[] = [
      { role: "user", content: "How do I vote?" },
      { role: "assistant", content: "Here is Section 49A and Article 324..." },
    ];
    expect(detectKnowledgeLevel(messages)).toBe("novice");
  });
});

describe("styleInstructionFor", () => {
  it("returns distinct instructions per level", () => {
    const novice = styleInstructionFor("novice");
    const expert = styleInstructionFor("expert");
    const intermediate = styleInstructionFor("intermediate");
    expect(novice).not.toBe(expert);
    expect(novice).not.toBe(intermediate);
    expect(expert).not.toBe(intermediate);
    expect(novice.toLowerCase()).toContain("simple");
    expect(expert.toLowerCase()).toContain("section");
  });
});
