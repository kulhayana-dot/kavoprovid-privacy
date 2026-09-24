"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RevealText } from "@/components/RevealText";
import { cn } from "@/lib/cn";

const BREAKS = [
  {
    title: "Кавомашина ламається",
    text: "У понеділок вранці. Найгірший можливий момент.",
  },
  {
    title: "Кава закінчується",
    text: "Ніхто не відстежував залишки — тепер офіс без кави.",
  },
  {
    title: "Співробітники чекають",
    text: "П'ять хвилин перетворюються на щоденний ритуал роздратування.",
  },
  {
    title: "Ніхто не знає, кому дзвонити",
    text: "Орендодавцю? Постачальнику? Майстру з минулого разу?",
  },
  {
    title: "Гроші йдуть у нікуди",
    text: "Оренда, ремонт, зерна — окремі рахунки, жодної системи.",
  },
];

export function Problem() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const [hovered, setHovered] = useState<number | null>(null);

  function toggle(i: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <section id="problem" className="relative bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 sm:py-28">
        <div className="max-w-2xl">
          <span className="font-label text-xs uppercase tracking-widest text-ink/50">
            Знайомо?
          </span>
          <RevealText
            as="h2"
            className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Кавомашина — це одна річ в офісі. Проблем навколо неї — п&apos;ять.
          </RevealText>
        </div>

        <div className="mt-16 border-t border-ink/10">
          {BREAKS.map((item, i) => {
            const active = open.has(i) || hovered === i;
            return (
              <motion.button
                key={item.title}
                type="button"
                onClick={() => toggle(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
                className={cn(
                  "flex w-full items-baseline gap-6 border-b border-ink/10 px-4 py-8 text-left transition-colors sm:gap-8",
                  active && "bg-ink text-paper",
                )}
              >
                <span className="font-display w-10 shrink-0 text-base font-bold text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span
                    className={cn(
                      "font-display block text-2xl font-bold leading-tight transition-colors sm:text-4xl",
                      active && "text-signal",
                    )}
                  >
                    {item.title}
                  </span>
                  <span
                    className={cn(
                      "block overflow-hidden text-base transition-[max-height,opacity,margin-top] duration-300 ease-out sm:text-lg",
                      active ? "max-h-20 mt-3 opacity-100 text-paper/70" : "max-h-0 opacity-0",
                    )}
                  >
                    {item.text}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-16 max-w-md border-t border-ink/10 pt-8">
          <p className="font-display text-xl font-bold leading-snug sm:text-2xl">
            Проблема не в кавомашині.
          </p>
          <p className="mt-3 text-ink/60">
            Проблема в тому, що між нею і вашим бізнесом немає жодного
            зв&apos;язку.
          </p>
        </div>
      </div>
    </section>
  );
}
