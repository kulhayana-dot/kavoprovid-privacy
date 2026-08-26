import { HeroBackground } from "@/components/HeroBackground";
import { HeroContent } from "@/components/HeroContent";
import { HeroEntrance, HeroEntranceItem } from "@/components/HeroEntrance";
import { HeroPipeline } from "@/components/HeroPipeline";
import { RevealText } from "@/components/RevealText";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PRELOADER_SECONDS } from "@/lib/motion";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink pt-16"
    >
      <HeroBackground />

      <HeroPipeline />

      <HeroContent>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <HeroEntrance>
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
                delay={PRELOADER_SECONDS + 1.8}
              >
                Проводимо каву в бізнес
              </RevealText>
              <RevealText
                as="div"
                trigger="load"
                delay={PRELOADER_SECONDS + 1.92}
              >
                під ключ<span className="text-signal">.</span>
              </RevealText>
            </h1>

            <HeroEntranceItem className="mt-8 max-w-xl text-lg leading-relaxed text-paper/70 sm:text-xl">
              Кавомашина, зерно, сервіс і відповідальність — в одного
              партнера, а не в списку контактів у телефоні. Ваша команда
              просто п&apos;є каву.
            </HeroEntranceItem>

            <HeroEntranceItem className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <MagneticButton href="#cta">Провести каву в мій бізнес</MagneticButton>
              <Button href="#solutions" variant="secondary">
                Як це працює
              </Button>
            </HeroEntranceItem>
          </HeroEntrance>
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
