import { cn } from "@/lib/cn";

type ConnectorProps = {
  index?: number;
  className?: string;
};

/**
 * A vertical segment of the site-wide "coffee line". Stacked across
 * sections it reads as one continuous conduit; the traveling pulse is
 * staggered per section so pulses appear to hand off from one to the next.
 */
export function Connector({ index = 0, className }: ConnectorProps) {
  const delay = (index % 5) * -1.1;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2",
        className,
      )}
    >
      <div className="h-full w-full bg-linear-to-b from-transparent via-paper/10 to-transparent" />
      <span
        className="animate-pulse-travel absolute left-1/2 top-0 h-28 w-px -translate-x-1/2 bg-linear-to-b from-transparent via-signal to-transparent"
        style={{
          animationDelay: `${delay}s`,
          boxShadow: "0 0 14px 2px rgba(252, 237, 79, 0.55)",
        }}
      />
    </div>
  );
}

export function ConnectorNode({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative z-10 block size-3 rounded-full bg-signal",
        className,
      )}
      style={{ boxShadow: "0 0 0 4px rgba(252, 237, 79, 0.15)" }}
    />
  );
}
