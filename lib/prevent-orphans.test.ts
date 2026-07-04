import { describe, expect, it } from "vitest";
import { preventOrphans, preventOrphansInParagraph } from "./prevent-orphans";

describe("preventOrphans", () => {
  it("joins the last two words with a non-breaking space", () => {
    expect(preventOrphans("Be at the Center of the Future.")).toBe(
      "Be at the Center of the\u00A0Future.",
    );
  });

  it("joins all words when the string is short", () => {
    expect(preventOrphans("Join us")).toBe("Join\u00A0us");
  });

  it("preserves empty strings", () => {
    expect(preventOrphans("")).toBe("");
  });
});

describe("preventOrphansInParagraph", () => {
  it("protects the last two words in each sentence", () => {
    expect(
      preventOrphansInParagraph(
        "One myth says Hephaestus created a chair. Dionysus brought him back.",
      ),
    ).toBe(
      "One myth says Hephaestus created a\u00A0chair. Dionysus brought him\u00A0back.",
    );
  });

  it("falls back to single-sentence handling", () => {
    expect(preventOrphansInParagraph("Talos is the first trace of artificial intelligence.")).toBe(
      "Talos is the first trace of artificial\u00A0intelligence.",
    );
  });
});
