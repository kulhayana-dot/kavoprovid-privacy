import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "font-label inline-flex items-center gap-1.5 border px-2.5 py-1 text-[11px] uppercase tracking-widest",
  {
    variants: {
      variant: {
        outline: "border-ink/20 text-ink/60",
        signal: "border-signal bg-signal text-ink",
        ink: "border-ink bg-ink text-paper",
      },
    },
    defaultVariants: { variant: "outline" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
