import { type ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--max-width-content)] px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="grid grid-cols-4 gap-4 md:grid-cols-8 md:gap-6 lg:grid-cols-12 lg:gap-8 [&>*]:min-w-0">
        {children}
      </div>
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
  variant = "default",
  padding = "default",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "muted" | "accent";
  /** Use "none" for full-bleed sections (hero, image backdrops). */
  padding?: "default" | "none";
}) {
  const bg =
    variant === "muted"
      ? "bg-card"
      : variant === "accent"
        ? "bg-brand-primary/5 dark:bg-brand-primary/10"
        : "";

  const paddingClass =
    padding === "none" ? "" : "py-16 md:py-24 lg:py-28";

  return (
    <section id={id} className={`${paddingClass} ${bg} ${className}`}>
      {children}
    </section>
  );
}

export function Col({
  span = 12,
  children,
  className = "",
}: {
  span?: 4 | 6 | 8 | 10 | 12;
  children: ReactNode;
  className?: string;
}) {
  const spanClass =
    span === 4
      ? "col-span-4 md:col-span-4 lg:col-span-4"
      : span === 6
        ? "col-span-4 md:col-span-4 lg:col-span-6"
        : span === 8
          ? "col-span-4 md:col-span-6 lg:col-span-8"
          : span === 10
            ? "col-span-4 md:col-span-8 lg:col-span-10"
            : "col-span-4 md:col-span-8 lg:col-span-12";

  return <div className={`${spanClass} min-w-0 ${className}`}>{children}</div>;
}
