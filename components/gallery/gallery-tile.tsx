"use client";

import Image from "next/image";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  GalleryMediaViewer,
  type GalleryMediaViewerContent,
} from "@/components/gallery/gallery-media-viewer";
import { GalleryPlayIcon } from "@/components/gallery/gallery-play-icon";
import type { GalleryItem } from "@/content/site-content";
import { galleryPage } from "@/content/site-content";
import { type } from "@/lib/typography";

function getViewerContent(item: GalleryItem): GalleryMediaViewerContent {
  if (item.embedSrc) {
    return {
      kind: "embed",
      embedSrc: item.embedSrc,
      title: item.title,
    };
  }

  if (item.media.type === "image") {
    return {
      kind: "image",
      src: item.media.src,
      width: item.media.width,
      height: item.media.height,
      alt: item.media.alt,
    };
  }

  return {
    kind: "image",
    src: item.media.poster,
    width: item.media.posterWidth,
    height: item.media.posterHeight,
    alt: item.media.alt,
  };
}

function getVisualAriaLabel(item: GalleryItem): string {
  if (item.embedSrc) {
    return `${galleryPage.playVideoLabel}: ${item.title}`;
  }

  return `${galleryPage.viewFullImageLabel}: ${item.title}`;
}

export function GalleryTile({ item }: { item: GalleryItem }) {
  const [viewerContent, setViewerContent] = useState<GalleryMediaViewerContent | null>(
    null,
  );
  const media = item.media;
  const canPlayVideo = Boolean(item.embedSrc);
  const imageSrc = media.type === "image" ? media.src : media.poster;
  const imageWidth = media.type === "image" ? media.width : media.posterWidth;
  const imageHeight = media.type === "image" ? media.height : media.posterHeight;
  const showWatchLinkInViewer = media.type === "video" && !item.embedSrc;

  return (
    <>
      <Card chipSeed={item.id} className="flex h-full flex-col overflow-hidden p-0">
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
          <button
            type="button"
            onClick={() => setViewerContent(getViewerContent(item))}
            className="absolute inset-0 min-h-11 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            aria-label={getVisualAriaLabel(item)}
          />
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
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-4 inline-flex min-h-11 items-center ${type.labelLarge} text-brand-primary hover:underline`}
          >
            {item.embedSrc ? galleryPage.watchExternalLabel : galleryPage.externalLinkLabel}
          </a>
        </div>
      </Card>

      <GalleryMediaViewer
        content={viewerContent}
        watchHref={showWatchLinkInViewer ? item.href : undefined}
        onClose={() => setViewerContent(null)}
      />
    </>
  );
}
