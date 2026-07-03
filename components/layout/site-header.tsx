import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Container, Col } from "@/components/layout/container";
import { navPrimaryLinks, navUtilityLinks } from "@/content/site-content";
import { type } from "@/lib/typography";

function headerNavLinkClass(href: string) {
  const sizeClass = `${type.bodySmall} font-medium`;
  return href === "/contact"
    ? `${sizeClass} text-pretty text-brand-primary hover:opacity-90`
    : `${sizeClass} text-pretty text-muted hover:text-foreground`;
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 min-h-[var(--site-header-height)] shrink-0 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Container className="relative py-4">
        <Col span={12} className="flex min-w-0 items-center justify-between gap-3 sm:gap-4">
          <BrandLogo />
          <nav
            className="hidden flex-1 items-center gap-6 lg:flex"
            aria-label="Main"
          >
            {navPrimaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={headerNavLinkClass(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-3 sm:gap-4 lg:gap-5">
            <nav
              className="hidden items-center gap-5 lg:flex"
              aria-label="Contact"
            >
              {navUtilityLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={headerNavLinkClass(link.href)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
            <MobileNav />
          </div>
        </Col>
      </Container>
    </header>
  );
}
