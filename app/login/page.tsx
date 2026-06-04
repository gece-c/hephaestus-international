import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { ProseParagraph } from "@/components/ui/typography";
import { loginPage } from "@/content/site-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: `${loginPage.title} | Hephaestus International`,
  description: loginPage.body,
  path: "/login",
});

export default function LoginPage() {
  return (
    <PageShell title={loginPage.heading}>
      <ProseParagraph>{loginPage.body}</ProseParagraph>
    </PageShell>
  );
}
