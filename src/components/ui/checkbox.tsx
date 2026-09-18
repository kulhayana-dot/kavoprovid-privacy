"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { IconCheck } from "@/components/icons";
import { cn } from "@/lib/cn";

export function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "chamfer-sm flex size-5 shrink-0 items-center justify-center border border-ink/25 transition-colors",
        "data-[state=checked]:border-signal data-[state=checked]:bg-signal",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        <IconCheck className="size-3.5 text-ink" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
