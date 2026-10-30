"use client";

import { useLayoutEffect, useRef } from "react";
import { animate } from "framer-motion";
import { PRELOADER_SECONDS } from "@/lib/motion";

export function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const panelTopRef = useRef<HTMLDivElement>(null);
  const panelBottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      overlay.style.display = "none";
      return;
    }

    const counter = animate(0, 100, {
      duration: PRELOADER_SECONDS,
      ease: "easeInOut",
      onUpdate: (value) => {
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${value / 100})`;
        }
        if (countRef.current) {
          countRef.current.textContent = String(Math.round(value));
        }
      },
      onComplete: () => {
        if (panelTopRef.current) {
          animate(
            panelTopRef.current,
            { y: "-100%" },
            { duration: 0.6, ease: "easeInOut", delay: 0.05 },
          );
        }
        if (panelBottomRef.current) {
          animate(
            panelBottomRef.current,
            { y: "100%" },
            {
              duration: 0.6,
              ease: "easeInOut",
              delay: 0.05,
              onComplete: () => {
                overlay.style.display = "none";
              },
            },
          );
        }
      },
    });

    // hard fallback in case anything above fails to fire
    const fallback = window.setTimeout(() => {
      overlay.style.display = "none";
    }, (PRELOADER_SECONDS + 1.5) * 1000);

    return () => {
      counter.stop();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] overflow-hidden bg-ink"
    >
      <div
        ref={panelTopRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-ink"
      />
      <div
        ref={panelBottomRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-ink"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/kavoprovid-mark-dark.svg"
          width={290}
          height={270}
          alt=""
          className="h-12 w-auto"
        />
        <div className="flex items-center gap-3">
          <div className="relative h-px w-40 overflow-hidden bg-paper/15">
            <div
              ref={barRef}
              className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-signal"
            />
          </div>
          <span className="font-label flex items-baseline gap-0.5 text-xs tracking-widest text-paper/50">
            <span ref={countRef}>0</span>%
          </span>
        </div>
      </div>
    </div>
  );
}
