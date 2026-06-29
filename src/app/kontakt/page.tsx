import type { Metadata } from "next";
import { Phone, Mail, MapPin, Instagram, Clock, MessageCircle, Navigation, ArrowRight, Check } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { QuoteForm } from "@/components/QuoteForm";
import { Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { SITE, WHATSAPP_URL, VIBER_URL } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Kontakt — pozovite ili zatražite ponudu",
  description:
    "Kontaktirajte LEC: pozovite +387 65 644 939, pišite na WhatsApp/Viber ili pošaljite upit. Odgovor isti radni dan, isporuka u cijeloj regiji.",
  path: "/kontakt",
});

const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent("Šoše Mažara 40, 78250 Laktaši, Bosna i Hercegovina")}&output=embed`;
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Šoše Mažara 40, 78250 Laktaši")}`;

const TRUST = ["Od 2003. godine", "Odgovor isti radni dan", "Isporuka u cijeloj regiji"];

export default function KontaktPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Početna", url: SITE.baseUrl },
          { name: "Kontakt", url: `${SITE.baseUrl}/kontakt` },
        ])}
      />

      {/* ───────── ABOVE THE FOLD ───────── */}
      <section className="relative overflow-hidden border-b border-line pt-24 sm:pt-28 lg:pt-32">
        <div className="spotlight pointer-events-none absolute inset-0 -top-20" aria-hidden />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 mask-fade-y" aria-hidden />

        <div className="container-lec relative grid gap-10 pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14 lg:pb-16">
          {/* LEFT — pitch + direct contact CTAs */}
          <div>
            <Eyebrow>Kontakt</Eyebrow>
            <h1 className="mt-4 text-balance font-display text-3xl font-bold leading-[1.08] tracking-tightest text-ink sm:text-4xl lg:text-[3.1rem]">
              Zatražite ponudu.{" "}
              <span className="text-laser-grad">Javljamo se isti dan.</span>
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Pozovite, pišite na WhatsApp ili Viber, ili pošaljite upit — predlažemo izvedbu, materijal i okvirnu
              cijenu. Bez obaveza.
            </p>

            {/* DIRECT CTAs — green action color, biggest = phone */}
            <div className="mt-7 flex flex-col gap-3 sm:max-w-md">
              <a
                href={`tel:${SITE.phonePrimary.tel}`}
                className="group flex w-full items-center justify-between rounded-2xl bg-cta-grad px-5 py-4 text-white shadow-cta-soft transition-all duration-300 ease-precise hover:-translate-y-0.5 hover:shadow-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                aria-label={`Pozovite ${SITE.phonePrimary.display}`}
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col items-start leading-tight">
                    <span className="text-xs font-medium text-white/85">Pozovite odmah</span>
                    <span className="text-lg font-bold tracking-tight">{SITE.phonePrimary.display}</span>
                  </span>
                </span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#25D366]/25 transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-5 w-5" /> WhatsApp
                </a>
                <a
                  href={VIBER_URL}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#7360F2] px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#7360F2]/25 transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-5 w-5" /> Viber
                </a>
              </div>
            </div>

            {/* Trust row */}
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {TRUST.map((t) => (
                <li key={t} className="flex items-center gap-1.5 text-sm text-muted">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-cta/15 text-cta">
                    <Check className="h-3 w-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            {/* E-mail */}
            <div className="mt-6 text-sm text-muted">
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-ink">
                <Mail className="h-4 w-4 text-laser" /> {SITE.email}
              </a>
            </div>
          </div>

          {/* RIGHT — short form for those who prefer to write */}
          <Reveal delay={0.05}>
            <div id="ponuda">
              <div className="mb-3">
                <h2 className="font-display text-lg font-semibold text-ink">Radije pišete? Pošaljite upit</h2>
                <p className="mt-1 text-sm text-muted">Odgovaramo s ponudom isti radni dan.</p>
              </div>
              <QuoteForm compact source="kontakt" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── BELOW THE FOLD — full details + map ───────── */}
      <section className="container-lec py-14 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailCard icon={MapPin} label="Adresa">
              <p className="text-base text-ink">{SITE.address.full}</p>
              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-cta hover:underline"
              >
                <Navigation className="h-4 w-4" /> Navigacija do nas
              </a>
            </DetailCard>

            <DetailCard icon={Clock} label="Radno vrijeme">
              <ul className="space-y-1 text-sm text-muted">
                {SITE.workingHours.map((w) => (
                  <li key={w.days} className="flex justify-between gap-3">
                    <span>{w.days}</span>
                    <span className="text-ink">{w.hours}</span>
                  </li>
                ))}
              </ul>
            </DetailCard>

            <DetailCard icon={Phone} label="Telefon">
              <a href={`tel:${SITE.phonePrimary.tel}`} className="block text-base font-semibold text-ink hover:text-cta">
                {SITE.phonePrimary.display}
              </a>
            </DetailCard>

            <DetailCard icon={Instagram} label="Instagram">
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="text-base font-medium text-ink hover:text-cta">
                {SITE.instagramHandle}
              </a>
            </DetailCard>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-2xl border border-line">
            <iframe
              src={MAP_SRC}
              title="LEC lokacija — Laktaši"
              className="h-full min-h-[320px] w-full grayscale-[0.2]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function DetailCard({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="panel p-5">
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
        <Icon className="h-3.5 w-3.5 text-laser" />
        {label}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
