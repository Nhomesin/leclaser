import type { Metadata } from "next";
import { Sparkles, Cpu, Gem, HeartHandshake, Phone, Mail } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Timeline } from "@/components/about/Timeline";
import { TrustStrip, MaterialsMarquee } from "@/components/shared";
import { CtaBand } from "@/components/CtaBand";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "O nama — LEC, precizna proizvodnja od 2003.",
  description:
    "LEC je osnovan 2003. u Laktašima kao prva firma u BiH s laserom za rezanje i graviranje nemetala. Spajamo dizajn, tehnologiju i zanat — od ideje do gotovog proizvoda.",
  path: "/o-nama",
});

const VALUES = [
  { icon: Sparkles, title: "Kreativnost", text: "Svaki projekat tretiramo kao zaseban izazov — tražimo rješenje koje je i funkcionalno i lijepo." },
  { icon: Cpu, title: "Tehnologija", text: "Laseri velikog formata i CNC obradni centri daju preciznost koju ručna izrada ne može dostići." },
  { icon: Gem, title: "Kvalitet", text: "Kristalno čiste ivice, čisti rezovi i gravure bez kompromisa — detalj koji se vidi i traje." },
  { icon: HeartHandshake, title: "Pouzdanost", text: "Dogovoreni rok i jasna komunikacija. Vaše potrebe su naša inspiracija, od 2003. godine." },
];

export default function ONamaPage() {
  return (
    <>
      <PageHero
        eyebrow="O nama"
        title="Preciznost je zanat. Mi ga radimo od 2003."
        intro="LEC je nastao u Laktašima kao prva firma u Bosni i Hercegovini koja je instalirala laser za rezanje i graviranje nemetala. Od tada spajamo dizajn, tehnologiju i ručni rad u proizvode koji traju."
        crumbs={[{ name: "O nama", href: "/o-nama" }]}
        showCta={false}
      />

      {/* Story */}
      <section className="container-lec py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold tracking-tighter text-ink sm:text-3xl">
              Kreativnost i tehnologija — naša dva ključna elementa
            </h2>
            <div className="mt-5 space-y-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              <p>
                Vjerujemo da dobra ideja zaslužuje besprijekornu izvedbu. Zato vodimo svaki projekat od koncepta, preko
                produkt dizajna i tehničkog razvoja, do gotovog proizvoda — bez posrednika i izgubljenih detalja na putu.
              </p>
              <p>
                Radimo za različite industrije: trgovinu, ugostiteljstvo i hotelijerstvo, proizvodnju, institucije i
                brendove kojima je vizuelni identitet važan. U svaki posao unosimo isti cilj — funkcionalnost, ljepotu i
                kvalitet prilagođen konkretnoj potrebi klijenta.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="panel p-7">
              <p className="font-display text-xl font-medium leading-snug text-ink">
                „Vaše potrebe su naša inspiracija — od ideje, preko dizajna i razvoja, do proizvoda."
              </p>
              <div className="mt-6 flex flex-col gap-2 text-sm text-muted">
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-laser" /> {SITE.phonePrimary.display}
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-laser" /> {SITE.email}
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12">
          <TrustStrip />
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-12 lg:py-20">
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-30 mask-fade-y" aria-hidden />
        <div className="container-lec relative">
          <SectionHeading
            eyebrow="Put razvoja"
            title="Dvije decenije ulaganja u preciznost"
            intro="Svaka mašina u našem pogonu je odluka da radimo bolje, brže i tačnije. Kliknite na godinu."
          />
          <div className="mt-12">
            <Timeline />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-lec py-12 lg:py-20">
        <SectionHeading eyebrow="Vrijednosti" title="Ono na čemu ne pravimo kompromis" />
        <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <RevealItem key={v.title}>
              <div className="card h-full">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-laser/10 text-laser ring-1 ring-laser/20">
                  <v.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-12 rounded-2xl border border-line bg-bg2 px-5 py-6 sm:px-8">
          <p className="mb-4 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
            Materijali koje obrađujemo
          </p>
          <MaterialsMarquee />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
