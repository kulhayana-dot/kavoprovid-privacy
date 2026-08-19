"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { PRELOADER_SECONDS } from "@/lib/motion";

// The wordmark lockup's own bars sit at these vertical bands within its
// viewBox (0 190 566.929 100): top bar 11–29%, bottom bar 66–84%. Full-bleed
// bars are positioned at the same bands, behind the logo, so they read as
// the same two lines continuing past the wordmark rather than a second,
// unrelated pair.
const TOP_BAND = { top: "11%", height: "18%" };
const BOTTOM_BAND = { top: "66%", height: "18%" };

const BASE_DELAY = PRELOADER_SECONDS + 0.15;
// Sequence timings mirror the original GSAP timeline's overlaps: bars run
// first (bottom starting slightly after top), the logo fades in over the
// bars' last ~half-second, and the connector follows just before the logo
// settles.
const TOP_BAR_DELAY = BASE_DELAY;
const BOTTOM_BAR_DELAY = BASE_DELAY + 0.1;
const LOGO_DELAY = BASE_DELAY + 0.65;
const CONNECTOR_DELAY = BASE_DELAY + 1.25;

/**
 * The official Kavoprovid wordmark is already "KAVOPROVID" sandwiched
 * between two signal-yellow bars. This renders that lockup untouched and
 * full-bleed bars behind it, in the same two bands, so the logo's own bars
 * appear to keep running edge to edge — the wordmark sitting in the middle
 * of its own infrastructure, not redrawn or reconstructed.
 */
export function HeroPipeline() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -14]);

  return (
    <div ref={rootRef} className="relative w-full">
      <div className="relative flex h-9 items-center justify-center sm:h-14 md:h-20 lg:h-24 xl:h-28">
        <motion.div
          className="pipe-flow-x absolute inset-x-0"
          style={TOP_BAND}
          initial={reduced ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut", delay: TOP_BAR_DELAY }}
          aria-hidden="true"
        />
        <motion.div
          className="pipe-flow-x absolute inset-x-0"
          style={BOTTOM_BAND}
          initial={reduced ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut", delay: BOTTOM_BAR_DELAY }}
          aria-hidden="true"
        />

        {/* Outer div owns the scroll-linked parallax y; the inner img owns
            its own separate entrance animation — nesting keeps the two
            `y` transforms from fighting over the same motion value. */}
        <motion.div
          className="relative z-10 h-full"
          style={reduced ? undefined : { y: parallaxY }}
        >
          <motion.img
            src="/brand/kavoprovid-wordmark-dark.svg"
            width={566.929}
            height={100}
            alt="Kavoprovid"
            className="h-full w-auto"
            initial={reduced ? false : { opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: LOGO_DELAY }}
          />
        </motion.div>
      </div>

      <div className="flex justify-center">
        <motion.div
          className="h-8 w-px bg-paper/25 sm:h-10"
          initial={reduced ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: CONNECTOR_DELAY }}
          style={{ transformOrigin: "top" }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
