"use client";

import { useRef, type AnchorHTMLAttributes, type MouseEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { buttonVariants } from "./button";

type MagneticButtonProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"
> &
  VariantProps<typeof buttonVariants>;

// How far outside the button's own box the pull still engages, and how
// strongly it follows the cursor within that zone.
const RADIUS = 56;
const STRENGTH = 0.35;

/**
 * A CTA that leans toward the cursor as it approaches, on a spring so it
 * settles rather than snapping. Desktop-only feel by nature — with no
 * hover/mousemove on touch, it just behaves like a normal button there.
 */
export function MagneticButton({
  variant,
  className,
  children,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * STRENGTH);
    y.set((e.clientY - (r.top + r.height / 2)) * STRENGTH);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ margin: -RADIUS, padding: RADIUS }}
      className="inline-block"
    >
      <motion.a
        ref={ref}
        {...props}
        style={reduced ? undefined : { x: springX, y: springY }}
        className={cn(buttonVariants({ variant }), className)}
      >
        {children}
      </motion.a>
    </div>
  );
}
