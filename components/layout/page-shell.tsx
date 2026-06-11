import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container, Section } from "@/components/layout/container";
import { ContentColumn } from "@/components/layout/content-column";
import { SectionHeading } from "@/components/ui/typography";

export function PageShell({
  title,
  beforeTitle,
  centered = true,
  children,
}: {
  title: string;
  beforeTitle?: React.ReactNode;
  /** Center the title block; use false for article-style pages (e.g. project details). */
  centered?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <Section className="pt-12">
          <Container>
            <ContentColumn centered={centered}>
              {beforeTitle ? <div className="mb-4">{beforeTitle}</div> : null}
              <SectionHeading as="h1">{title}</SectionHeading>
            </ContentColumn>
            <ContentColumn className="mt-8">
              <div className="space-y-6">{children}</div>
            </ContentColumn>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
