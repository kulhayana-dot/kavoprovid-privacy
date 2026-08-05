"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealText } from "@/components/RevealText";

gsap.registerPlugin(ScrollTrigger);

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

export function Coverage() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const ring = svgRef.current?.querySelector<SVGCircleElement>("[data-ring]");
      const lines = svgRef.current?.querySelectorAll<SVGLineElement>("[data-spoke]");
      const dots = svgRef.current?.querySelectorAll<SVGCircleElement>("[data-point]");
      if (!ring || !lines || !dots) return;

      const ringLength = ring.getTotalLength();
      gsap.set(ring, { strokeDasharray: ringLength, strokeDashoffset: ringLength });
      gsap.set(lines, { strokeDasharray: RADIUS, strokeDashoffset: RADIUS });
      gsap.set(dots, { opacity: 0, scale: 0, transformOrigin: "center" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svgRef.current, start: "top 75%" },
      });

      tl.to(ring, { strokeDashoffset: 0, duration: 1, ease: "power2.out" })
        .to(
          lines,
          { strokeDashoffset: 0, duration: 0.6, ease: "power2.out", stagger: 0.06 },
          "-=0.7",
        )
        .to(
          dots,
          { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)", stagger: 0.06 },
          "-=0.5",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
              Одна область. Тому ми встигаємо.
            </RevealText>
            <p className="mt-5 text-paper/55">
              Свідомо працюємо тільки в Києві та Київській області — щоб
              технік доїжджав за годину, а не летів літаком. Підмінне
              обладнання приїжджає в лічені години, а не дні.
            </p>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md">
            <svg
              ref={svgRef}
              viewBox="0 0 400 400"
              className="h-full w-full"
              aria-hidden="true"
            >
              <circle
                data-ring
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={1.5}
              />

              {POINTS.map((p, i) => (
                <line
                  key={i}
                  data-spoke={i}
                  x1={CENTER}
                  y1={CENTER}
                  x2={p.x}
                  y2={p.y}
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth={1}
                />
              ))}

              {POINTS.map((p, i) => (
                <circle
                  key={i}
                  data-point={i}
                  cx={p.x}
                  cy={p.y}
                  r={5}
                  className="fill-paper/50"
                />
              ))}

              <circle cx={CENTER} cy={CENTER} r={20} className="fill-signal" />
            </svg>

            <span
              className="font-label pointer-events-none absolute -translate-x-1/2 translate-y-4 text-xs font-bold uppercase tracking-widest text-signal"
              style={{
                left: `${(CENTER / 400) * 100}%`,
                top: `${(CENTER / 400) * 100}%`,
              }}
            >
              Київ
            </span>

            <span
              className="font-label pointer-events-none absolute -translate-x-1/2 -translate-y-full text-[11px] uppercase tracking-widest text-paper/50"
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
