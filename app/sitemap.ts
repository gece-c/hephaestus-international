import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site-content";
import { getAllProjectIds } from "@/lib/projects";

export const dynamic = "force-static";

const routes = [
  "",
  "/about",
  "/projects",
  ...getAllProjectIds().map((id) => `/projects/${id}`),
  "/internships",
  "/gallery",
  "/contact",
  "/login",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
