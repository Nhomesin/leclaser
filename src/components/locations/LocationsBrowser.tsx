"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, ArrowUpRight } from "lucide-react";
import type { City } from "@/data/cities";
import { COUNTRIES } from "@/data/cities";
import { cn } from "@/lib/cn";

const FLAG: Record<string, string> = { BA: "🇧🇦", RS: "🇷🇸", HR: "🇭🇷", ME: "🇲🇪" };

export function LocationsBrowser({ cities }: { cities: City[] }) {
  const [country, setCountry] = useState<string>("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return cities.filter((c) => {
      if (country !== "all" && c.countryCode !== country) return false;
      if (!needle) return true;
      return (
        c.name.toLowerCase().includes(needle) ||
        c.region.toLowerCase().includes(needle) ||
        c.nearbyTowns.some((t) => t.toLowerCase().includes(needle))
      );
    });
  }, [cities, country, q]);

  const tabs = useMemo(
    () => [{ code: "all", name: "Sve", count: cities.length }, ...COUNTRIES.map((c) => ({ code: c.code, name: c.name, count: cities.filter((x) => x.countryCode === c.code).length }))],
    [cities]
  );

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.code}
              onClick={() => setCountry(t.code)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                country === t.code
                  ? "border-laser/40 bg-laser/10 text-ink"
                  : "border-line bg-black/[0.02] text-muted hover:border-black/15 hover:text-ink"
              )}
            >
              {t.code !== "all" && <span aria-hidden>{FLAG[t.code]}</span>}
              {t.name}
              <span className="font-mono text-xs text-faint">{t.count}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full lg:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Pretraži grad ili okolinu…"
            className="w-full rounded-full border border-line bg-black/[0.03] py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-faint focus:border-laser focus:outline-none"
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-muted">Nema rezultata za „{q}". Pokušajte drugi pojam.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <Link
              key={c.slug}
              href={`/lokacije/${c.slug}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-panel-sheen p-5 transition-all duration-300 hover:border-laser/30"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-black/[0.03] text-laser">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-display text-base font-semibold text-ink">{c.name}</div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-faint">{c.region}</div>
                  </div>
                </div>
                <span aria-hidden className="text-base">
                  {FLAG[c.countryCode]}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-black/[0.03] px-2.5 py-1 text-[11px] text-muted">{c.populationLabel}</span>
                <ArrowUpRight className="h-4 w-4 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-laser" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
