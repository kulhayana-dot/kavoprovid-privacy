"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { RevealText } from "@/components/RevealText";
import { IconCheck } from "@/components/icons";
import { cn } from "@/lib/cn";

type Profile = {
  tag: string;
  machine: string;
  badge?: string;
  features: string[];
  threshold: number;
};

const PROFILES: Profile[] = [
  {
    tag: "Затишний офіс",
    machine: "Bianchi Gaia Touch",
    features: ["Італійська надійність", "8 видів напоїв", "Сухі вершки та шоколад"],
    threshold: 10,
  },
  {
    tag: "Активний офіс",
    machine: "Dr. Coffee Minibar S",
    badge: "Хіт вибору",
    features: ["Великий сенсорний екран", "24–30 видів напоїв", "Ідеальна молочна піна"],
    threshold: 15,
  },
  {
    tag: "Універсальний",
    machine: "Dr. Coffee Coffeebar S",
    features: ["Міцний металевий корпус", "24 напої", "Швидка видача напоїв"],
    threshold: 15,
  },
  {
    tag: "Великий бізнес / ІТ",
    machine: "Dr. Coffee Coffeecenter",
    features: ["Промислова надійність", "Величезні контейнери", "Працює нон-стоп"],
    threshold: 20,
  },
  {
    tag: "Кавова станція",
    machine: "Bianchi Talia Touch",
    features: ["12+ видів напоїв", "4 види сухих інгредієнтів", "Преміальний дизайн"],
    threshold: 15,
  },
];

const FIT = [
  "Великих ІТ-компаній",
  "Державних установ",
  "Заводів і виробництв",
  "Логістичних центрів",
  "Автосалонів",
];

const NOT_FIT = [
  "Домашніх користувачів",
  "Офісів до 20 осіб",
  "Кав'ярень-острівців",
];

const slideVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -40 }),
};

function ThresholdNumber({ value }: { value: number }) {
  return (
    <motion.span
      key={value}
      initial={{ y: 14, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {value}
    </motion.span>
  );
}

export function Solutions() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  function select(i: number) {
    if (i === active) return;
    setDirection(i > active ? 1 : -1);
    setActive(i);
  }

  const profile = PROFILES[active];

  return (
    <section id="solutions" className="relative bg-paper py-28 text-ink sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-label text-xs uppercase tracking-widest text-ink/50">
            Підбір рішення
          </span>
          <RevealText
            as="h2"
            className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Скажіть розмір команди — ми зробимо решту.
          </RevealText>
          <p className="mt-5 text-ink/50">
            Не марнуйте час на характеристики кавомашин. П&apos;ять профілів
            покривають будь-який офіс — оберіть свій.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-14">
          <div
            role="tablist"
            aria-label="Профілі офісу"
            className="scrollbar-none -mx-6 flex gap-3 overflow-x-auto px-6 lg:mx-0 lg:flex-col lg:gap-2 lg:overflow-visible lg:px-0"
          >
            {PROFILES.map((p, i) => (
              <button
                key={p.tag}
                role="tab"
                aria-selected={i === active}
                onClick={() => select(i)}
                className={cn(
                  "chamfer-sm shrink-0 border px-5 py-3 text-left text-sm font-medium transition-colors duration-200 lg:shrink",
                  i === active
                    ? "border-signal bg-signal text-ink"
                    : "border-ink/15 text-ink/60 hover:border-ink/30 hover:text-ink",
                )}
              >
                {p.tag}
              </button>
            ))}
          </div>

          <div className="relative min-h-[360px] overflow-hidden">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={active}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="chamfer border border-ink/10 bg-ink/[0.02] p-8 sm:p-10"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-label border border-ink/20 px-3 py-1 text-[11px] uppercase tracking-widest text-ink/50">
                    {profile.tag}
                  </span>
                  {profile.badge && (
                    <span className="font-label bg-signal px-3 py-1 text-[11px] uppercase tracking-widest text-ink">
                      {profile.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-display mt-5 text-2xl font-bold sm:text-3xl">
                  {profile.machine}
                </h3>

                <ul className="mt-6 space-y-3">
                  {profile.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-ink/70">
                      <IconCheck className="size-4 shrink-0 text-signal" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="chamfer-sm mt-8 flex items-center justify-between border border-ink/10 bg-paper px-5 py-4">
                  <span className="font-label text-xs uppercase tracking-widest text-ink/40">
                    Умова free оренди
                  </span>
                  <span className="font-display flex items-baseline gap-1 text-2xl font-bold">
                    <ThresholdNumber value={profile.threshold} /> кг
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-ink/10 pt-14 sm:grid-cols-2">
          <div>
            <h4 className="font-display text-lg font-bold">Підходимо для:</h4>
            <ul className="mt-4 space-y-2">
              {FIT.map((f) => (
                <li key={f} className="flex items-center gap-3 text-ink/60">
                  <IconCheck className="size-4 shrink-0 text-signal" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg font-bold">Не працюємо з:</h4>
            <ul className="mt-4 space-y-2">
              {NOT_FIT.map((f) => (
                <li key={f} className="flex items-center gap-3 text-ink/40">
                  <span className="block size-4 shrink-0 text-center leading-4 text-ink/30">
                    ×
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
