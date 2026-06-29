"use client";

import { useState } from "react";
import { Phone, Send, CheckCircle2, MessageCircle, Loader2, ShieldCheck, Clock } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { SERVICES, SITE, WHATSAPP_URL } from "@/lib/site";

const SERVICE_OPTIONS = [
  ...SERVICES.map((s) => ({ value: s.slug, label: s.name })),
  { value: "svjetlece-reklame", label: "Svjetleće reklame / logotipi" },
  { value: "reklamne-table", label: "Reklamne table / totemi" },
  { value: "pos-displeji", label: "POS displeji / stalci" },
  { value: "pleksiglas-proizvodi", label: "Pleksiglas proizvodi" },
  { value: "drugo", label: "Nešto drugo / nisam siguran" },
];

export function QuoteForm({
  defaultService,
  defaultCity,
  source = "kontakt",
  compact = false,
}: {
  defaultService?: string;
  defaultCity?: string;
  source?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [service, setService] = useState(defaultService ?? "");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: defaultCity ?? "",
    message: "",
    company: "", // honeypot
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.company) return; // bot
    if (!form.name.trim() || !form.phone.trim()) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, service, source }),
      });
      if (!res.ok) throw new Error("bad");
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="panel flex flex-col items-center gap-4 p-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-laser/15 text-laser">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <div>
          <h3 className="font-display text-xl font-semibold text-ink">Upit je poslan — hvala!</h3>
          <p className="mt-2 text-sm text-muted">
            Javljamo se u najkraćem roku, obično isti radni dan. Ako vam je hitno, pozovite nas direktno.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <a href={`tel:${SITE.phonePrimary.tel}`} className="btn-primary">
            <Phone className="h-4 w-4" /> {SITE.phonePrimary.display}
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="panel p-5 sm:p-7">
      {!compact && (
        <div className="mb-5">
          <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">Zatražite besplatnu ponudu</h3>
          <p className="mt-1.5 text-sm text-muted">
            Opišite projekat — javljamo se s prijedlogom izrade, materijala i okvirne cijene.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <Field label="Ime i prezime *">
          <input
            value={form.name}
            onChange={update("name")}
            required
            autoComplete="name"
            className="input"
            placeholder="Vaše ime"
          />
        </Field>
        <Field label="Telefon *">
          <input
            value={form.phone}
            onChange={update("phone")}
            required
            type="tel"
            autoComplete="tel"
            className="input"
            placeholder="+387 6x xxx xxx"
          />
        </Field>
        <Field label="E-mail">
          <input
            value={form.email}
            onChange={update("email")}
            type="email"
            autoComplete="email"
            className="input"
            placeholder="vas@email.com"
          />
        </Field>
        <Field label="Grad">
          <input value={form.city} onChange={update("city")} className="input" placeholder="npr. Banja Luka" />
        </Field>
        <Field label="Šta vam treba?" full>
          <Select options={SERVICE_OPTIONS} value={service} onChange={setService} placeholder="Odaberite uslugu / proizvod" />
        </Field>
        <Field label="Poruka" full>
          <textarea
            value={form.message}
            onChange={update("message")}
            rows={compact ? 3 : 4}
            className="input resize-none"
            placeholder="Količina, dimenzije, materijal, rok… (ili priložite ideju)"
          />
        </Field>
      </div>

      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={form.company}
        onChange={update("company")}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden
      />

      {status === "error" && (
        <p className="mt-3 text-sm text-laser-400">Provjerite ime i broj telefona, pa pokušajte ponovo — ili nas direktno pozovite.</p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-primary mt-4 w-full disabled:opacity-70">
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Šaljem…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Pošalji upit
          </>
        )}
      </button>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-faint">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-laser/70" /> Odgovor isti radni dan
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-laser/70" /> Bez obaveza, podaci ostaju kod nas
        </span>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(10, 10, 10, 0.12);
          background: #ffffff;
          padding: 0.7rem 1rem;
          font-size: 0.875rem;
          color: #0a0a0a;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        :global(.input::placeholder) {
          color: #8c8f94;
        }
        :global(.input:focus) {
          outline: none;
          border-color: #f58634;
          box-shadow: 0 0 0 3px rgba(245, 134, 52, 0.15);
        }
      `}</style>
    </form>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`flex flex-col gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-xs font-medium uppercase tracking-wider text-faint">{label}</span>
      {children}
    </label>
  );
}
