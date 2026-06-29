import Link from "next/link";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { SITE, WHATSAPP_URL } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

/** Reusable conversion band. Appears near the bottom of most pages. */
export function CtaBand({
  title = "Imate projekat na umu? Pretvorimo ga u proizvod.",
  text = "Pošaljite ideju, skicu ili samo opis — javljamo se s prijedlogom izrade, materijala i okvirne cijene. Bez obaveza.",
  cta = "Zatraži ponudu",
}: {
  title?: string;
  text?: string;
  cta?: string;
}) {
  return (
    <section className="container-lec py-16 lg:py-24">
      <Reveal>
        <div className="panel relative overflow-hidden p-8 sm:p-12 lg:p-16">
          <div className="spotlight-tr absolute inset-0" aria-hidden />
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 mask-fade-y" aria-hidden />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <span className="eyebrow">Spremni za sljedeći korak?</span>
              <h2 className="mt-4 max-w-2xl text-balance font-display text-3xl font-semibold leading-[1.1] tracking-tighter text-ink sm:text-4xl lg:text-[2.8rem]">
                {title}
              </h2>
              <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">{text}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/kontakt" className="btn-primary w-full justify-between text-base">
                {cta}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a href={`tel:${SITE.phonePrimary.tel}`} className="btn-ghost w-full justify-between text-base">
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-laser" /> {SITE.phonePrimary.display}
                </span>
                <span className="font-mono text-xs text-faint">Pozovi</span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost w-full justify-between text-base"
              >
                <span className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp / Viber
                </span>
                <span className="font-mono text-xs text-faint">Piši</span>
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
