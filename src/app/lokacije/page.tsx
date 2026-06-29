import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CITIES } from "@/data/cities";
import { PageHero } from "@/components/PageHero";
import { LocationsBrowser } from "@/components/locations/LocationsBrowser";
import { CtaBand } from "@/components/CtaBand";
import { RegionStrip } from "@/components/shared";

export const metadata: Metadata = buildMetadata({
  title: "Lokacije — lasersko rezanje i reklame u cijeloj regiji",
  description:
    "LEC proizvodi u Laktašima i isporučuje u 52 grada širom BiH, Srbije, Hrvatske i Crne Gore. Pronađite svoj grad — reklame, displeji, oznake i pleksiglas proizvodi.",
  path: "/lokacije",
});

export default function LokacijePage() {
  return (
    <>
      <PageHero
        eyebrow="Lokacije"
        title="Proizvodimo u Laktašima — isporučujemo u cijeloj regiji"
        intro={`Iz vlastitog pogona pokrivamo ${CITIES.length} gradova u četiri zemlje. Izaberite svoj grad i pogledajte koje usluge i proizvode najčešće radimo za firme u vašoj sredini.`}
        crumbs={[{ name: "Lokacije", href: "/lokacije" }]}
      >
        <div className="mt-8">
          <RegionStrip />
        </div>
      </PageHero>

      <section className="container-lec py-14 lg:py-20">
        <LocationsBrowser cities={CITIES} />
      </section>

      <CtaBand
        title="Ne vidite svoj grad na listi?"
        text="Isporučujemo i izvan navedenih gradova — javite nam lokaciju i dobićete ponudu s rokom isporuke."
      />
    </>
  );
}
