import {
  IconClockWait,
  IconCoinLoss,
  IconCupEmpty,
  IconMachineOff,
  IconQuestionCall,
} from "@/components/icons";

const BREAKS = [
  {
    icon: IconMachineOff,
    title: "Апарат ламається",
    text: "У понеділок вранці. Найгірший можливий момент.",
  },
  {
    icon: IconCupEmpty,
    title: "Кава закінчується",
    text: "Ніхто не відстежував залишки — тепер офіс без кави.",
  },
  {
    icon: IconClockWait,
    title: "Співробітники чекають",
    text: "П'ять хвилин перетворюються на щоденний ритуал роздратування.",
  },
  {
    icon: IconQuestionCall,
    title: "Ніхто не знає, кому дзвонити",
    text: "Орендодавцю? Постачальнику? Майстру з минулого разу?",
  },
  {
    icon: IconCoinLoss,
    title: "Гроші йдуть у нікуди",
    text: "Оренда, ремонт, зерна — окремі рахунки, жодної системи.",
  },
];

export function Problem() {
  return (
    <section
      id="problem"
      className="relative bg-paper py-28 text-ink sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-wider text-ink/50">
            Знайомо?
          </span>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Кава в офісі — це не одна кавомашина. Це п&apos;ять окремих проблем,
            замаскованих під одну.
          </h2>
        </div>

        <div className="relative mt-20">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.18)_0,rgba(0,0,0,0.18)_6px,transparent_6px,transparent_12px)] lg:block"
          />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {BREAKS.map((item, i) => (
              <div key={item.title} className="relative">
                <div className="flex items-center gap-3 lg:block">
                  <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-paper">
                    <item.icon className="size-5 text-ink/70" />
                  </div>
                  {i < BREAKS.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="h-px flex-1 bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.18)_0,rgba(0,0,0,0.18)_6px,transparent_6px,transparent_12px)] sm:hidden"
                    />
                  )}
                </div>
                <h3 className="font-display mt-4 text-base font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-20 max-w-xl text-lg font-medium text-ink/80">
          Проблема не в кавомашині. Проблема в тому, що між нею і вашим
          бізнесом немає жодного зв&apos;язку.
        </p>
      </div>
    </section>
  );
}
