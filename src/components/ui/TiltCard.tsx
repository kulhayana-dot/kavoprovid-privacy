"use client";

import { useRef, type ComponentProps, type MouseEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

const MAX_TILT = 8; // degrees at the card's edge

/**
 * Same chamfer/border shell as Card, but leans in 3D toward the cursor and
 * casts a soft signal-yellow glow that follows it — clipped to the same
 * chamfer shape since clip-path doubles as a mask, no overflow-hidden
 * needed. The lean itself is hover-only (mousemove never fires on touch),
 * so on mobile it instead plays a one-off tilt-and-settle the moment the
 * card scrolls into view, through the same rotateX/rotateY springs —
 * otherwise touch users would never see any of this.
 */
type TiltCardProps = Omit<
  ComponentProps<"div">,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"
>;

export function TiltCard({ className, children, ...props }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rotateX.set((0.5 - py) * MAX_TILT * 2);
    rotateY.set((px - 0.5) * MAX_TILT * 2);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  function handleViewportEnter() {
    if (reduced) return;
    rotateX.set(-6);
    rotateY.set(8);
    setTimeout(() => {
      rotateX.set(0);
      rotateY.set(0);
    }, 60);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onViewportEnter={handleViewportEnter}
      viewport={{ once: true, amount: 0.4 }}
      initial={reduced ? undefined : { opacity: 0, y: 20 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={
        reduced
          ? undefined
          : { rotateX: springX, rotateY: springY, transformPerspective: 1000 }
      }
      className={cn("group relative chamfer border border-ink/10", className)}
      {...props}
    >
      {!reduced && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(252,237,79,.35), transparent 60%)",
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
