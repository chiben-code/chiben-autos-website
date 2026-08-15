import type { Metadata } from "next";
import { AboutPageContent } from "../components/LocalizedPublicPages";
import { PublicShell } from "../components/PublicShell";

export const metadata: Metadata = { title: "Company" };

export default function AboutPage() {
  return (
    <PublicShell>
      <AboutPageContent />
    </PublicShell>
  );
}
