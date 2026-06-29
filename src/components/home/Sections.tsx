import Link from "next/link";
import { ArrowRight, Lightbulb, PenTool, Factory, Truck, Target, Layers, Clock4, Headset } from "lucide-react";
import { SectionHeading } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CITIES } from "@/data/cities";

const PROCESS = [
  { icon: Lightbulb, n: "01", title: "Upit i ideja", text: "Pošaljete skicu, logo ili samo opis. Savjetujemo o materijalu, tehnologiji i izvedbi." },
  { icon: PenTool, n: "02", title: "Dizajn i razvoj", text: "Produkt dizajn i tehnička priprema — 3D vizualizacija i nacrt spreman za proizvodnju." },
  { icon: Factory, n: "03", title: "Proizvodnja", text: "Lasersko rezanje i graviranje, CNC obrada, savijanje i poliranje pleksiglasa u vlastitom pogonu." },
  { icon: Truck, n: "04", title: "Isporuka i montaža", text: "Gotov proizvod isporučujemo i, po potrebi, montiramo na lokaciji — u cijeloj regiji." },
];

export function ProcessSection() {
  return (
    <section className="container-lec py-16 lg:py-24">
      <SectionHeading
        eyebrow="Kako radimo"
        title="Od ideje do gotovog proizvoda — u četiri koraka"
        intro="Jasan proces bez iznenađenja: znate šta dobijate, kojim materijalom i u kom roku."
      />
      <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PROCESS.map((p) => (
          <RevealItem key={p.n}>
            <div className="card group h-full">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-black/[0.03] text-laser">
                  <p.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <span className="font-mono text-2xl font-bold text-black/[0.08] transition-colors group-hover:text-laser/30">
                  {p.n}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

const WHY = [
  { icon: Target, title: "Preciznost koju vidite", text: "Laserski rezovi i gravure bez zadebljanja i opekotina, kristalno čiste ivice nakon dijamantskog poliranja." },
  { icon: Clock4, title: "20+ godina iskustva", text: "Od 2003. godine i prvog lasera za nemetale u BiH — znamo šta funkcioniše, a šta ne." },
  { icon: Layers, title: "Sve na jednom mjestu", text: "Dizajn, razvoj i proizvodnja pod istim krovom. Bez posrednika i izgubljenih detalja." },
  { icon: Factory, title: "Vlastiti pogon", text: "Laseri velikog formata i CNC do 3075×1650 mm — kontrolišemo kvalitet i rokove sami." },
  { icon: Truck, title: "Regionalna isporuka", text: "Redovno isporučujemo u BiH, Srbiju, Hrvatsku i Crnu Goru — jedan partner za cijelu regiju." },
  { icon: Headset, title: "Odgovor isti dan", text: "Na upite se javljamo brzo, s konkretnim prijedlogom izrade i okvirnom cijenom." },
];

export function WhySection() {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-30 mask-fade-y" aria-hidden />
      <div className="container-lec relative">
        <SectionHeading
          eyebrow="Zašto LEC"
          title="Partner koji ideju pretvara u proizvod, a ne u problem"
          intro="Spajamo zanat i tehnologiju da dobijete tačno ono što ste zamislili — na vrijeme i bez kompromisa u kvalitetu."
        />
        <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w) => (
            <RevealItem key={w.title}>
              <div className="card h-full">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-laser/10 text-laser ring-1 ring-laser/20">
                  <w.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{w.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

const FEATURED = ["sarajevo", "banja-luka", "beograd", "novi-sad", "zagreb", "split", "podgorica", "mostar"];

export function LocationsTeaser() {
  const byCountry = [
    { code: "BA", name: "Bosna i Hercegovina", count: CITIES.filter((c) => c.countryCode === "BA").length },
    { code: "RS", name: "Srbija", count: CITIES.filter((c) => c.countryCode === "RS").length },
    { code: "HR", name: "Hrvatska", count: CITIES.filter((c) => c.countryCode === "HR").length },
    { code: "ME", name: "Crna Gora", count: CITIES.filter((c) => c.countryCode === "ME").length },
  ];
  const featured = FEATURED.map((s) => CITIES.find((c) => c.slug === s)).filter(Boolean) as typeof CITIES;

  return (
    <section className="container-lec py-16 lg:py-24">
      <div className="panel relative overflow-hidden p-8 sm:p-10 lg:p-14">
        <div className="spotlight-tr absolute inset-0" aria-hidden />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <span className="eyebrow">Lokacije</span>
            <h2 className="mt-4 text-balance font-display text-3xl font-semibold leading-[1.1] tracking-tighter text-ink sm:text-4xl">
              Jedan pogon, cijela regija
            </h2>
            <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-muted">
              Proizvodimo u Laktašima, a isporučujemo u {CITIES.length} gradova širom četiri zemlje. Pronađite svoj grad i
              saznajte šta najčešće radimo za firme u vašoj sredini.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {byCountry.map((c) => (
                <div key={c.code} className="rounded-xl border border-line bg-black/[0.02] px-4 py-3">
                  <div className="font-display text-sm font-semibold text-ink">{c.name}</div>
                  <div className="font-mono text-xs text-faint">{c.count} gradova</div>
                </div>
              ))}
            </div>
            <Link href="/lokacije" className="btn-primary mt-7">
              Sve lokacije <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2.5">
              {featured.map((c) => (
                <Link
                  key={c.slug}
                  href={`/lokacije/${c.slug}`}
                  className="group flex items-center gap-2 rounded-full border border-line bg-black/[0.02] px-4 py-2 text-sm text-muted transition-all hover:border-laser/40 hover:text-ink"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-laser/60 transition-transform group-hover:scale-150" />
                  {c.name}
                </Link>
              ))}
              <Link
                href="/lokacije"
                className="flex items-center gap-1.5 rounded-full bg-laser/10 px-4 py-2 text-sm font-medium text-laser ring-1 ring-laser/20"
              >
                + još {CITIES.length - featured.length}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
