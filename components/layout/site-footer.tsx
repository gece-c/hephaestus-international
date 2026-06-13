import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { Container, Col } from "@/components/layout/container";
import { siteConfig, siteFooter } from "@/content/site-content";
import { getFooterProjectLinkList } from "@/lib/projects";
import { type } from "@/lib/typography";

function FooterSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p
      className={`${type.labelLarge} font-bold uppercase tracking-[0.2em] text-foreground`}
    >
      {children}
    </p>
  );
}

function FooterLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const linkClassName = `${type.bodyMedium} text-foreground transition-colors hover:text-brand-primary`;

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

function FooterLinkList({
  links,
}: {
  links: readonly { label: string; href: string }[];
}) {
  return (
    <ul className="mt-4 space-y-2">
      {links.map((link) => (
        <li key={link.label}>
          <FooterLink href={link.href} label={link.label} />
        </li>
      ))}
    </ul>
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
      viewBox="0 3.5 24 17"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.75 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}

const socialIconHeightClass = "h-7";

function SocialIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center text-foreground transition-colors hover:text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
      aria-label={label}
    >
      {children}
    </a>
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
  const projectLinks = getFooterProjectLinkList();

  return (
    <footer className="border-t border-border bg-card py-12 md:py-16">
      <Container>
        <Col span={12}>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            <div className="sm:col-span-2 lg:col-span-5">
              <div className="flex items-start gap-3">
                <BrandLogo
                  className="h-10 w-10 shrink-0 text-brand-primary"
                  showTitle={false}
                />
                <div>
                  <p className={`${type.titleLarge} text-balance text-foreground`}>
                    {siteConfig.name}
                  </p>
                  <p className={`mt-1 ${type.bodyMedium} text-muted`}>
                    | {siteFooter.projectLine}
                  </p>
                </div>
              </div>
              <p className={`mt-4 max-w-md ${type.bodyMedium} text-muted text-pretty`}>
                {siteFooter.description}
              </p>

              <div className="mt-8">
                <FooterSectionTitle>{siteFooter.newsletter.title}</FooterSectionTitle>
                <p className={`mt-3 ${type.bodyMedium} text-muted text-pretty`}>
                  {siteFooter.newsletter.prompt}
                </p>
                <form action="/contact" method="get" className="mt-3 max-w-md">
                  <input type="hidden" name="subject" value="Newsletter signup" />
                  <label className="sr-only" htmlFor="footer-newsletter-email">
                    {siteFooter.newsletter.placeholder}
                  </label>
                  <div className="flex">
                    <input
                      id="footer-newsletter-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder={siteFooter.newsletter.placeholder}
                      className={`min-h-11 min-w-0 flex-1 border-0 bg-neutral-200 py-2 pl-3 ${type.bodyLarge} text-neutral-950 placeholder:text-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary`}
                    />
                    <button
                      type="submit"
                      className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center bg-black text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                      aria-label={siteFooter.newsletter.submitLabel}
                    >
                      <SendIcon className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-8">
                <FooterSectionTitle>{siteFooter.socialTitle}</FooterSectionTitle>
                <div className="mt-4 flex items-center gap-4">
                  <SocialIconLink
                    href={siteConfig.youtubeUrl}
                    label={siteConfig.youtubeLabel}
                  >
                    <YouTubeIcon className={`block ${socialIconHeightClass} w-auto`} />
                  </SocialIconLink>
                  <SocialIconLink
                    href={siteConfig.linkedInUrl}
                    label={siteConfig.linkedInLabel}
                  >
                    <LinkedInIcon className={`block ${socialIconHeightClass} w-7`} />
                  </SocialIconLink>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <FooterSectionTitle>{siteFooter.navigation.title}</FooterSectionTitle>
              <FooterLinkList links={siteFooter.navigation.links} />
            </div>

            <div className="lg:col-span-3">
              <FooterSectionTitle>{siteFooter.projects.title}</FooterSectionTitle>
              <FooterLinkList links={projectLinks} />
            </div>

            <div className="lg:col-span-2">
              <FooterSectionTitle>{siteFooter.company.title}</FooterSectionTitle>
              <FooterLinkList links={siteFooter.company.links} />
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
