import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "../components/Brand";
import { AdminDashboard } from "./AdminDashboard";

export const metadata: Metadata = { title: "Owner Control" };
export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <main className="admin-page">
      <header className="admin-header">
        <Brand compact />
        <div><span>OWNER CONTROL</span><Link href="/">View website ↗</Link></div>
      </header>
      <section className="admin-intro">
        <p className="eyebrow">CHIBEN OPERATIONS</p>
        <h1>Control the showroom<br />without touching the code.</h1>
        <p>Inventory, contacts and customer-facing behaviour live here. Production access is designed to sit behind Cloudflare Access and an owner email allowlist.</p>
      </section>
      <AdminDashboard />
      <footer className="admin-footer">Chiben Autos owner system · Architecture by BYD Studios Digital / Igwe Benedict</footer>
    </main>
  );
}
