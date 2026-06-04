import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container, Section } from "@/components/layout/container";
import { ContentColumn } from "@/components/layout/content-column";
import { SectionHeading } from "@/components/ui/typography";

export function PageShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <Section className="pt-12">
          <Container>
            <ContentColumn centered>
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
