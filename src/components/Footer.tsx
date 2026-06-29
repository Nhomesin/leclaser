import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, ArrowUpRight } from "lucide-react";
import { SITE, SERVICES, PORTFOLIO } from "@/lib/site";
import { LOGO } from "@/data/images";
import { LaserLine } from "@/components/ui/primitives";

const FOOTER_CITIES = [
  { name: "Banja Luka", slug: "banja-luka" },
  { name: "Sarajevo", slug: "sarajevo" },
  { name: "Beograd", slug: "beograd" },
  { name: "Novi Sad", slug: "novi-sad" },
  { name: "Zagreb", slug: "zagreb" },
  { name: "Podgorica", slug: "podgorica" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-bg2">
      <div className="container-lec py-14 lg:py-20">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5" aria-label="LEC početna">
              <Image src={LOGO.src} width={LOGO.width} height={LOGO.height} alt="LEC" className="h-9 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{SITE.shortDesc}</p>
            <div className="mt-5 flex flex-col gap-2.5 text-sm">
              <a href={`tel:${SITE.phonePrimary.tel}`} className="group flex items-center gap-2.5 text-muted hover:text-ink">
                <Phone className="h-4 w-4 text-laser" />
                {SITE.phonePrimary.display}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 text-muted hover:text-ink">
                <Mail className="h-4 w-4 text-laser" />
                {SITE.email}
              </a>
              <span className="flex items-start gap-2.5 text-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-laser" />
                {SITE.address.full}
              </span>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-muted hover:text-ink"
              >
                <Instagram className="h-4 w-4 text-laser" />
                {SITE.instagramHandle}
              </a>
            </div>
          </div>

          {/* Usluge */}
          <FooterCol title="Usluge">
            {SERVICES.map((s) => (
              <FooterLink key={s.slug} href={`/usluge/${s.slug}`}>
                {s.name}
              </FooterLink>
            ))}
          </FooterCol>

          {/* Portfolio */}
          <FooterCol title="Portfolio">
            {PORTFOLIO.map((p) => (
              <FooterLink key={p.slug} href={`/portfolio/${p.slug}`}>
                {p.name}
              </FooterLink>
            ))}
          </FooterCol>

          {/* Lokacije + firma */}
          <FooterCol title="Lokacije">
            {FOOTER_CITIES.map((c) => (
              <FooterLink key={c.slug} href={`/lokacije/${c.slug}`}>
                {c.name}
              </FooterLink>
            ))}
            <FooterLink href="/lokacije">
              <span className="text-laser">Sve lokacije →</span>
            </FooterLink>
          </FooterCol>

          <FooterCol title="Firma">
            <FooterLink href="/o-nama">O nama</FooterLink>
            <FooterLink href="/usluge">Usluge</FooterLink>
            <FooterLink href="/portfolio">Portfolio</FooterLink>
            <FooterLink href="/kontakt">Kontakt</FooterLink>
            <FooterLink href="/politika-privatnosti">Politika privatnosti</FooterLink>
          </FooterCol>
        </div>

        <div className="my-10">
          <LaserLine />
        </div>

        <div className="flex flex-col items-start justify-between gap-4 text-xs text-faint sm:flex-row sm:items-center">
          <p>
            © {SITE.founded}–{new Date().getFullYear()} {SITE.legalName}. Sva prava zadržana.
          </p>
          <div className="flex items-center gap-4">
            <span>Isporuka: BiH · Srbija · Hrvatska · Crna Gora</span>
            <Link href="/kontakt" className="inline-flex items-center gap-1 font-medium text-laser hover:underline">
              Zatraži ponudu <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <h4 className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">{title}</h4>
      <ul className="flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-muted transition-colors hover:text-ink">
        {children}
      </Link>
    </li>
  );
}
