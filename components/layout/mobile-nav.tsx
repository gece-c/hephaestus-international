"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/content/site-content";
import { type } from "@/lib/typography";
import { buttonChromeClass, buttonRadiusClass, glassSurfaceClass } from "@/lib/ui-styles";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`min-h-11 ${buttonChromeClass} border border-border px-4 ${type.bodySmall} font-medium`}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        Menu
      </button>
      {open && (
        <nav
          id="mobile-menu"
          className={`absolute left-0 right-0 top-full z-50 p-4 shadow-lg ${glassSurfaceClass}`}
        >
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    link.href === "/contact"
                      ? `block ${buttonRadiusClass} px-3 py-3 ${type.bodySmall} font-medium text-brand-primary hover:bg-card`
                      : `block ${buttonRadiusClass} px-3 py-3 ${type.bodySmall} font-medium hover:bg-card`
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
