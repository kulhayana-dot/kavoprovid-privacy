import { cn } from "@/lib/cn";

type LogoProps = {
  variant?: "wordmark" | "mark";
  /** "light" = black ink for use on paper backgrounds, "dark" = white ink for use on ink backgrounds */
  tone?: "light" | "dark";
  className?: string;
};

export function Logo({
  variant = "wordmark",
  tone = "dark",
  className,
}: LogoProps) {
  const suffix = tone === "dark" ? "-dark" : "";
  const src = `/brand/kavoprovid-${variant}${suffix}.svg`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Kavoprovid"
      className={cn(
        variant === "wordmark" ? "h-5 w-auto" : "h-8 w-auto",
        className,
      )}
    />
  );
}
