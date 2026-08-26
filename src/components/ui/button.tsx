import { type AnchorHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const buttonVariants = cva(
  "group relative inline-flex items-center justify-center text-sm font-medium transition-colors duration-200",
  {
    variants: {
      variant: {
        primary: "chamfer-sm bg-signal px-7 py-3.5 text-ink hover:brightness-90",
        secondary:
          "chamfer-sm border border-paper/25 px-7 py-3.5 text-paper/90 hover:text-signal",
        outline:
          "gap-2 rounded-full border border-ink/20 bg-transparent px-5 py-2.5 text-ink/80 hover:border-ink hover:bg-ink hover:text-paper",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants>;

/**
 * Flat, hard-edged CTA: no lift or cursor-follow, no fill sweep — the
 * secondary variant traces a thin signal-yellow underline on hover
 * instead, echoing the brand's line motif. The outline variant is a
 * lower-emphasis pill for light backgrounds, where secondary's paper-tinted
 * border/text would be invisible until hover.
 */
export function Button({ variant, className, children, ...props }: ButtonProps) {
  const isSecondary = variant === "secondary";

  return (
    <a {...props} className={cn(buttonVariants({ variant }), className)}>
      {children}
      {isSecondary && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-signal transition-transform duration-300 ease-out group-hover:scale-x-100"
        />
      )}
    </a>
  );
}
