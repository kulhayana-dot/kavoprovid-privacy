"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRELOADER_SECONDS } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * The Kavoprovid mark is already a white "K" sandwiched between two
 * signal-yellow bars — the brand's own pipe motif. This extends those
 * bars into full-bleed lines that run edge to edge (reading as if the
 * system continues past the frame) while the mark itself stays
 * completely untouched, just large and centered between them.
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
        gsap.set(logoRef.current, { opacity: 0, scale: 0.92, y: 8 });
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

        // subtle parallax as the hero scrolls away: the logo drifts
        // slower than the pipeline bars, giving the lockup depth
        // instead of moving as one flat sticker.
        gsap.to(logoRef.current, {
          y: -18,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
        gsap.to([topBarRef.current, bottomBarRef.current], {
          y: (i) => (i === 0 ? -8 : 8),
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
      <div
        ref={topBarRef}
        className="pipe-flow-x h-1 w-full sm:h-1.5 lg:h-2"
        aria-hidden="true"
      />

      <div className="flex justify-center py-5 sm:py-7 lg:py-9">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={logoRef}
          src="/brand/kavoprovid-mark-dark.svg"
          width={290}
          height={270}
          alt="Kavoprovid"
          className="h-24 w-auto sm:h-32 lg:h-40 xl:h-48"
        />
      </div>

      <div
        ref={bottomBarRef}
        className="pipe-flow-x h-1 w-full sm:h-1.5 lg:h-2"
        aria-hidden="true"
      />

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
