"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Global top progress bar — fires on every route change so navigation never
 * feels like a dead click. Pairs with per-route loading.tsx skeletons.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 650);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="route-progress"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ scaleX: 1, opacity: 0 }}
          transition={{ scaleX: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }, opacity: { duration: 0.2 } }}
        />
      )}
    </AnimatePresence>
  );
}
