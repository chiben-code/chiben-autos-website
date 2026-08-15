import Link from "next/link";
import { HomeInventory } from "./HomeInventory";
import { PublicShell } from "./PublicShell";
import { VehicleStory } from "./VehicleStory";
import { HomeContact } from "./HomeContact";

const services = [
  ["01", "Vehicle sourcing", "Tell us what you want. We search, assess and help you secure the right vehicle locally or internationally."],
  ["02", "Brokerage & agency", "A clearer transaction path for buyers, sellers and businesses that need representation."],
  ["03", "Fleet management", "Practical acquisition and vehicle planning for growing teams and established organisations."],
  ["04", "Leasing & hire purchase", "Structured ownership pathways subject to assessment, availability and agreed terms."],
];

export function HomePage() {
  return (
    <PublicShell>
      <main>
        <VehicleStory />

        <section className="manifesto section-pad">
          <p className="eyebrow">CHIBEN STANDARD</p>
          <div className="manifesto-grid">
            <h2>A good car should open possibilities, not introduce uncertainty.</h2>
            <div>
              <p>Chiben Autos brings disciplined presentation, responsive guidance and a more transparent buying experience to the Nigerian automobile market.</p>
              <div className="trust-row">
                <span><strong>2026</strong> Incorporated</span>
                <span><strong>Lagos</strong> Based</span>
                <span><strong>RC 9235786</strong> Active company</span>
              </div>
            </div>
          </div>
        </section>

        <HomeInventory />

        <section className="auction-callout section-pad">
          <div className="auction-panel">
            <div className="auction-orbit" aria-hidden="true"><span>CA</span></div>
            <div className="auction-copy">
              <p className="eyebrow">CHIBEN AUCTIONS</p>
              <h2>Remarkable vehicles.<br />A new way to bid.</h2>
              <p>Verified bidding, clear reserve status and carefully presented lots are being prepared.</p>
              <Link className="button button-outline" href="/auctions">See what is coming</Link>
            </div>
            <div className="coming-card">
              <span>STATUS</span>
              <strong>COMING<br />SOON</strong>
              <small>Join the early-access list</small>
            </div>
          </div>
        </section>

        <section className="services-preview section-pad">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">BEYOND THE SHOWROOM</p>
              <h2>Automotive services<br />built around movement.</h2>
            </div>
            <p>Our registered business scope gives Chiben Autos room to serve individual buyers, vehicle owners and corporate fleets as the company grows.</p>
          </div>
          <div className="service-list">
            {services.map(([number, title, description]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <Link href="/services" aria-label={`Learn about ${title}`}>↗</Link>
              </article>
            ))}
          </div>
        </section>

        <HomeContact />
      </main>
    </PublicShell>
  );
}
