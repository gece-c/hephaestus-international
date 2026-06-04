import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site-content";
import { getAllProjectIds } from "@/lib/projects";

const routes = [
  "",
  "/about",
  "/projects",
  ...getAllProjectIds().map((id) => `/projects/${id}`),
  "/internships",
  "/blogs",
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
