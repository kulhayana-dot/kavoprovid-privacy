"use client";

import { type AnchorHTMLAttributes, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "chamfer-sm group relative inline-flex items-center justify-center overflow-hidden px-7 py-3.5 text-sm font-medium",
  {
    variants: {
      variant: {
        primary: "bg-signal text-ink",
        secondary: "border border-paper/25 text-paper/90",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

type ButtonProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"
> &
  VariantProps<typeof buttonVariants>;

/**
 * Flat, hard-edged CTA: a fill sweeps in on hover like the signal
 * traveling through a pipe, and the button leans toward the cursor
 * (magnetic pull) instead of a generic scale-up.
 */
export function Button({ variant, className, children, ...props }: ButtonProps) {
  const isPrimary = variant !== "secondary";
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });

  function handlePointerMove(e: React.PointerEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.4);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      {...props}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(buttonVariants({ variant }), className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0",
          isPrimary ? "bg-ink" : "bg-paper",
        )}
      />
      <span
        className={cn(
          "relative transition-colors duration-300",
          isPrimary ? "group-hover:text-paper" : "group-hover:text-ink",
        )}
      >
        {children}
      </span>
    </motion.a>
  );
}
