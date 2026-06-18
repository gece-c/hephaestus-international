/** Shared surface radii from design tokens in app/globals.css */
export const buttonRadiusClass = "rounded-[var(--radius-button)]";
export const cardRadiusClass = "rounded-[var(--radius-card)]";
export const inputRadiusClass = "rounded-[var(--radius-input)]";

/** Subtle worn-stone edge chips and cracks — see globals.css */
export const chippedSurfaceVariants = [
  "chipped-surface",
  "chipped-surface-v1",
  "chipped-surface-v2",
  "chipped-surface-v3",
] as const;

export type ChippedSurfaceVariant = (typeof chippedSurfaceVariants)[number];

export const chippedSurfaceClass = chippedSurfaceVariants[0];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function getChippedSurfaceClass(seed: number | string = 0): ChippedSurfaceVariant {
  const index =
    typeof seed === "number"
      ? Math.abs(seed) % chippedSurfaceVariants.length
      : hashString(seed) % chippedSurfaceVariants.length;
  return chippedSurfaceVariants[index];
}

const glassSurfaceBaseClass =
  "border border-border bg-card backdrop-blur-xl backdrop-saturate-150 shadow-[0_1px_2px_rgb(0_0_0_/_0.06),0_4px_14px_rgb(0_0_0_/_0.08)] dark:border-white/15 dark:bg-black/35 dark:shadow-none";

/** Bordered interactive shells (icon buttons, toggles, menu triggers). */
export const buttonChromeClass = `${buttonRadiusClass} ${chippedSurfaceClass}`;

/** Frosted panel for cards and overlays on photography or solid sections. */
export const glassSurfaceClass = `${glassSurfaceBaseClass} ${chippedSurfaceClass}`;

export function glassSurfaceWithChip(seed?: number | string): string {
  return `${glassSurfaceBaseClass} ${getChippedSurfaceClass(seed ?? 0)}`;
}

/** Extra contrast for copy placed directly over photography. */
export const glassTextClass =
  "text-foreground dark:text-white [text-shadow:0_1px_2px_rgb(0_0_0_/_0.45)] dark:[text-shadow:0_1px_3px_rgb(0_0_0_/_0.85)]";

/** Greece blue accent on photography — readable halo without light-mode white outline. */
export const photoBrandAccentClass =
  "font-semibold text-brand-primary [text-shadow:0_0_8px_rgb(0_0_0_/_0.95),0_1px_3px_rgb(0_0_0_/_1),0_2px_10px_rgb(0_0_0_/_0.88)]";

/** Focused scrim for spread photo copy — tall band, keeps manuscript edges visible. */
export const photoTextColumnScrimClass =
  "bg-[radial-gradient(ellipse_92%_98%_at_50%_46%,rgba(0,0,0,0.34),transparent_76%)] dark:bg-[radial-gradient(ellipse_92%_98%_at_50%_46%,rgba(0,0,0,0.46),transparent_74%)]";

/** Shared white copy shadow on full-bleed photography sections. */
export const photoWhiteTextClass =
  "text-white [text-shadow:0_1px_2px_rgb(0_0_0_/_0.95),0_2px_8px_rgb(0_0_0_/_0.88),0_4px_20px_rgb(0_0_0_/_0.6)]";

/** Softer white copy for long photo passages — less glow fatigue. */
export const photoWhiteTextSoftClass =
  "text-white/95 [text-shadow:0_1px_3px_rgb(0_0_0_/_0.85),0_2px_12px_rgb(0_0_0_/_0.55)]";

/** Subtle full-bleed tint — lighter in light theme, deeper in dark theme. */
export const photoTintClass = "bg-black/10 dark:bg-black/28";

/** Cover overlay for glass typography on photography. */
export const photoCoverOverlayClass = "bg-background/35 dark:bg-black/45";
export const photoCoverOverlayStrongClass = "bg-background/40 dark:bg-black/50";

/** Centered gradient for hero-style sections with white copy. */
export const photoGradientCenterClass =
  "bg-gradient-to-b from-black/20 via-black/8 to-black/45 dark:from-black/30 dark:via-black/14 dark:to-black/58";

/** Bottom gradient for transition blocks and default backdrops. */
export const photoGradientBottomClass =
  "bg-gradient-to-t from-black/78 via-black/42 to-transparent dark:from-black/88 dark:via-black/52";

/** Taller bottom gradient for dense copy over photography. */
export const photoGradientBottomHeavyClass =
  "bg-gradient-to-t from-black/82 via-black/52 to-transparent dark:from-black/92 dark:via-black/62";

/** Top gradient for upper-aligned titles. */
export const photoGradientTopClass =
  "bg-gradient-to-b from-black/42 via-black/20 to-transparent dark:from-black/55 dark:via-black/30";

/** Name origins — layered overlays. */
export const photoTintStrongClass = "bg-black/22 dark:bg-black/48";
export const photoRadialLeftClass =
  "bg-[radial-gradient(ellipse_75%_55%_at_32%_42%,rgba(0,0,0,0.32),transparent_75%)] dark:bg-[radial-gradient(ellipse_75%_55%_at_32%_42%,rgba(0,0,0,0.52),transparent_72%)]";
export const photoGradientVerticalSoftClass =
  "bg-gradient-to-b from-black/14 via-black/6 to-black/18 dark:from-black/58 dark:via-black/48 dark:to-black/54";

/** Learning engine — layered overlays. */
export const photoTintMediumClass = "bg-black/14 dark:bg-black/32";
export const photoGradientLeftClass =
  "bg-gradient-to-r from-black/38 via-black/18 to-black/6 dark:from-black/52 dark:via-black/26 dark:to-black/8";

/** Closing CTA — layered overlays. */
export const photoTintClosingClass = "bg-black/18 dark:bg-black/36";
export const photoRadialCenterClass =
  "bg-[radial-gradient(ellipse_65%_55%_at_50%_42%,rgba(0,0,0,0.42),transparent_72%)] dark:bg-[radial-gradient(ellipse_65%_55%_at_50%_42%,rgba(0,0,0,0.58),transparent_72%)]";
export const photoGradientBottomClosingClass =
  "bg-gradient-to-t from-black/58 via-black/30 to-transparent dark:from-black/72 dark:via-black/44";
