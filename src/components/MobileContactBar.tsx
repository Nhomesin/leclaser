"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Phone, X } from "lucide-react";
import { SITE, WHATSAPP_URL, VIBER_URL } from "@/lib/site";
import { useScrollLock } from "@/lib/scroll-lock";

/**
 * Mobile/tablet sticky contact bar + choice sheet.
 * A single "Pozovi sada" action opens a bottom-sheet where the visitor picks the
 * channel to call OR message — phone (both numbers), WhatsApp, or Viber.
 * Desktop keeps the header CTAs + floating dock; this is `lg:hidden`.
 */

type Channel = {
  key: string;
  label: string;
  sub: string;
  href: string;
  external?: boolean;
  badgeClass: string;
  icon: "phone" | "message";
};

const CHANNELS: Channel[] = [
  {
    key: "call-primary",
    label: "Pozovite",
    sub: SITE.phonePrimary.display,
    href: `tel:${SITE.phonePrimary.tel}`,
    badgeClass: "bg-ink text-white",
    icon: "phone",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    sub: "Pošaljite poruku ili pozovite",
    href: WHATSAPP_URL,
    external: true,
    badgeClass: "bg-[#25D366] text-white",
    icon: "message",
  },
  {
    key: "viber",
    label: "Viber",
    sub: "Poruka ili poziv",
    href: VIBER_URL,
    badgeClass: "bg-[#7360F2] text-white",
    icon: "message",
  },
];

function ChannelIcon({ icon }: { icon: Channel["icon"] }) {
  return icon === "phone" ? <Phone className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />;
}

export function MobileContactBar() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const close = useCallback(() => setOpen(false), []);
  const sheetCloseRef = useRef<HTMLButtonElement>(null);

  useScrollLock(open);

  // Move focus into the sheet, trap Tab, close on Escape, restore focus on close.
  useEffect(() => {
    if (!open) return;
    const restoreTo = document.activeElement as HTMLElement | null;
    sheetCloseRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const f = Array.from(
        document.querySelectorAll<HTMLElement>('[data-contact-sheet] a[href], [data-contact-sheet] button')
      ).filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      restoreTo?.focus();
    };
  }, [open]);

  return (
    <>
      {/* Sticky bottom bar — mobile/tablet only */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 lg:hidden">
        <div
          className="container-lec pt-2.5"
          style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            className="btn-primary w-full justify-between gap-3 py-3.5 text-base"
          >
            <span className="flex items-center gap-2.5">
              <Phone className="h-5 w-5" />
              Pozovi sada
            </span>
            <span className="flex items-center gap-1.5" aria-hidden>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                <Phone className="h-3.5 w-3.5" />
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366]">
                <MessageCircle className="h-3.5 w-3.5" />
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7360F2]">
                <MessageCircle className="h-3.5 w-3.5" />
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* Channel choice sheet */}
      <AnimatePresence>
        {open && (
          <div
            className="fixed inset-0 z-[60] lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Kontaktirajte LEC"
            data-contact-sheet
          >
            <motion.div
              className="absolute inset-0 bg-ink/55"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
            />
            <motion.div
              className="absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-line bg-panel p-5 shadow-panel"
              style={{ paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
              initial={reduce ? { opacity: 0 } : { y: "100%" }}
              animate={reduce ? { opacity: 1 } : { y: 0 }}
              exit={reduce ? { opacity: 0 } : { y: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 340 }}
            >
              <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-line" aria-hidden />
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-lg font-bold text-ink">Pozovite ili pišite</h2>
                  <p className="mt-0.5 text-sm text-muted">Izaberite kanal koji vam odgovara.</p>
                </div>
                <button
                  ref={sheetCloseRef}
                  type="button"
                  onClick={close}
                  aria-label="Zatvori"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col gap-2.5">
                {CHANNELS.map((c) => (
                  <a
                    key={c.key}
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={close}
                    className="group flex items-center gap-3.5 rounded-2xl border border-line bg-bg px-4 py-3.5 transition-colors hover:border-black/20 hover:bg-black/[0.02]"
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${c.badgeClass}`}
                    >
                      <ChannelIcon icon={c.icon} />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-base font-semibold text-ink">{c.label}</span>
                      <span className="text-sm text-muted">{c.sub}</span>
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
