import Image from "next/image";
import { type ReactNode } from "react";
import type { SiteImageAsset } from "@/lib/site-images";
import {
  photoCoverOverlayClass,
  photoGradientBottomClass,
  photoGradientBottomHeavyClass,
  photoGradientCenterClass,
  photoGradientTopClass,
  photoTintClass,
} from "@/lib/ui-styles";

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
 * Full-width cover image behind section content (fills height of content area).
 */
export function SectionCoverBackdrop({
  image,
  alt,
  children,
  priority = false,
  className = "",
  imageClassName = "object-center",
  overlayClassName = photoCoverOverlayClass,
}: {
  image: SiteImageAsset;
  alt: string;
  children: ReactNode;
  priority?: boolean;
  className?: string;
  /** Tailwind object-position utilities, e.g. `object-[center_35%]`. */
  imageClassName?: string;
  overlayClassName?: string;
}) {
  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      <Image
        src={image.src}
        alt={alt}
        fill
        sizes="100vw"
        className={`object-cover ${imageClassName}`}
        priority={priority}
      />
      <div
        className={`pointer-events-none absolute inset-0 ${overlayClassName}`}
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/**
 * Full-bleed image at native aspect ratio with overlaid copy (nothing cropped).
 * Use heightMode="cover" with coverHeightClass for a capped crop that keeps more of the frame.
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
  heightMode = "intrinsic",
  coverHeightClass = "",
  imagePosition = "object-center",
}: {
  image: SiteImageAsset;
  alt: string;
  children: ReactNode;
  priority?: boolean;
  className?: string;
  contentClassName?: string;
  contentAlign?: "bottom" | "center" | "upper-center";
  /** "heavy" = taller gradient; "top" = upper gradient for top-aligned copy; "none" = no overlay gradient */
  overlay?: "default" | "heavy" | "top" | "none";
  /** "cover" crops the image to coverHeightClass instead of showing full native height. */
  heightMode?: "intrinsic" | "cover";
  coverHeightClass?: string;
  imagePosition?: string;
}) {
  const centered = contentAlign === "center";
  const alignClass =
    contentAlign === "center"
      ? "items-center justify-center"
      : contentAlign === "upper-center"
        ? "items-center justify-start"
        : "justify-end";

  const overlayLayers =
    overlay !== "none" ? (
      <>
        <div className={`pointer-events-none absolute inset-0 ${photoTintClass}`} aria-hidden />
        {centered ? (
          <div
            className={`pointer-events-none absolute inset-0 ${photoGradientCenterClass}`}
            aria-hidden
          />
        ) : overlay === "top" ? (
          <div
            className={`pointer-events-none absolute inset-x-0 top-0 h-[40%] md:h-[35%] ${photoGradientTopClass}`}
            aria-hidden
          />
        ) : overlay === "heavy" ? (
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-[70%] md:h-[65%] ${photoGradientBottomHeavyClass}`}
            aria-hidden
          />
        ) : (
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-[50%] md:h-[45%] ${photoGradientBottomClass}`}
            aria-hidden
          />
        )}
      </>
    ) : null;

  if (heightMode === "cover") {
    return (
      <div
        className={`relative isolate overflow-hidden ${imageBleedClass} ${coverHeightClass} ${className}`.trim()}
      >
        <Image
          src={image.src}
          alt={alt}
          fill
          sizes={backdropSizes}
          className={`object-cover ${imagePosition}`}
          priority={priority}
        />
        {overlayLayers}
        <div
          className={`absolute inset-0 z-10 flex flex-col ${alignClass} ${contentClassName}`}
        >
          {children}
        </div>
      </div>
    );
  }

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
      {overlayLayers}
      <div
        className={`absolute inset-0 z-10 flex flex-col ${alignClass} ${contentClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
