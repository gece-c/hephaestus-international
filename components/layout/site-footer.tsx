import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { Container, Col } from "@/components/layout/container";
import { footerProjectLinks, siteConfig } from "@/content/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card py-12 md:py-16">
      <Container>
        <Col
          span={12}
          className="mb-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between"
        >
          <div>
            <BrandLogo className="h-10 w-10" />
            <p className="mt-4 max-w-sm text-sm text-muted text-pretty">
              {siteConfig.name}
              <br />
              {siteConfig.tagline}
            </p>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
              Our Projects
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {footerProjectLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-primary text-pretty hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col
          span={12}
          className="flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-pretty">FOLLOW US</p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-pretty hover:text-foreground"
            >
              {siteConfig.contactEmail}
            </a>
            <a
              href={siteConfig.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pretty hover:text-foreground"
            >
              {siteConfig.linkedInLabel}
            </a>
            <Link href="/privacy" className="text-pretty hover:text-foreground">
              Privacy Policy
            </Link>
          </div>
        </Col>
      </Container>
    </footer>
  );
}
