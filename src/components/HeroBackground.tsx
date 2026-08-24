import Image from "next/image";

export function HeroBackground() {
  return (
    // Capped to one screen height and anchored to the top: on mobile the
    // hero's content stack runs taller than 100vh, and letting the photo
    // stretch to cover that full height crushed it down to a dead, faded
    // sliver by the time the section actually ended. Past one screen the
    // section's own bg-ink shows through instead.
    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-screen overflow-hidden">
      <Image
        src="/hero/office.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_center] sm:object-center"
      />
      {/* Dark overlay to mute the photo and keep hero text readable. */}
      <div className="absolute inset-0 bg-ink/50" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-ink" />
    </div>
  );
}
