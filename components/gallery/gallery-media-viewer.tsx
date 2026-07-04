"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef } from "react";
import { galleryPage } from "@/content/site-content";
import { balanceText } from "@/lib/prevent-orphans";
import { type } from "@/lib/typography";

export type GalleryMediaViewerContent =
  | {
      kind: "image";
      src: string;
      width: number;
      height: number;
      alt: string;
    }
  | {
      kind: "embed";
      embedSrc: string;
      title: string;
    };

type GalleryMediaViewerProps = {
  content: GalleryMediaViewerContent | null;
  watchHref?: string;
  onClose: () => void;
};

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GalleryMediaViewer({ content, watchHref, onClose }: GalleryMediaViewerProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    if (document.fullscreenElement === panelRef.current) {
      void document.exitFullscreen?.().catch(() => undefined);
    }
    onClose();
  }, [onClose]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    },
    [handleClose],
  );

  useEffect(() => {
    if (!content) {
      return;
    }

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [content, handleKeyDown]);

  useEffect(() => {
    if (!content || content.kind !== "embed" || !panelRef.current) {
      return;
    }

    const panel = panelRef.current;
    void panel.requestFullscreen?.().catch(() => undefined);

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        handleClose();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      if (document.fullscreenElement === panel) {
        void document.exitFullscreen?.().catch(() => undefined);
      }
    };
  }, [content, handleClose]);

  if (!content) {
    return null;
  }

  const title =
    content.kind === "embed" ? content.title : content.alt;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 md:p-8"
      role="presentation"
      onClick={handleClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={handleClose}
        className="fixed top-4 right-4 z-[60] flex min-h-11 min-w-11 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label={galleryPage.closeViewerLabel}
      >
        <CloseIcon />
      </button>

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-full max-w-full flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >

        <p id={titleId} className="sr-only">
          {title}
        </p>

        {content.kind === "image" ? (
          <Image
            src={content.src}
            alt={content.alt}
            width={content.width}
            height={content.height}
            sizes="100vw"
            className="max-h-[85vh] w-auto max-w-[min(100%,90rem)] object-contain"
            priority
          />
        ) : (
          <iframe
            src={`${content.embedSrc}${content.embedSrc.includes("?") ? "&" : "?"}autoplay=1`}
            title={content.title}
            className="aspect-video h-auto max-h-[85vh] w-[min(100vw-2rem,56rem)] border-0 bg-black"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen"
            allowFullScreen
          />
        )}

        {watchHref ? (
          <a
            href={watchHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 inline-flex min-h-11 items-center text-balance ${type.labelLarge} text-white underline-offset-4 hover:underline`}
          >
            {balanceText(galleryPage.externalLinkLabel)}
          </a>
        ) : null}
      </div>
    </div>
  );
}
