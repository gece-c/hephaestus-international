import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { ProseParagraph } from "@/components/ui/typography";
import { projectsPage } from "@/content/site-content";
import {
  getAllProjectIds,
  getProjectById,
  getProjectDetailParagraphs,
  getProjectDetailTitle,
  getProjectExternalHref,
  getProjectFocusPoints,
  isProjectId,
} from "@/lib/projects";
import { buildMetadata } from "@/lib/metadata";
import { type } from "@/lib/typography";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectIds().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectById(slug);
  if (!project) {
    return buildMetadata({
      title: projectsPage.title,
      description: projectsPage.intro,
      path: "/projects",
    });
  }

  const paragraphs = getProjectDetailParagraphs(project);
  const description =
    paragraphs[0] ?? `${project.title}. ${projectsPage.intro}`;

  return buildMetadata({
    title: `${project.title} | ${projectsPage.title}`,
    description,
    path: `/projects/${project.id}`,
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isProjectId(slug)) {
    notFound();
  }

  const project = getProjectById(slug);
  if (!project) {
    notFound();
  }

  const paragraphs = getProjectDetailParagraphs(project);
  const focusPoints = getProjectFocusPoints(project);
  const externalHref = getProjectExternalHref(project);

  return (
    <PageShell
      title={getProjectDetailTitle(project)}
      centered={false}
      beforeTitle={
        <Link
          href="/projects"
          className={`${type.labelLarge} text-brand-primary hover:underline`}
        >
          ← {projectsPage.backToProjectsLabel}
        </Link>
      }
    >
      {paragraphs.length > 0 ? (
        <div className="space-y-4">
          {paragraphs.map((paragraph) => (
            <ProseParagraph key={paragraph}>{paragraph}</ProseParagraph>
          ))}
        </div>
      ) : (
        <ProseParagraph>{projectsPage.noApprovedCopyNote}</ProseParagraph>
      )}
      {focusPoints.length > 0 ? (
        <div className="mt-8">
          <ProseParagraph className={`${type.titleMedium} text-foreground`}>
            {projectsPage.focusPointsTitle}
          </ProseParagraph>
          <ul
            className={`mt-4 list-disc space-y-2 pl-5 marker:text-foreground ${type.bodyLarge}`}
          >
            {focusPoints.map((point) => (
              <li key={point} className="text-pretty text-muted">
                {point}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="mt-10 flex flex-wrap gap-4">
        {externalHref ? (
          <Button href={externalHref} external>
            {projectsPage.externalSiteLabel}
          </Button>
        ) : null}
        <Button href="/projects" variant="secondary">
          {projectsPage.backToProjectsLabel}
        </Button>
      </div>
    </PageShell>
  );
}
