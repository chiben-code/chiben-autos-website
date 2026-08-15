import type { Metadata } from "next";
import { LanguageProvider } from "./components/LanguageContext";
import "./globals.css";
import "./chiben-core.css";
import "./chiben-pages.css";
import "./chiben-admin.css";
import "./chiben-responsive.css";

export const metadata: Metadata = {
  title: {
    default: "Chiben Autos | Premium Vehicles in Lagos",
    template: "%s | Chiben Autos",
  },
  description: "Explore brand-new and carefully refurbished vehicles, vehicle sourcing, brokerage and fleet services from Chiben Auto Ventures Ltd.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/images/brand/chiben-emblem.webp",
    shortcut: "/images/brand/chiben-emblem.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-motion="balanced" suppressHydrationWarning>
      <body className="antialiased"><LanguageProvider>{children}</LanguageProvider></body>
    </html>
  );
}
