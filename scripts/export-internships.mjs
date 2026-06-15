/**
 * Export published internships from the public Strapi API into lib/internships-local.json.
 * Re-run when CMS content changes: node scripts/export-internships.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "../lib/internships-local.json");

const sources = [
  process.env.STRAPI_URL,
  process.env.NEXT_PUBLIC_STRAPI_URL,
  "https://hephaestus-international-production.up.railway.app",
  "https://strapi-production-7ecb.up.railway.app",
].filter(Boolean);

function readField(entry, key) {
  if (entry && typeof entry === "object" && key in entry) return entry[key];
  const attrs = entry?.attributes;
  if (attrs && typeof attrs === "object" && key in attrs) return attrs[key];
  return undefined;
}

function stringOrUndefined(value) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed || undefined;
}

function mapStatus(entry) {
  const raw =
    readField(entry, "status") ??
    readField(entry, "internship_status") ??
    readField(entry, "internshipStatus");
  if (typeof raw === "string" && raw.trim()) return raw.trim();
  if (raw && typeof raw === "object" && typeof raw.name === "string") return raw.name;
  return "Open";
}

function mapEntry(raw, index) {
  const slug = readField(raw, "slug");
  const title = readField(raw, "title");
  if (typeof slug !== "string" || !slug || typeof title !== "string" || !title) {
    return null;
  }

  const hubspotRaw = readField(raw, "hubspotFormId");
  const description = stringOrUndefined(readField(raw, "description"));
  const requirements = stringOrUndefined(readField(raw, "requirements"));
  const responsibilities = stringOrUndefined(readField(raw, "responsibilities"));

  return {
    id: readField(raw, "id") ?? readField(raw, "documentId") ?? index,
    slug,
    title: decodeHtmlEntities(title),
    status: mapStatus(raw),
    location: stringOrUndefined(readField(raw, "location")),
    company: stringOrUndefined(readField(raw, "company")),
    duration: stringOrUndefined(readField(raw, "duration")),
    schedule: stringOrUndefined(readField(raw, "schedule")),
    summary: stringOrUndefined(readField(raw, "summary")),
    description: mergeDescription(description, requirements, responsibilities),
    hubspotFormId:
      typeof hubspotRaw === "string" && hubspotRaw.trim() ? hubspotRaw.trim() : undefined,
  };
}

function sanitizeDescription(raw) {
  if (!raw) return undefined;
  let text = raw.replace(/\r/g, "").replace(/\u00A0/g, " ");
  text = text.replace(/hbspt\.forms\.create\(\{[\s\S]*?\}\);?/gi, "");
  text = text.replace(/\n{3,}/g, "\n\n").trim();
  return text || undefined;
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/** Only merge extra CMS fields when the main description is very short. */
function mergeDescription(description, requirements, responsibilities) {
  const main = sanitizeDescription(description);
  if (main && main.length > 200) return main;

  const parts = [];
  if (main) parts.push(main);

  if (responsibilities && !main?.toLowerCase().includes("key responsibilities")) {
    parts.push(`Key Responsibilities\n\n${responsibilities}`);
  }

  if (requirements && !main?.toLowerCase().includes("qualifications")) {
    parts.push(`Qualifications and Skills\n\n${requirements}`);
  }

  return sanitizeDescription(parts.join("\n\n"));
}

async function fetchAll(baseUrl) {
  const root = baseUrl.replace(/\/$/, "");
  const pageSize = 100;
  const all = [];

  for (let page = 1; page <= 20; page++) {
    const qs = new URLSearchParams({
      populate: "*",
      sort: "title:asc",
      "pagination[page]": String(page),
      "pagination[pageSize]": String(pageSize),
    });
    const res = await fetch(`${root}/api/internships?${qs}`);
    if (!res.ok) throw new Error(`HTTP ${res.status} from ${root}`);

    const json = await res.json();
    const list = Array.isArray(json.data) ? json.data : [];
    for (let i = 0; i < list.length; i++) {
      const mapped = mapEntry(list[i], all.length + i);
      if (mapped) all.push(mapped);
    }

    const pageCount = json.meta?.pagination?.pageCount;
    if (typeof pageCount === "number") {
      if (page >= pageCount) break;
      continue;
    }
    if (list.length < pageSize) break;
  }

  return all;
}

async function main() {
  let lastError;
  for (const source of sources) {
    try {
      console.log(`Fetching from ${source} ...`);
      const internships = await fetchAll(source);
      if (internships.length === 0) {
        console.warn(`  No entries returned, trying next source.`);
        continue;
      }

      internships.sort((a, b) => a.title.localeCompare(b.title));
      fs.writeFileSync(outPath, `${JSON.stringify(internships, null, 2)}\n`, "utf8");
      console.log(`Wrote ${internships.length} internships to ${outPath}`);
      return;
    } catch (error) {
      lastError = error;
      console.warn(`  Failed: ${error.message}`);
    }
  }

  console.error("Could not export internships from any source.");
  if (lastError) throw lastError;
  process.exit(1);
}

main();
