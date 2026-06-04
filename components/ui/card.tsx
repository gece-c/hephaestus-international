import { type ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
