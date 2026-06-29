import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: "Početna", href: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(all.map((c) => ({ name: c.name, url: `${SITE.baseUrl}${c.href === "/" ? "" : c.href}` })))} />
      <nav aria-label="Putanja" className="flex flex-wrap items-center gap-1.5 text-xs text-faint">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <span key={c.href} className="flex items-center gap-1.5">
              {last ? (
                <span className="text-muted">{c.name}</span>
              ) : (
                <Link href={c.href} className="transition-colors hover:text-ink">
                  {c.name}
                </Link>
              )}
              {!last && <ChevronRight className="h-3 w-3 opacity-50" />}
            </span>
          );
        })}
      </nav>
    </>
  );
}
