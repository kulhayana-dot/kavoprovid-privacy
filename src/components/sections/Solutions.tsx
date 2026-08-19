"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { RevealText } from "@/components/RevealText";
import { IconCheck } from "@/components/icons";
import { cn } from "@/lib/cn";
import { MACHINES } from "@/lib/machines";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={cn("size-4", direction === "left" && "rotate-180")}
      aria-hidden="true"
    >
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ThresholdNumber({ value }: { value: number }) {
  return (
    <motion.span
      key={value}
      initial={{ y: 14, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {value}
    </motion.span>
  );
}

export function Solutions() {
  const [active, setActive] = useState(0);
  const count = MACHINES.length;
  const stageRef = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);

  const step = useCallback((delta: 1 | -1) => {
    setActive((i) => (i + delta + count) % count);
  }, [count]);

  // Keyboard nav only while the pointer is actually over the stage, so
  // arrow keys don't hijack the carousel while the user is reading a
  // different section of the page.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!hovering.current) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  const profile = MACHINES[active];

  return (
    <section id="solutions" className="relative bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 pt-28 lg:px-8 sm:pt-36">
        <div className="max-w-2xl">
          <span className="font-label text-xs uppercase tracking-widest text-paper/50">
            Підбір рішення
          </span>
          <RevealText
            as="h2"
            className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Ми вже вирішили, яка машина вам підійде.
          </RevealText>
          <p className="mt-5 text-paper/60">
            П&apos;ять перевірених конфігурацій під різні команди. Оберіть
            свою — решта деталей нижче.
          </p>
        </div>
      </div>

      <div
        ref={stageRef}
        onMouseEnter={() => { hovering.current = true; }}
        onMouseLeave={() => { hovering.current = false; }}
        className="relative mt-14 h-[560px] overflow-hidden sm:h-[640px] lg:h-[720px]"
      >
        {/* Signal-yellow glow behind the machine so it separates from the dark stage */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[6%] top-1/2 h-[80%] w-[56%] -translate-y-1/2 blur-[4px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(252,237,79,.22), rgba(252,237,79,.06) 45%, transparent 72%)",
          }}
        />

        {/* Draggable photo layer — swipe left/right to switch machines */}
        <motion.div
          className="absolute inset-0"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDragEnd={(_, info) => {
            if (info.offset.x > 70) step(-1);
            else if (info.offset.x < -70) step(1);
          }}
        >
          <AnimatePresence initial={false}>
            {profile.photo && (
              <motion.div
                key={profile.slug}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-end pr-[5%]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profile.photo.src}
                  alt={profile.machine}
                  draggable={false}
                  className="h-[86%] max-w-[58%] w-auto object-contain"
                  style={{
                    filter:
                      "drop-shadow(0 40px 70px rgba(0,0,0,.7)) drop-shadow(0 0 40px rgba(252,237,79,.12))",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,10,10,.97), rgba(10,10,10,.6) 42%, rgba(10,10,10,.05) 68%)",
          }}
        />

        <div
          role="tablist"
          aria-label="Профілі офісу"
          className="relative z-10 flex flex-wrap gap-2 p-6 sm:p-8"
        >
          {MACHINES.map((p, i) => (
            <button
              key={p.slug}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "chamfer-sm border px-4 py-2 text-xs font-medium transition-colors duration-200",
                i === active
                  ? "border-signal bg-signal text-ink"
                  : "border-paper/25 text-paper/60 hover:border-paper/40 hover:text-paper",
              )}
            >
              {p.machine.split(" ").slice(-2).join(" ")}
            </button>
          ))}
        </div>

        <div className="relative z-10 flex h-[calc(100%-72px)] max-w-lg flex-col justify-center px-6 sm:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={profile.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <span className="font-label block text-xs uppercase tracking-widest text-paper/40">
                {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>

              {profile.badge && (
                <span className="font-label mt-4 inline-block bg-signal px-3 py-1 text-xs uppercase tracking-widest text-ink">
                  {profile.badge}
                </span>
              )}

              <h3 className="font-display mt-4 text-3xl font-bold sm:text-4xl">
                {profile.machine}
              </h3>

              <ul className="mt-5 space-y-2">
                {profile.features.slice(0, 2).map((f) => (
                  <li key={f} className="flex items-center gap-3 text-paper/70">
                    <IconCheck className="size-4 shrink-0 text-signal" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-baseline gap-2 text-sm text-paper/60">
                <span className="font-label uppercase tracking-widest">
                  Оренда безкоштовна від
                </span>
                <span className="font-display text-lg font-bold text-paper">
                  <ThresholdNumber value={profile.threshold} /> кг
                </span>
              </div>

              <Link
                href={`/rishennya/${profile.slug}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-paper underline decoration-paper/30 underline-offset-4 transition-colors hover:decoration-paper"
              >
                Детальніше про модель
                <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute inset-x-6 bottom-6 z-10 flex items-center justify-between sm:inset-x-8 sm:bottom-8">
          <button
            type="button"
            aria-label="Попередня модель"
            onClick={() => step(-1)}
            className="chamfer-sm flex size-11 items-center justify-center border border-paper/25 bg-ink/40 text-paper/80 transition-colors hover:border-signal"
          >
            <ArrowIcon direction="left" />
          </button>
          <span className="font-label hidden text-xs uppercase tracking-widest text-paper/35 sm:block">
            Перетягніть, щоб гортати
          </span>
          <button
            type="button"
            aria-label="Наступна модель"
            onClick={() => step(1)}
            className="chamfer-sm flex size-11 items-center justify-center border border-paper/25 bg-ink/40 text-paper/80 transition-colors hover:border-signal"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>
    </section>
  );
}
