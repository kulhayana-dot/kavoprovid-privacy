"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
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
      className={cn("size-5", direction === "left" && "rotate-180")}
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
    <section
      id="solutions"
      // The next section is pulled up 72px over this one; pad by the same
      // amount so it covers empty stage instead of the prev/next arrows.
      className="relative bg-ink pb-[72px] text-paper"
    >
      <div className="mx-auto max-w-7xl px-4 pt-12 lg:px-6 sm:pt-16">
        <div className="max-w-2xl">
          <span className="font-label text-sm font-medium uppercase tracking-widest text-paper/70">
            Підбір рішення
          </span>
          <RevealText
            as="h2"
            className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Кавомашина під розмір вашої команди — не навмання.
          </RevealText>
          <p className="mt-5 text-paper/75">
            Перевірені конфігурації під різні команди. Оберіть свою —
            решта деталей нижче.
          </p>
        </div>
      </div>

      <div
        ref={stageRef}
        onMouseEnter={() => { hovering.current = true; }}
        onMouseLeave={() => { hovering.current = false; }}
        className="relative mt-8 flex flex-col overflow-hidden sm:mt-14 sm:block sm:h-[640px] lg:h-[720px]"
      >
        {/* Draggable photo layer — swipe left/right to switch machines.
            Mobile: its own contained box between the model tabs and the
            info, photo centered, in flow — the
            fixed-height overlay below only works once the photo and text
            columns have room to sit side by side (sm+); on narrow screens
            that same layout let the photo's cord/base bleed into the text
            and the bottom nav, so mobile stacks instead of overlaying. */}
        <motion.div
          className="relative h-[22rem] w-full sm:absolute sm:inset-0 sm:h-auto"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDragEnd={(_, info) => {
            if (info.offset.x > 70) step(-1);
            else if (info.offset.x < -70) step(1);
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 inset-y-0 sm:hidden"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(255,255,255,.16), rgba(252,237,79,.10) 45%, transparent 75%)",
            }}
          />
          {/* Phones: arrows sit on the photo, where the thumb already is —
              the bottom row (sm+) was out of sight below the description. */}
          <button
            type="button"
            aria-label="Попередня модель"
            onClick={() => step(-1)}
            className="chamfer-sm absolute left-4 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center border border-signal bg-ink/70 text-signal sm:hidden"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            aria-label="Наступна модель"
            onClick={() => step(1)}
            className="chamfer-sm absolute right-4 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center border border-signal bg-ink/70 text-signal sm:hidden"
          >
            <ArrowIcon direction="right" />
          </button>
          <AnimatePresence initial={false}>
            {profile.photo && (
              <motion.div
                key={profile.slug}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center sm:justify-end sm:pr-[4vw]"
              >
                <div className="relative flex h-[88%] max-w-[calc(100%-7rem)] items-end justify-center sm:h-[76%] sm:max-w-[52%]">
                  {/* Soft signal-yellow glow behind the photo's feathered edges */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-[20%] hidden blur-[4px] sm:block"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(252,237,79,.22), rgba(252,237,79,.06) 45%, transparent 72%)",
                    }}
                  />
                  {/* Studio shots on black with feathered edges: they melt into
                      the stage, so no drop-shadow (it would outline the fade). */}
                  <Image
                    src={profile.photo.src}
                    alt={profile.machine}
                    width={1100}
                    height={1100}
                    draggable={false}
                    priority
                    className="relative h-full max-w-full w-auto object-contain"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden sm:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,10,10,.97), rgba(10,10,10,.6) 42%, rgba(10,10,10,.05) 68%)",
          }}
        />

        {/* Centered the same way as every other section (mx-auto max-w-7xl)
            so the tabs/info/nav line up with the heading above and the
            header logo, instead of hugging the raw viewport edge like the
            full-bleed photo layers behind them do. On mobile the wrapper
            dissolves (`contents`) so the tabs can be ordered above the
            photo: switching models then shows the name changing first. */}
        <div className="contents sm:relative sm:mx-auto sm:block sm:h-full sm:max-w-7xl">
          <div
            role="tablist"
            aria-label="Профілі офісу"
            className="relative z-10 order-first flex flex-wrap gap-2 px-4 pb-2 pt-1 lg:px-6 sm:py-8"
          >
            {MACHINES.map((p, i) => (
              <button
                key={p.slug}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  "chamfer-sm min-h-11 shrink-0 whitespace-nowrap border px-4 text-sm font-medium transition-colors duration-200 sm:min-h-0 sm:py-2 sm:text-xs",
                  i === active
                    ? "border-signal bg-signal text-ink"
                    : "border-paper/40 text-paper/85 hover:border-paper/60 hover:text-paper",
                )}
              >
                {p.machine.split(" ").slice(-2).join(" ")}
              </button>
            ))}
          </div>

          <div className="relative z-10 flex min-h-[25rem] flex-col px-4 pb-2 lg:px-6 sm:h-[calc(100%-72px)] sm:min-h-0 sm:max-w-lg sm:justify-center sm:pb-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={profile.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <span className="font-label block text-sm uppercase tracking-widest text-paper/70">
                  {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                </span>

                {profile.badge && (
                  <span className="font-label mt-4 inline-block bg-signal px-3 py-1 text-xs uppercase tracking-widest text-ink">
                    {profile.badge}
                  </span>
                )}

                <h3 className="font-display mt-4 text-2xl font-bold sm:text-4xl">
                  {profile.machine}
                </h3>

                <ul className="mt-5 space-y-2">
                  {profile.features.slice(0, 2).map((f) => (
                    <li key={f} className="flex items-start gap-3 text-paper/85">
                      <IconCheck className="mt-1 size-4 shrink-0 text-signal" />
                      {f}
                    </li>
                  ))}
                </ul>

                <p className="font-label mt-5 text-sm uppercase tracking-widest text-paper/70">
                  До <span className="text-paper">{profile.specs.dailyCapacity}</span> чашок на добу
                  {" · "}
                  <span className="text-paper">{profile.specs.hourlyCapacity}</span> на годину в пік
                </p>

                <div className="chamfer-sm mt-4 inline-flex flex-wrap items-baseline gap-x-2 border border-signal/60 bg-signal/10 px-4 py-2.5 text-sm text-paper/90">
                  <span className="font-label uppercase tracking-widest">
                    Оренда безкоштовна від
                  </span>
                  <span className="font-display text-xl font-bold text-signal">
                    <ThresholdNumber value={profile.threshold} /> кг
                  </span>
                </div>

                <Link
                  href={`/rishennya/${profile.slug}`}
                  className="mt-3 flex min-h-11 w-fit items-center gap-2 text-base font-medium text-paper underline decoration-paper/50 sm:text-sm underline-offset-4 transition-colors hover:decoration-paper"
                >
                  Детальніше про модель
                  <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative z-10 mt-4 hidden items-center justify-between px-4 pb-6 lg:px-6 sm:absolute sm:flex sm:inset-x-4 lg:inset-x-6 sm:bottom-8 sm:mt-0 sm:pb-0">
            <button
              type="button"
              aria-label="Попередня модель"
              onClick={() => step(-1)}
              className="chamfer-sm flex size-12 items-center justify-center border border-signal bg-ink/60 text-signal transition-colors hover:bg-signal hover:text-ink"
            >
              <ArrowIcon direction="left" />
            </button>
            <span className="font-label hidden text-xs uppercase tracking-widest text-paper/60 sm:block">
              Перетягніть, щоб гортати
            </span>
            <button
              type="button"
              aria-label="Наступна модель"
              onClick={() => step(1)}
              className="chamfer-sm flex size-12 items-center justify-center border border-signal bg-ink/60 text-signal transition-colors hover:bg-signal hover:text-ink"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
