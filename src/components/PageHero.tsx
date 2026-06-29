import Link from "next/link";
import type { ReactNode } from "react";
import { Phone, ArrowRight } from "lucide-react";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { Eyebrow } from "@/components/ui/primitives";
import { SITE } from "@/lib/site";

/** Consistent sub-page hero with breadcrumbs, eyebrow, title, intro and CTAs. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  badge,
  showCta = true,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs: Crumb[];
  badge?: ReactNode;
  showCta?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-28 lg:pt-36">
      <div className="spotlight pointer-events-none absolute inset-0 -top-20" aria-hidden />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 mask-fade-y" aria-hidden />
      <div className="container-lec relative pb-14 lg:pb-20">
        <Breadcrumbs items={crumbs} />
        <div className="mt-7 max-w-3xl">
          {badge && <div className="mb-4">{badge}</div>}
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="mt-4 text-balance font-display text-4xl font-bold leading-[1.06] tracking-tightest text-ink sm:text-5xl lg:text-[3.4rem]">
            {title}
          </h1>
          {intro && <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted">{intro}</p>}
          {showCta && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/kontakt" className="btn-primary">
                Zatraži ponudu <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`tel:${SITE.phonePrimary.tel}`} className="btn-ghost">
                <Phone className="h-4 w-4 text-laser" /> {SITE.phonePrimary.display}
              </a>
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
