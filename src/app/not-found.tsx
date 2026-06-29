import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden pt-24">
      <div className="spotlight pointer-events-none absolute inset-0 -top-20" aria-hidden />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 mask-fade-y" aria-hidden />
      <div className="container-lec relative text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-laser">Greška 404</span>
        <h1 className="mt-4 font-display text-6xl font-bold tracking-tightest text-ink sm:text-8xl">
          <span className="text-laser-grad">404</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-pretty text-lg text-muted">
          Ova stranica je „izrezana" iz strukture. Vratimo vas na pravu putanju.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            <Home className="h-4 w-4" /> Početna
          </Link>
          <Link href="/kontakt" className="btn-ghost">
            Kontakt <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/usluge/${s.slug}`}
              className="rounded-full border border-line bg-black/[0.02] px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-laser/40 hover:text-ink"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
