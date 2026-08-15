"use client";

import Link from "next/link";
import { Brand } from "./Brand";
import { useSiteSettings } from "./SiteSettingsContext";

export function SiteFooter() {
  const settings = useSiteSettings();
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <Brand />
          <p>{settings.tagline}</p>
        </div>
        <div className="footer-links">
          <div>
            <strong>Explore</strong>
            <Link href="/inventory">Inventory</Link>
            <Link href="/auctions">Auctions</Link>
            <Link href="/services">Services</Link>
          </div>
          <div>
            <strong>Contact</strong>
            <a href={`https://wa.me/${settings.whatsapp}`}>{settings.phone}</a>
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
            <span>{settings.address}</span>
          </div>
          <div>
            <strong>Company</strong>
            <Link href="/about">About Chiben</Link>
            <Link href="/admin">Owner control</Link>
            <span>RC 9235786</span>
          </div>
        </div>
      </div>
      <div className="footer-legal">
        <span>© 2026 Chiben Auto Ventures Ltd.</span>
        <span>Digital experience by BYD Studios Digital · Igwe Benedict</span>
      </div>
    </footer>
  );
}
