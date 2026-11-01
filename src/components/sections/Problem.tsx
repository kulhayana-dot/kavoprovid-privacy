"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RevealText } from "@/components/RevealText";
import { cn } from "@/lib/cn";
import { useLang } from "@/i18n/client";

const BREAKS = {
  uk: [
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
    title: "Гроші ідуть в нікуди",
    text: "Оренда, ремонт, зерна — окремі рахунки, жодної системи.",
  },
  ],
  ru: [
    {
      title: "Кофемашина ломается",
      text: "В понедельник утром. В самый неподходящий момент.",
    },
    {
      title: "Кофе заканчивается",
      text: "Никто не следил за остатками — теперь офис без кофе.",
    },
    {
      title: "Сотрудники ждут",
      text: "Пять минут превращаются в ежедневный ритуал раздражения.",
    },
    {
      title: "Никто не знает, кому звонить",
      text: "Арендодателю? Поставщику? Мастеру с прошлого раза?",
    },
    {
      title: "Деньги уходят в никуда",
      text: "Аренда, ремонт, зерно — отдельные счета, никакой системы.",
    },
  ],
};

export function Problem() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const [hovered, setHovered] = useState<number | null>(null);
  const { lang, t } = useLang();

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
      <div className="mx-auto max-w-7xl px-4 pb-28 pt-24 lg:px-6 sm:py-28">
        <div className="max-w-2xl">
          <span className="font-label text-sm font-medium uppercase tracking-widest text-ink/70">
            {t("Знайомо?", "Знакомо?")}
          </span>
          <RevealText
            as="h2"
            className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {t(
              "Кавомашина — це одна річ в офісі. Проблем навколо неї — п'ять.",
              "Кофемашина — это одна вещь в офисе. Проблем вокруг неё — пять.",
            )}
          </RevealText>
        </div>

        <div className="mt-10 border-t border-ink/15 sm:mt-16">
          {BREAKS[lang].map((item, i) => {
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
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: i * 0.04 }}
                className={cn(
                  "flex w-full items-baseline gap-4 border-b border-ink/15 px-4 py-5 text-left transition-colors last:border-b-0 sm:gap-8 sm:py-8",
                  active && "bg-ink text-paper",
                )}
              >
                <span
                  className={cn(
                    "font-display w-8 shrink-0 text-base font-bold sm:w-10",
                    active ? "text-signal" : "text-ink",
                  )}
                >
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
                      active ? "max-h-24 mt-3 opacity-100 text-paper/80" : "max-h-0 opacity-0",
                    )}
                  >
                    {item.text}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="chamfer mt-10 max-w-md bg-ink p-6 text-paper sm:mt-16 sm:p-8">
          <span aria-hidden="true" className="block h-1 w-10 bg-signal" />
          <p className="font-display mt-4 text-xl font-bold leading-snug sm:text-2xl">
            {t("Проблема не в кавомашині.", "Проблема не в кофемашине.")}
          </p>
          <p className="mt-3 text-paper/80">
            {t(
              "Проблема в тому, що між нею і вашим бізнесом немає жодного зв'язку.",
              "Проблема в том, что между ней и вашим бизнесом нет никакой связи.",
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
