import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { PageShell } from "@/components/layout/page-shell";
import { ProseParagraph, SectionHeading } from "@/components/ui/typography";
import { contactPage, siteConfig } from "@/content/site-content";
import { buildMetadata } from "@/lib/metadata";
import { type } from "@/lib/typography";
import { externalBodyLinkClass } from "@/lib/ui-styles";

export const metadata: Metadata = buildMetadata({
  title: `${contactPage.title} | Hephaestus International`,
  description: contactPage.intro,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageShell title={contactPage.heading}>
      <ProseParagraph className={`${type.titleLarge} text-foreground`}>
        {contactPage.intro}
      </ProseParagraph>
      <div>
        <SectionHeading as="h2" className="mb-4">
          {contactPage.formTitle}
        </SectionHeading>
        <ContactForm />
      </div>
      <div>
        <SectionHeading as="h2" className="mb-4">
          {contactPage.otherTitle}
        </SectionHeading>
        <ProseParagraph>
          Email:{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="text-brand-primary hover:underline"
          >
            {siteConfig.contactEmail}
          </a>
        </ProseParagraph>
        <ProseParagraph>
          LinkedIn:{" "}
          <a
            href={siteConfig.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={externalBodyLinkClass}
          >
            {siteConfig.linkedInLabel}
          </a>
        </ProseParagraph>
      </div>
    </PageShell>
  );
}
