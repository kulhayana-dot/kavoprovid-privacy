"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  IconClockWait,
  IconCoinLoss,
  IconCupEmpty,
  IconMachineOff,
  IconQuestionCall,
} from "@/components/icons";
import { RevealText } from "@/components/RevealText";

gsap.registerPlugin(ScrollTrigger);

const BREAKS = [
  {
    icon: IconMachineOff,
    title: "Апарат ламається",
    text: "У понеділок вранці. Найгірший можливий момент.",
  },
  {
    icon: IconCupEmpty,
    title: "Кава закінчується",
    text: "Ніхто не відстежував залишки — тепер офіс без кави.",
  },
  {
    icon: IconClockWait,
    title: "Співробітники чекають",
    text: "П'ять хвилин перетворюються на щоденний ритуал роздратування.",
  },
  {
    icon: IconQuestionCall,
    title: "Ніхто не знає, кому дзвонити",
    text: "Орендодавцю? Постачальнику? Майстру з минулого разу?",
  },
  {
    icon: IconCoinLoss,
    title: "Гроші йдуть у нікуди",
    text: "Оренда, ремонт, зерна — окремі рахунки, жодної системи.",
  },
];

export function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const connectorDesktopRefs = useRef<Array<HTMLDivElement | null>>([]);
  const connectorMobileRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isExperience:
            "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { isExperience } = context.conditions as {
            isExperience: boolean;
          };

          if (isExperience && trackRef.current && pinRef.current) {
            setPinned(true);
            const track = trackRef.current;
            const scrollLength = Math.max(
              track.scrollWidth - window.innerWidth,
              0,
            );

            const master = gsap.to(track, {
              x: -scrollLength,
              ease: "none",
              scrollTrigger: {
                trigger: pinRef.current,
                start: "top top",
                end: () => `+=${scrollLength + window.innerHeight * 0.6}`,
                scrub: 1,
                pin: true,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  const idx = Math.min(
                    BREAKS.length - 1,
                    Math.floor(self.progress * BREAKS.length),
                  );
                  setActive(idx);
                },
              },
            });

            cardRefs.current.forEach((card) => {
              if (!card) return;
              gsap.fromTo(
                card,
                { opacity: 0.2, scale: 0.9, y: 16 },
                {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  ease: "none",
                  scrollTrigger: {
                    trigger: card,
                    containerAnimation: master,
                    start: "left 82%",
                    end: "left 42%",
                    scrub: true,
                  },
                },
              );
            });

            connectorDesktopRefs.current.forEach((line) => {
              if (!line) return;
              gsap.fromTo(
                line,
                { scaleX: 0 },
                {
                  scaleX: 1,
                  ease: "none",
                  transformOrigin: "left center",
                  scrollTrigger: {
                    trigger: line,
                    containerAnimation: master,
                    start: "left 88%",
                    end: "left 38%",
                    scrub: true,
                  },
                },
              );
            });
          } else {
            setPinned(false);
            cardRefs.current.forEach((card) => {
              if (!card) return;
              gsap.fromTo(
                card,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  ease: "power2.out",
                  scrollTrigger: { trigger: card, start: "top 88%" },
                },
              );
            });
            connectorMobileRefs.current.forEach((line) => {
              if (!line) return;
              gsap.fromTo(
                line,
                { scaleY: 0 },
                {
                  scaleY: 1,
                  duration: 0.5,
                  ease: "power2.out",
                  transformOrigin: "top center",
                  scrollTrigger: { trigger: line, start: "top 90%" },
                },
              );
            });
          }
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative bg-paper text-ink"
    >
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-28 lg:px-8 lg:pb-0">
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
          <p className="mt-5 text-ink/50 lg:hidden">
            Гортайте — кожна проблема веде до наступної.
          </p>
          <p className="mt-5 hidden items-center gap-2 text-ink/50 lg:flex">
            <span aria-hidden="true">↓</span>
            Прокрутіть — камера проведе вас крізь розрив за розривом.
          </p>
        </div>
      </div>

      <div
        ref={pinRef}
        className="relative overflow-hidden lg:h-screen"
      >
        {pinned && (
          <div className="font-label pointer-events-none absolute left-6 top-8 z-10 text-sm tracking-widest text-ink/40 lg:left-8">
            {String(active + 1).padStart(2, "0")} / {String(BREAKS.length).padStart(2, "0")}
          </div>
        )}

        <div
          ref={trackRef}
          className="flex flex-col gap-14 px-6 py-16 lg:h-full lg:flex-row lg:items-center lg:gap-0 lg:px-0 lg:py-0 lg:pl-[12vw] lg:pr-[35vw] lg:will-change-transform"
        >
          {BREAKS.map((item, i) => (
            <div key={item.title} className="flex items-stretch gap-6 lg:items-center lg:gap-0">
              <div className="flex flex-col items-center lg:hidden">
                <div className="chamfer-sm flex size-12 shrink-0 items-center justify-center border border-ink/20 bg-paper">
                  <item.icon className="size-5 text-ink/70" />
                </div>
                {i < BREAKS.length - 1 && (
                  <div
                    ref={(el) => {
                      connectorMobileRefs.current[i] = el;
                    }}
                    className="mt-2 w-px flex-1 bg-ink/20"
                  />
                )}
              </div>

              <div
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="w-full lg:w-[22vw] lg:shrink-0"
              >
                <div className="chamfer-sm hidden size-14 items-center justify-center border border-ink/20 bg-paper lg:flex">
                  <item.icon className="size-6 text-ink/70" />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold lg:mt-6 lg:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink/60">
                  {item.text}
                </p>
              </div>

              {i < BREAKS.length - 1 && (
                <div
                  className="relative hidden w-[13vw] shrink-0 items-center lg:flex"
                  aria-hidden="true"
                >
                  <div className="h-px w-full bg-ink/10" />
                  <div
                    ref={(el) => {
                      connectorDesktopRefs.current[i] = el;
                    }}
                    className="absolute inset-y-0 left-0 h-px w-full origin-left bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.35)_0,rgba(0,0,0,0.35)_6px,transparent_6px,transparent_12px)]"
                  />
                </div>
              )}
            </div>
          ))}

          <div className="max-w-md pt-4 lg:w-[26vw] lg:shrink-0 lg:pl-16 lg:pt-0">
            <p className="font-display text-xl font-bold leading-snug sm:text-2xl">
              Проблема не в кавомашині.
            </p>
            <p className="mt-3 text-ink/60">
              Проблема в тому, що між нею і вашим бізнесом немає жодного
              зв&apos;язку.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
