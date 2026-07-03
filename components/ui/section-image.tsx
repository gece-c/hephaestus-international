import Image from "next/image";
import { type CSSProperties, type ReactNode } from "react";
import type { SiteImageAsset } from "@/lib/site-images";
import {
  photoCoverOverlayClass,
  photoGradientBottomClass,
  photoGradientBottomHeavyClass,
  photoGradientCenterClass,
  photoGradientLeftClass,
  photoGradientTopClass,
  photoTintClass,
  photoTintMediumClass,
} from "@/lib/ui-styles";

/** Breaks out of the content container to the full viewport width. */
export const imageBleedClass =
  "relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2";

const columnBleedReset =
  "lg:left-0 lg:w-full lg:max-w-full lg:translate-x-0";

const backdropSizes = "100vw";

function intrinsicAspectStyle(image: SiteImageAsset): CSSProperties {
  return { aspectRatio: `${image.width} / ${image.height}` };
}

/**
 * Grid overlay: copy stays on the photo; row height is max(image aspect, content).
 * The cover image stretches when copy needs more vertical space than the frame.
 */
function PhotoGridOverlay({
  image,
  alt,
  children,
  priority = false,
  alignClass,
  contentClassName = "",
  overlayLayers,
  className = "",
  bleed = true,
}: {
  image: SiteImageAsset;
  alt: string;
  children: ReactNode;
  priority?: boolean;
  alignClass: string;
  contentClassName?: string;
  overlayLayers?: ReactNode;
  className?: string;
  bleed?: boolean;
}) {
  const wrapperClass = bleed ? imageBleedClass : "relative w-full";

  return (
    <div className={`grid isolate ${wrapperClass} ${className}`.trim()}>
      <div
        className="pointer-events-none col-start-1 row-start-1 w-full select-none opacity-0"
        style={intrinsicAspectStyle(image)}
        aria-hidden
      />
      <div className="pointer-events-none col-start-1 row-start-1 min-h-full w-full self-stretch">
        <div className="relative h-full min-h-full w-full">
          <Image
            src={image.src}
            alt={alt}
            fill
            sizes={backdropSizes}
            className="object-cover"
            priority={priority}
          />
          {overlayLayers}
        </div>
      </div>
      <div
        className={`col-start-1 row-start-1 z-10 flex w-full min-w-0 flex-col ${alignClass} ${contentClassName}`.trim()}
      >
        {children}
      </div>
    </div>
  );
}

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
 * Full-bleed photo backdrop below lg; from lg up, uncropped image (5/12) and copy
 * (7/12) sit side by side in normal flow — image height drives the row.
 */
export function SectionImageSplit({
  image,
  alt,
  children,
  priority = false,
  className = "",
  overlay = "heavy",
  mobileOverlay = "default",
  contentClassName = "py-12 md:py-16",
}: {
  image: SiteImageAsset;
  alt: string;
  children: ReactNode;
  priority?: boolean;
  className?: string;
  /** Backdrop gradient preset below lg. */
  overlay?: "default" | "heavy" | "none";
  /** "learning" adds left + bottom gradients used by the learning-engine slide. */
  mobileOverlay?: "default" | "learning";
  contentClassName?: string;
}) {
  const imageSizes = "(min-width: 1024px) 38vw, 100vw";

  const mobileOverlayLayers =
    mobileOverlay === "learning" ? (
      <>
        <div
          className={`pointer-events-none absolute inset-0 z-[5] ${photoTintMediumClass}`}
          aria-hidden
        />
        <div
          className={`pointer-events-none absolute inset-0 z-[5] ${photoGradientLeftClass}`}
          aria-hidden
        />
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[70%] md:h-[65%] ${photoGradientBottomHeavyClass}`}
          aria-hidden
        />
      </>
    ) : overlay !== "none" ? (
      <>
        <div
          className={`pointer-events-none absolute inset-0 z-[5] ${photoTintClass}`}
          aria-hidden
        />
        {overlay === "heavy" ? (
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[70%] md:h-[65%] ${photoGradientBottomHeavyClass}`}
            aria-hidden
          />
        ) : (
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[50%] md:h-[45%] ${photoGradientBottomClass}`}
            aria-hidden
          />
        )}
      </>
    ) : null;

  return (
    <div className={className}>
      <div className="mx-auto w-full max-w-[var(--max-width-content)] lg:px-8">
        <div className="max-lg:grid lg:flex lg:items-stretch lg:gap-8">
          <div
            className="pointer-events-none col-start-1 row-start-1 hidden w-screen max-w-[100vw] opacity-0 max-lg:block"
            style={intrinsicAspectStyle(image)}
            aria-hidden
          />
          <div
            className={`relative col-start-1 row-start-1 min-h-full w-screen max-w-[100vw] shrink-0 max-lg:left-1/2 max-lg:-translate-x-1/2 lg:col-start-auto lg:row-start-auto lg:w-5/12 lg:max-w-none lg:translate-x-0`}
          >
            <Image
              src={image.src}
              alt={alt}
              width={image.width}
              height={image.height}
              sizes={imageSizes}
              className="relative z-0 hidden h-auto w-full lg:block"
              priority={priority}
            />
            <div className="absolute inset-0 lg:hidden">
              <Image
                src={image.src}
                alt={alt}
                fill
                sizes={imageSizes}
                className="object-cover"
                priority={priority}
              />
              {mobileOverlayLayers}
            </div>
          </div>
          <div
            className={`col-start-1 row-start-1 z-10 flex w-full min-w-0 flex-col justify-end ${contentClassName} lg:col-start-auto lg:row-start-auto lg:flex lg:w-7/12 lg:justify-center lg:py-0`}
          >
            <div className="mx-auto w-full min-w-0 max-w-[var(--max-width-content)] px-4 sm:px-6 lg:max-w-none lg:px-0">
              {children}
            </div>
          </div>
        </div>
      </div>
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
    <PhotoGridOverlay
      image={image}
      alt={alt}
      priority={priority}
      alignClass={alignClass}
      contentClassName={contentClassName}
      overlayLayers={overlayLayers}
      className={className}
    >
      {children}
    </PhotoGridOverlay>
  );
}

/** Re-export for bespoke full-bleed sections (closing CTA, name origins). */
export { PhotoGridOverlay };
