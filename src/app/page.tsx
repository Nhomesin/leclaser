import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { ProcessSection, WhySection, LocationsTeaser } from "@/components/home/Sections";
import { ServicesGrid, PortfolioGrid, TrustStrip, MaterialsMarquee } from "@/components/shared";
import { SectionHeading } from "@/components/ui/primitives";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd, faqSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = buildMetadata({
  title: "LEC — Lasersko rezanje, graviranje i reklame | Laktaši, regija",
  description: SITE.shortDesc,
  path: "/",
});

const HOME_FAQ = [
  {
    q: "Šta sve LEC radi?",
    a: "Lasersko rezanje i graviranje, CNC obradu pločastih materijala, dijamantsko poliranje i termo savijanje pleksiglasa, te produkt dizajn. Od toga izrađujemo svjetleće reklame i 3D logotipe, reklamne table i totemе, hotelske oznake i wayfinding, POS displeje, pleksiglas proizvode (nagrade, govornice, držači menija) i još mnogo toga.",
  },
  {
    q: "Da li isporučujete van Bosne i Hercegovine?",
    a: "Da. Proizvodimo u Laktašima i redovno isporučujemo u cijeloj regiji — Bosna i Hercegovina, Srbija, Hrvatska i Crna Gora. Rok i način isporuke dogovaramo prema obimu i lokaciji.",
  },
  {
    q: "Koje materijale obrađujete?",
    a: "Pleksiglas/akril, drvo i MDF, aluminij, ACM (Alucobond), čelik i inox, kompakt ploče, papir, karton, kožu i platno. Ako niste sigurni koji je materijal pravi za vaš projekat, savjetujemo vas.",
  },
  {
    q: "Možete li napraviti proizvod samo na osnovu moje ideje?",
    a: "Možemo. Vodimo projekat od ideje, preko produkt dizajna i tehničkog razvoja, do gotovog proizvoda. Pošaljite nam koncept, logo ili skicu i predlažemo izvedbu, materijale i tehnologiju izrade.",
  },
  {
    q: "Kako da dobijem ponudu?",
    a: "Najbrže putem forme na stranici Kontakt ili pozivom na " + SITE.phonePrimary.display + ". Javljamo se isti radni dan s prijedlogom izrade i okvirnom cijenom — bez obaveza.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE.name,
            url: SITE.baseUrl,
            inLanguage: "bs",
          },
          faqSchema(HOME_FAQ),
        ]}
      />

      <Hero />

      {/* Trust strip pulled up under the hero */}
      <div className="container-lec -mt-2 pb-4">
        <TrustStrip />
      </div>

      {/* Services */}
      <section className="container-lec py-16 lg:py-24">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Usluge"
            title="Tehnologija i zanat na jednom mjestu"
            intro="Šest osnovnih usluga koje pokrivaju cijeli put od materijala do gotovog, montiranog proizvoda."
          />
          <Link href="/usluge" className="hidden items-center gap-1.5 whitespace-nowrap text-sm font-medium text-laser hover:underline sm:flex">
            Sve usluge <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12">
          <ServicesGrid />
        </div>
      </section>

      {/* Materials marquee */}
      <section className="container-lec py-4">
        <Reveal>
          <div className="rounded-2xl border border-line bg-bg2 px-5 py-6 sm:px-8">
            <p className="mb-4 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
              Materijali koje obrađujemo
            </p>
            <MaterialsMarquee />
          </div>
        </Reveal>
      </section>

      <ProcessSection />

      {/* Portfolio */}
      <section className="container-lec py-16 lg:py-24">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Portfolio"
            title="Šta sve izrađujemo"
            intro="Od svjetlećih reklama i hotelskih oznaka do POS displeja i pleksiglas nagrada — pogledajte kategorije radova."
          />
          <Link href="/portfolio" className="hidden items-center gap-1.5 whitespace-nowrap text-sm font-medium text-laser hover:underline sm:flex">
            Cijeli portfolio <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12">
          <PortfolioGrid />
        </div>
      </section>

      <WhySection />
      <LocationsTeaser />

      {/* FAQ */}
      <section className="container-lec py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading eyebrow="Česta pitanja" title="Sve što vas zanima prije upita" />
          <FaqAccordion faqs={HOME_FAQ} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
