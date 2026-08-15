"use client";

import Link from "next/link";
import { Brand } from "./Brand";
import { useSiteSettings } from "./SiteSettingsContext";
import { useLanguage } from "./LanguageContext";

export function SiteFooter() {
  const settings = useSiteSettings();
  const { copy } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <Brand />
          <p>{settings.tagline}</p>
        </div>
        <div className="footer-links">
          <div>
            <strong>{copy.footer.explore}</strong>
            <Link href="/inventory">{copy.nav.inventory}</Link>
            <Link href="/auctions">{copy.nav.auctions}</Link>
            <Link href="/services">{copy.nav.services}</Link>
          </div>
          <div>
            <strong>{copy.footer.contact}</strong>
            <a href={`https://wa.me/${settings.whatsapp}`}>{settings.phone}</a>
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
            <span>{settings.address}</span>
          </div>
          <div>
            <strong>{copy.footer.company}</strong>
            <Link href="/about">{copy.footer.about}</Link>
            <Link href="/admin">{copy.footer.ownerControl}</Link>
            <span>RC 9235786</span>
          </div>
        </div>
      </div>
      <div className="footer-legal">
        <span>© 2026 Chiben Auto Ventures Ltd.</span>
        <span>{copy.footer.experience}</span>
      </div>
    </footer>
  );
}
