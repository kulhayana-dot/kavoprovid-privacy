"use client";

import { motion, useReducedMotion } from "framer-motion";
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

// Absolute delays mirror the original GSAP timeline's relative offsets
// (rowLines+dots run in parallel staggered groups, spine overlaps their
// tail, exitLine+building overlap each other after the spine, and the
// coffee line's flow starts once everything else has settled).
const BASE_DELAY = PRELOADER_SECONDS + 0.6;
const ROW_STAGGER = 0.16;
const SPINE_DELAY = BASE_DELAY + 0.88;
const EXIT_DELAY = BASE_DELAY + 1.33;
const COFFEE_FLOW_DELAY = BASE_DELAY + 1.73;

export function HeroUtilityStack({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <span className="font-label block text-xs uppercase tracking-widest text-paper/58">
        Комунікації офісу
      </span>
      <div className="relative mt-5">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-full w-full"
          aria-hidden="true"
        >
          {ROWS.map((row, i) => (
            <motion.line
              key={row.label}
              x1={LINE_START_X}
              y1={row.y}
              x2={SPINE_X}
              y2={row.y}
              stroke={row.isCoffee ? "var(--color-signal)" : "rgba(255,255,255,0.3)"}
              strokeWidth={row.isCoffee ? 2.5 : 1.5}
              strokeDasharray={row.isCoffee && !reduced ? "9 7" : undefined}
              initial={reduced ? false : { pathLength: 0 }}
              animate={
                row.isCoffee && !reduced
                  ? { pathLength: 1, strokeDashoffset: [0, -32] }
                  : { pathLength: 1 }
              }
              transition={
                row.isCoffee && !reduced
                  ? {
                      pathLength: {
                        duration: 0.55,
                        ease: "easeOut",
                        delay: BASE_DELAY + i * ROW_STAGGER,
                      },
                      strokeDashoffset: {
                        duration: 0.85,
                        ease: "linear",
                        repeat: Infinity,
                        delay: COFFEE_FLOW_DELAY,
                      },
                    }
                  : {
                      duration: 0.55,
                      ease: "easeOut",
                      delay: BASE_DELAY + i * ROW_STAGGER,
                    }
              }
            />
          ))}

          {ROWS.map((row, i) => (
            <motion.circle
              key={row.label}
              cx={SPINE_X}
              cy={row.y}
              fill={row.isCoffee ? "var(--color-signal)" : "rgba(255,255,255,0.55)"}
              initial={reduced ? false : { opacity: 0, r: 0 }}
              animate={{ opacity: 1, r: row.isCoffee ? 4 : 3 }}
              transition={{
                duration: 0.3,
                ease: "backOut",
                delay: BASE_DELAY + i * ROW_STAGGER,
              }}
            />
          ))}

          <motion.line
            x1={SPINE_X}
            y1={ROW_Y[0]}
            x2={SPINE_X}
            y2={ROW_Y[3]}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth={1.5}
            initial={reduced ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: SPINE_DELAY }}
          />
          <motion.line
            x1={SPINE_X}
            y1={SPINE_MID_Y}
            x2={BUILDING_CX - 18}
            y2={SPINE_MID_Y}
            stroke="var(--color-signal)"
            strokeWidth={2}
            initial={reduced ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: EXIT_DELAY }}
          />
          <motion.rect
            x={BUILDING_CX - 18}
            y={SPINE_MID_Y - 18}
            width={36}
            height={36}
            rx={3}
            className="fill-ink stroke-paper/60"
            strokeWidth={1.5}
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            initial={reduced ? false : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "backOut", delay: EXIT_DELAY }}
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
