"use client";

import { motion } from "framer-motion";
import { RevealText } from "@/components/RevealText";
import { useLang } from "@/i18n/client";

const STEPS = [
  {
    title: "Розкажіть про команду",
    text: "Скільки людей, який ритм дня, де стоятиме кавомашина — розмова на 10 хвилин, не бриф на 10 сторінок.",
    ru: { title: "Расскажите о команде", text: "Сколько людей, какой ритм дня, где будет стоять кофемашина — разговор на 10 минут, а не бриф на 10 страниц." },
  },
  {
    title: "Отримуєте конкретну модель",
    text: "Не каталог на вибір. Одна модель, яка відповідає навантаженню саме вашого офісу.",
    ru: { title: "Получаете конкретную модель", text: "Не каталог на выбор. Одна модель, которая соответствует нагрузке именно вашего офиса." },
  },
  {
    title: "Сім днів на пробу",
    text: "Кавомашина працює у вас тиждень. Команда п'є каву, ви оцінюєте сервіс — до підпису, а не після.",
    ru: { title: "Семь дней на пробу", text: "Кофемашина работает у вас неделю. Команда пьёт кофе, вы оцениваете сервис — до подписания, а не после." },
  },
  {
    title: "Підписуєте — і бачите все",
    text: "ТОВ, платник ПДВ, повний пакет документів для бухгалтерії. Жодних прихованих умов у договорі.",
    ru: { title: "Подписываете — и видите всё", text: "ООО, плательщик НДС, полный пакет документов для бухгалтерии. Никаких скрытых условий в договоре." },
  },
  {
    title: "Встановлення і смак під вас",
    text: "Підключаємо кавомашину, налаштовуємо помел і пропорції під вашу воду й зерно на місці.",
    ru: { title: "Установка и вкус под вас", text: "Подключаем кофемашину, настраиваем помол и пропорции под вашу воду и зерно на месте." },
  },
  {
    title: "Далі — наша турбота",
    text: "Постачання, сервіс, підтримка. Один номер на всі випадки — включно з тим, коли щось піде не так.",
    ru: { title: "Дальше — наша забота", text: "Поставки, сервис, поддержка. Один номер на все случаи — включая тот, когда что-то пойдёт не так." },
  },
];

export function Process() {
  const { lang, t } = useLang();
  return (
    <section
      id="process"
      className="relative bg-paper pb-16 pt-24 text-ink sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="max-w-2xl">
          <span className="font-label text-sm font-medium uppercase tracking-widest text-ink/70">
            {t("Як це відбувається", "Как это происходит")}
          </span>
          <RevealText
            as="h2"
            className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {t("Шість кроків — і жодного невідомого.", "Шесть шагов — и ничего неизвестного.")}
          </RevealText>
        </div>

        <div className="relative mt-10 max-w-3xl sm:mt-16">
          <div className="absolute left-6 top-2 bottom-2 hidden w-px bg-ink/10 sm:block" />
          <div className="animate-flow-line absolute left-6 top-2 bottom-2 hidden w-[3px] sm:block" />

          <div className="space-y-8 sm:space-y-12">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                className="relative flex gap-6 sm:gap-8"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -5% 0px" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="font-display chamfer-sm relative z-10 flex size-12 shrink-0 items-center justify-center border border-ink bg-signal text-sm font-bold text-ink">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="pt-1.5">
                  <h3 className="font-display text-lg font-bold sm:text-xl">
                    {lang === "ru" ? step.ru.title : step.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-ink/75">{lang === "ru" ? step.ru.text : step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
