const productionUrl = "https://hephaestus.international";
const githubPagesRepo = "hephaestus-international";
const githubPagesOwner = "gece-c";

export const isGithubPages = process.env.GITHUB_PAGES === "true";

export const basePath = isGithubPages ? `/${githubPagesRepo}` : "";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  (isGithubPages
    ? `https://${githubPagesOwner}.github.io/${githubPagesRepo}`
    : productionUrl);

/** Prefix public asset paths for GitHub Pages project sites. */
export function withBasePath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
