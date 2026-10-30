import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * The "Kavoprovid" name as it appears in the logo — hand-drawn vector
 * letterforms, not a typeface, so standalone brand mentions use this
 * instead of plain text. `tone` picks the file drawn for that background
 * (white letters for dark sections, ink letters for paper sections).
 */
export function Wordmark({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const src =
    tone === "dark"
      ? "/brand/kavoprovid-wordmark-dark.svg"
      : "/brand/kavoprovid-wordmark.svg";

  return (
    <Image
      src={src}
      alt="Kavoprovid"
      width={567}
      height={100}
      className={cn("h-[1em] w-auto", className)}
    />
  );
}
