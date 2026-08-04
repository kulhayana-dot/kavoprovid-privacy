"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/** % of card width reserved on each side for the callout line + label,
 *  matching the image's own inset (see the <img> className below). */
const GUTTER = 22;

export type PhotoCallout = {
  /** anchor point on the photo, 0..1 normalized */
  x: number;
  y: number;
  label: string;
  side: "left" | "right";
};

export function MachinePhoto({
  src,
  alt,
  callouts,
  className,
}: {
  src: string;
  alt: string;
  callouts: PhotoCallout[];
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const svg = svgRef.current;
        if (!svg) return;

        const lines = svg.querySelectorAll<SVGLineElement>("[data-callout-line]");
        const dots = svg.querySelectorAll<SVGCircleElement>("[data-callout-dot]");
        const labels = rootRef.current?.querySelectorAll<HTMLElement>(
          "[data-callout-label]",
        );

        lines.forEach((line) => {
          const len = line.getTotalLength();
          gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap.set(dots, { opacity: 0, scale: 0, transformOrigin: "center" });
        if (labels) gsap.set(labels, { opacity: 0, x: 0 });

        gsap.to(lines, {
          strokeDashoffset: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        });
        gsap.to(dots, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(2)",
          stagger: 0.15,
          scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        });
        if (labels) {
          gsap.to(labels, {
            opacity: 1,
            duration: 0.4,
            stagger: 0.15,
            delay: 0.25,
            scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
          });
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative mx-auto aspect-[4/5] w-full max-w-xl overflow-hidden border border-paper/10 bg-ink",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-signal" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1.5 bg-signal" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-y-[6%] inset-x-[26%] h-[88%] w-[48%] object-contain"
      />

      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {callouts.map((c) => {
          const endX = c.side === "left" ? GUTTER : 100 - GUTTER;
          return (
            <line
              key={c.label}
              data-callout-line
              x1={c.x * 100}
              y1={c.y * 100}
              x2={endX}
              y2={c.y * 100}
              stroke="var(--color-signal)"
              strokeWidth={0.3}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
        {callouts.map((c) => (
          <circle
            key={c.label}
            data-callout-dot
            cx={c.x * 100}
            cy={c.y * 100}
            r={1.1}
            className="fill-signal"
          />
        ))}
      </svg>

      {callouts.map((c) => {
        const endX = c.side === "left" ? GUTTER : 100 - GUTTER;
        const edgeStyle =
          c.side === "left"
            ? { right: `${100 - endX}%` }
            : { left: `${endX}%` };
        return (
          <div
            key={c.label}
            data-callout-label
            className={cn(
              "font-label pointer-events-none absolute max-w-[6.5rem] text-[10px] uppercase leading-snug tracking-widest text-paper/70",
              c.side === "left" ? "text-right" : "text-left",
            )}
            style={{
              top: `${c.y * 100}%`,
              ...edgeStyle,
              transform: "translateY(-50%)",
              margin: c.side === "left" ? "0 6px 0 0" : "0 0 0 6px",
            }}
          >
            {c.label}
          </div>
        );
      })}
    </div>
  );
}
