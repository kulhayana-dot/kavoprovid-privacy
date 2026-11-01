"use client";

import { useState } from "react";
import { RevealText } from "@/components/RevealText";
import {
  IconDocument,
  IconGauge,
  IconHeart,
  IconShield,
  IconSwitch,
} from "@/components/icons";
import { cn } from "@/lib/cn";
import { useLang } from "@/i18n/client";

const PILLARS = [
  {
    icon: IconGauge,
    title: "Витрати без сюрпризів",
    text: "Телеметрія й ліміти порцій показують, скільки офіс п'є кави — і скільки це коштує, ще до рахунку в кінці місяця.",
    ru: { title: "Расходы без сюрпризов", text: "Телеметрия и лимиты порций показывают, сколько офис пьёт кофе — и сколько это стоит, ещё до счёта в конце месяца." },
  },
  {
    icon: IconShield,
    title: "Поломка — наша проблема",
    text: "Ми завжди на зв'язку і підключаємо підмінну кавомашину. Офіс лишається з кавою, поки ми розбираємось із несправністю.",
    ru: { title: "Поломка — наша проблема", text: "Мы всегда на связи и подключаем подменную кофемашину. Офис остаётся с кофе, пока мы разбираемся с неисправностью." },
  },
  {
    icon: IconHeart,
    title: "Причина лишитись у офісі",
    text: "Хороша кава — привід залишитися за столом, а не піти по каву на 20 хвилин. Дрібниця, яка складається у лояльність команди.",
    ru: { title: "Причина остаться в офисе", text: "Хороший кофе — повод остаться за столом, а не уйти за кофе на 20 минут. Мелочь, которая складывается в лояльность команды." },
  },
  {
    icon: IconSwitch,
    title: "Один контакт замість списку справ",
    text: "Чистка, ремонт, закупівля зерна, розрахунки з постачальниками — більше не ваш список справ.",
    ru: { title: "Один контакт вместо списка дел", text: "Чистка, ремонт, закупка зерна, расчёты с поставщиками — больше не ваш список дел." },
  },
  {
    icon: IconDocument,
    title: "Документи без питань",
    text: "ТОВ, ПДВ, вчасні податкові накладні — бухгалтерія отримує повний пакет разом із кавою.",
    ru: { title: "Документы без вопросов", text: "ООО, НДС, своевременные налоговые накладные — бухгалтерия получает полный пакет вместе с кофе." },
  },
];

export function Benefits() {
  const [active, setActive] = useState(0);
  const { lang, t } = useLang();

  return (
    <section id="why" className="relative bg-ink py-16 text-paper sm:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="max-w-2xl">
          <span className="font-label text-lg font-semibold uppercase tracking-widest text-paper/85 sm:text-2xl">
            {t("Чому", "Почему")} <span className="text-signal">KAVOPROVID</span>
          </span>
          <div className="stripe-band mt-4 inline-block px-1 py-3 sm:py-4">
            <RevealText
              as="h2"
              className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              {t("Ви купуєте не каву. Ви купуєте ось це.", "Вы покупаете не кофе. Вы покупаете вот это.")}
            </RevealText>
          </div>
          <p className="mt-5 text-paper/75">
            {t(
              "Смак — це данність. Різницю роблять речі, які ви помічаєте лише тоді, коли щось іде не так — або не помічаєте взагалі.",
              "Вкус — это данность. Разницу делают вещи, которые вы замечаете только тогда, когда что-то идёт не так — или не замечаете вовсе.",
            )}
          </p>
        </div>

        <div
          className="relative mt-10 sm:mt-16"
          onMouseLeave={() => setActive(0)}
        >
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-10 lg:grid-cols-6 lg:gap-6">
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "chamfer relative border p-6",
                  i === 0
                    ? "border-signal/40 bg-signal/[0.06] lg:col-span-2"
                    : "border-paper/15 bg-paper/[0.03] sm:border-transparent sm:bg-transparent sm:p-0",
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "chamfer-sm flex items-center justify-center border transition-colors duration-200",
                      "size-12",
                      i === active
                        ? "border-signal bg-signal text-ink"
                        : // Phones have no hover, so every icon stays highlighted there.
                          "border-signal bg-signal text-ink sm:border-signal/60 sm:bg-transparent sm:text-signal",
                    )}
                  >
                    <p.icon className="size-6" />
                  </div>
                  <span className="font-label text-sm tracking-widest text-paper/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3
                  className={cn(
                    "font-display mt-5 font-bold",
                    i === 0 ? "text-xl" : "text-lg sm:text-base",
                  )}
                >
                  {lang === "ru" ? p.ru.title : p.title}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-base leading-relaxed text-paper/75",
                    i === 0 ? "max-w-sm" : "sm:text-sm",
                  )}
                >
                  {lang === "ru" ? p.ru.text : p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
