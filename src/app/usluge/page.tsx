import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { ServicesGrid, MaterialsMarquee } from "@/components/shared";
import { ProcessSection } from "@/components/home/Sections";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Usluge — lasersko rezanje, graviranje, CNC i pleksiglas",
  description:
    "Lasersko rezanje i graviranje, CNC obrada, dijamantsko poliranje i termo savijanje pleksiglasa, produkt dizajn. LEC iz Laktaša — od ideje do gotovog proizvoda.",
  path: "/usluge",
});

export default function UslugePage() {
  return (
    <>
      <PageHero
        eyebrow="Usluge"
        title="Usluge koje pokrivaju cijeli put od materijala do proizvoda"
        intro="Pored laserskog rezanja i graviranja, CNC obrade, dijamantskog poliranja i termo savijanja pleksiglasa, nudimo produkt dizajn i tehnički razvoj — sve potrebno da ideja postane gotov, montiran proizvod."
        crumbs={[{ name: "Usluge", href: "/usluge" }]}
      />

      <section className="container-lec py-16 lg:py-20">
        <ServicesGrid />
      </section>

      <section className="container-lec pb-6">
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
      <CtaBand />
    </>
  );
}
