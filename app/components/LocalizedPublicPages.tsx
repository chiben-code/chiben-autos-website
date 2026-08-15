"use client";

import { InventoryBrowser } from "../inventory/InventoryBrowser";
import { useLanguage } from "./LanguageContext";
import { WhatsAppLink } from "./SiteSettingsContext";

export function InventoryPageContent() {
  const { copy } = useLanguage();
  return (
    <main className="inner-page">
      <section className="page-hero section-pad">
        <p className="eyebrow">{copy.inventory.eyebrow}</p>
        <h1>{copy.inventory.titleLine1}<br />{copy.inventory.titleLine2}</h1>
        <p>{copy.inventory.intro}</p>
      </section>
      <section className="inventory-browser section-pad"><InventoryBrowser /></section>
    </main>
  );
}

export function AuctionsPageContent() {
  const { copy } = useLanguage();
  return (
    <main className="inner-page auction-page">
      <section className="auction-hero section-pad">
        <div>
          <p className="eyebrow">{copy.auctions.eyebrow}</p>
          <h1>{copy.auctions.title}</h1>
          <p>{copy.auctions.intro}</p>
          <WhatsAppLink className="button button-gold" message={copy.whatsapp.auctionNotice}>{copy.auctions.join} ↗</WhatsAppLink>
        </div>
        <div className="auction-countdown-placeholder">
          <span>{copy.auctions.firstAuction}</span>
          <strong>{copy.auctions.comingSoon}</strong>
          <div><i /><i /><i /><i /><i /></div>
        </div>
      </section>
      <section className="auction-principles section-pad">
        {copy.auctions.principles.map((principle, index) => (
          <article key={principle.title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{principle.title}</h2><p>{principle.description}</p></article>
        ))}
      </section>
    </main>
  );
}

export function ServicesPageContent() {
  const { copy } = useLanguage();
  return (
    <main className="inner-page">
      <section className="page-hero section-pad">
        <p className="eyebrow">{copy.servicesPage.eyebrow}</p>
        <h1>{copy.servicesPage.title}</h1>
        <p>{copy.servicesPage.intro}</p>
      </section>
      <section className="services-grid section-pad">
        {copy.servicesPage.services.map((service, index) => (
          <article key={service.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </article>
        ))}
      </section>
      <section className="business-enquiry section-pad">
        <p className="eyebrow">{copy.servicesPage.enquiryEyebrow}</p>
        <h2>{copy.servicesPage.enquiryTitle}</h2>
        <WhatsAppLink className="button button-gold" message={copy.whatsapp.specialRequest}>{copy.servicesPage.enquiryButton} ↗</WhatsAppLink>
      </section>
    </main>
  );
}

export function AboutPageContent() {
  const { copy } = useLanguage();
  return (
    <main className="inner-page about-page">
      <section className="page-hero section-pad">
        <p className="eyebrow">{copy.about.eyebrow}</p>
        <h1>{copy.about.title}</h1>
        <p>{copy.about.intro}</p>
      </section>
      <section className="company-facts section-pad">
        <div><span>{copy.about.registeredName}</span><strong>Chiben Auto Ventures Ltd</strong></div>
        <div><span>{copy.about.registrationNumber}</span><strong>RC 9235786</strong></div>
        <div><span>{copy.about.incorporated}</span><strong>20 January 2026</strong></div>
        <div><span>{copy.about.companyType}</span><strong>{copy.about.companyTypeValue}</strong></div>
        <div><span>{copy.about.status}</span><strong>{copy.about.active}</strong></div>
        <div><span>{copy.about.registeredOffice}</span><strong>Alagbado, Lagos State, Nigeria</strong></div>
      </section>
      <section className="company-position section-pad">
        <p className="eyebrow">{copy.about.position}</p>
        <div><h2>{copy.about.positionTitle}</h2><p>{copy.about.positionBody}</p></div>
      </section>
    </main>
  );
}
