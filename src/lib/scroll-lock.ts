"use client";

import { useEffect } from "react";

/**
 * Single, ref-counted owner of `document.body.style.overflow`.
 *
 * Multiple overlays (mobile menu, contact sheet, gallery lightbox) can be
 * mounted/active at once. Letting each write `body.style.overflow` directly
 * races: one closing restores "" while another is still open, or an overlapping
 * close strands the page at `overflow: hidden`. This hook makes the LAST active
 * lock the one that restores, and only snapshots the real prior value once.
 */
let lockCount = 0;
let original = "";

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    if (lockCount === 0) {
      original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    lockCount += 1;
    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) document.body.style.overflow = original;
    };
  }, [active]);
}
