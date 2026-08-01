import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary";
};

/**
 * Flat, hard-edged CTA: a fill sweeps in on hover like the signal
 * traveling through a pipe. No scale, no glow — the brand is printed,
 * not lit.
 */
export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <a
      {...props}
      className={cn(
        "chamfer-sm group relative inline-flex items-center justify-center overflow-hidden px-7 py-3.5 text-sm font-medium",
        isPrimary
          ? "bg-signal text-ink"
          : "border border-paper/25 text-paper/90",
        className,
      )}
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
          isPrimary
            ? "group-hover:text-paper"
            : "group-hover:text-ink",
        )}
      >
        {children}
      </span>
    </a>
  );
}
