import { describe, expect, it } from "vitest";
import {
  isParsedInternshipDescriptionEmpty,
  parseInternshipContent,
  sanitizeInternshipDescription,
  splitWhyJoinItem,
  stripEmojis,
  structureOverviewBlocks,
} from "./internship-description";

describe("parseInternshipContent", () => {
  it("returns empty sections for undefined", () => {
    const p = parseInternshipContent(undefined);
    expect(isParsedInternshipDescriptionEmpty(p)).toBe(true);
  });

  it("parses overview and responsibilities", () => {
    const raw = `First paragraph in overview.

Second overview line.

Key Responsibilities

- Ship features

- Review code`;

    const p = parseInternshipContent(raw);
    expect(p.overview).toEqual(["First paragraph in overview.", "Second overview line."]);
    expect(p.responsibilities).toEqual(["Ship features", "Review code"]);
    expect(p.qualifications).toEqual([]);
    expect(isParsedInternshipDescriptionEmpty(p)).toBe(false);
  });

  it("accepts Qualifications & Skills heading", () => {
    const raw = `Qualifications & Skills

- TypeScript

- React`;

    const p = parseInternshipContent(raw);
    expect(p.overview).toEqual([]);
    expect(p.qualifications).toEqual(["TypeScript", "React"]);
  });

  it("accepts Qualifications and Skills heading", () => {
    const raw = `Qualifications and Skills

Python`;

    const p = parseInternshipContent(raw);
    expect(p.qualifications).toEqual(["Python"]);
  });

  it("parses Why Join Us section", () => {
    const raw = `Why Join Us?

Culture: Great team.

Flat org.`;

    const p = parseInternshipContent(raw);
    expect(p.whyJoinUs).toHaveLength(2);
    expect(p.whyJoinUs[0]).toContain("Culture");
  });

  it("strips bullet prefixes from items", () => {
    const raw = `Key Responsibilities

• First task

- Second task`;

    const p = parseInternshipContent(raw);
    expect(p.responsibilities).toEqual(["First task", "Second task"]);
  });

  it("treats heading-only description as empty for structured UI", () => {
    const raw = `Overview

Key Responsibilities

Qualifications and Skills`;

    const p = parseInternshipContent(raw);
    expect(isParsedInternshipDescriptionEmpty(p)).toBe(true);
  });

  it("strips HubSpot embeds from CMS descriptions", () => {
    const raw = `Overview

A short intro.

Why Join Us?

Great team.

  hbspt.forms.create({
    portalId: "45023159",
    formId: "abc",
    region: "na1"
  });`;

    const cleaned = sanitizeInternshipDescription(raw);
    expect(cleaned).not.toContain("hbspt.forms.create");
    const p = parseInternshipContent(raw);
    expect(p.whyJoinUs[0]).toContain("Great team");
  });
});

describe("splitWhyJoinItem", () => {
  it("splits title and description when colon present", () => {
    const r = splitWhyJoinItem("Mentorship: Weekly 1:1s with seniors.");
    expect(r.title).toBe("Mentorship:");
    expect(r.description).toBe("Weekly 1:1s with seniors.");
  });

  it("returns empty title when no colon pattern", () => {
    const r = splitWhyJoinItem("Just a single sentence.");
    expect(r.title).toBe("");
    expect(r.description).toBe("Just a single sentence.");
  });
});

describe("structureOverviewBlocks", () => {
  it("keeps standard overview paragraphs flat", () => {
    const blocks = structureOverviewBlocks([
      "First overview paragraph.",
      "Second overview paragraph.",
    ]);

    expect(blocks).toEqual([
      { kind: "paragraph", text: "First overview paragraph." },
      { kind: "paragraph", text: "Second overview paragraph." },
    ]);
  });

  it("structures What You'll Work On groups", () => {
    const blocks = structureOverviewBlocks([
      "Intro paragraph.",
      "What You'll Work On:",
      "Animal Communication Research (Vocalization Project):",
      "Collaborate with AI teams.",
      "Analyze vocalization patterns.",
      "Wearables for Animal Wellness:",
      "Work on advanced pet wearables.",
    ]);

    expect(blocks).toEqual([
      { kind: "paragraph", text: "Intro paragraph." },
      { kind: "heading", text: "What You'll Work On" },
      {
        kind: "group",
        title: "Animal Communication Research (Vocalization Project)",
        items: ["Collaborate with AI teams.", "Analyze vocalization patterns."],
      },
      {
        kind: "group",
        title: "Wearables for Animal Wellness",
        items: ["Work on advanced pet wearables."],
      },
    ]);
  });

  it("structures section headings and bullet lists", () => {
    const blocks = structureOverviewBlocks([
      "About the Role\nPassionate about space?",
      "What You'll Do",
      "Participate in designing robotic systems.",
      "Help simulate spacecraft missions.",
      "What We’re Looking For",
      "Passionate about space science.",
      "Curious and collaborative.",
    ]);

    expect(blocks).toEqual([
      { kind: "heading", text: "About the Role" },
      { kind: "paragraph", text: "Passionate about space?" },
      { kind: "heading", text: "What You'll Do" },
      {
        kind: "bullets",
        items: ["Participate in designing robotic systems.", "Help simulate spacecraft missions."],
      },
      { kind: "heading", text: "What We’re Looking For" },
      {
        kind: "bullets",
        items: ["Passionate about space science.", "Curious and collaborative."],
      },
    ]);
  });

  it("strips emojis from decoded CMS copy", () => {
    expect(stripEmojis("&#x1f52d; About the Role")).toBe("About the Role");
    expect(stripEmojis("Hello 🌌 world")).toBe("Hello world");
  });
});
