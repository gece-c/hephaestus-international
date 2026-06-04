import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { ProseParagraph } from "@/components/ui/typography";
import { closingCta, internshipsPage } from "@/content/site-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: `${internshipsPage.title} | Hephaestus International`,
  description: internshipsPage.intro,
  path: "/internships",
});

export default function InternshipsPage() {
  return (
    <PageShell title={internshipsPage.heading}>
      <ProseParagraph className="text-lg text-foreground">
        {internshipsPage.intro}
      </ProseParagraph>
      <ProseParagraph>{internshipsPage.note}</ProseParagraph>
      <p className="text-foreground font-medium text-pretty">
        {closingCta.tagline}
      </p>
      <Button href="/contact">{internshipsPage.ctaLabel}</Button>
    </PageShell>
  );
}
