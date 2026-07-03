/**
 * Presentation type scale from Hephaestus International. Version 3.pdf.
 * Fluid sizes scale with viewport (900pt slide reference). Legacy type.* keys
 * map to the same utilities for existing components.
 *
 * @see app/globals.css
 */
export const type = {
  slideTitle: "type-slide-title",
  slideHeadline: "type-slide-headline",
  slideSubhead: "type-slide-subhead",
  slideLead: "type-slide-lead",
  slideBody: "type-slide-body",
  slideBodyLg: "type-slide-body-lg",
  slideNumber: "type-slide-number",
  slideCaption: "type-slide-caption",
  displayLarge: "type-display-large",
  displayMedium: "type-display-medium",
  displaySmall: "type-display-small",
  headlineLarge: "type-headline-large",
  headlineMedium: "type-headline-medium",
  headlineSmall: "type-headline-small",
  titleLarge: "type-title-large",
  titleMedium: "type-title-medium",
  titleSmall: "type-title-small",
  bodyLarge: "type-body-large",
  bodyMedium: "type-body-medium",
  bodySmall: "type-body-small",
  labelLarge: "type-label-large",
  labelMedium: "type-label-medium",
  labelSmall: "type-label-small",
} as const;

export type TypeScale = keyof typeof type;
