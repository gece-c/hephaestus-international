import type { Metadata } from "next";
import { seo, siteConfig } from "@/content/site-content";
import { siteImages } from "@/lib/site-images";
import { withBasePath } from "@/lib/site-url";

const socialPreviewImage = siteImages.heroBackground;

const siteUrl = siteConfig.url;

export function buildMetadata({
  title,
  description,
  path = "",
}: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const pageTitle = title ?? seo.defaultTitle;
  const pageDescription = description ?? seo.defaultDescription;
  const url = `${siteUrl}${path}`;

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    icons: {
      icon: [{ url: withBasePath("/logo.svg"), type: "image/svg+xml" }],
      shortcut: withBasePath("/logo.svg"),
      apple: withBasePath("/logo.svg"),
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: siteConfig.name,
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: socialPreviewImage.src,
          width: socialPreviewImage.width,
          height: socialPreviewImage.height,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [socialPreviewImage.src],
    },
  };
}
