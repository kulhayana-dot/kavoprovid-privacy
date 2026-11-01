"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { RevealText } from "@/components/RevealText";
import { IconCheck, IconGauge, IconRefresh, IconWrench } from "@/components/icons";
import { cn } from "@/lib/cn";
import { TiltCard } from "@/components/ui/TiltCard";
import { useLang } from "@/i18n/client";

const SCREENS = [
  {
    src: "/app/kavoprovid-app-home.jpg",
    alt: "Головний екран KAVOPROVID App — локація, замовлення й звернення до Кавопровідника",
    ru: { alt: "Главный экран KAVOPROVID App — локация, заказы и обращения к Кавопроводнику" },
  },
  {
    src: "/app/kavoprovid-app-catalog.jpg",
    alt: "Каталог замовлення — кава в зернах, інгредієнти для вендингу та інші витратні матеріали",
    ru: { alt: "Каталог заказа — кофе в зёрнах, ингредиенты для вендинга и другие расходные материалы" },
  },
  {
    src: "/app/kavoprovid-app-service.png",
    alt: "Кавопровідник — опис проблеми з кавомашиною та фото поломки для AI-діагнозу",
    ru: { alt: "Кавопроводник — описание проблемы с кофемашиной и фото поломки для AI-диагноза" },
  },
  {
    src: "/app/kavoprovid-app-orders.png",
    alt: "Мої замовлення — історія замовлень і повтор одним дотиком",
    ru: { alt: "Мои заказы — история заказов и повтор одним касанием" },
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
    ru: { title: "План потребления", points: ["Сколько кофе уже использовано и сколько осталось до месячного объёма", "Push-напоминания и уведомления о предстоящей доставке", "Планирование объёма наперёд"] },
  },
  {
    icon: IconRefresh,
    title: "Замовлення",
    points: [
      "Каталог кави в зернах, інгредієнтів для вендингу та витратних матеріалів",
      "Історія попередніх замовлень",
      "Повтор попереднього замовлення без повторного вводу",
    ],
    ru: { title: "Заказы", points: ["Каталог кофе в зёрнах, ингредиентов для вендинга и расходных материалов", "История предыдущих заказов", "Повтор предыдущего заказа без повторного ввода"] },
  },
  {
    icon: IconWrench,
    title: "Сервісні звернення",
    points: [
      "Повідомлення про проблему з фото або відео поломки",
      "Попередній AI-аналіз від Кавопровідника — асистента, який підкаже причину",
      "Кнопка «Звернутись до Кавопровідника» — спершу дистанційне рішення, виїзд майстра лише якщо дистанційно не вдалось",
    ],
    ru: { title: "Сервисные обращения", points: ["Сообщение о проблеме с фото или видео поломки", "Предварительный AI-анализ от Кавопроводника — ассистента, который подскажет причину", "Кнопка «Обратиться к Кавопроводнику» — сначала дистанционное решение, выезд мастера только если дистанционно не удалось"] },
  },
];

function AppScreens() {
  const { lang, t } = useLang();
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: "-10% 0px -10% 0px", once: true });

  useEffect(() => {
    if (reduced || !inView) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SCREENS.length);
    }, 3200);
    return () => clearInterval(id);
  }, [reduced, inView]);

  return (
    <div ref={wrapRef} className="flex shrink-0 flex-col items-center">
      <div className="relative aspect-[1320/2868] w-[240px] overflow-hidden rounded-[2rem] border border-ink/15 shadow-2xl shadow-ink/20 sm:w-[260px]">
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
              alt={lang === "ru" ? SCREENS[active].ru.alt : SCREENS[active].alt}
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
            aria-label={t(`Показати екран ${i + 1} з ${SCREENS.length}`, `Показать экран ${i + 1} из ${SCREENS.length}`)}
            onClick={() => setActive(i)}
            className={cn(
              "relative h-1.5 rounded-full transition-all duration-300 before:absolute before:-inset-3 before:content-['']",
              i === active ? "w-5 bg-ink" : "w-1.5 bg-ink/30 hover:bg-ink/50",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function AppSection() {
  const { lang, t } = useLang();
  return (
    // data-nosnippet: keep app-only copy ("доступ після онбордингу", screen
    // alt texts) out of Google's search snippet for brand queries — it's
    // secondary info for existing clients, not what a prospect should see.
    <section id="app" data-nosnippet className="relative bg-paper pb-16 pt-24 text-ink sm:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="lg:flex lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <span className="font-label text-sm font-medium uppercase tracking-widest text-ink/70">
              KAVOPROVID App
            </span>
            <RevealText
              as="h2"
              className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              {t(
                "Керуйте своєю кавовою інфраструктурою в KAVOPROVID App.",
                "Управляйте своей кофейной инфраструктурой в KAVOPROVID App.",
              )}
            </RevealText>
            <p className="mt-5 text-ink/75">
              {t(
                "Це не застосунок для замовлення кави — це цифровий інтерфейс управління кавовим потоком: план споживання, замовлення й сервіс в одному місці.",
                "Это не приложение для заказа кофе — это цифровой интерфейс управления кофейным потоком: план потребления, заказы и сервис в одном месте.",
              )}
            </p>
            <p className="chamfer-sm mt-5 inline-flex items-center gap-2.5 bg-ink px-4 py-2.5 text-sm font-medium text-paper">
              <span aria-hidden="true" className="size-1.5 shrink-0 bg-signal" />
              {t("iOS та Android · доступ після онбордингу", "iOS и Android · доступ после онбординга")}
            </p>
          </div>

          <div className="mt-10 flex shrink-0 justify-center lg:mt-0 lg:align-stage-end">
            <AppScreens />
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:mt-20 sm:grid-cols-3 sm:gap-10">
          {FEATURES.map((f, i) => (
            <TiltCard key={f.title} className="border-ink/25 bg-ink/[0.04] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div className="chamfer-sm flex size-12 items-center justify-center border border-ink bg-signal text-ink">
                  <f.icon className="size-5" />
                </div>
                <span className="font-label text-sm font-bold tracking-widest text-ink/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display mt-5 text-lg font-bold sm:text-xl">
                {lang === "ru" ? f.ru.title : f.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {(lang === "ru" ? f.ru.points : f.points).map((point) => (
                  <li key={point} className="flex items-start gap-3 text-base text-ink/80 sm:text-sm">
                    <IconCheck className="mt-1 size-4 shrink-0 text-ink sm:mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
