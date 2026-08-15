import type { Metadata } from "next";
import { PublicShell } from "../components/PublicShell";

export const metadata: Metadata = { title: "Company" };

export default function AboutPage() {
  return (
    <PublicShell>
      <main className="inner-page about-page">
        <section className="page-hero section-pad">
          <p className="eyebrow">CHIBEN AUTO VENTURES LTD</p>
          <h1>Built to make the road ahead feel clearer.</h1>
          <p>Chiben Autos is a Lagos-based automobile company focused on trusted vehicle access, responsive service and long-term automotive growth.</p>
        </section>
        <section className="company-facts section-pad">
          <div><span>Registered name</span><strong>Chiben Auto Ventures Ltd</strong></div>
          <div><span>Registration number</span><strong>RC 9235786</strong></div>
          <div><span>Incorporated</span><strong>20 January 2026</strong></div>
          <div><span>Company type</span><strong>Private company limited by shares</strong></div>
          <div><span>Status</span><strong>Active</strong></div>
          <div><span>Registered office</span><strong>Alagbado, Lagos State, Nigeria</strong></div>
        </section>
        <section className="company-position section-pad">
          <p className="eyebrow">OUR POSITION</p>
          <div><h2>Confidence is part of the product.</h2><p>A premium website is useful only when the service behind it is clear. Chiben Autos is being built around accurate listings, accountable communication and buying support that respects the customer’s decision.</p></div>
        </section>
      </main>
    </PublicShell>
  );
}
