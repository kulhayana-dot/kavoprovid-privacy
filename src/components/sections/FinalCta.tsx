import { RevealText } from "@/components/RevealText";
import { Button } from "@/components/Button";

export function FinalCta() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-ink py-28 text-paper sm:py-40"
    >
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <div className="stripe-band inline-block px-2 py-4 sm:py-5">
          <RevealText
            as="h2"
            trigger="scroll"
            className="font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl"
          >
            Підключіть офіс до кавопроводу.
          </RevealText>
        </div>

        <p className="mx-auto mt-8 max-w-lg text-lg text-paper/60">
          Одна розмова на 10 хвилин — і кава перестає бути вашою проблемою.
        </p>

        <div className="mt-10 flex justify-center">
          <Button href="tel:+380636271567">Підключити офіс</Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-paper/45">
          <a href="tel:+380636271567" className="hover:text-paper/70">
            063 627-15-67
          </a>
          <a
            href="mailto:hello@kavoprovid.com.ua"
            className="hover:text-paper/70"
          >
            hello@kavoprovid.com.ua
          </a>
        </div>
      </div>
    </section>
  );
}
