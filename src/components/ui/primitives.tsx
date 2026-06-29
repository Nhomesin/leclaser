import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Mono eyebrow with a laser tick (uses the .eyebrow class). */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("eyebrow", className)}>{children}</span>;
}

/** Corner registration ticks — the "cut-mark" detail on framed elements. */
export function CornerTicks({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <span className="absolute left-2 top-2 h-3 w-3 border-l border-t border-laser/50" />
      <span className="absolute right-2 top-2 h-3 w-3 border-r border-t border-laser/50" />
      <span className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-laser/50" />
      <span className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-laser/50" />
    </span>
  );
}

/** A registration crosshair "+" mark. */
export function Crosshair({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("relative inline-block h-3.5 w-3.5", className)}>
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
    </span>
  );
}

/** Section heading block: eyebrow + title + optional intro, left or center aligned. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl", className)}>
      {eyebrow && (
        <div className={cn(align === "center" && "flex justify-center")}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.08] tracking-tighter text-ink sm:text-4xl md:text-[2.7rem]">
        {title}
      </h2>
      {intro && <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
    </div>
  );
}

/** Thin pill badge. */
export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line bg-black/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

/** Decorative animated laser line that sweeps across a thin track. */
export function LaserLine({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-px w-full overflow-hidden bg-line", className)} aria-hidden>
      <div className="absolute inset-y-0 left-0 w-1/3 animate-laser-sweep bg-gradient-to-r from-transparent via-laser to-transparent" />
    </div>
  );
}
