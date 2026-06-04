import type { Metadata } from "next";
import { seo, siteConfig } from "@/content/site-content";

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
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      shortcut: "/icon.svg",
      apple: "/icon.svg",
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
          url: "/og-image.png",
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
      images: ["/og-image.png"],
    },
  };
}
