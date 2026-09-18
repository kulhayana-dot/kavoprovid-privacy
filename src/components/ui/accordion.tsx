"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/cn";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("chamfer-sm border border-ink/10", className)}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex w-full items-center justify-between gap-4 p-5 text-left font-medium text-ink",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
          className,
        )}
        {...props}
      >
        {children}
        <span className="relative size-4 shrink-0" aria-hidden="true">
          <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-ink/50" />
          <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-ink/50 transition-transform duration-200 group-data-[state=open]:rotate-90" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <p className={cn("px-5 pb-5 text-ink/60", className)}>{children}</p>
    </AccordionPrimitive.Content>
  );
}
