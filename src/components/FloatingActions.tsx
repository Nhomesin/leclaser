"use client";

import { useEffect, useState } from "react";
import { Phone, MessageCircle, X, Plus } from "lucide-react";
import { SITE, WHATSAPP_URL, VIBER_URL } from "@/lib/site";

/**
 * Mobile-first floating contact dock. Always-visible call button + expandable
 * WhatsApp/Viber — the Balkan default for B2B contact. Reduces friction to lead.
 */
export function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setShow(window.scrollY > 480);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-4 z-50 hidden flex-col items-end gap-3 transition-all duration-300 sm:bottom-6 sm:right-6 lg:flex ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      {open && (
        <div className="flex flex-col items-end gap-2.5">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 rounded-full bg-[#25D366] py-2.5 pl-4 pr-3 text-sm font-semibold text-white shadow-lg shadow-black/40 transition-transform hover:scale-105"
            aria-label="Pošalji WhatsApp poruku"
          >
            WhatsApp
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <MessageCircle className="h-4 w-4" />
            </span>
          </a>
          <a
            href={VIBER_URL}
            className="group flex items-center gap-2.5 rounded-full bg-[#7360F2] py-2.5 pl-4 pr-3 text-sm font-semibold text-white shadow-lg shadow-black/40 transition-transform hover:scale-105"
            aria-label="Pošalji Viber poruku"
          >
            Viber
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <MessageCircle className="h-4 w-4" />
            </span>
          </a>
          <a
            href={`tel:${SITE.phonePrimary.tel}`}
            className="group flex items-center gap-2.5 rounded-full bg-ink py-2.5 pl-4 pr-3 text-sm font-semibold text-white shadow-lg shadow-black/25 transition-transform hover:scale-105"
            aria-label={`Pozovi ${SITE.phonePrimary.display}`}
          >
            Pozovi
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <Phone className="h-4 w-4" />
            </span>
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-laser-grad text-white shadow-glow transition-transform hover:scale-105 active:scale-95"
        aria-expanded={open}
        aria-label={open ? "Zatvori kontakt meni" : "Otvori brzi kontakt"}
      >
        {open ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </button>
    </div>
  );
}
