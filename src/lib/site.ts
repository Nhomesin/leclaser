/**
 * Single source of truth for brand, contact (NAP), navigation,
 * services and portfolio taxonomy. Imported across the whole site.
 */

export const SITE = {
  name: "LEC",
  legalName: "LEC d.o.o.",
  fullName: "LEC — Precizna proizvodnja",
  domain: "leclaser.com",
  baseUrl: "https://leclaser.com",
  founded: 2003,
  tagline: "Od ideje, preko dizajna i razvoja — do gotovog proizvoda.",
  shortDesc:
    "Lasersko rezanje i graviranje, CNC obrada, dijamantsko poliranje i termo savijanje pleksiglasa, svjetleće reklame, POS displeji i pleksiglas proizvodi — iz Laktaša u cijelu regiju.",
  // NAP — keep identical everywhere for local SEO consistency
  address: {
    street: "Šoše Mažara 40",
    city: "Laktaši",
    postal: "78250",
    country: "Bosna i Hercegovina",
    countryCode: "BA",
    full: "Šoše Mažara 40, 78250 Laktaši, Bosna i Hercegovina",
    // Approximate coordinates for Laktaši (used for LocalBusiness schema + map)
    lat: 44.9081,
    lng: 17.3006,
  },
  email: "info@leclaser.com",
  // Single contact number used for header/click-to-call/WhatsApp/Viber
  phonePrimary: { name: "Kontakt", display: "+387 65 644 939", tel: "+38765644939", digits: "38765644939" },
  instagram: "https://www.instagram.com/leclaser",
  instagramHandle: "@leclaser",
  serviceRegion: ["Bosna i Hercegovina", "Srbija", "Hrvatska", "Crna Gora"],
  workingHours: [
    { days: "Ponedjeljak – Petak", hours: "08:00 – 16:00" },
    { days: "Subota", hours: "Po dogovoru" },
    { days: "Nedjelja", hours: "Zatvoreno" },
  ],
} as const;

export const WHATSAPP_URL = `https://wa.me/${SITE.phonePrimary.digits}?text=${encodeURIComponent(
  "Pozdrav LEC tim, zanima me ponuda za..."
)}`;
export const VIBER_URL = `viber://chat?number=%2B${SITE.phonePrimary.digits}`;

export type ServiceMeta = {
  slug: string;
  name: string;
  short: string;
  icon: string; // lucide icon name, resolved in <ServiceIcon/>
};

export const SERVICES: ServiceMeta[] = [
  { slug: "lasersko-rezanje", name: "Lasersko rezanje", short: "Precizni rezovi u pleksiglasu, drvetu, ACM-u i još.", icon: "Slice" },
  { slug: "lasersko-graviranje", name: "Lasersko graviranje", short: "Oštre gravure, natpisi i personalizacija.", icon: "PenTool" },
  { slug: "cnc-rezanje-glodanje", name: "CNC rezanje i glodanje", short: "Obrada pločastih materijala velikog formata.", icon: "Cog" },
  { slug: "dijamantsko-poliranje", name: "Dijamantsko poliranje", short: "Kristalno čiste ivice pleksiglasa.", icon: "Gem" },
  { slug: "termo-savijanje-lijepljenje", name: "Termo savijanje i lijepljenje", short: "Savijanje i spajanje akrila u 3D oblike.", icon: "Flame" },
  { slug: "dizajn-proizvoda", name: "Dizajn proizvoda", short: "Od ideje i 3D vizualizacije do proizvodnje.", icon: "Ruler" },
];

export type PortfolioMeta = {
  slug: string;
  name: string;
  short: string;
  icon: string;
};

export const PORTFOLIO: PortfolioMeta[] = [
  { slug: "svjetlece-reklame-logotipi", name: "Svjetleće reklame i logotipi", short: "3D slova, LED reklame, fasadni logotipi.", icon: "Lightbulb" },
  { slug: "reklamne-table-totemi", name: "Reklamne table i totemi", short: "Oznake firmi, totemi i natpisi.", icon: "Signpost" },
  { slug: "hotelske-oznake-wayfinding", name: "Hotelske oznake i wayfinding", short: "Sistemi vođenja za hotele i ugostiteljstvo.", icon: "Hotel" },
  { slug: "pos-displeji", name: "POS displeji i stalci", short: "Displeji i nosači za prodajna mjesta.", icon: "LayoutGrid" },
  { slug: "pleksiglas-proizvodi", name: "Pleksiglas proizvodi", short: "Nagrade, govornice, držači menija, pokloni.", icon: "Award" },
  { slug: "enterijer-eksterijer", name: "Enterijer i eksterijer", short: "Opremanje prostora, fasade, sandučići.", icon: "Building2" },
];

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; desc?: string }[];
};

export const NAV: NavItem[] = [
  { label: "Početna", href: "/" },
  {
    label: "Usluge",
    href: "/usluge",
    children: SERVICES.map((s) => ({ label: s.name, href: `/usluge/${s.slug}`, desc: s.short })),
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    children: PORTFOLIO.map((p) => ({ label: p.name, href: `/portfolio/${p.slug}`, desc: p.short })),
  },
  { label: "Lokacije", href: "/lokacije" },
  { label: "O nama", href: "/o-nama" },
  { label: "Kontakt", href: "/kontakt" },
];

// Real company history (from the LEC about page) — used for the timeline.
export const TIMELINE = [
  { year: "2003", title: "Osnivanje LEC-a", text: "U Laktašima instaliran prvi laser za rezanje i graviranje nemetala u Bosni i Hercegovini." },
  { year: "2012", title: "Dijamantsko poliranje", text: "Uvedena mašina za dijamantsko poliranje pleksiglasa, kapaciteta do 2100×60 mm." },
  { year: "2017", title: "Srednji laser", text: "Instaliran laser radne površine 1300×900 mm, snage 150 W." },
  { year: "2018", title: "Vertikalno rezanje ploča", text: "Dodata mašina za vertikalno rezanje pločastih materijala." },
  { year: "2019", title: "Veliki format", text: "Instaliran laser velikog formata 1400×2500 mm, snage 300 W." },
  { year: "2023", title: "CNC sa izmjenjivim alatima", text: "Uveden CNC obradni centar formata 3075×1650 mm sa izmjenjivim alatima." },
];

export const MATERIALS = [
  "Pleksiglas / akril",
  "Drvo i furnir",
  "MDF",
  "Aluminij",
  "ACM (Alucobond)",
  "Čelik",
  "Inox",
  "Kompakt ploče",
  "Papir i karton",
  "Koža i platno",
];
