import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Col, Container, Section } from "@/components/layout/container";
import { ContentColumn } from "@/components/layout/content-column";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProseParagraph, SectionHeading } from "@/components/ui/typography";
import { aboutPage } from "@/content/site-content";
import { buildMetadata } from "@/lib/metadata";
import { type } from "@/lib/typography";

export const metadata: Metadata = buildMetadata({
  title: `${aboutPage.title} | Hephaestus International`,
  description: aboutPage.description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <Section className="pt-12">
          <Container>
            <ContentColumn centered>
              <SectionHeading as="h1">{aboutPage.heading}</SectionHeading>
            </ContentColumn>
            <ContentColumn width="full" className="mt-8">
              <ProseParagraph balance className={`${type.titleLarge} text-foreground`}>
                {aboutPage.intro}
              </ProseParagraph>
            </ContentColumn>

            <Col span={12} className="mt-10 md:mt-12">
              <Card chipSeed="flolabs-about">
                <SectionHeading as="h2">{aboutPage.floLabs.title}</SectionHeading>
                <div className="mt-4 space-y-4">
                  {aboutPage.floLabs.paragraphs.map((paragraph) => (
                    <p key={paragraph} className={`${type.bodyMedium} text-muted text-pretty`}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-6">
                  <Button href={aboutPage.floLabs.href} external variant="secondary">
                    {aboutPage.floLabs.label}
                  </Button>
                </div>
              </Card>
            </Col>

            <ContentColumn width="full" className="mt-10 md:mt-12">
              <SectionHeading as="h2">{aboutPage.pathway.title}</SectionHeading>
              <ProseParagraph className="mt-4">{aboutPage.pathway.intro}</ProseParagraph>
            </ContentColumn>
            {aboutPage.pathway.steps.map((step, index) => (
              <Col key={step.title} span={4} className="mt-6 md:mt-8">
                <Card chipSeed={`pathway-${step.title}`} className="flex h-full flex-col">
                  <p className={`${type.slideNumber} text-brand-primary`}>{index + 1}</p>
                  <SectionHeading as="h3" className="mt-2">
                    {step.title}
                  </SectionHeading>
                  <p className={`mt-3 flex-1 ${type.bodyMedium} text-muted text-pretty`}>
                    {step.body}
                  </p>
                </Card>
              </Col>
            ))}

            <ContentColumn width="full" className="mt-10 md:mt-12">
              <SectionHeading as="h2">{aboutPage.whereWeWork.title}</SectionHeading>
              <div className="mt-4 space-y-4">
                {aboutPage.whereWeWork.paragraphs.map((paragraph) => (
                  <ProseParagraph key={paragraph}>{paragraph}</ProseParagraph>
                ))}
              </div>
            </ContentColumn>

            <ContentColumn width="full" className="mt-10 md:mt-12">
              <SectionHeading as="h2">{aboutPage.whoItsFor.title}</SectionHeading>
            </ContentColumn>
            {aboutPage.whoItsFor.items.map((item) => (
              <Col key={item.title} span={4} className="mt-6 md:mt-8">
                <Card chipSeed={`audience-${item.title}`} className="flex h-full flex-col">
                  <SectionHeading as="h3">{item.title}</SectionHeading>
                  <p className={`mt-3 flex-1 ${type.bodyMedium} text-muted text-pretty`}>
                    {item.body}
                  </p>
                </Card>
              </Col>
            ))}

            <ContentColumn width="full" className="mt-10 md:mt-12">
              <SectionHeading as="h2">{aboutPage.missionTitle}</SectionHeading>
              <ProseParagraph className="mt-4">{aboutPage.mission}</ProseParagraph>
            </ContentColumn>
            <ContentColumn width="full" className="mt-10">
              <SectionHeading as="h2">{aboutPage.teamTitle}</SectionHeading>
              <ProseParagraph className="mt-4">{aboutPage.teamBody}</ProseParagraph>
            </ContentColumn>
            <ContentColumn width="full" className="mt-10">
              <div className="flex flex-wrap gap-4">
                <Button href={aboutPage.internshipsHref}>{aboutPage.internshipsLabel}</Button>
                <Button href={aboutPage.storyLinkHref} variant="secondary">
                  {aboutPage.storyLinkLabel}
                </Button>
                <Button href={aboutPage.projectsHref} variant="secondary">
                  {aboutPage.projectsLabel}
                </Button>
                <Button href={aboutPage.contactHref} variant="secondary">
                  {aboutPage.contactLabel}
                </Button>
              </div>
            </ContentColumn>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
