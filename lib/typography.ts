/**
 * Material Design 3 type scale — use these classes for all text sizing.
 * Semantic HTML (h1–h6, p, label, …) picks up matching styles from globals.css.
 *
 * @see https://m3.material.io/styles/typography/type-scale-tokens
 * @see app/globals.css (tokens, .type-* utilities, and base-layer defaults)
 */
export const type = {
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
