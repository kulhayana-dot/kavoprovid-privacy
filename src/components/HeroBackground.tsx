"use client";

import { useLayoutEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TICKS = [
  { x: "12%", y: "22%" },
  { x: "26%", y: "58%" },
  { x: "42%", y: "16%" },
  { x: "74%", y: "20%" },
  { x: "83%", y: "62%" },
  { x: "18%", y: "80%" },
  { x: "64%", y: "78%" },
];

const CALLOUTS = [
  { x: "58%", y: "42%", label: "15°" },
  { x: "77%", y: "70%", label: "0.35X" },
];

function Tick({ x, y }: { x: string; y: string }) {
  return (
    <span
      className="absolute block size-2.5"
      style={{ left: x, top: y }}
      aria-hidden="true"
    >
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-paper/25" />
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-paper/25" />
    </span>
  );
}

export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const schematicRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 40, damping: 20 });
  const springY = useSpring(my, { stiffness: 40, damping: 20 });
  const gridX = useTransform(springX, (v) => v * -1);
  const gridY = useTransform(springY, (v) => v * -1);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(relX * 18);
    my.set(relY * 18);
  }

  useLayoutEffect(() => {
    const section = ref.current?.closest("section");
    if (!section || !schematicRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(schematicRef.current, {
          opacity: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.4,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
    >
      <div ref={schematicRef}>
        <motion.div
          style={{ x: gridX, y: gridY }}
          className="absolute -inset-8 opacity-[0.1]"
        >
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </motion.div>

        {TICKS.map((t, i) => (
          <Tick key={i} x={t.x} y={t.y} />
        ))}

        {CALLOUTS.map((c, i) => (
          <span
            key={i}
            className="font-label absolute hidden text-xs tracking-widest text-paper/35 lg:block"
            style={{ left: c.x, top: c.y }}
          >
            {c.label}
          </span>
        ))}

        <span className="absolute left-[52%] top-[18%] hidden h-px w-1/3 bg-paper/20 lg:block">
          <span className="absolute -left-1 -top-[3px] h-[7px] w-px bg-paper/40" />
          <span className="absolute -right-1 -top-[3px] h-[7px] w-px bg-paper/40" />
        </span>
        <span className="absolute left-[58%] top-[78%] hidden h-px w-1/4 bg-paper/20 lg:block">
          <span className="absolute -left-1 -top-[3px] h-[7px] w-px bg-paper/40" />
          <span className="absolute -right-1 -top-[3px] h-[7px] w-px bg-paper/40" />
        </span>

        <div className="absolute left-0 top-[30%] h-[40%] w-px overflow-hidden bg-paper/15 lg:left-[8%]">
          <span
            className="animate-flow-travel absolute left-1/2 top-0 h-8 w-[3px] -translate-x-1/2 bg-signal"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-ink" />
    </div>
  );
}
