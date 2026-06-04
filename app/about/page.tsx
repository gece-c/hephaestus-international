import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Eyebrow, ProseParagraph, SectionHeading } from "@/components/ui/typography";
import { aboutPage } from "@/content/site-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: `${aboutPage.title} | Hephaestus International`,
  description: aboutPage.mission,
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageShell title={aboutPage.title}>
      <Eyebrow>{aboutPage.heading}</Eyebrow>
      <ProseParagraph className="text-lg font-medium text-foreground">
        {aboutPage.program}
      </ProseParagraph>
      <ProseParagraph>{aboutPage.intro}</ProseParagraph>
      <div>
        <SectionHeading as="h2" className="text-xl">
          {aboutPage.objectivesTitle}
        </SectionHeading>
        <ProseParagraph className="mt-2">{aboutPage.objectives}</ProseParagraph>
      </div>
      <div>
        <SectionHeading as="h2" className="text-xl">
          {aboutPage.missionTitle}
        </SectionHeading>
        <ProseParagraph className="mt-2">{aboutPage.mission}</ProseParagraph>
      </div>
      <div>
        <SectionHeading as="h2" className="text-xl">
          {aboutPage.teamTitle}
        </SectionHeading>
        <ProseParagraph className="mt-2">{aboutPage.teamBody}</ProseParagraph>
      </div>
      <Button href={aboutPage.storyLinkHref}>{aboutPage.storyLinkLabel}</Button>
      <ProseParagraph>
        <Link href="/contact" className="text-brand-primary hover:underline">
          Contact us
        </Link>
      </ProseParagraph>
    </PageShell>
  );
}
