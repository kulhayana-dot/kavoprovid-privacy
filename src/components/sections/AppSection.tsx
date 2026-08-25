"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { RevealText } from "@/components/RevealText";
import { IconCheck, IconGauge, IconRefresh, IconWrench } from "@/components/icons";
import { cn } from "@/lib/cn";

const SCREENS = [
  {
    src: "/app/kavoprovid-app-home.jpg",
    alt: "Головний екран KAVOPROVID App — локація, замовлення й звернення до Кавопровідника",
  },
  {
    src: "/app/kavoprovid-app-service.png",
    alt: "Кавопровідник — опис проблеми з кавомашиною та фото поломки для AI-діагнозу",
  },
  {
    src: "/app/kavoprovid-app-orders.png",
    alt: "Мої замовлення — історія замовлень і повтор одним дотиком",
  },
];

const FEATURES = [
  {
    icon: IconGauge,
    title: "План споживання",
    points: [
      "Скільки кави вже використано і скільки лишилось до місячного обсягу",
      "Push-нагадування та сповіщення про майбутню доставку",
      "Планування обсягу наперед",
    ],
  },
  {
    icon: IconRefresh,
    title: "Замовлення",
    points: [
      "Створення замовлення в кілька дотиків",
      "Історія попередніх замовлень",
      "Повтор попереднього замовлення без повторного вводу",
    ],
  },
  {
    icon: IconWrench,
    title: "Сервісні звернення",
    points: [
      "Повідомлення про проблему з фото або відео поломки",
      "Попередній AI-аналіз від Кавопровідника — асистента, який підкаже причину",
      "Кнопка «Звернутись до Кавопровідника» — спершу дистанційне рішення, виїзд майстра лише якщо дистанційно не вдалось",
    ],
  },
];

function AppScreens() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: "-10% 0px -10% 0px" });

  useEffect(() => {
    if (reduced || !inView) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SCREENS.length);
    }, 3200);
    return () => clearInterval(id);
  }, [reduced, inView]);

  return (
    <div ref={wrapRef} className="flex shrink-0 flex-col items-center">
      <div className="relative aspect-[1320/2868] w-[220px] overflow-hidden rounded-[2rem] border border-ink/10 shadow-2xl shadow-ink/20 sm:w-[260px]">
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={SCREENS[active].src}
              alt={SCREENS[active].alt}
              fill
              className="object-cover object-top"
              sizes="(min-width: 640px) 260px, 220px"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center gap-1.5">
        {SCREENS.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Показати екран ${i + 1} з ${SCREENS.length}`}
            onClick={() => setActive(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === active ? "w-5 bg-ink" : "w-1.5 bg-ink/20 hover:bg-ink/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function AppSection() {
  return (
    <section id="app" className="relative bg-paper py-28 text-ink sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:flex lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <span className="font-label text-xs uppercase tracking-widest text-ink/60">
              KAVOPROVID App
            </span>
            <RevealText
              as="h2"
              className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Керуйте своєю кавовою інфраструктурою в KAVOPROVID App.
            </RevealText>
            <p className="mt-5 text-ink/60">
              Це не застосунок для замовлення кави — це цифровий інтерфейс
              управління кавовим потоком: план споживання, замовлення й
              сервіс в одному місці. Доступний клієнтам KAVOPROVID на iOS та
              Android після онбордингу.
            </p>
          </div>

          <div className="mt-10 flex shrink-0 justify-center lg:mt-0">
            <AppScreens />
          </div>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {FEATURES.map((f) => (
            <div key={f.title} className="chamfer border border-ink/10 bg-ink/[0.02] p-6 sm:p-8">
              <div className="chamfer-sm flex size-12 items-center justify-center border border-ink/15 bg-paper text-ink">
                <f.icon className="size-5" />
              </div>
              <h3 className="font-display mt-5 text-lg font-bold sm:text-xl">
                {f.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {f.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-ink/60">
                    <IconCheck className="mt-0.5 size-4 shrink-0 text-signal" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
