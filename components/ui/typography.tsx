import { type ElementType, type ReactNode } from "react";
import { balanceText } from "@/lib/prevent-orphans";
import { type, type TypeScale } from "@/lib/typography";

export function Prose({
  children,
  size = "md",
  className = "",
}: {
  children: ReactNode;
  size?: "md" | "lg";
  className?: string;
}) {
  const sizeClass =
    size === "lg"
      ? `${type.slideLead} text-muted`
      : `${type.slideBody} text-muted`;

  return (
    <div className={`w-full space-y-4 text-pretty ${sizeClass} ${className}`}>
      {children}
    </div>
  );
}

export function ProseParagraph({
  children,
  className = "",
  balance = false,
}: {
  children: ReactNode;
  className?: string;
  /** Use for lead lines and short display copy that should not end with a single orphan word. */
  balance?: boolean;
}) {
  return (
    <p
      className={`${balance ? "text-balance" : "text-pretty"} ${className}`.trim()}
    >
      {balance ? balanceText(children) : children}
    </p>
  );
}

export function BalancedText({
  as: Tag = "p",
  children,
  className = "",
}: {
  as?: "p" | "span" | "li";
  children: ReactNode;
  className?: string;
}) {
  return (
    <Tag className={`text-balance ${className}`.trim()}>{balanceText(children)}</Tag>
  );
}

export function SectionHeading({
  children,
  as = "h2",
  scale = "default",
  className = "",
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  /**
   * `hero` / `title` — 30pt slide titles.
   * `headline` — 24pt secondary titles (e.g. positioning, pillars).
   * `lead` — 15pt card / subsection titles.
   */
  scale?: "default" | "hero" | "title" | "headline" | "lead";
  className?: string;
}) {
  const Tag = as as ElementType;
  const sizeClass: TypeScale =
    scale === "headline"
      ? "slideHeadline"
      : scale === "lead"
        ? "slideLead"
        : as === "h1" || scale === "hero" || scale === "title"
          ? "slideTitle"
          : as === "h3"
            ? "slideLead"
            : "slideTitle";

  return (
    <Tag className={`${type[sizeClass]} text-balance ${className}`}>
      {balanceText(children)}
    </Tag>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`${type.slideLead} uppercase tracking-widest text-brand-primary text-balance ${className}`}
    >
      {balanceText(children)}
    </p>
  );
}
