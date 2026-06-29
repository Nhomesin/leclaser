import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Politika privatnosti",
  description: "Kako LEC prikuplja i koristi podatke iz kontakt forme i upita.",
  path: "/politika-privatnosti",
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Pravno"
        title="Politika privatnosti"
        intro="Vaše povjerenje nam je važno. Ovdje objašnjavamo koje podatke prikupljamo i kako ih koristimo."
        crumbs={[{ name: "Politika privatnosti", href: "/politika-privatnosti" }]}
        showCta={false}
      />

      <section className="container-lec py-14 lg:py-20">
        <div className="prose-lec max-w-prose space-y-8 text-muted">
          <Block title="Koje podatke prikupljamo">
            Kada popunite kontakt formu ili nas kontaktirate, prikupljamo podatke koje nam dobrovoljno ostavite: ime,
            broj telefona, e-mail adresu, grad i opis vašeg upita. Ne tražimo niti prikupljamo osjetljive lične podatke.
          </Block>
          <Block title="Kako koristimo podatke">
            Podatke koristimo isključivo da odgovorimo na vaš upit, pripremimo ponudu i realizujemo posao. Ne
            prodajemo, ne iznajmljujemo i ne ustupamo vaše podatke trećim stranama u marketinške svrhe.
          </Block>
          <Block title="Čuvanje podataka">
            Podatke iz upita čuvamo onoliko koliko je potrebno za komunikaciju i realizaciju posla, te u skladu sa
            zakonskim obavezama. Možete u svakom trenutku zatražiti uvid, ispravku ili brisanje svojih podataka.
          </Block>
          <Block title="Kolačići">
            Stranica koristi samo neophodne tehničke kolačiće potrebne za ispravan rad. Eventualni alati za analitiku
            koriste se isključivo radi poboljšanja sadržaja i ne identifikuju vas lično.
          </Block>
          <Block title="Kontakt">
            Za sva pitanja u vezi s privatnošću kontaktirajte nas na{" "}
            <a href={`mailto:${SITE.email}`} className="text-laser hover:underline">
              {SITE.email}
            </a>{" "}
            ili na {SITE.phonePrimary.display}. Adresa: {SITE.address.full}.
          </Block>
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
      <p className="mt-3 text-base leading-relaxed">{children}</p>
    </div>
  );
}
