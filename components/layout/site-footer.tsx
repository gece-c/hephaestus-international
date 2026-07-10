import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { Container, Col } from "@/components/layout/container";
import { FooterCollapsibleSection } from "@/components/layout/footer-collapsible-section";
import { siteConfig, siteFooter, socialMediaLinks } from "@/content/site-content";
import { balanceText } from "@/lib/prevent-orphans";
import { getFooterProjectLinkList } from "@/lib/projects";
import { type } from "@/lib/typography";
import { footerLinkClass } from "@/lib/ui-styles";

function FooterSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p
      className={`${type.labelMedium} font-semibold uppercase tracking-[0.2em] text-balance text-foreground`}
    >
      {balanceText(children)}
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
  const linkClassName = `${type.bodySmall} text-foreground text-balance ${footerLinkClass}`;

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

const socialIconClass = "size-6 shrink-0";

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
      className={`inline-flex size-10 items-center justify-center text-foreground sm:size-11 ${footerLinkClass}`}
      aria-label={label}
    >
      {children}
    </a>
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

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function RedditIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 000 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 00.029-.463.33.33 0 00-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 00-.232-.095z" />
    </svg>
  );
}

const socialIcons = {
  youtube: YouTubeIcon,
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  reddit: RedditIcon,
} as const;

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
                  <p className={`${type.titleSmall} font-semibold text-balance text-foreground`}>
                    {siteConfig.name}{" "}
                    <span className="font-normal text-muted">| {siteFooter.projectLine}</span>
                  </p>
                </div>
              </div>
              <p className={`mt-4 max-w-md ${type.bodySmall} leading-relaxed text-muted text-pretty`}>
                {siteFooter.description}
              </p>

              <div className="mt-8">
                <FooterSectionTitle>{siteFooter.newsletter.title}</FooterSectionTitle>
                <p className={`mt-3 ${type.bodySmall} text-muted text-pretty`}>
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
                      className={`min-h-11 min-w-0 flex-1 border-0 bg-neutral-200 py-2 pl-3 ${type.bodySmall} text-neutral-950 placeholder:text-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary`}
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
                <div className="mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {socialMediaLinks.map(({ id, href, label }) => {
                    const Icon = socialIcons[id];
                    return (
                      <SocialIconLink key={id} href={href} label={label}>
                        <Icon className={socialIconClass} />
                      </SocialIconLink>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <FooterCollapsibleSection title={siteFooter.navigation.title}>
                <FooterLinkList links={siteFooter.navigation.links} />
              </FooterCollapsibleSection>
            </div>

            <div className="lg:col-span-3">
              <FooterCollapsibleSection title={siteFooter.projects.title}>
                <FooterLinkList links={projectLinks} />
              </FooterCollapsibleSection>
            </div>

            <div className="lg:col-span-2">
              <FooterCollapsibleSection title={siteFooter.company.title}>
                <FooterLinkList links={siteFooter.company.links} />
              </FooterCollapsibleSection>
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
