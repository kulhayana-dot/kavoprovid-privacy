import { RevealText } from "@/components/RevealText";
import { IconDocument, IconValve } from "@/components/icons";
import { CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TiltCard } from "@/components/ui/TiltCard";
import { tr, type Lang } from "@/i18n";

export function Trust({ lang = "uk" }: { lang?: Lang }) {
  const t = tr(lang);
  return (
    <section id="trust" className="relative bg-ink py-16 text-paper sm:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <span className="font-label shrink-0 text-sm font-medium uppercase tracking-widest text-paper/70">
            {t("Кому ми довіряємо", "Кому мы доверяем")}
          </span>
          <RevealText
            as="h2"
            className="font-display text-xl font-bold tracking-tight sm:text-2xl"
          >
            {t("Ми не просимо повірити нам на слово.", "Мы не просим верить нам на слово.")}
          </RevealText>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 lg:grid-cols-5">
          <TiltCard className="bg-paper p-6 sm:p-10 lg:col-span-3">
            <IconValve className="size-8 text-ink" />
            <CardContent className="mt-6">
              <CardTitle>{t("Офіційний дистриб'ютор Strauss Ukraine", "Официальный дистрибьютор Strauss Ukraine")}</CardTitle>
              <CardDescription className="mt-3">
                {t(
                  "Зерно, яке проводимо у ваш офіс, обсмажене й поставлене офіційним партнером — без посередників і підміни на дешевший аналог.",
                  "Зерно, которое мы проводим в ваш офис, обжарено и поставлено официальным партнёром — без посредников и подмены на более дешёвый аналог.",
                )}
              </CardDescription>
            </CardContent>
          </TiltCard>

          <TiltCard className="bg-paper p-6 sm:p-10 lg:col-span-2 lg:mt-10">
            <IconDocument className="size-8 text-ink" />
            <CardContent className="mt-6">
              <CardTitle>{t("ТОВ «ЮНІТ КЕЙ», ЄДРПОУ 46306370", "ООО «ЮНИТ КЕЙ», ЕГРПОУ 46306370")}</CardTitle>
              <CardDescription className="mt-3">
                {t(
                  "Працюємо як юридична особа, платник ПДВ на загальних підставах. Перевірити нас можна в реєстрі — не тільки на слово.",
                  "Работаем как юридическое лицо, плательщик НДС на общих основаниях. Проверить нас можно в реестре — не только на слово.",
                )}
              </CardDescription>
              <a
                href="https://youcontrol.com.ua/catalog/company_details/46306370/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex min-h-11 w-fit items-center gap-2 font-medium text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink"
              >
                {t("Перевірити в реєстрі (YouControl)", "Проверить в реестре (YouControl)")}
                <span aria-hidden="true">↗</span>
              </a>
            </CardContent>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
