"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealText } from "@/components/RevealText";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    title: "Розкажіть про команду",
    text: "Скільки людей, який ритм дня, де стоятиме кавомашина — розмова на 10 хвилин, не бриф на 10 сторінок.",
  },
  {
    title: "Отримуєте конкретну модель",
    text: "Не каталог на вибір. Одна модель, яка відповідає навантаженню саме вашого офісу.",
  },
  {
    title: "Сім днів на пробу",
    text: "Кавомашина працює у вас тиждень. Команда п'є каву, ви оцінюєте сервіс — до підпису, а не після.",
  },
  {
    title: "Підписуєте — і бачите все",
    text: "ТОВ, платник ПДВ, повний пакет документів для бухгалтерії. Жодних прихованих умов у договорі.",
  },
  {
    title: "Встановлення і смак під вас",
    text: "Підключаємо кавомашину, налаштовуємо помел і пропорції під вашу воду й зерно на місці.",
  },
  {
    title: "Далі — наша турбота",
    text: "Постачання, сервіс, підтримка. Один номер на всі випадки — включно з тим, коли щось піде не так.",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative bg-paper py-28 text-ink sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-label text-xs uppercase tracking-widest text-ink/60">
            Як це відбувається
          </span>
          <RevealText
            as="h2"
            className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Шість кроків — і жодного невідомого.
          </RevealText>
        </div>

        <div className="relative mt-16 max-w-3xl">
          <div className="absolute left-6 top-2 bottom-2 hidden w-px bg-ink/10 sm:block" />

          <div className="space-y-12">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="relative flex gap-6 sm:gap-8"
              >
                <div className="font-display chamfer-sm relative z-10 flex size-12 shrink-0 items-center justify-center border border-ink/15 bg-paper text-sm font-bold text-ink/70">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="pt-1.5">
                  <h3 className="font-display text-lg font-bold sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-ink/60">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
