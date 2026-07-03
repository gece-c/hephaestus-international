"use client";

import { useState, type ReactNode } from "react";
import { type } from "@/lib/typography";

function ChevronDownIcon({
  className,
  open,
}: {
  className?: string;
  open: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className ?? ""} transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <p
      className={`${type.labelMedium} font-semibold uppercase tracking-[0.2em] text-balance text-foreground`}
    >
      {children}
    </p>
  );
}

export function FooterCollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        type="button"
        className="flex w-full min-h-11 items-center justify-between gap-4 text-left lg:hidden"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <SectionTitle>{title}</SectionTitle>
        <ChevronDownIcon className="h-5 w-5 shrink-0 text-muted" open={open} />
      </button>

      <div className="hidden lg:block">
        <SectionTitle>{title}</SectionTitle>
      </div>

      <div className={open ? "block" : "hidden lg:block"}>{children}</div>
    </div>
  );
}
