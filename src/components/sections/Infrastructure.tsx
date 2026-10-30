"use client";

import { motion } from "framer-motion";
import {
  IconBuilding,
  IconHeadset,
  IconMachine,
  IconRefresh,
  IconTruck,
  IconValve,
  IconWrench,
} from "@/components/icons";
import { RevealText } from "@/components/RevealText";

const NODES = [
  { icon: IconMachine, title: "Кавомашина", text: "Точна модель під розмір команди, а не найближча за ціною." },
  { icon: IconValve, title: "Кава", text: "Зерно Strauss Ukraine — офіційно, без посередників між обсмажувальнею і вашою чашкою." },
  { icon: IconWrench, title: "Сервіс", text: "Смак підлаштовуємо на місці — за графіком, а не за скаргою." },
  { icon: IconTruck, title: "Постачання", text: "Зерно приїжджає раніше, ніж закінчується. Рахувати запаси — не ваша робота." },
  { icon: IconRefresh, title: "Обслуговування", text: "Кавомашина вийшла з ладу — на заміну приїжджає рівнозначна, поки вашу ремонтують." },
  { icon: IconHeadset, title: "Підтримка", text: "Один номер. Одна відповідальна команда." },
  { icon: IconBuilding, title: "Бізнес", text: "Кава працює на вас, а не навпаки." },
] as const;

export function Infrastructure() {
  return (
    <section id="infrastructure" className="relative bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 lg:px-6">
        <span className="font-label block text-sm font-medium uppercase tracking-widest text-paper/70">
          Як це працює
        </span>
        <div className="stripe-band mt-5 inline-block max-w-5xl px-1 py-3 sm:py-4">
          <RevealText
            as="h2"
            className="font-display text-[min(7.4vw,2.25rem)] font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {/* One token for RevealText, kept on a single line: phones
                otherwise split it into "Кавова" / "інфраструктура". */}
            <span className="whitespace-nowrap sm:whitespace-normal">Кавова інфраструктура</span>
            {" — це ланцюг, а не кавомашина."}
          </RevealText>
        </div>
        <p className="mt-6 max-w-2xl text-paper/75">
          Кожна ланка тримає наступну — від кавомашини до підтримки.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-10 sm:pb-20 lg:px-6">
        <div className="relative max-w-2xl">
          <div className="absolute left-6 top-2 bottom-2 w-0.5 -translate-x-1/2 bg-signal/35" />
          <div className="animate-flow-line absolute left-6 top-2 bottom-2 w-[3px] -translate-x-1/2" />
          <div className="space-y-6 sm:space-y-10">
            {NODES.map((node, i) => (
              <motion.div
                key={node.title}
                className="relative flex items-start gap-6"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -5% 0px" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="chamfer-sm relative z-10 flex size-12 shrink-0 items-center justify-center border border-signal bg-signal">
                  <node.icon className="size-6 text-ink" />
                </div>
                <div className="pt-1.5">
                  <span className="font-label text-xs tracking-widest text-paper/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-1 text-lg font-bold">
                    {node.title}
                  </h3>
                  <p className="mt-1 max-w-xs text-base leading-relaxed text-paper/75 sm:text-sm">
                    {node.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-4 lg:px-6 sm:py-20">
        <p className="max-w-xl text-lg font-medium text-paper/85">
          Прибери одну ланку — і решта тримається на випадковості. Ми
          продаємо весь ланцюг, а не окрему ланку.
        </p>
      </div>
    </section>
  );
}
