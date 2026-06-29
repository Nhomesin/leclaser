import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, MessageCircle, MapPin, Truck, Check, ArrowUpRight, Building2 } from "lucide-react";
import { CITIES, getCity } from "@/data/cities";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading, Eyebrow, Pill } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ServicesGrid } from "@/components/shared";
import { FaqAccordion } from "@/components/FaqAccordion";
import { QuoteForm } from "@/components/QuoteForm";
import { JsonLd, faqSchema, breadcrumbSchema } from "@/lib/jsonld";
import { SITE, WHATSAPP_URL } from "@/lib/site";

const FLAG: Record<string, string> = { BA: "🇧🇦", RS: "🇷🇸", HR: "🇭🇷", ME: "🇲🇪" };

export function generateStaticParams() {
  return CITIES.map((c) => ({ grad: c.slug }));
}

export function generateMetadata({ params }: { params: { grad: string } }): Metadata {
  const c = getCity(params.grad);
  if (!c) return {};
  return buildMetadata({ title: c.metaTitle || c.heroTitle, description: c.metaDescription, path: `/lokacije/${c.slug}` });
}

function localBusinessForCity(c: ReturnType<typeof getCity>) {
  if (!c) return {};
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE.baseUrl}/lokacije/${c.slug}#localbusiness`,
    name: `LEC — Lasersko rezanje i reklame (isporuka: ${c.name})`,
    url: `${SITE.baseUrl}/lokacije/${c.slug}`,
    image: `${SITE.baseUrl}/opengraph-image`,
    telephone: SITE.phonePrimary.tel,
    email: SITE.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      postalCode: SITE.address.postal,
      addressCountry: SITE.address.countryCode,
    },
    areaServed: { "@type": "City", name: c.name, containedInPlace: { "@type": "Country", name: c.country } },
  };
}

export default function CityPage({ params }: { params: { grad: string } }) {
  const c = getCity(params.grad);
  if (!c) notFound();

  const siblings = CITIES.filter((x) => x.countryCode === c.countryCode && x.slug !== c.slug).slice(0, 8);

  return (
    <>
      <JsonLd
        data={[
          localBusinessForCity(c),
          faqSchema(c.faqs),
          breadcrumbSchema([
            { name: "Početna", url: SITE.baseUrl },
            { name: "Lokacije", url: `${SITE.baseUrl}/lokacije` },
            { name: c.name, url: `${SITE.baseUrl}/lokacije/${c.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line pt-28 lg:pt-36">
        <div className="spotlight pointer-events-none absolute inset-0 -top-20" aria-hidden />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 mask-fade-y" aria-hidden />
        <div className="container-lec relative grid gap-10 pb-14 lg:grid-cols-[1.4fr_1fr] lg:gap-12 lg:pb-20">
          <div>
            <Breadcrumbs items={[{ name: "Lokacije", href: "/lokacije" }, { name: c.name, href: `/lokacije/${c.slug}` }]} />
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Pill>
                <span aria-hidden className="mr-1">
                  {FLAG[c.countryCode]}
                </span>
                {c.country}
              </Pill>
              <Pill>{c.populationLabel}</Pill>
            </div>
            <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.06] tracking-tightest text-ink sm:text-5xl lg:text-[3.2rem]">
              {c.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted">{c.heroSubtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#ponuda" className="btn-primary">
                Zatraži ponudu za {c.name}
              </a>
              <a href={`tel:${SITE.phonePrimary.tel}`} className="btn-ghost">
                <Phone className="h-4 w-4 text-laser" /> {SITE.phonePrimary.display}
              </a>
            </div>
          </div>

          {/* Local quick-contact card */}
          <div className="lg:pt-8">
            <div className="panel p-6">
              <div className="flex items-center gap-2 text-laser">
                <Truck className="h-5 w-5" />
                <span className="font-mono text-[11px] uppercase tracking-[0.25em]">Isporuka u {c.nameLocative}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{c.logistics}</p>
              <div className="mt-5 flex flex-col gap-2.5">
                <a href={`tel:${SITE.phonePrimary.tel}`} className="btn-primary w-full justify-between">
                  <span className="flex items-center gap-2">
                    <Phone className="h-4 w-4" /> Pozovi odmah
                  </span>
                  <span className="font-mono text-xs opacity-80">{SITE.phonePrimary.display}</span>
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full justify-between">
                  <span className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp / Viber
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-faint" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro + local angle */}
      <section className="container-lec py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <Reveal>
            <Eyebrow>Lasersko rezanje i reklame u {c.nameLocative}</Eyebrow>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">{c.intro}</p>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">{c.localAngle}</p>

            {/* Nearby towns */}
            <div className="mt-8">
              <h3 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
                <MapPin className="h-3.5 w-3.5 text-laser" /> Pokrivamo i okolinu
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.nearbyTowns.map((t) => (
                  <span key={t} className="rounded-full border border-line bg-black/[0.02] px-3.5 py-1.5 text-sm text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Top services for this city */}
          <Reveal delay={0.08}>
            <div className="panel p-6">
              <h3 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
                <Building2 className="h-3.5 w-3.5 text-laser" /> Najtraženije u {c.nameLocative}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {c.topServices.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-ink">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-laser/15 text-laser">
                      <Check className="h-3 w-3" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <Link href="/usluge" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-laser hover:underline">
                Sve usluge <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services grid */}
      <section className="relative py-12 lg:py-16">
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-30 mask-fade-y" aria-hidden />
        <div className="container-lec relative">
          <SectionHeading
            eyebrow="Usluge"
            title={`Šta sve radimo za firme u ${c.nameLocative}`}
            intro="Sve proizvodimo u vlastitom pogonu u Laktašima i isporučujemo gotovo — uz montažu po potrebi."
          />
          <div className="mt-10">
            <ServicesGrid />
          </div>
        </div>
      </section>

      {/* FAQ + quote */}
      <section className="container-lec py-12 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading eyebrow="Česta pitanja" title={`LEC u ${c.nameLocative} — pitanja i odgovori`} />
            <div className="mt-8">
              <FaqAccordion faqs={c.faqs} />
            </div>
          </div>
          <div id="ponuda" className="scroll-mt-28">
            <QuoteForm defaultCity={c.name} source={`lokacija:${c.slug}`} />
          </div>
        </div>
      </section>

      {/* Sibling cities */}
      {siblings.length > 0 && (
        <section className="container-lec pb-16 lg:pb-24">
          <SectionHeading eyebrow="Ostali gradovi" title={`LEC i u drugim gradovima — ${c.country}`} />
          <div className="mt-8 flex flex-wrap gap-2.5">
            {siblings.map((s) => (
              <Link
                key={s.slug}
                href={`/lokacije/${s.slug}`}
                className="group flex items-center gap-2 rounded-full border border-line bg-black/[0.02] px-4 py-2 text-sm text-muted transition-all hover:border-laser/40 hover:text-ink"
              >
                <MapPin className="h-3.5 w-3.5 text-laser/70" />
                {s.name}
              </Link>
            ))}
            <Link href="/lokacije" className="flex items-center gap-1.5 rounded-full bg-laser/10 px-4 py-2 text-sm font-medium text-laser ring-1 ring-laser/20">
              Sve lokacije <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
