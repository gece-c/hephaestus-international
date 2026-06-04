"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/content/site-content";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="min-h-11 rounded-lg border border-border px-4 text-sm font-medium"
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        Menu
      </button>
      {open && (
        <nav
          id="mobile-menu"
          className="absolute left-0 right-0 top-full z-50 border-b border-border bg-background p-4 shadow-lg"
        >
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    link.href === "/contact"
                      ? "block rounded-lg px-3 py-3 text-sm font-medium text-brand-primary hover:bg-card"
                      : "block rounded-lg px-3 py-3 text-sm font-medium hover:bg-card"
                  }
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
