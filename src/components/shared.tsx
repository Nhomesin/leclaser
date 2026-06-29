import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SERVICES, PORTFOLIO, MATERIALS, SITE } from "@/lib/site";
import { Icon } from "@/components/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CornerTicks } from "@/components/ui/primitives";
import { categoryHero } from "@/data/images";

/** Services grid — reused on home and /usluge. */
export function ServicesGrid() {
  return (
    <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICES.map((s) => (
        <RevealItem key={s.slug}>
          <Link
            href={`/usluge/${s.slug}`}
            className="card group relative flex h-full flex-col overflow-hidden"
          >
            <CornerTicks className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="flex items-start justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-black/[0.03] text-laser transition-colors group-hover:border-laser/40 group-hover:bg-laser/10">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <ArrowUpRight className="h-5 w-5 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-laser" />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold text-ink">{s.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.short}</p>
          </Link>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/** Portfolio category grid — reused on home and /portfolio. Real product photos. */
export function PortfolioGrid() {
  return (
    <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {PORTFOLIO.map((p, i) => {
        const hero = categoryHero(p.slug);
        return (
          <RevealItem key={p.slug}>
            <Link
              href={`/portfolio/${p.slug}`}
              className="group relative flex h-full min-h-[300px] flex-col justify-end overflow-hidden rounded-2xl border border-line p-6 shadow-panel transition-all duration-300 hover:-translate-y-0.5"
            >
              {hero ? (
                <Image
                  src={hero}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-precise group-hover:scale-[1.05]"
                />
              ) : (
                <div className={`absolute inset-0 ${["bg-grid", "bg-dots", "bg-grid-fine"][i % 3]} opacity-50`} aria-hidden />
              )}
              {/* legibility gradient (dark, for white text over photo) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" aria-hidden />
              <CornerTicks className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div
                className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm"
                aria-hidden
              >
                <Icon name={p.icon} className="h-5 w-5" />
              </div>
              <div className="relative">
                <h3 className="font-display text-xl font-semibold text-white">{p.name}</h3>
                <p className="mt-1.5 text-sm text-white/75">{p.short}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-laser-400">
                  Pogledaj radove <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}

const STATS = [
  { value: "2003.", label: "Od godine osnivanja" },
  { value: "1.", label: "Laser za nemetale u BiH" },
  { value: "4", label: "Zemlje isporuke" },
  { value: "3075mm", label: "Maks. format CNC obrade" },
];

/** Trust / stats strip. */
export function TrustStrip() {
  return (
    <Reveal>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-bg2 px-5 py-7 text-center sm:px-6">
            <div className="font-display text-3xl font-bold tracking-tighter text-laser sm:text-4xl">{s.value}</div>
            <div className="mt-1.5 text-xs leading-tight text-muted sm:text-sm">{s.label}</div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/** Infinite materials marquee. */
export function MaterialsMarquee() {
  const items = [...MATERIALS, ...MATERIALS];
  return (
    <div className="mask-fade-x relative overflow-hidden py-2">
      <div className="flex w-max animate-marquee gap-3">
        {items.map((m, i) => (
          <span
            key={i}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-black/[0.02] px-4 py-2 text-sm text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-laser/60" />
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Compact region/locations teaser used on home + service pages. */
export function RegionStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-faint">
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">Isporuka u regiji</span>
      {SITE.serviceRegion.map((c) => (
        <span key={c} className="flex items-center gap-2 text-muted">
          <span className="h-1 w-1 rounded-full bg-laser" />
          {c}
        </span>
      ))}
    </div>
  );
}
