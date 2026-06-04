import { type ElementType, type ReactNode } from "react";

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
      ? "text-lg leading-relaxed text-muted md:text-xl"
      : "text-base leading-relaxed text-muted md:text-lg";

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
  className = "",
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const Tag = as as ElementType;
  const sizeClass =
    as === "h1"
      ? "text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl"
      : as === "h3"
        ? "text-lg font-semibold leading-snug text-balance md:text-xl"
        : "text-3xl font-bold text-balance md:text-4xl";

  return <Tag className={`${sizeClass} ${className}`}>{children}</Tag>;
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
      className={`text-sm font-semibold uppercase tracking-widest text-brand-primary text-pretty ${className}`}
    >
      {children}
    </p>
  );
}
