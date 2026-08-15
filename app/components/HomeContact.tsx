"use client";

import { WhatsAppLink, useSiteSettings } from "./SiteSettingsContext";

export function HomeContact() {
  const settings = useSiteSettings();
  return (
    <section className="whatsapp-cta section-pad">
      <p className="eyebrow">YOUR NEXT CAR STARTS WITH A CONVERSATION</p>
      <h2>Tell us what<br />you are looking for.</h2>
      <WhatsAppLink className="button button-gold" message="Hello Chiben Autos, I would like help finding a vehicle.">Start on WhatsApp ↗</WhatsAppLink>
      <p className="contact-note">{settings.phone} · {settings.email}</p>
    </section>
  );
}
