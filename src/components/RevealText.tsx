"use client";

import { useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type RevealTextProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** "load" plays immediately (after fonts + optional delay); "scroll" plays when scrolled into view. */
  trigger?: "load" | "scroll";
  delay?: number;
  stagger?: number;
};

export function RevealText({
  children,
  as: Tag = "div",
  className,
  trigger = "scroll",
  delay = 0,
  stagger = 0.05,
}: RevealTextProps) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    let split: SplitText | null = null;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        { reducedMotion: "(prefers-reduced-motion: reduce)" },
        (context) => {
          const reduced = Boolean(context.conditions?.reducedMotion);

          document.fonts.ready.then(() => {
            if (!ref.current) return;

            split = new SplitText(ref.current, {
              type: "lines,words",
              linesClass: "reveal-line overflow-hidden block",
            });

            if (reduced) {
              gsap.set(split.words, { yPercent: 0, opacity: 1 });
              return;
            }

            gsap.set(split.words, { yPercent: 110 });

            const tween = gsap.to(split.words, {
              yPercent: 0,
              duration: 0.85,
              ease: "power4.out",
              stagger,
              delay,
            });

            if (trigger === "scroll") {
              tween.pause();
              ScrollTrigger.create({
                trigger: ref.current,
                start: "top 85%",
                onEnter: () => tween.play(),
                once: true,
              });
            }
          });
        },
      );
    }, ref);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, [trigger, delay, stagger]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
