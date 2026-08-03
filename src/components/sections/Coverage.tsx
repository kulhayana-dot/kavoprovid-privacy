"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealText } from "@/components/RevealText";

gsap.registerPlugin(ScrollTrigger);

const RADIUS = 150;
const CENTER = 200;

const TOWNS = [
  "Бровари",
  "Ірпінь",
  "Буча",
  "Бориспіль",
  "Вишневе",
  "Обухів",
].map((name, i, arr) => {
  const angle = (i / arr.length) * Math.PI * 2 - Math.PI / 2;
  return {
    name,
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
});

export function Coverage() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const lines = svgRef.current?.querySelectorAll<SVGLineElement>(
        "[data-spoke]",
      );
      const dots = svgRef.current?.querySelectorAll<SVGCircleElement>(
        "[data-town]",
      );
      if (!lines || !dots) return;

      gsap.set(lines, { strokeDasharray: RADIUS, strokeDashoffset: RADIUS });
      gsap.set(dots, { opacity: 0, scale: 0, transformOrigin: "center" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svgRef.current, start: "top 75%" },
      });

      tl.to(lines, {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.12,
      }).to(
        dots,
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)", stagger: 0.12 },
        "-=0.6",
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
              {TOWNS.map((t, i) => (
                <line
                  key={t.name}
                  data-spoke={i}
                  x1={CENTER}
                  y1={CENTER}
                  x2={t.x}
                  y2={t.y}
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth={1.5}
                />
              ))}

              {TOWNS.map((t) => (
                <circle
                  key={t.name}
                  data-town={t.name}
                  cx={t.x}
                  cy={t.y}
                  r={7}
                  className="fill-paper"
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

            {TOWNS.map((t) => (
              <span
                key={t.name}
                className="font-label pointer-events-none absolute -translate-x-1/2 translate-y-3 text-[11px] uppercase tracking-widest text-paper/60"
                style={{
                  left: `${(t.x / 400) * 100}%`,
                  top: `${(t.y / 400) * 100}%`,
                }}
              >
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
