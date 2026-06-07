import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { buttonRadiusClass, chippedSurfaceClass } from "@/lib/ui-styles";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary: `${chippedSurfaceClass} bg-brand-primary text-white hover:opacity-90 active:opacity-80 border border-brand-primary`,
  secondary: `${chippedSurfaceClass} bg-card text-foreground border border-border hover:bg-background active:opacity-90`,
  ghost: "text-brand-primary hover:underline active:opacity-80",
};

export function Button({
  children,
  variant = "primary",
  href,
  external = false,
  className = "",
  ...props
}: {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  external?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const base = `inline-flex items-center justify-center ${buttonRadiusClass} px-5 py-2.5 text-sm font-medium text-pretty text-balance transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary min-h-11`;

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
