import Link from "next/link";
import { LogoMark } from "@/components/brand/logo-mark";
import { siteConfig } from "@/content/site-content";
import { type } from "@/lib/typography";

export function BrandLogo({
  className = "h-9 w-9 text-brand-primary",
  showTitle = true,
}: {
  className?: string;
  showTitle?: boolean;
}) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
    >
      <LogoMark className={className} />
      <span className="sr-only">{siteConfig.name}</span>
      {showTitle ? (
        <span className={`hidden ${type.titleMedium} text-balance text-foreground sm:inline`}>
          {siteConfig.name}
        </span>
      ) : null}
    </Link>
  );
}
