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

const PILLARS = [
  {
    icon: IconGauge,
    title: "Витрати без сюрпризів",
    text: "Телеметрія й ліміти порцій показують, скільки офіс п'є кави — і скільки це коштує, ще до рахунку в кінці місяця.",
  },
  {
    icon: IconShield,
    title: "Поломка — наша проблема",
    text: "Технік і підмінна кавомашина виїжджають одразу. Офіс лишається з кавою, поки ми розбираємось із несправністю.",
  },
  {
    icon: IconHeart,
    title: "Причина лишитись у офісі",
    text: "Хороша кава — привід залишитися за столом, а не піти по каву на 20 хвилин. Дрібниця, яка складається у лояльність команди.",
  },
  {
    icon: IconSwitch,
    title: "Один контакт замість списку справ",
    text: "Чистка, ремонт, закупівля зерна, розрахунки з постачальниками — більше не ваш список справ.",
  },
  {
    icon: IconDocument,
    title: "Документи без питань",
    text: "ТОВ, ПДВ, вчасні податкові накладні — бухгалтерія отримує повний пакет разом із кавою.",
  },
];

export function Benefits() {
  const [active, setActive] = useState(0);

  return (
    <section id="why" className="relative bg-ink py-28 text-paper sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-label text-xs uppercase tracking-widest text-paper/50">
            Чому Kavoprovid
          </span>
          <div className="stripe-band mt-4 inline-block px-1 py-3 sm:py-4">
            <RevealText
              as="h2"
              className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Ви купуєте не каву. Ви купуєте ось це.
            </RevealText>
          </div>
          <p className="mt-5 text-paper/50">
            Смак — це данність. Різницю роблять речі, які ви помічаєте лише
            тоді, коли щось іде не так — або не помічаєте взагалі.
          </p>
        </div>

        <div
          className="relative mt-16"
          onMouseLeave={() => setActive(0)}
        >
          <div className="absolute inset-x-0 top-6 hidden h-px bg-paper/10 lg:block" />
          <div
            className="absolute top-6 hidden h-px bg-signal transition-all duration-300 ease-out lg:block"
            style={{
              width: `${100 / PILLARS.length}%`,
              transform: `translateX(${active * 100}%)`,
            }}
          />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                onMouseEnter={() => setActive(i)}
                className="relative"
              >
                <div
                  className={cn(
                    "chamfer-sm flex size-12 items-center justify-center border transition-colors duration-200",
                    i === active
                      ? "border-signal bg-signal text-ink"
                      : "border-paper/25 text-paper",
                  )}
                >
                  <p.icon className="size-5" />
                </div>
                <h3 className="font-display mt-5 text-base font-bold">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/55">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
