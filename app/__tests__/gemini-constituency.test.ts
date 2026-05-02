import { buildSystemPrompt } from "@/lib/gemini";

// Markers that only appear when an actual constituency record is injected
// (vs the generic style rule that mentions "constituency context").
const DATA_MARKER = /Total electors:\s*\d/;
const PHASE_MARKER = /2024 Lok Sabha polling phase:\s*\d/;

describe("buildSystemPrompt — constituency context", () => {
  it("does not include constituency data when none is supplied", () => {
    const prompt = buildSystemPrompt("en", "novice");
    expect(prompt).not.toMatch(DATA_MARKER);
    expect(prompt).not.toMatch(PHASE_MARKER);
  });

  it("does not include constituency data when id is null", () => {
    const prompt = buildSystemPrompt("en", "novice", null);
    expect(prompt).not.toMatch(DATA_MARKER);
  });

  it("ignores an unknown constituency id", () => {
    const prompt = buildSystemPrompt("en", "novice", "ZZZ");
    expect(prompt).not.toMatch(DATA_MARKER);
    expect(prompt).not.toContain("Varanasi");
  });

  it("injects constituency data when a known id is supplied", () => {
    const prompt = buildSystemPrompt("en", "novice", "VAR");
    expect(prompt).toMatch(DATA_MARKER);
    expect(prompt).toMatch(PHASE_MARKER);
    expect(prompt).toContain("Varanasi");
    expect(prompt).toContain("Uttar Pradesh");
    expect(prompt).toContain("Sitting MP");
    expect(prompt).toContain("Major candidates in 2024");
  });

  it("references the constituency name in the style guidance", () => {
    const prompt = buildSystemPrompt("en", "novice", "MUM");
    expect(prompt).toContain("Mumbai South");
  });
});
