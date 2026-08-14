"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRELOADER_SECONDS } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

// The wordmark lockup's own bars sit at these vertical bands within its
// viewBox (0 190 566.929 100): top bar 11–29%, bottom bar 66–84%. Full-bleed
// bars are positioned at the same bands, behind the logo, so they read as
// the same two lines continuing past the wordmark rather than a second,
// unrelated pair.
const TOP_BAND = { top: "11%", height: "18%" };
const BOTTOM_BAND = { top: "66%", height: "18%" };

/**
 * The official Kavoprovid wordmark is already "KAVOPROVID" sandwiched
 * between two signal-yellow bars. This renders that lockup untouched and
 * full-bleed bars behind it, in the same two bands, so the logo's own bars
 * appear to keep running edge to edge — the wordmark sitting in the middle
 * of its own infrastructure, not redrawn or reconstructed.
 */
export function HeroPipeline() {
  const rootRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set([topBarRef.current, bottomBarRef.current], {
          scaleX: 0,
          transformOrigin: "center",
        });
        gsap.set(logoRef.current, { opacity: 0, scale: 0.94, y: 8 });
        gsap.set(connectorRef.current, { scaleY: 0, transformOrigin: "top" });

        const tl = gsap.timeline({ delay: PRELOADER_SECONDS + 0.15 });

        tl.to(topBarRef.current, { scaleX: 1, duration: 1.1, ease: "power3.inOut" })
          .to(
            bottomBarRef.current,
            { scaleX: 1, duration: 1.1, ease: "power3.inOut" },
            "<0.1",
          )
          .to(
            logoRef.current,
            { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "power2.out" },
            "-=0.55",
          )
          .to(
            connectorRef.current,
            { scaleY: 1, duration: 0.4, ease: "power2.out" },
            "-=0.1",
          );

        // subtle parallax as the hero scrolls away
        gsap.to(logoRef.current, {
          y: -14,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([topBarRef.current, bottomBarRef.current], { scaleX: 1 });
        gsap.set(logoRef.current, { opacity: 1, scale: 1, y: 0 });
        gsap.set(connectorRef.current, { scaleY: 1 });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative w-full">
      <div className="relative flex h-9 items-center justify-center sm:h-14 md:h-20 lg:h-24 xl:h-28">
        <div
          ref={topBarRef}
          className="pipe-flow-x absolute inset-x-0"
          style={TOP_BAND}
          aria-hidden="true"
        />
        <div
          ref={bottomBarRef}
          className="pipe-flow-x absolute inset-x-0"
          style={BOTTOM_BAND}
          aria-hidden="true"
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={logoRef}
          src="/brand/kavoprovid-wordmark-dark.svg"
          width={566.929}
          height={100}
          alt="Kavoprovid"
          className="relative z-10 h-full w-auto"
        />
      </div>

      <div className="flex justify-center">
        <div
          ref={connectorRef}
          className="h-8 w-px bg-paper/25 sm:h-10"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
