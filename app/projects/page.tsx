import type { Metadata } from "next";
import { Container, Col, Section } from "@/components/layout/container";
import { ContentColumn } from "@/components/layout/content-column";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProseParagraph, SectionHeading } from "@/components/ui/typography";
import { projectsPage } from "@/content/site-content";
import { getProjectTileIntro, getProjectsCatalogSorted } from "@/lib/projects";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: `${projectsPage.title} | Hephaestus International`,
  description: projectsPage.intro,
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getProjectsCatalogSorted();

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <Section className="pt-12">
          <Container>
            <ContentColumn centered>
              <SectionHeading as="h1">{projectsPage.heading}</SectionHeading>
            </ContentColumn>
            <ContentColumn className="mt-8">
              <ProseParagraph className="text-lg text-foreground">
                {projectsPage.intro}
              </ProseParagraph>
            </ContentColumn>
            {projects.map((project) => {
              const intro = getProjectTileIntro(project);

              return (
                <Col key={project.id} span={6} className="mt-6 md:mt-8">
                  <Card chipSeed={project.id} className="flex h-full flex-col">
                    <SectionHeading as="h2" className="text-lg">
                      {project.title}
                    </SectionHeading>
                    {intro ? (
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted text-pretty">
                        {intro}
                      </p>
                    ) : (
                      <div className="flex-1" />
                    )}
                    <div className="mt-6">
                      <Button href={`/projects/${project.id}`}>
                        {projectsPage.viewDetailsLabel}
                      </Button>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
