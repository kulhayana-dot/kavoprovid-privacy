"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { RevealText } from "@/components/RevealText";

const RADIUS = 150;
const CENTER = 200;
const POINT_COUNT = 8;

const POINTS = Array.from({ length: POINT_COUNT }, (_, i) => {
  const angle = (i / POINT_COUNT) * Math.PI * 2 - Math.PI / 2;
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
});

// Absolute delays mirror the original GSAP timeline's relative offsets:
// the ring draws first, spokes start 0.7s before it finishes (staggered
// 0.06s apart), and dots pop in starting 0.5s before the spokes finish.
const RING_DURATION = 1;
const SPOKE_START = RING_DURATION - 0.7;
const SPOKE_DURATION = 0.6;
const SPOKE_STAGGER = 0.06;
const SPOKES_END = SPOKE_START + (POINT_COUNT - 1) * SPOKE_STAGGER + SPOKE_DURATION;
const DOT_START = SPOKES_END - 0.5;

export function Coverage() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(sectionRef, { once: true, margin: "0px 0px -25% 0px" });
  const play = reduced || inView;

  return (
    <section
      id="coverage"
      ref={sectionRef}
      className="relative overflow-hidden bg-ink py-28 text-paper sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="max-w-xl">
            <span className="font-label text-xs uppercase tracking-widest text-paper/50">
              Де ми працюємо
            </span>
            <RevealText
              as="h2"
              className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Одна область. Завжди на зв&apos;язку.
            </RevealText>
            <p className="mt-5 text-paper/55">
              Свідомо працюємо тільки в Києві та Київській області — щоб
              бути поруч, а не десь на іншому кінці країни. Хто веде ваш
              об&apos;єкт і кому дзвонити — завжди зрозуміло.
            </p>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md">
            <svg
              viewBox="0 0 400 400"
              className="h-full w-full"
              aria-hidden="true"
            >
              <motion.circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={1.5}
                initial={reduced ? false : { pathLength: 0 }}
                animate={play ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: RING_DURATION, ease: "easeOut" }}
              />

              {POINTS.map((p, i) => (
                <motion.line
                  key={i}
                  x1={CENTER}
                  y1={CENTER}
                  x2={p.x}
                  y2={p.y}
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth={1}
                  initial={reduced ? false : { pathLength: 0 }}
                  animate={play ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{
                    duration: SPOKE_DURATION,
                    ease: "easeOut",
                    delay: SPOKE_START + i * SPOKE_STAGGER,
                  }}
                />
              ))}

              {POINTS.map((p, i) => (
                <motion.circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  className="fill-paper/50"
                  initial={reduced ? false : { opacity: 0, r: 0 }}
                  animate={play ? { opacity: 1, r: 5 } : { opacity: 0, r: 0 }}
                  transition={{
                    duration: 0.35,
                    ease: "backOut",
                    delay: DOT_START + i * SPOKE_STAGGER,
                  }}
                />
              ))}

              <circle cx={CENTER} cy={CENTER} r={20} className="fill-signal" />
            </svg>

            <span
              className="font-display pointer-events-none absolute -translate-x-1/2 translate-y-4 text-xs font-bold uppercase tracking-widest text-signal"
              style={{
                left: `${(CENTER / 400) * 100}%`,
                top: `${(CENTER / 400) * 100}%`,
              }}
            >
              Київ
            </span>

            <span
              className="font-label pointer-events-none absolute -translate-x-1/2 -translate-y-full text-xs uppercase tracking-widest text-paper/50"
              style={{
                left: `${(CENTER / 400) * 100}%`,
                top: `${((CENTER - RADIUS) / 400) * 100}%`,
              }}
            >
              та Київська область
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
