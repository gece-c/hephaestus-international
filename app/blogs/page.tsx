import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { ProseParagraph } from "@/components/ui/typography";
import { blogsPage } from "@/content/site-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: `${blogsPage.title} | Hephaestus International`,
  description: blogsPage.intro,
  path: "/blogs",
});

export default function BlogsPage() {
  return (
    <PageShell title={blogsPage.heading}>
      <ProseParagraph>{blogsPage.intro}</ProseParagraph>
      <ProseParagraph className="italic">{blogsPage.empty}</ProseParagraph>
    </PageShell>
  );
}
