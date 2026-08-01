import { HeroBackground } from "@/components/HeroBackground";
import { HeroContent } from "@/components/HeroContent";
import { Button } from "@/components/Button";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-ink pt-16"
    >
      <HeroBackground />

      <HeroContent>
        <div className="max-w-3xl">
          <span className="font-label inline-flex items-center gap-2 border border-paper/20 px-4 py-1.5 text-xs uppercase tracking-widest text-paper/60">
            <span className="size-1.5 bg-signal" />
            Київ та Київська область
          </span>

          <h1 className="font-display mt-8 text-5xl font-bold leading-[1.05] tracking-tight text-paper sm:text-6xl lg:text-7xl">
            Проводимо каву
            <br />в бізнес<span className="text-signal">.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/70 sm:text-xl">
            Не продаємо кавомашини. Будуємо безперервну кавову інфраструктуру
            для офісів і підприємств — від апарату до чашки, без перебоїв.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="#cta">Отримати консультацію</Button>
            <Button href="#solutions" variant="secondary">
              Спробувати 7-денний тест-драйв
            </Button>
          </div>
        </div>
      </HeroContent>

      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <div className="flex h-9 w-6 justify-center overflow-hidden border border-paper/20 pt-2">
          <span className="animate-flow-travel h-2 w-[3px] bg-signal" />
        </div>
      </div>
    </section>
  );
}
