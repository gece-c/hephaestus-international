import localInternships from "@/lib/internships-local.json";
import {
  decodeHtmlEntities,
  sanitizeInternshipDescription,
} from "@/lib/internship-description";

/**
 * Strapi (or any REST source) → UI shape.
 * Configure:
 * - STRAPI_URL or NEXT_PUBLIC_STRAPI_URL: e.g. https://cms.example.com (no trailing slash)
 * - STRAPI_API_TOKEN: optional, for private collections (server-only; do not use NEXT_PUBLIC_)
 * - STRAPI_INTERNSHIP_COLLECTION: API path segment, default "internships"
 * - STRAPI_PAGE_SIZE: page size for list requests (default 100). Strapi’s default is 25,
 *   so without pagination you only see the first 25 entries.
 *
 * Without env vars, the app reads published roles from the public Hephaestus Strapi API,
 * then falls back to `lib/internships-local.json` (refresh with `npm run export-internships`).
 *
 * Expected fields per entry (Strapi “API name”): title, slug, status, location,
 * company, duration, schedule, summary, description (long text), hubspotFormId (string).
 * Works with Strapi v4 `{ data: [{ id, attributes }] }` or v5-style flat `data` items.
 */
export type Internship = {
  id: string | number;
  slug: string;
  title: string;
  status: string;
  location?: string;
  company?: string;
  duration?: string;
  schedule?: string;
  summary?: string;
  description?: string;
  hubspotFormId?: string;
};

const collection = process.env.STRAPI_INTERNSHIP_COLLECTION ?? "internships";
const defaultStrapiUrl = "https://hephaestus-international-production.up.railway.app";

function baseUrl() {
  const u =
    process.env.STRAPI_URL?.trim() ||
    process.env.NEXT_PUBLIC_STRAPI_URL?.trim() ||
    defaultStrapiUrl;
  return u ? u.replace(/\/$/, "") : "";
}

function authHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = process.env.STRAPI_API_TOKEN?.trim();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

function readField(obj: Record<string, unknown>, key: string): unknown {
  if (key in obj) return obj[key];
  const attrs = obj.attributes;
  if (attrs && typeof attrs === "object" && attrs !== null && key in attrs) {
    return (attrs as Record<string, unknown>)[key];
  }
  return undefined;
}

function strInternshipStatus(value: unknown): string {
  if (value == null) return "Open";
  if (typeof value === "string") return value;
  if (typeof value === "object" && value !== null && "name" in value) {
    const n = (value as { name?: unknown }).name;
    if (typeof n === "string") return n;
  }
  return String(value);
}

function stringOrUndefined(v: unknown): string | undefined {
  if (typeof v === "string") {
    const t = v.trim();
    return t || undefined;
  }
  return undefined;
}

function mergeDescriptionFields(
  description?: string,
  requirements?: string,
  responsibilities?: string,
): string | undefined {
  const main = sanitizeInternshipDescription(description);
  if (main && main.length > 200) return main;

  const parts: string[] = [];
  if (main) parts.push(main);

  if (responsibilities && !main?.toLowerCase().includes("key responsibilities")) {
    parts.push(`Key Responsibilities\n\n${responsibilities}`);
  }

  if (requirements && !main?.toLowerCase().includes("qualifications")) {
    parts.push(`Qualifications and Skills\n\n${requirements}`);
  }

  return sanitizeInternshipDescription(parts.join("\n\n"));
}

function finalizeInternship(entry: Internship): Internship {
  return {
    ...entry,
    title: decodeHtmlEntities(entry.title),
    description: sanitizeInternshipDescription(entry.description),
  };
}

