import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Col, Container, Section } from "@/components/layout/container";
import { ContentColumn } from "@/components/layout/content-column";
import { Card } from "@/components/ui/card";
import { SectionCoverBackdrop } from "@/components/ui/section-image";
import { ProseParagraph, SectionHeading } from "@/components/ui/typography";
import { internshipsPage } from "@/content/site-content";
import { internshipStatusClass, formatInternshipLocation, sortInternships } from "@/lib/internships-ui";
import { buildMetadata } from "@/lib/metadata";
import { siteImages } from "@/lib/site-images";
import { getAllInternships } from "@/lib/strapi";
import { type } from "@/lib/typography";
import { cardRadiusClass, glassTextClass, photoCoverOverlayStrongClass } from "@/lib/ui-styles";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: `${internshipsPage.title} | Hephaestus International`,
  description: internshipsPage.intro,
  path: "/internships",
});

export default async function InternshipsPage() {
  const internships = sortInternships(await getAllInternships());
  const openCount = internships.filter((item) => item.status === "Open").length;

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <Section padding="none">
          <SectionCoverBackdrop
            image={siteImages.internshipsBackground}
            alt="Rocky coastline at sunset with mountains on the horizon"
            overlayClassName={photoCoverOverlayStrongClass}
          >
            <Container className="pt-12 pb-16 md:pb-24 lg:pb-28">
              <ContentColumn centered>
                <SectionHeading as="h1" className={glassTextClass}>
                  {internshipsPage.heading}
                </SectionHeading>
              </ContentColumn>
              {internships.length > 0 ? (
                <ContentColumn centered className="mt-8">
                  <ProseParagraph className={`${type.titleLarge} ${glassTextClass}`}>
                    {openCount > 0 ? (
                      <>
                        <span className="font-medium">{openCount}</span>
                        {openCount === 1 ? " role" : " roles"} open
                        {openCount < internships.length ? (
                          <span className="opacity-80">
                            {" "}
                            · {internships.length} listing{internships.length === 1 ? "" : "s"} total
                          </span>
                        ) : null}
                      </>
                    ) : (
                      <>
                        {internships.length} active listing{internships.length === 1 ? "" : "s"}
                      </>
                    )}
                  </ProseParagraph>
                </ContentColumn>
              ) : null}

              {internships.length === 0 ? (
                <Col span={12} className="mt-8">
                  <Card>
                    <ProseParagraph>No internships available at the moment.</ProseParagraph>
                  </Card>
                </Col>
              ) : (
                internships.map((item) => (
                  <Col key={String(item.id)} span={6} className="mt-6 md:mt-8">
                    <Link
                      href={`/internships/${item.slug}`}
                      className={`group block h-full ${cardRadiusClass} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary`}
                    >
                      <Card
                        chipSeed={item.slug}
                        className="flex h-full flex-col transition-[border-color,box-shadow,background-color] duration-200 group-hover:border-brand-primary/35 dark:group-hover:border-brand-primary/45 dark:group-hover:bg-brand-primary/[0.06] dark:group-hover:shadow-[0_0_0_1px_rgb(18_105_199/0.22),0_8px_28px_rgb(18_105_199/0.14),inset_0_1px_0_0_rgb(255_255_255/0.07)]"
                      >
                        <SectionHeading as="h3">{item.title}</SectionHeading>

                        <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                          <span
                            className={`inline-flex shrink-0 rounded-full px-2.5 py-1 ${type.labelSmall} font-medium ${internshipStatusClass(item.status)}`}
                          >
                            {item.status}
                          </span>
                          {item.location ? (
                            <span className={`${type.bodySmall} text-muted`}>
                              {formatInternshipLocation(item.location)}
                            </span>
                          ) : null}
                        </div>

                        {item.company ? (
                          <p className={`mt-3 ${type.bodyMedium} text-muted`}>{item.company}</p>
                        ) : null}

                        {item.summary ? (
                          <p className={`mt-3 flex-1 ${type.bodyMedium} text-muted text-pretty`}>
                            {item.summary}
                          </p>
                        ) : (
                          <div className="flex-1" />
                        )}

                        <span
                          className={`mt-6 inline-flex min-h-11 items-center ${type.labelLarge} text-brand-primary group-hover:underline`}
                        >
                          View role
                        </span>
                      </Card>
                    </Link>
                  </Col>
                ))
              )}
            </Container>
          </SectionCoverBackdrop>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
