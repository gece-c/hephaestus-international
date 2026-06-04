import Image from "next/image";
import { type ReactNode } from "react";
import type { SiteImageAsset } from "@/lib/site-images";

/** Breaks out of the content container to the full viewport width. */
export const imageBleedClass =
  "relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2";

const columnBleedReset =
  "lg:left-0 lg:w-full lg:max-w-full lg:translate-x-0";

const backdropSizes = "100vw";

function bleedWrapper(
  bleed: boolean | "column",
  className: string,
): string {
  if (bleed === true) {
    return `${imageBleedClass} ${className}`.trim();
  }
  if (bleed === "column") {
    return `${imageBleedClass} ${columnBleedReset} ${className}`.trim();
  }
  return `w-full ${className}`.trim();
}

/**
 * Full image at native aspect ratio, scaled to width. Nothing is cropped.
 */
export function SectionFullImage({
  image,
  alt,
  priority = false,
  className = "",
  bleed = true,
}: {
  image: SiteImageAsset;
  alt: string;
  priority?: boolean;
  className?: string;
  bleed?: boolean | "column";
}) {
  return (
    <div className={bleedWrapper(bleed, className)}>
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes="100vw"
        className="block h-auto w-full"
        priority={priority}
      />
    </div>
  );
}

/**
 * Full-bleed image at native aspect ratio with overlaid copy (nothing cropped).
 */
export function SectionBackdrop({
  image,
  alt,
  children,
  priority = false,
  className = "",
  contentClassName = "py-16 md:py-20 lg:py-24",
  contentAlign = "bottom",
  overlay = "default",
}: {
  image: SiteImageAsset;
  alt: string;
  children: ReactNode;
  priority?: boolean;
  className?: string;
  contentClassName?: string;
  contentAlign?: "bottom" | "center" | "upper-center";
  /** "heavy" = taller gradient; "none" = no overlay gradient */
  overlay?: "default" | "heavy" | "none";
}) {
  const centered = contentAlign === "center";
  const alignClass =
    contentAlign === "center"
      ? "items-center justify-center"
      : contentAlign === "upper-center"
        ? "items-center justify-start"
        : "justify-end";

  return (
    <div className={`relative isolate ${imageBleedClass} ${className}`}>
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes={backdropSizes}
        className="block h-auto w-full"
        priority={priority}
      />
      {overlay !== "none" &&
        (centered ? (
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/55"
            aria-hidden
          />
        ) : overlay === "heavy" ? (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/90 via-black/60 to-transparent md:h-[65%]"
            aria-hidden
          />
        ) : (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/85 via-black/50 to-transparent md:h-[45%]"
            aria-hidden
          />
        ))}
      <div
        className={`absolute inset-0 z-10 flex flex-col ${alignClass} ${contentClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