function mapEntry(raw: unknown, index: number): Internship | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;
  const rawId = obj.id ?? obj.documentId ?? index;
  const id: string | number =
    typeof rawId === "string" || typeof rawId === "number" ? rawId : index;
  const slug = readField(obj, "slug");
  const title = readField(obj, "title");
  if (typeof slug !== "string" || !slug || typeof title !== "string" || !title) {
    return null;
  }

  const hubspotRaw = readField(obj, "hubspotFormId");
  const hubspotFormId =
    typeof hubspotRaw === "string" && hubspotRaw ? hubspotRaw : undefined;

  const description = mergeDescriptionFields(
    stringOrUndefined(readField(obj, "description")),
    stringOrUndefined(readField(obj, "requirements")),
    stringOrUndefined(readField(obj, "responsibilities")),
  );

  return finalizeInternship({
    id,
    slug,
    title,
    status: strInternshipStatus(
      readField(obj, "status") ??
        readField(obj, "internship_status") ??
        readField(obj, "internshipStatus"),
    ),
    location: stringOrUndefined(readField(obj, "location")),
    company: stringOrUndefined(readField(obj, "company")),
    duration: stringOrUndefined(readField(obj, "duration")),
    schedule: stringOrUndefined(readField(obj, "schedule")),
    summary: stringOrUndefined(readField(obj, "summary")),
    description,
    hubspotFormId,
  });
}

function extractList(payload: unknown): unknown[] {
  if (!payload || typeof payload !== "object") return [];
  const data = (payload as { data?: unknown }).data;
  if (!Array.isArray(data)) return [];
  return data;
}

function strapiPageSize(): number {
  const raw = process.env.STRAPI_PAGE_SIZE?.trim();
  const n = raw ? parseInt(raw, 10) : 100;
  if (!Number.isFinite(n) || n < 1) return 100;
  return Math.min(n, 250);
}

function readPaginationPageCount(payload: unknown): number | undefined {
  if (!payload || typeof payload !== "object") return undefined;
  const meta = (payload as { meta?: { pagination?: { page?: number; pageCount?: number } } })
    .meta;
  const pageCount = meta?.pagination?.pageCount;
  return typeof pageCount === "number" && pageCount >= 1 ? pageCount : undefined;
}

/**
 * Strapi REST paginates by default (pageSize 25 in Strapi 5). Fetch every page so the UI
 * sees all published entries (capped by the host’s maxLimit per request).
 */
async function fetchStrapiList(): Promise<Internship[]> {
  const root = baseUrl();
  if (!root) return [];

  const pageSize = strapiPageSize();
  const all: Internship[] = [];

  try {
    for (let page = 1; page <= 200; page++) {
      const qs = new URLSearchParams();
      qs.set("populate", "*");
      qs.set("sort", "title:asc");
      qs.set("pagination[page]", String(page));
      qs.set("pagination[pageSize]", String(pageSize));

      const url = `${root}/api/${collection}?${qs.toString()}`;
      const res = await fetch(url, {
        headers: authHeaders(),
        next: { revalidate: 60 },
      });
      if (!res.ok) break;

      const json: unknown = await res.json();
      const list = extractList(json);

      for (let i = 0; i < list.length; i++) {
        const mapped = mapEntry(list[i], all.length + i);
        if (mapped) all.push(mapped);
      }

      const pageCount = readPaginationPageCount(json);
      if (pageCount != null) {
        if (page >= pageCount) break;
        continue;
      }

      if (list.length < pageSize) break;
    }
  } catch {
    return all;
  }

  return all;
}

async function fetchStrapiOneBySlug(slug: string): Promise<Internship | null> {
  const root = baseUrl();
  if (!root) return null;

  const enc = encodeURIComponent(slug);
  const url = `${root}/api/${collection}?filters[slug][$eq]=${enc}&populate=*`;
  try {
    const res = await fetch(url, {
      headers: authHeaders(),
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json: unknown = await res.json();
    const list = extractList(json);
    const first = list[0];
    return first ? mapEntry(first, 0) : null;
  } catch {
    return null;
  }
}

function localFallback(): Internship[] {
  return (localInternships as Internship[]).map(finalizeInternship);
}

/** All listings: Strapi when available; otherwise `lib/internships-local.json`. */
export async function getAllInternships(): Promise<Internship[]> {
  const remote = await fetchStrapiList();
  if (remote.length > 0) return remote;
  return localFallback();
}

/** Single role: Strapi by slug when available; else match local JSON. */
export async function getInternship(slug: string): Promise<Internship | null> {
  const one = await fetchStrapiOneBySlug(slug);
  if (one) return one;
  return localFallback().find((i) => i.slug === slug) ?? null;
}
