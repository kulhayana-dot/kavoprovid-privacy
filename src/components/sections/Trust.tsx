import { RevealText } from "@/components/RevealText";
import { IconDocument, IconValve } from "@/components/icons";

export function Trust() {
  return (
    <section id="trust" className="relative bg-paper py-28 text-ink sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-label text-xs uppercase tracking-widest text-ink/60">
            Кому ми довіряємо
          </span>
          <RevealText
            as="h2"
            className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Ми не просимо повірити нам на слово.
          </RevealText>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="chamfer border border-ink/10 p-8 sm:p-10">
            <IconValve className="size-8 text-signal" />
            <h3 className="font-display mt-6 text-xl font-bold">
              Офіційний дистриб&apos;ютор Strauss Ukraine
            </h3>
            <p className="mt-3 text-ink/60">
              Зерно, яке проводимо у ваш офіс, обсмажене й поставлене
              офіційним партнером — без посередників і підміни на дешевший
              аналог.
            </p>
          </div>

          <div className="chamfer border border-ink/10 p-8 sm:p-10">
            <IconDocument className="size-8 text-signal" />
            <h3 className="font-display mt-6 text-xl font-bold">
              ТОВ «ЮНІТ КЕЙ», ЄДРПОУ 46306370
            </h3>
            <p className="mt-3 text-ink/60">
              Працюємо як юридична особа, платник ПДВ на загальних
              підставах. Перевірити нас можна в реєстрі — не тільки на
              слово.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
