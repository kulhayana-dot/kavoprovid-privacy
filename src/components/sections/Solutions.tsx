"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { RevealText } from "@/components/RevealText";
import { IconCheck } from "@/components/icons";
import { cn } from "@/lib/cn";
import { MACHINES } from "@/lib/machines";
import { FIT_AUDIENCE, NOT_FIT_AUDIENCE } from "@/lib/audience";

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

  const profile = MACHINES[active];

  return (
    <section id="solutions" className="relative bg-paper py-28 text-ink sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-label text-xs uppercase tracking-widest text-ink/60">
            Підбір рішення
          </span>
          <RevealText
            as="h2"
            className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Ми вже вирішили, яка машина вам підійде.
          </RevealText>
          <p className="mt-5 text-ink/60">
            П&apos;ять перевірених конфігурацій під різні команди. Оберіть
            свою — решта деталей нижче.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-14">
          <div
            role="tablist"
            aria-label="Профілі офісу"
            className="scrollbar-none -mx-6 flex gap-3 overflow-x-auto px-6 lg:mx-0 lg:flex-col lg:gap-2 lg:overflow-visible lg:px-0"
          >
            {MACHINES.map((p, i) => (
              <button
                key={p.slug}
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
                className="chamfer grid overflow-hidden border border-ink/10 bg-ink/[0.02] sm:grid-cols-[280px_1fr] sm:items-stretch"
              >
                {profile.photo && (
                  <div className="relative aspect-[4/3] bg-ink sm:aspect-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={profile.photo.src}
                      alt={profile.machine}
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ objectPosition: "center 30%" }}
                    />
                  </div>
                )}

                <div className="p-8 sm:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-label border border-ink/20 px-3 py-1 text-xs uppercase tracking-widest text-ink/60">
                      {profile.tag}
                    </span>
                    {profile.badge && (
                      <span className="font-label bg-signal px-3 py-1 text-xs uppercase tracking-widest text-ink">
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
                    <span className="font-label text-xs uppercase tracking-widest text-ink/60">
                      Оренда безкоштовна від
                    </span>
                    <span className="font-display flex items-baseline gap-1 text-2xl font-bold">
                      <ThresholdNumber value={profile.threshold} /> кг
                    </span>
                  </div>

                  <Link
                    href={`/rishennya/${profile.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
                  >
                    Детальніше про модель
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-ink/10 pt-14 sm:grid-cols-2">
          <div>
            <h4 className="font-display text-lg font-bold">Кому підходимо:</h4>
            <ul className="mt-4 space-y-2">
              {FIT_AUDIENCE.map((f) => (
                <li key={f} className="flex items-center gap-3 text-ink/60">
                  <IconCheck className="size-4 shrink-0 text-signal" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg font-bold">Кому — ні:</h4>
            <ul className="mt-4 space-y-2">
              {NOT_FIT_AUDIENCE.map((f) => (
                <li key={f} className="flex items-center gap-3 text-ink/60">
                  <span className="block size-4 shrink-0 text-center leading-4 text-ink/65">
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
