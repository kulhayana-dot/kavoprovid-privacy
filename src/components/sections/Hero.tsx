import { HeroBackground } from "@/components/HeroBackground";
import { HeroContent } from "@/components/HeroContent";
import { HeroEntrance, HeroEntranceItem } from "@/components/HeroEntrance";
import { HeroPipeline } from "@/components/HeroPipeline";
import { RevealText } from "@/components/RevealText";
import { Button } from "@/components/ui/button";
import { PRELOADER_SECONDS } from "@/lib/motion";
import { tr, type Lang } from "@/i18n";

export function Hero({ lang = "uk" }: { lang?: Lang }) {
  const t = tr(lang);
  return (
    // The next section is pulled up 72px over the hero (StackSection), so
    // on desktop the hero runs 72px past the fold and pads its bottom by the same
    // amount: the white section then starts below the first screen instead
    // of showing as a strip under the buttons.
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink pt-16 md:min-h-[calc(100svh+72px)] md:pb-[72px]"
    >
      <HeroBackground />

      <HeroPipeline />

      <HeroContent>
        <div className="flex max-w-3xl flex-col items-start text-left">
          <HeroEntrance>
            <HeroEntranceItem>
              <span className="font-label inline-flex items-center gap-2 border border-paper/30 bg-ink/70 px-4 py-2 text-xs uppercase tracking-widest text-paper/90 backdrop-blur-sm">
                <span className="size-1.5 bg-signal" />
                {t("Київ та Київська область", "Киев и Киевская область")}
              </span>
            </HeroEntranceItem>

            <h1 className="font-display mt-8 text-5xl font-bold leading-[1.05] tracking-tight text-paper [text-shadow:0_2px_24px_rgba(10,10,10,.6)] sm:text-6xl lg:text-7xl">
              <RevealText
                as="div"
                trigger="load"
                delay={PRELOADER_SECONDS + 1.8}
              >
                {t("Проводимо каву в бізнес", "Проводим кофе в бизнес")}
              </RevealText>
              <RevealText
                as="div"
                trigger="load"
                delay={PRELOADER_SECONDS + 1.92}
              >
                {t("під ключ", "под ключ")}<span className="text-signal">.</span>
              </RevealText>
            </h1>

            <HeroEntranceItem className="mt-8 max-w-xl text-lg leading-relaxed text-paper/80 sm:text-xl">
              {t(
                "Кавомашина, зерно, сервіс і відповідальність — в одного партнера, а не в списку контактів у телефоні. Ваша команда просто п'є каву.",
                "Кофемашина, зерно, сервис и ответственность — у одного партнёра, а не в списке контактов в телефоне. Ваша команда просто пьёт кофе.",
              )}
            </HeroEntranceItem>

            <HeroEntranceItem className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href="#cta" className="w-full sm:w-auto">
                {t("Провести каву в мій бізнес", "Провести кофе в мой бизнес")}
              </Button>
              <Button href="#solutions" variant="secondary" className="w-full sm:w-auto">
                {t("Як це працює", "Как это работает")}
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
