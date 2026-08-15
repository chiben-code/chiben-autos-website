"use client";

import { WhatsAppLink, useSiteSettings } from "./SiteSettingsContext";
import { useLanguage } from "./LanguageContext";

export function HomeContact() {
  const settings = useSiteSettings();
  const { copy } = useLanguage();
  return (
    <section className="whatsapp-cta section-pad">
      <p className="eyebrow">{copy.home.contactEyebrow}</p>
      <h2>{copy.home.contactTitle}</h2>
      <WhatsAppLink className="button button-gold" message={copy.whatsapp.findVehicle}>{copy.home.contactButton} ↗</WhatsAppLink>
      <p className="contact-note">{settings.phone} · {settings.email}</p>
    </section>
  );
}
