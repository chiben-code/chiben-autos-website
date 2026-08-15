import type { Metadata } from "next";
import { ServicesPageContent } from "../components/LocalizedPublicPages";
import { PublicShell } from "../components/PublicShell";

export const metadata: Metadata = { title: "Automotive Services" };

export default function ServicesPage() {
  return (
    <PublicShell>
      <ServicesPageContent />
    </PublicShell>
  );
}
