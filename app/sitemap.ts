import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site-content";
import { getAllProjectIds } from "@/lib/projects";
import { getAllInternships } from "@/lib/strapi";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const internships = await getAllInternships();

  const routes = [
    "",
    "/about",
    "/projects",
    ...getAllProjectIds().map((id) => `/projects/${id}`),
    "/internships",
    ...internships.map((item) => `/internships/${item.slug}`),
    "/gallery",
    "/contact",
    "/privacy",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
