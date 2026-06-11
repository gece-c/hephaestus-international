import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { Container, Col } from "@/components/layout/container";
import { siteConfig, siteFooter } from "@/content/site-content";
import { getFooterProjectHref, getFooterProjectLinks } from "@/lib/projects";
import { type } from "@/lib/typography";
import { buttonChromeClass, buttonRadiusClass, inputRadiusClass } from "@/lib/ui-styles";

function FooterSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className={`${type.labelSmall} uppercase tracking-[0.2em] text-foreground`}>
      {children}
    </p>
  );
}

function FooterLinkList({
  links,
}: {
  links: readonly { label: string; href: string }[];
}) {
  return (
    <ul className="mt-4 space-y-2">
      {links.map((link) => (
        <li key={link.label}>
          <FooterProjectLink href={link.href} label={link.label} />
        </li>
      ))}
    </ul>
  );
}

function FooterProjectLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const linkClassName = `${type.bodyMedium} text-foreground underline underline-offset-4 transition-colors hover:text-brand-primary`;

  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClassName}>
      {label}
    </Link>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M22 2L11 13"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 2L15 22L11 13L2 9L22 2Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.75 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function SiteFooter() {
  const projectColumns = getFooterProjectLinks();

  return (
    <footer className="border-t border-border bg-card py-12 md:py-16">
      <Container>
        <Col span={12} className="lg:col-span-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <div className="flex items-start gap-3">
                <BrandLogo
                  className="h-10 w-10 shrink-0 text-brand-primary"
                  showTitle={false}
                />
                <p className={`${type.titleLarge} text-balance text-foreground`}>
                  {siteConfig.name}{" "}
                  <span className="font-normal text-muted">
                    | {siteFooter.projectLine}
                  </span>
                </p>
              </div>
              <p className={`mt-4 max-w-md ${type.bodyMedium} text-muted text-pretty`}>
                {siteFooter.description}
              </p>

              <div className="mt-8">
                <FooterSectionTitle>
                  {siteFooter.newsletter.title}
                </FooterSectionTitle>
                <p className={`mt-3 ${type.bodyMedium} text-muted text-pretty`}>
                  {siteFooter.newsletter.prompt}
                </p>
                <form action="/contact" method="get" className="mt-3 max-w-md">
                  <input
                    type="hidden"
                    name="subject"
                    value="Newsletter signup"
                  />
                  <label className="sr-only" htmlFor="footer-newsletter-email">
                    {siteFooter.newsletter.placeholder}
                  </label>
                  <div className="relative">
                    <input
                      id="footer-newsletter-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder={siteFooter.newsletter.placeholder}
                      className={`min-h-11 w-full ${inputRadiusClass} border border-border bg-background py-2 pl-3 pr-12 ${type.bodyLarge} text-foreground placeholder:text-muted`}
                    />
                    <button
                      type="submit"
                      className={`absolute right-2 top-1/2 inline-flex min-h-9 min-w-9 -translate-y-1/2 items-center justify-center ${buttonRadiusClass} text-foreground transition-colors hover:text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary`}
                      aria-label={siteFooter.newsletter.submitLabel}
                    >
                      <SendIcon className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-8">
                <FooterSectionTitle>{siteFooter.socialTitle}</FooterSectionTitle>
                <div className="mt-4 flex items-center gap-0">
                  <a
                    href={siteConfig.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-9 min-w-9 items-center justify-center ${buttonChromeClass} text-foreground transition-colors hover:text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary`}
                    aria-label={siteConfig.youtubeLabel}
                  >
                    <YouTubeIcon className="h-6 w-6" />
                  </a>
                  <a
                    href={siteConfig.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-9 min-w-9 items-center justify-center ${buttonChromeClass} text-foreground transition-colors hover:text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary`}
                    aria-label={siteConfig.linkedInLabel}
                  >
                    <LinkedInIcon className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-10 lg:col-span-7 lg:gap-8">
              <div className="grid gap-10 sm:grid-cols-2 lg:gap-8">
                <div>
                  <FooterSectionTitle>
                    {siteFooter.navigation.title}
                  </FooterSectionTitle>
                  <FooterLinkList links={siteFooter.navigation.links} />
                </div>
                <div>
                  <FooterSectionTitle>{siteFooter.company.title}</FooterSectionTitle>
                  <FooterLinkList links={siteFooter.company.links} />
                </div>
              </div>

              <div>
                <FooterSectionTitle>
                  {siteFooter.checkMoreTitle}
                </FooterSectionTitle>
                <div className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                  {projectColumns.map((column) => (
                    <ul
                      key={column.map(({ label }) => label).join("-")}
                      className="space-y-2"
                    >
                      {column.map(({ project, label }) => (
                        <li key={label}>
                          <FooterProjectLink
                            href={getFooterProjectHref(project)}
                            label={label}
                          />
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col span={12} className="mt-10 border-t border-border pt-8 lg:mt-12">
          <p className={`text-center ${type.bodySmall} text-muted text-pretty`}>
            {siteFooter.tagline}
          </p>
        </Col>
      </Container>
    </footer>
  );
}
