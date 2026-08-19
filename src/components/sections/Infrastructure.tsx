"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
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

// Extra scroll budget for the pin, in viewport-heights — matches the
// original ScrollTrigger end of `+=${window.innerHeight * 2.4}`.
const PIN_SCROLL_VH = 2.4;

export function Infrastructure() {
  const outerRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastIndexRef = useRef(0);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduced || !lineFillRef.current) return;
    const n = NODES.length;
    lineFillRef.current.style.clipPath = `inset(0 0 ${(1 - p) * 100}% 0)`;

    const idx = Math.min(n - 1, Math.floor(p * n + 0.0001));
    if (idx !== lastIndexRef.current) {
      lastIndexRef.current = idx;
      setActiveIndex(idx);
    }

    nodeRefs.current.forEach((el, i) => {
      if (!el) return;
      const threshold = i / (n - 1);
      const isActive = p >= threshold - 0.015;
      el.classList.toggle("node-active", isActive);
      el.style.opacity = isActive ? "1" : "0.25";
      el.style.transform = isActive ? "scale(1)" : "scale(0.88)";
    });
  });

  useEffect(() => {
    if (reduced) return;
    nodeRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = i === 0 ? "1" : "0.25";
      el.style.transform = i === 0 ? "scale(1)" : "scale(0.88)";
    });
  }, [reduced]);

  const chain: ReactNode = (
    <div className="mx-auto flex h-full max-w-2xl items-center px-6 lg:px-8">
      <div className="relative w-full py-10">
        <div className="absolute left-6 top-0 bottom-0 w-1 -translate-x-1/2 bg-paper/10" />
        <div
          ref={lineFillRef}
          className="pipe-fill absolute left-6 top-0 bottom-0 w-1 -translate-x-1/2"
        />

        <div className="relative flex flex-col justify-between gap-8 sm:gap-0">
          {NODES.map((node, i) => (
            <div key={node.title} className="flex items-center gap-6 py-2">
              <div
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                className="infra-node chamfer-sm relative z-10 flex size-12 shrink-0 items-center justify-center border border-paper/25 bg-ink"
              >
                <node.icon className="size-5 text-paper" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold sm:text-lg">
                  {node.title}
                </h3>
                <p className="mt-1 max-w-xs text-sm leading-relaxed text-paper/55">
                  {node.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section id="infrastructure" className="relative bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-28 lg:px-8">
        <span className="font-label block text-xs uppercase tracking-widest text-paper/50">
          Як це працює
        </span>
        <div className="stripe-band mt-5 inline-block max-w-5xl px-1 py-3 sm:py-4">
          <RevealText
            as="h2"
            className="font-display text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
          >
            Кавова інфраструктура — це ланцюг, а не кавомашина.
          </RevealText>
        </div>
        <p className="mt-6 max-w-2xl text-paper/50">
          Кожна ланка тримає наступну. Прокрутіть — і подивіться, що
          станеться, якщо жодна не випаде.
        </p>
      </div>

      {reduced ? (
        <div className="relative overflow-visible py-16">{chain}</div>
      ) : (
        <div
          ref={outerRef}
          className="relative"
          style={{ height: `${(1 + PIN_SCROLL_VH) * 100}vh` }}
        >
          <div className="sticky top-0 h-screen overflow-hidden">
            <div
              aria-hidden="true"
              className="font-label pointer-events-none absolute left-6 top-8 text-sm tracking-widest text-paper/60 lg:left-8"
            >
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(NODES.length).padStart(2, "0")}
            </div>
            {chain}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <p className="max-w-xl text-lg font-medium text-paper/80">
          Прибери одну ланку — і решта тримається на випадковості. Ми
          продаємо весь ланцюг, а не окрему ланку.
        </p>
      </div>
    </section>
  );
}
