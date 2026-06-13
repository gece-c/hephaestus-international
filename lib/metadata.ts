import type { Metadata } from "next";
import { seo, siteConfig } from "@/content/site-content";
import { withBasePath } from "@/lib/site-url";

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
      icon: [{ url: withBasePath("/icon.svg"), type: "image/svg+xml" }],
      shortcut: withBasePath("/icon.svg"),
      apple: withBasePath("/icon.svg"),
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
          url: withBasePath("/og-image.png"),
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [withBasePath("/og-image.png")],
    },
  };
}
