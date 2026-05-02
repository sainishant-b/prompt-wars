import { buildSystemPrompt } from "@/lib/gemini";
import { KNOWLEDGE_BASE } from "@/lib/knowledge-base";

describe("buildSystemPrompt", () => {
  it("includes the entire knowledge base", () => {
    const prompt = buildSystemPrompt("en", "novice");
    expect(prompt).toContain(KNOWLEDGE_BASE);
  });

  it("instructs Gemini to respond in the chosen language", () => {
    const prompt = buildSystemPrompt("hi", "novice");
    expect(prompt).toContain("Hindi");
  });

  it("varies style instruction by knowledge level", () => {
    const novice = buildSystemPrompt("en", "novice");
    const expert = buildSystemPrompt("en", "expert");
    expect(novice).not.toBe(expert);
  });

  it("forbids inventing legal section numbers", () => {
    const prompt = buildSystemPrompt("en", "novice");
    expect(prompt.toLowerCase()).toContain("never invent");
  });

  it("references the Voter Helpline 1950", () => {
    const prompt = buildSystemPrompt("en", "novice");
    expect(prompt).toContain("1950");
  });
});
