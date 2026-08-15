"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Brand } from "./Brand";
import { useSiteSettings } from "./SiteSettingsContext";

const motionModes = ["full", "balanced", "minimal"] as const;
type MotionMode = (typeof motionModes)[number];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const settings = useSiteSettings();
  const [motion, setMotion] = useState<MotionMode>(() => {
    if (typeof window === "undefined") return "balanced";
    const stored = window.localStorage.getItem("chiben-motion") as MotionMode | null;
    return stored && motionModes.includes(stored) ? stored : "balanced";
  });

  useEffect(() => {
    document.documentElement.dataset.motion = motion;
  }, [motion]);

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
        <em>{open ? "Close" : "Menu"}</em>
      </button>
      <nav id="primary-navigation" className={open ? "nav-open" : ""} aria-label="Primary navigation">
        <Link href="/inventory" onClick={() => setOpen(false)}>Inventory</Link>
        <Link href="/auctions" onClick={() => setOpen(false)}>Auctions</Link>
        <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
        <Link href="/about" onClick={() => setOpen(false)}>Company</Link>
        <Link className="nav-reserve" href={`https://wa.me/${settings.whatsapp}`} target="_blank">WhatsApp us</Link>
      </nav>
      <button className="motion-control" type="button" onClick={cycleMotion} aria-label={`Animation mode: ${motion}. Activate to change`}>
        <span className={`motion-dot motion-${motion}`} />
        Motion: {motion}
      </button>
    </header>
  );
}
