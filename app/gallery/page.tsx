import type { Metadata } from "next";
import { Container, Col, Section } from "@/components/layout/container";
import { ContentColumn } from "@/components/layout/content-column";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { GalleryTile } from "@/components/gallery/gallery-tile";
import { ProseParagraph, SectionHeading } from "@/components/ui/typography";
import { galleryItems, galleryPage } from "@/content/site-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: `${galleryPage.title} | Hephaestus International`,
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <Section className="pt-12">
          <Container>
            <ContentColumn centered>
              <SectionHeading as="h1">{galleryPage.heading}</SectionHeading>
            </ContentColumn>
            {galleryItems.length > 0 ? (
              galleryItems.map((item) => (
                <Col key={item.id} span={4} className="mt-6 md:mt-8">
                  <GalleryTile item={item} />
                </Col>
              ))
            ) : (
              <ContentColumn className="mt-8">
                <ProseParagraph className="italic">{galleryPage.empty}</ProseParagraph>
              </ContentColumn>
            )}
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
