import { ecosystem, projectsCatalog } from "@/content/site-content";

export type ProjectEntry = (typeof projectsCatalog)[number];
export type ProjectId = ProjectEntry["id"];

const storytellingById = Object.fromEntries(
  ecosystem.items.map((item) => [item.id, item]),
) as Record<
  (typeof ecosystem.items)[number]["id"],
  (typeof ecosystem.items)[number]
>;

/** Alphabetical by display title (guide: consistent, scannable project list). */
export function getProjectsCatalogSorted(): readonly ProjectEntry[] {
  return [...projectsCatalog].sort((a, b) =>
    a.title.localeCompare(b.title, "en", { sensitivity: "base" }),
  );
}

export function getAllProjectIds(): ProjectId[] {
  return getProjectsCatalogSorted().map((project) => project.id);
}

export function getProjectById(id: string): ProjectEntry | undefined {
  return projectsCatalog.find((project) => project.id === id);
}

export function isProjectId(id: string): id is ProjectId {
  return getAllProjectIds().includes(id as ProjectId);
}

export function getProjectDetailTitle(project: ProjectEntry): string {
  if ("storytellingId" in project && project.storytellingId) {
    return storytellingById[project.storytellingId].title;
  }
  return project.title;
}

export function getProjectDetailParagraphs(
  project: ProjectEntry,
): readonly string[] {
  if ("storytellingId" in project && project.storytellingId) {
    return storytellingById[project.storytellingId].paragraphs;
  }
  return [];
}

/** Teaser for list tiles: first approved paragraph only, when available. */
export function getProjectTileIntro(project: ProjectEntry): string | undefined {
  const [first] = getProjectDetailParagraphs(project);
  if (!first) return undefined;
  if (first.length <= 160) return first;
  return `${first.slice(0, 157).trimEnd()}…`;
}

export function getProjectExternalHref(
  project: ProjectEntry,
): string | undefined {
  return "href" in project ? project.href : undefined;
}
