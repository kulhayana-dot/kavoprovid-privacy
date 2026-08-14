import Link from "next/link";
import type { Machine } from "@/lib/machines";
import { cn } from "@/lib/cn";

type MachineCardProps = {
  machine: Machine;
  headingLevel?: "h2" | "h3";
  aspectClassName?: string;
  showBadge?: boolean;
  showFeature?: boolean;
  ctaLabel?: string;
};

export function MachineCard({
  machine: m,
  headingLevel = "h3",
  aspectClassName = "aspect-[4/3]",
  showBadge = false,
  showFeature = false,
  ctaLabel = "Детальніше про модель",
}: MachineCardProps) {
  const Heading = headingLevel;

  return (
    <Link
      href={`/rishennya/${m.slug}`}
      className="chamfer group flex flex-col overflow-hidden border border-ink/10 bg-ink/[0.02] transition-colors hover:border-signal"
    >
      {m.photo && (
        <div className={cn("relative bg-ink", aspectClassName)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={m.photo.src}
            alt={m.machine}
            className="absolute inset-0 h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className={cn("flex flex-1 flex-col", headingLevel === "h2" ? "p-7" : "p-6")}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-label border border-ink/20 px-3 py-1 text-xs uppercase tracking-widest text-ink/60">
            {m.tag}
          </span>
          {showBadge && m.badge && (
            <span className="font-label bg-signal px-3 py-1 text-xs uppercase tracking-widest text-ink">
              {m.badge}
            </span>
          )}
        </div>

        <Heading
          className={cn(
            "font-display mt-5 font-bold",
            headingLevel === "h2" ? "text-xl" : "mt-4 text-lg",
          )}
        >
          {m.machine}
        </Heading>

        <p className="font-label mt-2 text-xs uppercase tracking-widest text-ink/65">
          {m.audienceFit}
        </p>

        {showFeature && (
          <p className="mt-3 flex-1 text-sm text-ink/60">{m.features[0]}</p>
        )}

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-ink/30 underline-offset-4 transition-colors group-hover:decoration-ink">
          {ctaLabel}
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
