"use client";

import { useState } from "react";
import { siteConfig } from "@/content/site-content";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(String(data.get("subject") ?? "Inquiry"));
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`,
    );
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-pretty">
          Name *
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-pretty">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
        />
      </div>
      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-medium text-pretty">
          Subject *
        </label>
        <input
          id="subject"
          name="subject"
          required
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-pretty">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
        />
      </div>
      <button
        type="submit"
        className="min-h-11 rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-medium text-pretty text-balance text-white hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
      >
        Send Message
      </button>
      {status === "sent" && (
        <p className="text-sm text-muted text-pretty" role="status">
          Your mail client should open to complete sending.
        </p>
      )}
    </form>
  );
}
