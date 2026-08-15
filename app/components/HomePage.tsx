"use client";

import Link from "next/link";
import { HomeInventory } from "./HomeInventory";
import { PublicShell } from "./PublicShell";
import { VehicleStory } from "./VehicleStory";
import { HomeContact } from "./HomeContact";
import { useLanguage } from "./LanguageContext";

export function HomePage() {
  const { copy } = useLanguage();
  return (
    <PublicShell>
      <main>
        <VehicleStory />

        <section className="manifesto section-pad">
          <p className="eyebrow">{copy.home.standard}</p>
          <div className="manifesto-grid">
            <h2>{copy.home.manifestoTitle}</h2>
            <div>
              <p>{copy.home.manifestoBody}</p>
              <div className="trust-row">
                <span><strong>2026</strong> {copy.home.incorporated}</span>
                <span><strong>Lagos</strong> {copy.home.based}</span>
                <span><strong>RC 9235786</strong> {copy.home.activeCompany}</span>
              </div>
            </div>
          </div>
        </section>

        <HomeInventory />

        <section className="auction-callout section-pad">
          <div className="auction-panel">
            <div className="auction-orbit" aria-hidden="true"><span>CA</span></div>
            <div className="auction-copy">
              <p className="eyebrow">{copy.home.auctionEyebrow}</p>
              <h2>{copy.home.auctionTitle}</h2>
              <p>{copy.home.auctionBody}</p>
              <Link className="button button-outline" href="/auctions">{copy.home.auctionLink}</Link>
            </div>
            <div className="coming-card">
              <span>{copy.home.status}</span>
              <strong>{copy.home.comingSoon}</strong>
              <small>{copy.home.earlyAccess}</small>
            </div>
          </div>
        </section>

        <section className="services-preview section-pad">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">{copy.home.servicesEyebrow}</p>
              <h2>{copy.home.servicesTitle}</h2>
            </div>
            <p>{copy.home.servicesBody}</p>
          </div>
          <div className="service-list">
            {copy.home.services.map((service, index) => (
              <article key={service.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link href="/services" aria-label={`${copy.home.learnAbout} ${service.title}`}>↗</Link>
              </article>
            ))}
          </div>
        </section>

        <HomeContact />
      </main>
    </PublicShell>
  );
}
