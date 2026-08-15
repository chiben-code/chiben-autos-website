"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Brand } from "./Brand";
import { supportedLanguages, useLanguage, type LanguageCode } from "./LanguageContext";
import { useSiteSettings } from "./SiteSettingsContext";

const motionModes = ["full", "balanced", "minimal"] as const;
type MotionMode = (typeof motionModes)[number];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const settings = useSiteSettings();
  const { language, setLanguage, copy } = useLanguage();
  const [motion, setMotion] = useState<MotionMode>(() => {
    if (typeof window === "undefined") return "balanced";
    const stored = window.localStorage.getItem("chiben-motion") as MotionMode | null;
    return stored && motionModes.includes(stored) ? stored : "balanced";
  });

  useEffect(() => {
    document.documentElement.dataset.motion = motion;
  }, [motion]);

  useEffect(() => {
    const stored = window.localStorage.getItem("chiben-motion") as MotionMode | null;
    if (stored || !motionModes.includes(settings.animationMode)) return;
    const timer = window.setTimeout(() => setMotion(settings.animationMode), 0);
    return () => window.clearTimeout(timer);
  }, [settings.animationMode]);

  function cycleMotion() {
    const next = motionModes[(motionModes.indexOf(motion) + 1) % motionModes.length];
    setMotion(next);
    document.documentElement.dataset.motion = next;
    window.localStorage.setItem("chiben-motion", next);
  }

  return (
    <header className="site-header">
      <Brand compact />
      <button
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
        <em>{open ? copy.nav.close : copy.nav.menu}</em>
      </button>
      <nav id="primary-navigation" className={open ? "nav-open" : ""} aria-label="Primary navigation">
        <Link href="/inventory" onClick={() => setOpen(false)}>{copy.nav.inventory}</Link>
        <Link href="/auctions" onClick={() => setOpen(false)}>{copy.nav.auctions}</Link>
        <Link href="/services" onClick={() => setOpen(false)}>{copy.nav.services}</Link>
        <Link href="/about" onClick={() => setOpen(false)}>{copy.nav.company}</Link>
        <Link className="nav-reserve" href={`https://wa.me/${settings.whatsapp}`} target="_blank">{copy.nav.whatsapp}</Link>
        <label className="nav-language">
          <span>{copy.language}</span>
          <select value={language} onChange={(event) => setLanguage(event.target.value as LanguageCode)}>
            {supportedLanguages.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}
          </select>
        </label>
      </nav>
      <div className="header-tools">
        <label className="language-control">
          <span>{copy.language}</span>
          <select value={language} onChange={(event) => setLanguage(event.target.value as LanguageCode)} aria-label={copy.language}>
            {supportedLanguages.map((item) => <option key={item.code} value={item.code}>{item.short}</option>)}
          </select>
        </label>
        <button className="motion-control" type="button" onClick={cycleMotion} aria-label={`${copy.motion.label}: ${copy.motion[motion]}`}>
          <span className={`motion-dot motion-${motion}`} />
          {copy.motion.label}: {copy.motion[motion]}
        </button>
      </div>
    </header>
  );
}
