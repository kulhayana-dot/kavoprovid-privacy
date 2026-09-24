"use client";

import { useEffect, useRef } from "react";

const OVERLAP_PX = 72;
const MAX_SCALE_DOWN = 0.05;
const MAX_DIM = 0.35;

export function StackSection({
  children,
  index,
  pullUp = true,
  dim = true,
  className,
}: {
  children: React.ReactNode;
  index: number;
  pullUp?: boolean;
  dim?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // As this section's own bottom edge approaches and crosses the top of
  // the viewport, the next section (rendered on top via z-index, pulled
  // up by OVERLAP_PX) visually covers it. Scaling and dimming this
  // section over that same window sells the "next slide covers this
  // one" read without requiring either section to fit one screen.
  useEffect(() => {
    if (!dim) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    function update() {
      ticking = false;
      const vh = window.innerHeight;
      const rect = el!.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, 1 - rect.bottom / vh));
      el!.style.transform = `scale(${1 - progress * MAX_SCALE_DOWN})`;
      el!.style.filter = `brightness(${1 - progress * MAX_DIM})`;
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dim]);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        zIndex: index,
        marginTop: pullUp ? -OVERLAP_PX : undefined,
        willChange: dim ? "transform, filter" : undefined,
      }}
      className={className}
    >
      {children}
    </div>
  );
}
