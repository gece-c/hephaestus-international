import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { HubSpotApplicationForm } from "@/components/internships/hubspot-application-form";
import { StructuredOverview } from "@/components/internships/structured-overview";
import { Button } from "@/components/ui/button";
import { ProseParagraph } from "@/components/ui/typography";
import {
  isParsedInternshipDescriptionEmpty,
  parseInternshipContent,
  splitWhyJoinItem,
  structureOverviewBlocks,
} from "@/lib/internship-description";
import { formatInternshipLocation, internshipStatusClass } from "@/lib/internships-ui";
import { resolveInternshipHubspotFormId } from "@/lib/hubspot";
import { buildMetadata } from "@/lib/metadata";
import { getAllInternships, getInternship } from "@/lib/strapi";
import { type } from "@/lib/typography";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const internships = await getAllInternships();
  return internships.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const internship = await getInternship(slug);

  if (!internship) {
    return buildMetadata({
      title: "Internship | Hephaestus International",
      description: "Internship position at Hephaestus International.",
      path: `/internships/${slug}`,
    });
  }

  return buildMetadata({
    title: `${internship.title} | Hephaestus International`,
    description: internship.summary ?? internship.title,
    path: `/internships/${slug}`,
  });
}

function hasStructuredSections(
  parsed: ReturnType<typeof parseInternshipContent>,
): boolean {
  return (
    parsed.responsibilities.length > 0 ||
    parsed.qualifications.length > 0 ||
    parsed.whyJoinUs.length > 0
  );
}

export default async function InternshipDetailPage({ params }: PageProps) {
  const { slug } = await params;

  if (slug === "internships") {
    redirect("/internships");
  }

  const internship = await getInternship(slug);
  if (!internship) {
    notFound();
  }

  const parsed = parseInternshipContent(internship.description);
  const structuredOverview = structureOverviewBlocks(parsed.overview);
  const useStructuredBody =
    internship.description && !isParsedInternshipDescriptionEmpty(parsed);
  const showSectionHeadings = hasStructuredSections(parsed);
  const applicationFormId = resolveInternshipHubspotFormId(internship);

  return (
    <PageShell
      title={internship.title}
      centered={false}
      beforeTitle={
        <Link
          href="/internships"
          className={`${type.labelLarge} text-brand-primary hover:underline`}
        >
          ← All internship positions
        </Link>
      }
    >
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <span
          className={`inline-flex shrink-0 rounded-full px-2.5 py-1 ${type.labelSmall} font-medium ${internshipStatusClass(internship.status)}`}
        >
          {internship.status}
        </span>
        {internship.location ? (
          <span className={`${type.bodySmall} text-muted`}>
            {formatInternshipLocation(internship.location)}
          </span>
        ) : null}
      </div>

      {internship.company ? (
        <p className={`${type.bodyMedium} text-muted`}>{internship.company}</p>
      ) : null}

      {internship.duration || internship.schedule ? (
        <p className={`${type.bodyMedium} text-muted`}>
          {[internship.duration, internship.schedule].filter(Boolean).join(" · ")}
        </p>
      ) : null}

      {internship.summary ? (
        <ProseParagraph className={`${type.titleLarge} text-foreground`}>
          {internship.summary}
        </ProseParagraph>
      ) : null}

      {useStructuredBody ? (
        <div className="space-y-8">
          {parsed.overview.length > 0 ? (
            <section>
              {showSectionHeadings ? (
                <h2 className={`${type.headlineSmall} text-foreground text-balance`}>
                  Overview
                </h2>
              ) : null}
              <div className={showSectionHeadings ? "mt-4" : undefined}>
                <StructuredOverview blocks={structuredOverview} />
              </div>
            </section>
          ) : null}

          {parsed.responsibilities.length > 0 ? (
            <section>
              <h2 className={`${type.headlineSmall} text-foreground text-balance`}>
                Key responsibilities
              </h2>
              <ul
                className={`mt-4 list-disc space-y-2 pl-5 marker:text-foreground ${type.bodyLarge}`}
              >
                {parsed.responsibilities.map((item, index) => (
                  <li key={index} className="text-pretty text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {parsed.qualifications.length > 0 ? (
            <section>
              <h2 className={`${type.headlineSmall} text-foreground text-balance`}>
                Qualifications and skills
              </h2>
              <ul
                className={`mt-4 list-disc space-y-2 pl-5 marker:text-foreground ${type.bodyLarge}`}
              >
                {parsed.qualifications.map((item, index) => (
                  <li key={index} className="text-pretty text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {parsed.whyJoinUs.length > 0 ? (
            <section>
              <h2 className={`${type.headlineSmall} text-foreground text-balance`}>
                Why join us?
              </h2>
              <div className="mt-4 space-y-4">
                {parsed.whyJoinUs.map((item, index) => {
                  const entry = splitWhyJoinItem(item);
                  return (
                    <div key={index}>
                      {entry.title ? (
                        <>
                          <p className={`${type.titleLarge} text-foreground text-pretty`}>
                            {entry.title}
                          </p>
                          <ProseParagraph className="text-muted">
                            {entry.description}
                          </ProseParagraph>
                        </>
                      ) : (
                        <ProseParagraph className="text-muted">
                          {entry.description}
                        </ProseParagraph>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null}
        </div>
      ) : internship.description ? (
        <ProseParagraph>{internship.description}</ProseParagraph>
      ) : null}

      <div className="space-y-6 border-t border-border pt-8">
        <h2 className={`${type.headlineSmall} text-foreground text-balance`}>
          Apply for this position
        </h2>
        {applicationFormId ? (
          <HubSpotApplicationForm formId={applicationFormId} />
        ) : (
          <>
            <ProseParagraph>
              Ready to join the team? Contact us to apply for this role.
            </ProseParagraph>
            <Button href="/contact">Contact us</Button>
          </>
        )}
        <div className="flex flex-wrap gap-4">
          <Button href="/internships" variant="secondary">
            All positions
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
