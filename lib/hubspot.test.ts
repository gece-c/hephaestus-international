import { describe, expect, it } from "vitest";
import {
  extractHubspotFormIdFromDescription,
  HUBSPOT_DEFAULT_FORM_ID,
  resolveInternshipHubspotFormId,
} from "./hubspot";

describe("hubspot helpers", () => {
  it("reads formId from CMS embed snippets in descriptions", () => {
    const description = `Why Join Us?

Great team.

  hbspt.forms.create({
    portalId: "45023159",
    formId: "abc-123-form",
    region: "na1"
  });`;

    expect(extractHubspotFormIdFromDescription(description)).toBe("abc-123-form");
  });

  it("prefers the dedicated hubspotFormId field", () => {
    expect(
      resolveInternshipHubspotFormId({
        hubspotFormId: "field-id",
        description: 'formId: "embed-id"',
      }),
    ).toBe("field-id");
  });

  it("falls back to the shared default application form", () => {
    expect(resolveInternshipHubspotFormId({ description: "Overview only." })).toBe(
      HUBSPOT_DEFAULT_FORM_ID,
    );
  });
});
