import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  getLanguage,
  isValidLanguage,
} from "@/lib/language";

describe("language module", () => {
  it("exports exactly 10 supported Indian languages", () => {
    expect(Object.keys(LANGUAGES)).toHaveLength(10);
  });

  it("contains all required language codes", () => {
    const expected = ["en", "hi", "ta", "te", "bn", "mr", "kn", "ml", "gu", "pa"];
    for (const code of expected) {
      expect(LANGUAGES).toHaveProperty(code);
    }
  });

  it("provides nativeName, englishName, and geminiName for each language", () => {
    for (const lang of Object.values(LANGUAGES)) {
      expect(lang.nativeName).toBeTruthy();
      expect(lang.englishName).toBeTruthy();
      expect(lang.geminiName).toBeTruthy();
      expect(lang.inputPlaceholder).toBeTruthy();
      expect(lang.sendLabel).toBeTruthy();
      expect(lang.appTagline).toBeTruthy();
    }
  });

  it("isValidLanguage accepts known codes and rejects unknown ones", () => {
    expect(isValidLanguage("hi")).toBe(true);
    expect(isValidLanguage("en")).toBe(true);
    expect(isValidLanguage("zz")).toBe(false);
    expect(isValidLanguage("")).toBe(false);
  });

  it("getLanguage returns matching config for valid code", () => {
    expect(getLanguage("ta").englishName).toBe("Tamil");
  });

  it("getLanguage falls back to default for invalid code", () => {
    expect(getLanguage("invalid").code).toBe(DEFAULT_LANGUAGE);
  });
});
