"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { defaultSettings, type SiteSettings } from "../../lib/vehicles";

const SiteSettingsContext = createContext<SiteSettings>(defaultSettings);

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  useEffect(() => {
    fetch("/api/settings")
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((payload: { settings?: SiteSettings }) => payload.settings && setSettings(payload.settings))
      .catch(() => undefined);
  }, []);

  return <SiteSettingsContext.Provider value={settings}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}

export function WhatsAppLink({ children, className, message }: { children: React.ReactNode; className?: string; message?: string }) {
  const settings = useSiteSettings();
  const suffix = message ? `?text=${encodeURIComponent(message)}` : "";
  return <a className={className} href={`https://wa.me/${settings.whatsapp}${suffix}`} target="_blank" rel="noreferrer">{children}</a>;
}
