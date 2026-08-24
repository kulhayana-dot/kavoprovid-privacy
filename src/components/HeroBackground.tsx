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
        className="object-cover object-[62%_center] sm:object-center"
      />
      {/* Dark overlay to mute the photo and keep hero text readable. */}
      <div className="absolute inset-0 bg-ink/50" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-ink" />

      {/* On the wide source photo, the coffee machine sits off to the
          right and gets cropped out of the portrait mobile frame — give it
          its own small shot instead of losing it. */}
      <div className="chamfer-sm absolute bottom-6 right-4 h-28 w-20 overflow-hidden border border-paper/20 shadow-lg shadow-ink/40 sm:hidden">
        <Image
          src="/hero/office-machine-mobile.png"
          alt=""
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
