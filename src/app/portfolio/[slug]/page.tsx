import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_CONTENT, getPortfolio } from "@/data/portfolio-content";
import { PORTFOLIO } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { SectionHeading, Pill, CornerTicks } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { QuoteForm } from "@/components/QuoteForm";
import { Icon } from "@/components/Icon";
import { JsonLd, faqSchema, serviceSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/site";
import { Gallery } from "@/components/Gallery";
import { categoryImages, categoryHero } from "@/data/images";

export function generateStaticParams() {
  return PORTFOLIO_CONTENT.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getPortfolio(params.slug);
  if (!p) return {};
  return buildMetadata({ title: p.metaTitle || p.name, description: p.metaDescription, path: `/portfolio/${p.slug}` });
}

export default function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  const p = getPortfolio(params.slug);
  if (!p) notFound();
  const related = PORTFOLIO.filter((x) => x.slug !== p.slug).slice(0, 3);
  const hero = categoryHero(p.slug);
  const photos = categoryImages(p.slug).slice(1); // hero shown separately

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: p.name, description: p.metaDescription || p.intro, url: `${SITE.baseUrl}/portfolio/${p.slug}` }),
          faqSchema(p.faqs),
        ]}
      />

      <PageHero
        eyebrow="Portfolio"
        title={p.name}
        intro={p.intro}
        crumbs={[
          { name: "Portfolio", href: "/portfolio" },
          { name: p.name, href: `/portfolio/${p.slug}` },
        ]}
        badge={<Pill>{p.tagline}</Pill>}
      />

      {/* Feature image */}
      {hero && (
        <section className="container-lec pt-10 lg:pt-14">
          <div className="panel relative aspect-[16/9] overflow-hidden p-0 sm:aspect-[21/9]">
            <Image src={hero} alt={p.name} fill priority sizes="(max-width: 1200px) 100vw, 1200px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden />
            <CornerTicks />
            <span className="absolute bottom-4 left-5 rounded-full bg-black/45 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-white backdrop-blur-sm">
              {p.name}
            </span>
          </div>
        </section>
      )}

      {/* Description + use cases */}
      <section className="container-lec py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold tracking-tighter text-ink sm:text-3xl">O kategoriji</h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">{p.description}</p>
            <h3 className="mt-9 font-mono text-[11px] uppercase tracking-[0.25em] text-faint">Materijali</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.materials.map((m) => (
                <span key={m} className="rounded-full border border-line bg-black/[0.02] px-3.5 py-1.5 text-sm text-muted">
                  {m}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="panel p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">Tipične primjene</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {p.useCases.map((u) => (
                  <li key={u} className="flex items-start gap-3 text-sm text-muted">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-laser/15 text-laser">
                      <Check className="h-3 w-3" />
                    </span>
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      {photos.length > 0 && (
        <section className="container-lec py-12 lg:py-16">
          <SectionHeading eyebrow="Galerija" title="Iz naše proizvodnje" intro="Fotografije stvarnih radova iz ove kategorije." />
          <div className="mt-10">
            <Gallery images={photos} alt={p.name} />
          </div>
        </section>
      )}

      {/* Items */}
      <section className="relative py-12 lg:py-16">
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-30 mask-fade-y" aria-hidden />
        <div className="container-lec relative">
          <SectionHeading eyebrow="Šta izrađujemo" title="Tipovi proizvoda u ovoj kategoriji" />
          <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.items.map((it, i) => (
              <RevealItem key={it.name}>
                <div className="card group h-full">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span className="h-2 w-2 rounded-full bg-laser/50 transition-transform group-hover:scale-150" />
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold text-ink">{it.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{it.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* FAQ + quote */}
      <section className="container-lec py-12 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading eyebrow="Česta pitanja" title={`${p.name} — pitanja i odgovori`} />
            <div className="mt-8">
              <FaqAccordion faqs={p.faqs} />
            </div>
          </div>
          <div id="ponuda">
            <QuoteForm defaultService={p.slug} source={`portfolio:${p.slug}`} />
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="container-lec pb-16 lg:pb-24">
        <SectionHeading eyebrow="Ostale kategorije" title="Pogledajte i ovo" />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {related.map((r) => (
            <Link key={r.slug} href={`/portfolio/${r.slug}`} className="card group flex items-center justify-between">
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-laser/10 text-laser ring-1 ring-laser/20">
                  <Icon name={r.icon} className="h-5 w-5" />
                </span>
                <span className="font-display text-base font-semibold text-ink">{r.name}</span>
              </span>
              <ArrowUpRight className="h-5 w-5 text-faint transition-colors group-hover:text-laser" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
