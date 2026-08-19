"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function HeroContent({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // scrollYProgress runs 0 (content top at viewport top) -> 1 (content
  // bottom at viewport top). The fade/lift finishes by 55% of that span —
  // same window the previous GSAP scrub ("top top" -> "55% top") covered.
  // useTransform clamps past the range, so it holds at fully faded out.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.55], [0, -60]);

  return (
    <motion.div
      ref={ref}
      className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-8"
      style={reduced ? undefined : { opacity, y }}
    >
      {children}
    </motion.div>
  );
}
