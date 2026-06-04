import Image from "next/image";
import { type ReactNode } from "react";
import { imageBleedClass } from "@/components/ui/section-image";
import type { SiteImageAsset } from "@/lib/site-images";

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
    <section
      id="hero"
      aria-label="Home hero"
      className={`relative isolate ${imageBleedClass}`}
    >
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes="100vw"
        className="block h-auto w-full"
        priority={priority}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/55"
        aria-hidden
      />
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
