import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { SiteSettingsProvider } from "./SiteSettingsContext";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <SiteSettingsProvider>
      <div className="site-shell">
        <SiteHeader />
        {children}
        <SiteFooter />
      </div>
    </SiteSettingsProvider>
  );
}
