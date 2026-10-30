"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { PRELOADER_SECONDS } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      // text follows the hero pipeline's draw-in (bars + logo + connector,
      // ~1.65s) so it reads as a sequence, not simultaneous clutter.
      delayChildren: PRELOADER_SECONDS + 1.85,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function HeroEntrance({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      variants={reduce ? undefined : container}
      initial={reduce ? undefined : "hidden"}
      animate={reduce ? undefined : "show"}
    >
      {children}
    </motion.div>
  );
}

export function HeroEntranceItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      variants={reduce ? undefined : item}
      className={className}
    >
      {children}
    </motion.div>
  );
}
