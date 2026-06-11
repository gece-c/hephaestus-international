import { type ElementType, type ReactNode } from "react";
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
      ? `${type.titleLarge} text-muted`
      : `${type.bodyLarge} text-muted`;

  return (
    <div className={`w-full space-y-4 text-pretty ${sizeClass} ${className}`}>
      {children}
    </div>
  );
}

export function ProseParagraph({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`text-pretty ${className}`}>{children}</p>;
}

export function SectionHeading({
  children,
  as = "h2",
  scale = "default",
  className = "",
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  /** Use `hero` for the home page hero title (displayLarge). */
  scale?: "default" | "hero";
  className?: string;
}) {
  const Tag = as as ElementType;
  const sizeClass: TypeScale =
    as === "h1"
      ? scale === "hero"
        ? "displayLarge"
        : "displaySmall"
      : as === "h3"
        ? "titleLarge"
        : "headlineLarge";

  return (
    <Tag className={`${type[sizeClass]} text-balance ${className}`}>
      {children}
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
      className={`${type.labelSmall} uppercase tracking-widest text-brand-primary text-pretty ${className}`}
    >
      {children}
    </p>
  );
}
