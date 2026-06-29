import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowUpRight, Cog } from "lucide-react";
import { SERVICE_CONTENT, getService } from "@/data/services-content";
import { SERVICES } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { SectionHeading, Pill } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { QuoteForm } from "@/components/QuoteForm";
import { Icon } from "@/components/Icon";
import { JsonLd, serviceSchema, faqSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/site";
import Image from "next/image";
import { Gallery } from "@/components/Gallery";
import { serviceImages, serviceHero } from "@/data/images";
import { CornerTicks } from "@/components/ui/primitives";

export function generateStaticParams() {
  return SERVICE_CONTENT.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getService(params.slug);
  if (!s) return {};
  return buildMetadata({ title: s.metaTitle || s.name, description: s.metaDescription, path: `/usluge/${s.slug}` });
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const s = getService(params.slug);
  if (!s) notFound();

  const related = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3);
  const hero = serviceHero(s.slug);
  const photos = serviceImages(s.slug).slice(1); // hero shown separately

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: s.name, description: s.metaDescription || s.intro, url: `${SITE.baseUrl}/usluge/${s.slug}` }),
          faqSchema(s.faqs),
        ]}
      />

      <PageHero
        eyebrow="Usluga"
        title={s.name}
        intro={s.intro}
        crumbs={[
          { name: "Usluge", href: "/usluge" },
          { name: s.name, href: `/usluge/${s.slug}` },
        ]}
        badge={<Pill>{s.tagline}</Pill>}
      />

      {/* Feature image */}
      {hero && (
        <section className="container-lec pt-10 lg:pt-14">
          <div className="panel relative aspect-[16/9] overflow-hidden p-0 sm:aspect-[21/9]">
            <Image src={hero} alt={s.name} fill priority sizes="(max-width: 1200px) 100vw, 1200px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden />
            <CornerTicks />
            <span className="absolute bottom-4 left-5 rounded-full bg-black/45 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-white backdrop-blur-sm">
              {s.name}
            </span>
          </div>
        </section>
      )}

      {/* What it is + specs */}
      <section className="container-lec py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold tracking-tighter text-ink sm:text-3xl">
              Šta nudimo i kako radimo
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">{s.whatItIs}</p>

            <h3 className="mt-9 font-mono text-[11px] uppercase tracking-[0.25em] text-faint">Materijali</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {s.materials.map((m) => (
                <span key={m} className="rounded-full border border-line bg-black/[0.02] px-3.5 py-1.5 text-sm text-muted">
                  {m}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Specs panel */}
          <Reveal delay={0.08}>
            <div className="panel sticky top-24 p-6">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
                <Cog className="h-3.5 w-3.5 text-laser" /> Tehničke mogućnosti
              </div>
              <dl className="mt-4 divide-y divide-line">
                {s.specs.map((sp) => (
                  <div key={sp.label} className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-sm text-muted">{sp.label}</dt>
                    <dd className="text-right font-mono text-sm text-ink">{sp.value}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/kontakt" className="btn-primary mt-5 w-full">
                Zatraži ponudu
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Applications */}
      <section className="container-lec py-12 lg:py-16">
        <SectionHeading eyebrow="Primjene" title="Gdje se najčešće koristi" />
        <RevealGroup className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {s.applications.map((a) => (
            <RevealItem key={a}>
              <div className="flex items-start gap-3 rounded-xl border border-line bg-black/[0.02] p-4">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-laser/15 text-laser">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-sm text-muted">{a}</span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Advantages */}
      <section className="relative py-12 lg:py-16">
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-30 mask-fade-y" aria-hidden />
        <div className="container-lec relative">
          <SectionHeading eyebrow="Prednosti" title="Zašto baš LEC za ovaj posao" />
          <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {s.advantages.map((adv) => (
              <RevealItem key={adv.title}>
                <div className="card h-full">
                  <h3 className="font-display text-lg font-semibold text-ink">{adv.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{adv.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Process */}
      <section className="container-lec py-12 lg:py-16">
        <SectionHeading eyebrow="Proces" title="Od upita do isporuke" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {s.processSteps.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="relative h-full rounded-2xl border border-line bg-panel-sheen p-6">
                <span className="font-mono text-2xl font-bold text-laser/30">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-base font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Gallery */}
      {photos.length > 0 && (
        <section className="container-lec py-12 lg:py-16">
          <SectionHeading eyebrow="Galerija" title="Primjeri iz proizvodnje" />
          <div className="mt-10">
            <Gallery images={photos} alt={s.name} />
          </div>
        </section>
      )}

      {/* FAQ + inline quote */}
      <section className="container-lec py-12 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading eyebrow="Česta pitanja" title={`${s.name} — pitanja i odgovori`} />
            <div className="mt-8">
              <FaqAccordion faqs={s.faqs} />
            </div>
          </div>
          <div id="ponuda">
            <QuoteForm defaultService={s.slug} source={`usluga:${s.slug}`} />
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="container-lec pb-16 lg:pb-24">
        <SectionHeading eyebrow="Povezane usluge" title="Pogledajte i ovo" />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {related.map((r) => (
            <Link key={r.slug} href={`/usluge/${r.slug}`} className="card group flex items-center justify-between">
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-black/[0.03] text-laser">
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
