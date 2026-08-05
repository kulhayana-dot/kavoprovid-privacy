"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import {
  IconBolt,
  IconBuilding,
  IconDroplet,
  IconValve,
  IconWifi,
} from "@/components/icons";
import { cn } from "@/lib/cn";
import { PRELOADER_SECONDS } from "@/lib/motion";

const W = 420;
const H = 260;
const ICON_CX = 26;
const LINE_START_X = 168;
const SPINE_X = 340;
const BUILDING_CX = 384;
const ROW_Y = [26, 92, 158, 224];
const SPINE_MID_Y = (ROW_Y[0] + ROW_Y[ROW_Y.length - 1]) / 2;

const ROWS = [
  { icon: IconDroplet, label: "Вода", y: ROW_Y[0], isCoffee: false },
  { icon: IconBolt, label: "Електрика", y: ROW_Y[1], isCoffee: false },
  { icon: IconWifi, label: "Інтернет", y: ROW_Y[2], isCoffee: false },
  { icon: IconValve, label: "Кава", y: ROW_Y[3], isCoffee: true },
] as const;

export function HeroUtilityStack({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const coffeeLineRef = useRef<SVGLineElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // the component is only visible from the lg breakpoint up (hidden
      // lg:block); below that its SVG has no render box, and calling
      // getTotalLength() on a non-rendered geometry element throws.
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
        const svg = svgRef.current;
        if (!svg) return;

        const rowLines = svg.querySelectorAll<SVGLineElement>("[data-row-line]");
        const dots = svg.querySelectorAll<SVGCircleElement>("[data-dot]");
        const spine = svg.querySelector<SVGLineElement>("[data-spine]");
        const exitLine = svg.querySelector<SVGLineElement>("[data-exit]");
        const building = svg.querySelector<SVGRectElement>("[data-building]");
        if (!spine || !exitLine || !building) return;

        rowLines.forEach((line) => {
          const len = line.getTotalLength();
          gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        });
        const spineLen = spine.getTotalLength();
        gsap.set(spine, { strokeDasharray: spineLen, strokeDashoffset: spineLen });
        const exitLen = exitLine.getTotalLength();
        gsap.set(exitLine, { strokeDasharray: exitLen, strokeDashoffset: exitLen });
        gsap.set(dots, { opacity: 0, scale: 0, transformOrigin: "center" });
        gsap.set(building, { opacity: 0, scale: 0.7, transformOrigin: "center" });

        const tl = gsap.timeline({ delay: PRELOADER_SECONDS + 0.6 });

        tl.to(rowLines, {
          strokeDashoffset: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.16,
        })
          .to(
            dots,
            {
              opacity: 1,
              scale: 1,
              duration: 0.3,
              ease: "back.out(2)",
              stagger: 0.16,
            },
            "<",
          )
          .to(spine, { strokeDashoffset: 0, duration: 0.45, ease: "power2.out" }, "-=0.15")
          .to(exitLine, { strokeDashoffset: 0, duration: 0.3, ease: "power2.out" })
          .to(
            building,
            { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" },
            "<",
          )
          .add(() => {
            const coffeeLine = coffeeLineRef.current;
            if (!coffeeLine) return;
            gsap.set(coffeeLine, { strokeDasharray: "9 7", strokeDashoffset: 0 });
            gsap.to(coffeeLine, {
              strokeDashoffset: -32,
              duration: 0.85,
              ease: "none",
              repeat: -1,
            });
          });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <span className="font-label block text-xs uppercase tracking-widest text-paper/40">
        Комунікації офісу
      </span>
      <div className="relative mt-5">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="h-full w-full"
        aria-hidden="true"
      >
        {ROWS.map((row) => (
          <line
            key={row.label}
            data-row-line
            ref={row.isCoffee ? coffeeLineRef : undefined}
            x1={LINE_START_X}
            y1={row.y}
            x2={SPINE_X}
            y2={row.y}
            stroke={row.isCoffee ? "var(--color-signal)" : "rgba(255,255,255,0.3)"}
            strokeWidth={row.isCoffee ? 2.5 : 1.5}
          />
        ))}

        {ROWS.map((row) => (
          <circle
            key={row.label}
            data-dot
            cx={SPINE_X}
            cy={row.y}
            r={row.isCoffee ? 4 : 3}
            fill={row.isCoffee ? "var(--color-signal)" : "rgba(255,255,255,0.55)"}
          />
        ))}

        <line
          data-spine
          x1={SPINE_X}
          y1={ROW_Y[0]}
          x2={SPINE_X}
          y2={ROW_Y[3]}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={1.5}
        />
        <line
          data-exit
          x1={SPINE_X}
          y1={SPINE_MID_Y}
          x2={BUILDING_CX - 18}
          y2={SPINE_MID_Y}
          stroke="var(--color-signal)"
          strokeWidth={2}
        />
        <rect
          data-building
          x={BUILDING_CX - 18}
          y={SPINE_MID_Y - 18}
          width={36}
          height={36}
          rx={3}
          className="fill-ink stroke-paper/60"
          strokeWidth={1.5}
        />
      </svg>

      {ROWS.map((row) => (
        <div
          key={row.label}
          className="pointer-events-none absolute flex -translate-y-1/2 items-center gap-2.5"
          style={{
            left: `${((ICON_CX - 18) / W) * 100}%`,
            top: `${(row.y / H) * 100}%`,
          }}
        >
          <span
            className={cn(
              "chamfer-sm flex size-9 shrink-0 items-center justify-center border",
              row.isCoffee
                ? "border-signal bg-signal"
                : "border-paper/25 bg-ink",
            )}
          >
            <row.icon
              className={cn("size-4", row.isCoffee ? "text-ink" : "text-paper/70")}
            />
          </span>
          <span
            className={cn(
              "font-label whitespace-nowrap text-xs uppercase tracking-widest",
              row.isCoffee ? "text-signal" : "text-paper/50",
            )}
          >
            {row.label}
          </span>
        </div>
      ))}

      <div
        className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
        style={{
          left: `${(BUILDING_CX / W) * 100}%`,
          top: `${(SPINE_MID_Y / H) * 100}%`,
        }}
      >
        <IconBuilding className="size-4 text-paper" />
      </div>
      </div>
    </div>
  );
}
