"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TIMELINE } from "@/lib/site";
import { cn } from "@/lib/cn";

/** Interactive 2003→now timeline. Click a year to reveal the milestone. */
export function Timeline() {
  const [active, setActive] = useState(TIMELINE.length - 1);

  return (
    <div>
      {/* Year rail */}
      <div className="mask-fade-x relative overflow-x-auto pb-2">
        <div className="flex min-w-max items-center gap-0">
          {TIMELINE.map((t, i) => {
            const isActive = i === active;
            return (
              <div key={t.year} className="flex items-center">
                <button
                  onClick={() => setActive(i)}
                  className="group relative flex flex-col items-center px-4 sm:px-7"
                  aria-pressed={isActive}
                >
                  <span
                    className={cn(
                      "font-display text-xl font-bold tracking-tight transition-colors sm:text-2xl",
                      isActive ? "text-laser" : "text-black/25 group-hover:text-black/40"
                    )}
                  >
                    {t.year}
                  </span>
                  <span
                    className={cn(
                      "mt-3 h-3 w-3 rounded-full border-2 transition-all",
                      isActive ? "border-laser bg-laser shadow-glow-soft" : "border-black/15 bg-bg group-hover:border-black/25"
                    )}
                  />
                </button>
                {i < TIMELINE.length - 1 && <span className="h-px w-8 bg-line sm:w-12" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active milestone */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        className="panel mt-8 p-7 sm:p-9"
      >
        <div className="flex items-baseline gap-4">
          <span className="font-display text-4xl font-bold tracking-tighter text-laser sm:text-5xl">{TIMELINE[active].year}</span>
          <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">{TIMELINE[active].title}</h3>
        </div>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">{TIMELINE[active].text}</p>
      </motion.div>
    </div>
  );
}
