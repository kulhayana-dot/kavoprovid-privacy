import { HeroBackground } from "@/components/HeroBackground";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-ink pt-16"
    >
      <HeroBackground />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-paper/15 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-paper/60">
            <span className="size-1.5 rounded-full bg-signal" />
            Київ та Київська область
          </span>

          <h1 className="font-display mt-8 text-5xl font-semibold leading-[1.05] tracking-tight text-paper sm:text-6xl lg:text-7xl">
            Проводимо каву
            <br />в бізнес<span className="text-signal">.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/70 sm:text-xl">
            Не продаємо кавомашини. Будуємо безперервну кавову інфраструктуру
            для офісів і підприємств — від апарату до чашки, без перебоїв.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#cta"
              className="rounded-full bg-signal px-7 py-3.5 text-center text-sm font-medium text-ink transition-transform hover:scale-105"
            >
              Отримати консультацію
            </a>
            <a
              href="#solutions"
              className="rounded-full border border-paper/20 px-7 py-3.5 text-center text-sm font-medium text-paper/90 transition-colors hover:border-paper/40"
            >
              Спробувати 7-денний тест-драйв
            </a>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <div className="flex h-9 w-6 justify-center rounded-full border border-paper/20 pt-2">
          <span className="h-1.5 w-px animate-pulse-travel bg-signal" />
        </div>
      </div>
    </section>
  );
}
