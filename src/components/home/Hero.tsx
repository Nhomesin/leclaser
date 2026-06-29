"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone, Sparkles, Check } from "lucide-react";
import { SITE } from "@/lib/site";
import { categoryHero } from "@/data/images";

const TRUST = ["Prvi u BiH s laserom za nemetale", "Od ideje do gotovog proizvoda", "Isporuka u 4 zemlje regije"];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-28 lg:pt-36">
      {/* Backdrop */}
      <div className="spotlight pointer-events-none absolute inset-0 -top-20" aria-hidden />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 mask-fade-y" aria-hidden />
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-laser/10 blur-[120px]"
        aria-hidden
      />

      <div className="container-lec relative grid items-center gap-12 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24">
        {/* Copy */}
        <div>
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-black/[0.03] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              <span className="flex h-1.5 w-1.5 animate-pulse-dot rounded-full bg-laser" />
              Precizna proizvodnja · od {SITE.founded}.
            </span>
          </motion.div>

          <motion.h1
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-6 max-w-2xl text-balance font-display text-[2.6rem] font-bold leading-[1.04] tracking-tightest text-ink sm:text-6xl lg:text-[4.1rem]"
          >
            Lasersko rezanje, graviranje i{" "}
            <span className="text-laser-grad">reklame koje se pamte</span>.
          </motion.h1>

          {/* Hero image — pulled above the fold on mobile/narrow; desktop uses the right column */}
          <BlueprintVisual reduce={!!reduce} compact className="mt-7 lg:hidden" />

          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted"
          >
            LEC iz Laktaša spaja dizajn, lasersku i CNC tehnologiju i ručnu obradu pleksiglasa u proizvode koji
            prodaju: svjetleće reklame, POS displeje, hotelske oznake i pleksiglas detalje — isporučeno u cijeloj
            regiji.
          </motion.p>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.19, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link href="/kontakt" className="btn-primary text-base">
              Zatraži besplatnu ponudu
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/usluge" className="btn-ghost text-base">
              Pogledaj usluge
            </Link>
            <a
              href={`tel:${SITE.phonePrimary.tel}`}
              className="ml-1 hidden items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink sm:flex"
            >
              <Phone className="h-4 w-4 text-laser" />
              {SITE.phonePrimary.display}
            </a>
          </motion.div>

          <motion.ul
            initial={reduce ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6"
          >
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm text-muted">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-laser/15 text-laser">
                  <Check className="h-3 w-3" />
                </span>
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Animated blueprint visual — desktop right column (mobile renders it inline, above the fold) */}
        <BlueprintVisual reduce={!!reduce} className="hidden lg:block" />
      </div>
    </section>
  );
}

function BlueprintVisual({
  reduce,
  compact = false,
  className = "",
}: {
  reduce: boolean;
  compact?: boolean;
  className?: string;
}) {
  const heroImg = categoryHero("svjetlece-reklame-logotipi");
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
      className={`relative mx-auto w-full max-w-md lg:max-w-none ${className}`}
    >
      <div className={`panel relative overflow-hidden p-0 ${compact ? "aspect-[4/3]" : "aspect-square"}`}>
        {heroImg ? (
          <Image src={heroImg} alt="LEC radovi — svjetleće reklame i pleksiglas" fill priority sizes="(max-width: 1024px) 90vw, 560px" className="object-cover" />
        ) : (
          <div className="bg-grid-fine absolute inset-0 opacity-50" aria-hidden />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/30" aria-hidden />

        {/* animated laser scan-line */}
        {!reduce && (
          <motion.span
            aria-hidden
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-laser to-transparent"
            style={{ boxShadow: "0 0 14px rgba(245,134,52,0.9)" }}
            initial={{ top: "0%" }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
          />
        )}

        <span className="absolute left-4 top-4 rounded bg-black/45 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur-sm">
          LEC · proizvodnja
        </span>
        <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded bg-black/45 px-2 py-1 font-mono text-[10px] text-laser-400 backdrop-blur-sm">
          <Sparkles className="h-3 w-3" /> 300W
        </span>

        {/* dimension chips */}
        <div className="absolute bottom-5 left-5 flex flex-col gap-2">
          <SpecChip k="format" v="1400×2500 mm" />
          <SpecChip k="tolerancija" v="±0.1 mm" />
        </div>
        <div className="absolute bottom-5 right-5">
          <SpecChip k="materijal" v="pleksiglas" />
        </div>

        {/* corner ticks */}
        <span className="absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-white/60" aria-hidden />
        <span className="absolute right-2 top-2 h-4 w-4 border-r-2 border-t-2 border-white/60" aria-hidden />
        <span className="absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-white/60" aria-hidden />
        <span className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-white/60" aria-hidden />
      </div>

      {/* floating accent card — desktop column only (omitted on the compact mobile instance) */}
      {!compact && (
        <motion.div
          animate={reduce ? {} : { y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-5 -left-3 hidden rounded-xl border border-line bg-panel/90 px-4 py-3 shadow-panel backdrop-blur-md sm:block"
        >
          <div className="font-mono text-[10px] uppercase tracking-widest text-faint">Status</div>
          <div className="mt-0.5 flex items-center gap-2 text-sm font-medium text-ink">
            <span className="h-2 w-2 animate-pulse-dot rounded-full bg-green-400" /> U proizvodnji
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function SpecChip({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg border border-line bg-bg/80 px-3 py-1.5 backdrop-blur-sm">
      <div className="font-mono text-[9px] uppercase tracking-widest text-faint">{k}</div>
      <div className="font-mono text-xs text-ink">{v}</div>
    </div>
  );
}
