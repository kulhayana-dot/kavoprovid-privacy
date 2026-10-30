"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/cn";

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
  className = "max-w-md",
  aspectClassName = "aspect-[4/5]",
  marginPct = 26,
}: {
  src: string;
  alt: string;
  callouts: PhotoCallout[];
  /** controls width/margin only — do not pass another aspect-* class here */
  className?: string;
  aspectClassName?: string;
  /** % of card width/height reserved around the image for callout lines +
   *  labels; also drives where the image itself sits. Narrow product shots
   *  want a big margin (default 26); a wide two-subject composite needs less. */
  marginPct?: number;
}) {
  const gutter = marginPct;
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(rootRef, { once: true, margin: "0px 0px -30% 0px" });
  const play = reduced || inView;

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative mx-auto w-full overflow-hidden border border-paper/10 bg-ink",
        aspectClassName,
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

      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 640px) 28rem, 90vw"
        className="object-contain"
        style={{
          top: "6%",
          bottom: "6%",
          left: `${marginPct}%`,
          right: `${marginPct}%`,
          width: `${100 - marginPct * 2}%`,
          height: "88%",
        }}
      />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {callouts.map((c, i) => {
          const endX = c.side === "left" ? gutter : 100 - gutter;
          return (
            <motion.line
              key={c.label}
              x1={c.x * 100}
              y1={c.y * 100}
              x2={endX}
              y2={c.y * 100}
              stroke="var(--color-signal)"
              strokeWidth={0.3}
              vectorEffect="non-scaling-stroke"
              initial={reduced ? false : { pathLength: 0 }}
              animate={play ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.15 }}
            />
          );
        })}
        {callouts.map((c, i) => (
          <motion.circle
            key={c.label}
            cx={c.x * 100}
            cy={c.y * 100}
            className="fill-signal"
            initial={reduced ? false : { opacity: 0, r: 0 }}
            animate={play ? { opacity: 1, r: 1.1 } : { opacity: 0, r: 0 }}
            transition={{ duration: 0.3, ease: "backOut", delay: i * 0.15 }}
          />
        ))}
      </svg>

      {callouts.map((c, i) => {
        const endX = c.side === "left" ? gutter : 100 - gutter;
        const edgeStyle =
          c.side === "left"
            ? { right: `${100 - endX}%` }
            : { left: `${endX}%` };
        return (
          <motion.div
            key={c.label}
            className={cn(
              "font-label pointer-events-none absolute text-[11px] uppercase leading-snug tracking-widest text-paper/70",
              c.side === "left" ? "text-right" : "text-left",
            )}
            style={{
              top: `${c.y * 100}%`,
              ...edgeStyle,
              maxWidth: `min(6.5rem, calc(${gutter}% - 10px))`,
              transform: "translateY(-50%)",
              margin: c.side === "left" ? "0 6px 0 0" : "0 0 0 6px",
            }}
            initial={reduced ? false : { opacity: 0 }}
            animate={play ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.25 + i * 0.15 }}
          >
            {c.label}
          </motion.div>
        );
      })}
    </div>
  );
}
