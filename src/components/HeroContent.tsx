"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroContent({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = ref.current?.closest("section");
    if (!section || !ref.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(ref.current, {
          opacity: 0,
          y: -60,
          scale: 0.96,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "55% top",
            scrub: 0.4,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
      {children}
    </div>
  );
}
