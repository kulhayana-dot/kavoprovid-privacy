import { HeroBackground } from "@/components/HeroBackground";
import { HeroContent } from "@/components/HeroContent";
import { HeroEntrance, HeroEntranceItem } from "@/components/HeroEntrance";
import { RevealText } from "@/components/RevealText";
import { Button } from "@/components/Button";
import { PRELOADER_SECONDS } from "@/lib/motion";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-ink pt-16"
    >
      <HeroBackground />

      <HeroContent>
        <HeroEntrance>
          <div className="max-w-3xl">
            <HeroEntranceItem>
              <span className="font-label inline-flex items-center gap-2 border border-paper/20 px-4 py-1.5 text-xs uppercase tracking-widest text-paper/60">
                <span className="size-1.5 bg-signal" />
                Київ та Київська область
              </span>
            </HeroEntranceItem>

            <h1 className="font-display mt-8 text-5xl font-bold leading-[1.05] tracking-tight text-paper sm:text-6xl lg:text-7xl">
              <RevealText
                as="div"
                trigger="load"
                delay={PRELOADER_SECONDS + 0.3}
              >
                Проводимо каву
              </RevealText>
              <RevealText
                as="div"
                trigger="load"
                delay={PRELOADER_SECONDS + 0.42}
              >
                в бізнес<span className="text-signal">.</span>
              </RevealText>
            </h1>

            <HeroEntranceItem className="mt-8 max-w-xl text-lg leading-relaxed text-paper/70 sm:text-xl">
              Не продаємо кавомашини. Будуємо безперервну кавову
              інфраструктуру для офісів і підприємств — від апарату до
              чашки, без перебоїв.
            </HeroEntranceItem>

            <HeroEntranceItem className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href="#cta">Отримати консультацію</Button>
              <Button href="#solutions" variant="secondary">
                Спробувати 7-денний тест-драйв
              </Button>
            </HeroEntranceItem>
          </div>
        </HeroEntrance>
      </HeroContent>

      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <div className="flex h-9 w-6 justify-center overflow-hidden border border-paper/20 pt-2">
          <span className="animate-flow-travel h-2 w-[3px] bg-signal" />
        </div>
      </div>
    </section>
  );
}
