import type { Metadata } from "next";
import { InventoryPageContent } from "../components/LocalizedPublicPages";
import { PublicShell } from "../components/PublicShell";

export const metadata: Metadata = {
  title: "Vehicle Inventory",
  description: "Browse brand-new and refurbished vehicles from Chiben Autos in Lagos.",
};

export default function InventoryPage() {
  return (
    <PublicShell>
      <InventoryPageContent />
    </PublicShell>
  );
}
