import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { PortfolioGrid } from "@/components/shared";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio — reklame, displeji, oznake i pleksiglas proizvodi",
  description:
    "Svjetleće reklame i 3D logotipi, reklamne table, hotelske oznake, POS displeji, pleksiglas proizvodi, enterijer i eksterijer. Pogledajte šta LEC izrađuje.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Radovi koje vrijedi pokazati"
        intro="Od svjetlećih reklama i hotelskog wayfindinga do POS displeja i pleksiglas nagrada — izaberite kategoriju i pogledajte šta sve možemo izraditi za vaš brend ili prostor."
        crumbs={[{ name: "Portfolio", href: "/portfolio" }]}
      />

      <section className="container-lec py-16 lg:py-20">
        <PortfolioGrid />
      </section>

      <CtaBand
        title="Vidite nešto slično vašoj ideji?"
        text="Pošaljite nam referencu ili opis — predlažemo izvedbu, materijale i okvirnu cijenu, bez obaveza."
      />
    </>
  );
}
