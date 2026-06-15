import Image from "next/image";
import { Card } from "@/components/ui/card";
import { GalleryPlayIcon } from "@/components/gallery/gallery-play-icon";
import type { GalleryItem } from "@/content/site-content";
import { galleryPage } from "@/content/site-content";
import { type } from "@/lib/typography";
import { cardRadiusClass } from "@/lib/ui-styles";

function getLinkLabel(item: GalleryItem): string {
  return item.embedSrc ? galleryPage.watchExternalLabel : galleryPage.externalLinkLabel;
}

export function GalleryTile({ item }: { item: GalleryItem }) {
  const media = item.media;
  const canPlayVideo = Boolean(item.embedSrc);
  const imageSrc = media.type === "image" ? media.src : media.poster;
  const imageWidth = media.type === "image" ? media.width : media.posterWidth;
  const imageHeight = media.type === "image" ? media.height : media.posterHeight;
  const linkLabel = getLinkLabel(item);

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block h-full ${cardRadiusClass} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary`}
      aria-label={`${linkLabel}: ${item.title}`}
    >
      <Card chipSeed={item.id} className="flex h-full flex-col overflow-hidden p-0 transition-colors group-hover:border-brand-primary/35">
        <div className="relative aspect-video w-full overflow-hidden bg-background">
          <Image
            src={imageSrc}
            alt={media.alt}
            width={imageWidth}
            height={imageHeight}
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="h-full w-full object-cover"
          />
          {canPlayVideo ? (
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <GalleryPlayIcon />
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className={`${type.titleLarge} text-balance text-card-foreground`}>
            {item.title}
          </h3>
          {item.description ? (
            <p className={`mt-3 flex-1 ${type.bodyMedium} text-muted text-pretty`}>
              {item.description}
            </p>
          ) : null}
          <span
            className={`mt-4 inline-flex min-h-11 items-center ${type.labelLarge} text-brand-primary group-hover:underline`}
          >
            {linkLabel}
          </span>
        </div>
      </Card>
    </a>
  );
}
