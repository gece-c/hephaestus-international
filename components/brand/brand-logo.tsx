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
      className="inline-flex min-w-0 items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary sm:gap-3"
    >
      <LogoMark className={`${className} shrink-0`} />
      {showTitle ? (
        <span
          className={`min-w-0 ${type.labelMedium} font-semibold leading-tight tracking-tight text-balance text-foreground`}
        >
          {siteConfig.name}
        </span>
      ) : (
        <span className="sr-only">{siteConfig.name}</span>
      )}
    </Link>
  );
}
