import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { ProseParagraph } from "@/components/ui/typography";
import { privacyPage } from "@/content/site-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: `${privacyPage.title} | Hephaestus International`,
  description: privacyPage.body,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PageShell title={privacyPage.heading}>
      <ProseParagraph>{privacyPage.body}</ProseParagraph>
    </PageShell>
  );
}
