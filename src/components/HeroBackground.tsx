"use client";

import { useLayoutEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NODES = [
  { x: "12%", y: "22%", delay: 0 },
  { x: "26%", y: "58%", delay: 0.4 },
  { x: "42%", y: "16%", delay: 1.1 },
  { x: "58%", y: "44%", delay: 0.7 },
  { x: "74%", y: "20%", delay: 1.6 },
  { x: "83%", y: "62%", delay: 0.2 },
  { x: "18%", y: "80%", delay: 1.3 },
  { x: "64%", y: "78%", delay: 0.9 },
];

export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);
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
    if (!section || !networkRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.4,
          },
        });
        // the network "powers down" as you scroll out of the hero —
        // a brief flicker before it fades, instead of a plain cross-fade
        tl.to(networkRef.current, { opacity: 0.5, duration: 0.4 })
          .to(networkRef.current, { opacity: 0.1, duration: 0.08 })
          .to(networkRef.current, { opacity: 0.45, duration: 0.07 })
          .to(networkRef.current, { opacity: 0.03, duration: 0.45 });
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
      <div ref={networkRef}>
        <motion.div
          style={{ x: gridX, y: gridY }}
          className="absolute -inset-8 opacity-[0.08]"
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

        {NODES.map((node, i) => (
          <span
            key={i}
            className="animate-node-breathe absolute size-1.5 rounded-full bg-signal"
            style={{
              left: node.x,
              top: node.y,
              animationDelay: `${node.delay}s`,
              boxShadow: "0 0 10px 2px rgba(252, 237, 79, 0.5)",
            }}
          />
        ))}

        <span
          className="animate-pulse-travel-x absolute left-[52%] top-[18%] hidden h-px w-1/3 bg-linear-to-r from-transparent via-signal to-transparent lg:block"
          style={{ boxShadow: "0 0 14px 2px rgba(252, 237, 79, 0.5)" }}
        />
        <span
          className="animate-pulse-travel-x absolute left-[58%] top-[78%] hidden h-px w-1/4 bg-linear-to-r from-transparent via-signal to-transparent lg:block"
          style={{
            animationDelay: "-3.2s",
            boxShadow: "0 0 14px 2px rgba(252, 237, 79, 0.5)",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-radial-[at_50%_30%] from-transparent via-ink/40 to-ink" />
    </div>
  );
}
