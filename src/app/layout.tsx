import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { JsonLd, organizationSchema, localBusinessSchema } from "@/lib/jsonld";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { MobileContactBar } from "@/components/MobileContactBar";
import { RouteProgress } from "@/components/RouteProgress";

// latin-ext is required for BCS diacritics (č, ć, š, ž, đ)
const sans = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-sans", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-display", display: "swap", weight: ["400", "500", "600", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-mono", display: "swap", weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.baseUrl),
  title: {
    default: "LEC — Lasersko rezanje, graviranje i reklame | Laktaši, regija",
    template: "%s | LEC",
  },
  description: SITE.shortDesc,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  keywords: [
    "lasersko rezanje",
    "lasersko graviranje",
    "CNC obrada",
    "pleksiglas",
    "svjetleće reklame",
    "reklamne table",
    "POS display",
    "hotelske oznake",
    "Laktaši",
    "Banja Luka",
    "Bosna i Hercegovina",
  ],
  // favicon + OG handled by app/icon.png, app/apple-icon.png and app/opengraph-image.tsx conventions
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bs" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-bg font-sans text-ink antialiased pb-[calc(7rem+env(safe-area-inset-bottom))] lg:pb-0">
        <JsonLd data={[organizationSchema(), localBusinessSchema()]} />
        <RouteProgress />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-laser focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Preskoči na sadržaj
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingActions />
        <MobileContactBar />
      </body>
    </html>
  );
}
