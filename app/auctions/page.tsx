import type { Metadata } from "next";
import { AuctionsPageContent } from "../components/LocalizedPublicPages";
import { PublicShell } from "../components/PublicShell";

export const metadata: Metadata = { title: "Auctions — Coming Soon" };

export default function AuctionsPage() {
  return (
    <PublicShell>
      <AuctionsPageContent />
    </PublicShell>
  );
}
