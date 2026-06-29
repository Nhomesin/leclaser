"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollLock } from "@/lib/scroll-lock";

/** Responsive photo gallery with a lightbox. Real LEC product photography. */
export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(() => setOpen((i) => (i === null ? i : (i + 1) % images.length)), [images.length]);
  const prev = useCallback(() => setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length)), [images.length]);

  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useScrollLock(open !== null);

  useEffect(() => {
    if (open === null) return;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      restoreFocusRef.current?.focus();
    };
  }, [open, close, next, prev]);

  if (!images.length) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={(e) => {
              restoreFocusRef.current = e.currentTarget;
              setOpen(i);
            }}
            className="group relative aspect-square overflow-hidden rounded-xl border border-line bg-bg2"
            aria-label={`Otvori sliku ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${alt} — fotografija ${i + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 ease-precise group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-laser/0 transition-colors duration-300 group-hover:bg-laser/10" aria-hidden />
            <span className="absolute left-2 top-2 h-3 w-3 border-l border-t border-white/0 transition-colors group-hover:border-white/70" aria-hidden />
            <span className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-white/0 transition-colors group-hover:border-white/70" aria-hidden />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button ref={closeBtnRef} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" onClick={close} aria-label="Zatvori">
            <X className="h-5 w-5" />
          </button>
          <button
            className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Prethodna"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Sljedeća"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="relative h-[78vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image src={images[open]} alt={`${alt} — uvećana fotografija`} fill sizes="90vw" className="object-contain" />
          </div>
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-xs text-white/60">
            {open + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
