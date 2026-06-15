import { ecosystem, projectsCatalog, siteFooter } from "@/content/site-content";

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
  return project.title;
}

export function getProjectDetailParagraphs(
  project: ProjectEntry,
): readonly string[] {
  if ("paragraphs" in project && project.paragraphs.length > 0) {
    return project.paragraphs;
  }
  if ("storytellingId" in project && project.storytellingId) {
    const storytelling = storytellingById[project.storytellingId];
    return [storytelling.title, ...storytelling.paragraphs];
  }
  return [];
}

export function getProjectFocusPoints(
  project: ProjectEntry,
): readonly string[] {
  return "focusPoints" in project ? project.focusPoints : [];
}

const TILE_INTRO_MAX_LENGTH = 140;

/** Teaser for list tiles: tileIntro, else first body paragraph (excludes storytelling headlines). */
export function getProjectTileIntro(project: ProjectEntry): string | undefined {
  if ("tileIntro" in project && project.tileIntro) {
    return truncateTileIntro(project.tileIntro);
  }

  const [first] = getProjectTileIntroParagraphs(project);
  if (!first) return undefined;
  return truncateTileIntro(first);
}

function truncateTileIntro(text: string): string {
  if (text.length <= TILE_INTRO_MAX_LENGTH) return text;
  return `${text.slice(0, TILE_INTRO_MAX_LENGTH - 1).trimEnd()}…`;
}

function getProjectTileIntroParagraphs(
  project: ProjectEntry,
): readonly string[] {
  if ("paragraphs" in project && project.paragraphs.length > 0) {
    return project.paragraphs;
  }
  if ("storytellingId" in project && project.storytellingId) {
    return storytellingById[project.storytellingId].paragraphs;
  }
  return [];
}

export function getProjectExternalHref(
  project: ProjectEntry,
): string | undefined {
  return "href" in project ? project.href : undefined;
}

/** Footer project links in the approved display order and labels. */
export function getFooterProjectLinkList(): readonly { label: string; href: string }[] {
  return siteFooter.projects.links.map((link) => {
    const project = getProjectById(link.id);
    if (!project) {
      throw new Error(`Unknown footer project id: ${link.id}`);
    }

    return {
      label: link.label,
      href: getFooterProjectHref(project),
    };
  });
}

export function getFooterProjectHref(project: ProjectEntry): string {
  return getProjectExternalHref(project) ?? `/projects/${project.id}`;
}
