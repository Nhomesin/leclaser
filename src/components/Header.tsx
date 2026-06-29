"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Phone, Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { LOGO } from "@/data/images";
import { cn } from "@/lib/cn";
import { useScrollLock } from "@/lib/scroll-lock";

const EASE = [0.2, 0.8, 0.2, 1] as const;

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="group flex items-center gap-2.5" aria-label="LEC početna">
      <Image
        src={LOGO.src}
        width={LOGO.width}
        height={LOGO.height}
        alt="LEC — precizna proizvodnja"
        priority
        className="h-8 w-auto sm:h-9"
      />
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setScrolled(window.scrollY > 16);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useScrollLock(mobileOpen);

  // Move focus into the drawer when it opens, trap Tab, restore focus on close.
  useEffect(() => {
    if (!mobileOpen) return;
    const restoreTo = document.activeElement as HTMLElement | null;
    drawerCloseRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const f = Array.from(
        document.querySelectorAll<HTMLElement>('[data-mobile-drawer] a[href], [data-mobile-drawer] button')
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
  }, [mobileOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-line bg-bg/90 lg:backdrop-blur-xl" : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container-lec flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setOpenMenu(null)}>
          {NAV.map((item) => (
            <div key={item.href} className="relative" onMouseEnter={() => setOpenMenu(item.children ? item.label : null)}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive(item.href) ? "text-ink" : "text-muted hover:text-ink"
                )}
              >
                {item.label}
                {item.children && (
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 opacity-60 transition-transform duration-300",
                      openMenu === item.label && "rotate-180"
                    )}
                  />
                )}
                {isActive(item.href) && <span className="absolute inset-x-3.5 -bottom-px h-px bg-laser" />}
              </Link>

              <AnimatePresence>
                {item.children && openMenu === item.label && (
                  <motion.div
                    className="absolute left-0 top-full origin-top pt-3"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.22, ease: EASE }}
                  >
                    <motion.div
                      className="w-[420px] overflow-hidden rounded-2xl border border-line bg-panel/95 p-2 shadow-panel backdrop-blur-xl"
                      initial="hidden"
                      animate="show"
                      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
                    >
                      {item.children.map((c) => (
                        <motion.div
                          key={c.href}
                          variants={{
                            hidden: reduce ? { opacity: 0 } : { opacity: 0, x: -8 },
                            show: { opacity: 1, x: 0, transition: { duration: 0.25, ease: EASE } },
                          }}
                        >
                          <Link
                            href={c.href}
                            className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-black/[0.03]"
                          >
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-laser/70 transition-transform group-hover:scale-150" />
                            <span className="flex flex-col">
                              <span className="text-sm font-medium text-ink">{c.label}</span>
                              {c.desc && <span className="mt-0.5 text-xs leading-snug text-faint">{c.desc}</span>}
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                      <motion.div
                        variants={{
                          hidden: reduce ? { opacity: 0 } : { opacity: 0, x: -8 },
                          show: { opacity: 1, x: 0, transition: { duration: 0.25, ease: EASE } },
                        }}
                      >
                        <Link
                          href={item.href}
                          className="mt-1 flex items-center justify-between rounded-xl bg-black/[0.03] px-3 py-2.5 text-sm font-medium text-laser hover:bg-black/[0.05]"
                        >
                          Pogledaj sve
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Desktop CTA cluster */}
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={`tel:${SITE.phonePrimary.tel}`}
            className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <Phone className="h-4 w-4 text-laser" />
            {SITE.phonePrimary.display}
          </a>
          <Link href="/kontakt" className="btn-primary text-sm">
            Zatraži ponudu
          </Link>
        </div>

        {/* Mobile CTA + toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/kontakt" className="btn-primary px-4 py-2 text-sm">
            Ponuda
          </Link>
          <button
            className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Zatvori meni" : "Otvori meni"}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence initial={false} mode="wait">
              {mobileOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile drawer — full-screen, slides in from the right, own X button */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            className="fixed inset-0 z-[60] flex h-[100dvh] w-full flex-col bg-bg lg:hidden"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "spring", stiffness: 360, damping: 40 }}
            aria-label="Glavni meni"
            role="dialog"
            aria-modal="true"
            data-mobile-drawer
          >
            {/* Drawer top bar with logo + close */}
            <div className="container-lec flex h-16 shrink-0 items-center justify-between border-b border-line">
              <Logo onClick={() => setMobileOpen(false)} />
              <button
                ref={drawerCloseRef}
                onClick={() => setMobileOpen(false)}
                aria-label="Zatvori meni"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:bg-black/[0.04]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable menu content (staggered in) */}
            <motion.div
              className="container-lec flex flex-1 flex-col overflow-y-auto pt-6"
              style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03, delayChildren: 0.04 } } }}
            >
              {NAV.map((item) => (
                <motion.div
                  key={item.href}
                  className="border-b border-line/60 py-1.5"
                  variants={{
                    hidden: reduce ? { opacity: 0 } : { opacity: 0, x: 12 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.2, ease: EASE } },
                  }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between py-3 text-lg font-semibold",
                      isActive(item.href) ? "text-laser" : "text-ink"
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="mb-2 ml-1 flex flex-col gap-0.5 border-l border-line pl-4">
                      {item.children.map((c) => (
                        <Link key={c.href} href={c.href} className="py-2 text-[15px] text-muted">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              <motion.div
                className="mt-auto flex flex-col gap-3 pt-8"
                variants={{
                  hidden: reduce ? { opacity: 0 } : { opacity: 0, x: 12 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.2, ease: EASE } },
                }}
              >
                <Link href="/kontakt" className="btn-primary w-full text-base">
                  Zatraži ponudu
                </Link>
                <a href={`tel:${SITE.phonePrimary.tel}`} className="btn-ghost w-full text-base">
                  <Phone className="h-4 w-4 text-laser" />
                  {SITE.phonePrimary.display}
                </a>
              </motion.div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
