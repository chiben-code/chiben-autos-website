import type { Metadata } from "next";
import { PublicShell } from "../components/PublicShell";
import { WhatsAppLink } from "../components/SiteSettingsContext";

export const metadata: Metadata = { title: "Automotive Services" };

const registeredServices = [
  ["Vehicle sales", "Buying, selling and marketing brand-new, used and refurbished motor vehicles."],
  ["Import & export", "Structured support for sourcing and moving suitable vehicles across markets."],
  ["Brokerage & agency", "Representation and transaction support for buyers, sellers and automotive partners."],
  ["Leasing & hire purchase", "Alternative access and ownership pathways, subject to assessment and agreed terms."],
  ["Fleet management", "Acquisition, planning and automotive support for corporate and institutional fleets."],
  ["Parts & automotive products", "Future trade in vehicle parts, accessories, lubricants and related products."],
];

export default function ServicesPage() {
  return (
    <PublicShell>
      <main className="inner-page">
        <section className="page-hero section-pad">
          <p className="eyebrow">REGISTERED AUTOMOTIVE SCOPE</p>
          <h1>More than a showroom.</h1>
          <p>Chiben Auto Ventures Ltd is structured to grow from trusted vehicle sales into a wider automotive service company.</p>
        </section>
        <section className="services-grid section-pad">
          {registeredServices.map(([title, description], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          ))}
        </section>
        <section className="business-enquiry section-pad">
          <p className="eyebrow">CORPORATE & SPECIAL REQUESTS</p>
          <h2>Planning a fleet, import or hard-to-find acquisition?</h2>
          <WhatsAppLink className="button button-gold" message="Hello Chiben Autos, I would like to discuss a corporate or special vehicle requirement.">Discuss your requirement ↗</WhatsAppLink>
        </section>
      </main>
    </PublicShell>
  );
}
