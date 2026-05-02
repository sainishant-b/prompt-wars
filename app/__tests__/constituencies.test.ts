import {
  CONSTITUENCIES,
  CONSTITUENCY_IDS,
  constituenciesByState,
  getConstituency,
  isValidConstituencyId,
} from "@/lib/constituencies";

describe("constituencies module", () => {
  it("exports a non-empty list", () => {
    expect(CONSTITUENCIES.length).toBeGreaterThanOrEqual(10);
  });

  it("every constituency has the required fields", () => {
    for (const c of CONSTITUENCIES) {
      expect(c.id).toMatch(/^[A-Z]{3}$/);
      expect(c.name.length).toBeGreaterThan(0);
      expect(c.state.length).toBeGreaterThan(0);
      expect(typeof c.lat).toBe("number");
      expect(typeof c.lon).toBe("number");
      expect(c.totalElectors).toBeGreaterThan(0);
      expect(c.pollingPhase).toBeGreaterThanOrEqual(1);
      expect(c.pollingPhase).toBeLessThanOrEqual(7);
      expect(c.candidates2024.length).toBeGreaterThanOrEqual(2);
      expect(c.history.year).toBe(2019);
      expect(c.alternateIDs.length).toBeGreaterThan(0);
    }
  });

  it("ids are unique", () => {
    const set = new Set(CONSTITUENCY_IDS);
    expect(set.size).toBe(CONSTITUENCY_IDS.length);
  });

  it("getConstituency returns the right one", () => {
    expect(getConstituency("VAR")?.name).toBe("Varanasi");
    expect(getConstituency("BLR")?.state).toBe("Karnataka");
    expect(getConstituency("ZZZ")).toBeUndefined();
  });

  it("isValidConstituencyId accepts known and rejects unknown", () => {
    expect(isValidConstituencyId("VAR")).toBe(true);
    expect(isValidConstituencyId("ZZZ")).toBe(false);
    expect(isValidConstituencyId("")).toBe(false);
  });

  it("constituenciesByState groups and sorts by name", () => {
    const grouped = constituenciesByState();
    expect(grouped["Uttar Pradesh"].length).toBeGreaterThanOrEqual(2);
    const names = grouped["Uttar Pradesh"].map((c) => c.name);
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });
});
