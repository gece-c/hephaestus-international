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
  isProjectId,
} from "@/lib/projects";
import { buildMetadata } from "@/lib/metadata";

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
  const externalHref = getProjectExternalHref(project);

  return (
    <PageShell title={getProjectDetailTitle(project)}>
      <p className="mb-8">
        <Link
          href="/projects"
          className="text-sm font-medium text-brand-primary hover:underline"
        >
          ← {projectsPage.backToProjectsLabel}
        </Link>
      </p>
      {paragraphs.length > 0 ? (
        <div className="space-y-4">
          {paragraphs.map((paragraph) => (
            <ProseParagraph key={paragraph}>{paragraph}</ProseParagraph>
          ))}
        </div>
      ) : (
        <ProseParagraph>{projectsPage.noApprovedCopyNote}</ProseParagraph>
      )}
      <div className="mt-10 flex flex-wrap gap-4">
        {externalHref ? (
          <a
            href={externalHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-brand-primary bg-brand-primary px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            {projectsPage.externalSiteLabel}
          </a>
        ) : null}
        <Button href="/projects" variant="secondary">
          {projectsPage.backToProjectsLabel}
        </Button>
      </div>
    </PageShell>
  );
}
