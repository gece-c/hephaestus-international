import { type ReactNode } from "react";
import { PhotoGridOverlay } from "@/components/ui/section-image";
import type { SiteImageAsset } from "@/lib/site-images";
import {
  photoGradientCenterClass,
  photoTintClass,
} from "@/lib/ui-styles";

/**
 * Hero: full image (uncropped) directly under the header with centered copy on top.
 */
export function HeroBackdrop({
  image,
  alt,
  children,
  priority = false,
}: {
  image: SiteImageAsset;
  alt: string;
  children: ReactNode;
  priority?: boolean;
}) {
  return (
    <section id="hero" aria-label="Home hero">
      <PhotoGridOverlay
        image={image}
        alt={alt}
        priority={priority}
        alignClass="items-center justify-center"
        contentClassName="px-4 py-16 sm:px-6 lg:px-8"
        overlayLayers={
          <>
            <div
              className={`pointer-events-none absolute inset-0 ${photoTintClass}`}
              aria-hidden
            />
            <div
              className={`pointer-events-none absolute inset-0 ${photoGradientCenterClass}`}
              aria-hidden
            />
          </>
        }
      >
        {children}
      </PhotoGridOverlay>
    </section>
  );
}
