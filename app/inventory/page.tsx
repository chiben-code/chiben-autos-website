import type { Metadata } from "next";
import { PublicShell } from "../components/PublicShell";
import { InventoryBrowser } from "./InventoryBrowser";

export const metadata: Metadata = {
  title: "Vehicle Inventory",
  description: "Browse brand-new and refurbished vehicles from Chiben Autos in Lagos.",
};

export default function InventoryPage() {
  return (
    <PublicShell>
      <main className="inner-page">
        <section className="page-hero section-pad">
          <p className="eyebrow">CHIBEN SHOWROOM</p>
          <h1>Inventory for where<br />you are going next.</h1>
          <p>Explore available categories or send us the exact specification you want us to source.</p>
        </section>
        <section className="inventory-browser section-pad">
          <InventoryBrowser />
        </section>
      </main>
    </PublicShell>
  );
}
