import Image from "next/image";

export function HeroBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <Image
        src="/hero/office.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Dark overlay to mute the photo and keep hero text readable. */}
      <div className="absolute inset-0 bg-ink/50" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-ink" />
    </div>
  );
}
