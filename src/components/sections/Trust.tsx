import { RevealText } from "@/components/RevealText";
import { IconDocument, IconValve } from "@/components/icons";
import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function Trust() {
  return (
    <section id="trust" className="relative bg-signal py-28 text-ink sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <span className="font-label shrink-0 text-xs uppercase tracking-widest text-ink/60">
            Кому ми довіряємо
          </span>
          <RevealText
            as="h2"
            className="font-display text-xl font-bold tracking-tight sm:text-2xl"
          >
            Ми не просимо повірити нам на слово.
          </RevealText>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <Card className="bg-paper p-8 sm:p-10 lg:col-span-3">
            <IconValve className="size-8 text-ink" />
            <CardContent className="mt-6">
              <CardTitle>Офіційний дистриб&apos;ютор Strauss Ukraine</CardTitle>
              <CardDescription className="mt-3">
                Зерно, яке проводимо у ваш офіс, обсмажене й поставлене
                офіційним партнером — без посередників і підміни на дешевший
                аналог.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-paper p-8 sm:p-10 lg:col-span-2 lg:mt-10">
            <IconDocument className="size-8 text-ink" />
            <CardContent className="mt-6">
              <CardTitle>ТОВ «ЮНІТ КЕЙ», ЄДРПОУ 46306370</CardTitle>
              <CardDescription className="mt-3">
                Працюємо як юридична особа, платник ПДВ на загальних
                підставах. Перевірити нас можна в реєстрі — не тільки на
                слово.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
