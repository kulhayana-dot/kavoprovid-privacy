import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/LeadForm";
import { MachinePhoto } from "@/components/MachinePhoto";
import { IconCheck } from "@/components/icons";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { MACHINES, getMachine, getMilkFridgePhoto } from "@/lib/machines";
import { FIT_AUDIENCE, NOT_FIT_AUDIENCE } from "@/lib/audience";
import { FIT_AUDIENCE_RU, NOT_FIT_AUDIENCE_RU } from "@/lib/machines.ru";
import { breadcrumbJsonLd, lp, pageMeta, tr, type Lang } from "@/i18n";

export function machineStaticParams() {
  return MACHINES.map((m) => ({ slug: m.slug }));
}

export function machineMetadata(slug: string, lang: Lang): Metadata {
  const machine = getMachine(slug, lang);
  if (!machine) return {};
  return pageMeta(lang, `/rishennya/${machine.slug}`, machine.metaTitle, machine.metaDescription);
}

function faqFor(machine: { machine: string; threshold: number }, lang: Lang) {
  if (lang === "ru") {
    return [
      {
        q: `Сколько стоит аренда ${machine.machine}?`,
        a: `Аренда бесплатна от ${machine.threshold} кг кофе в месяц — конкретное условие для вашего офиса назовём после короткого разговора о команде.`,
      },
      {
        q: "Что входит в сервис?",
        a: "Кофемашина, зерно, чистка и ремонт по графику, подменное оборудование на время ремонта и один контакт на все случаи — без списка отдельных поставщиков.",
      },
      {
        q: `Где вы обслуживаете ${machine.machine}?`,
        a: "Киев и Киевская область — мы всегда на связи.",
      },
    ];
  }
  return [
    {
      q: `Скільки коштує оренда ${machine.machine}?`,
      a: `Оренда безкоштовна від ${machine.threshold} кг кави на місяць — конкретну умову для вашого офісу назвемо після короткої розмови про команду.`,
    },
    {
      q: "Що входить у сервіс?",
      a: "Кавомашина, зерно, чистка й ремонт за графіком, підмінне обладнання на час ремонту та один контакт на всі випадки — без списку окремих постачальників.",
    },
    {
      q: `Де ви обслуговуєте ${machine.machine}?`,
      a: "Київ та Київська область — ми завжди на зв'язку.",
    },
  ];
}

export function MachineView({ slug, lang }: { slug: string; lang: Lang }) {
  const machine = getMachine(slug, lang);
  if (!machine) notFound();

  const t = tr(lang);
  const faq = faqFor(machine, lang);
  const milkFridge = getMilkFridgePhoto(lang);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const crumbsJsonLd = breadcrumbJsonLd(lang, [
    [t("Рішення", "Решения"), "/rishennya"],
    [machine.machine, `/rishennya/${machine.slug}`],
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsJsonLd) }}
      />

      <section className="bg-ink pb-16 pt-32 text-paper sm:pb-20 sm:pt-40">
        <div className="container-start max-w-7xl px-4 lg:px-6">
          <div
            className={
              machine.photo
                ? "grid gap-12 lg:grid-cols-[480px_1fr] lg:items-center lg:gap-16"
                : "max-w-4xl"
            }
          >
            <div>
              <nav aria-label="breadcrumb" className="mb-3">
                <ol className="flex flex-wrap items-center gap-2 text-xs text-paper/75">
                  <li>
                    <Link href={lp(lang, "/")} className="hover:text-paper">
                      {t("Головна", "Главная")}
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href={lp(lang, "/rishennya")} className="hover:text-paper">
                      {t("Рішення", "Решения")}
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-paper/75" aria-current="page">
                    {machine.machine}
                  </li>
                </ol>
              </nav>
              <Link
                href={lp(lang, "/rishennya")}
                className="text-sm text-paper/75 transition-colors hover:text-paper"
              >
                ← {t("Усі рішення", "Все решения")}
              </Link>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="font-label border border-paper/20 px-3 py-1 text-xs uppercase tracking-widest text-paper/75">
                  {machine.tag}
                </span>
                {machine.badge && (
                  <span className="font-label bg-signal px-3 py-1 text-xs uppercase tracking-widest text-ink">
                    {machine.badge}
                  </span>
                )}
              </div>

              <h1 className="font-display mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {machine.machine} {t("в оренду", "в аренду")}
              </h1>

              <p className="font-label mt-3 text-sm font-medium uppercase tracking-widest text-paper/70">
                {t("Підходить:", "Подходит:")} {machine.audienceFit}
              </p>

              <p className="mt-6 max-w-2xl text-paper/75">{machine.intro}</p>

              <p className="mt-4 max-w-2xl border-l-2 border-signal pl-4 text-sm text-paper/75">
                {machine.infraNote}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="tel:+380636271567">{t("Провести каву в мій бізнес", "Провести кофе в мой бизнес")}</Button>
                <Button href="#faq" variant="secondary">
                  {t("Умови й запитання", "Условия и вопросы")}
                </Button>
              </div>
            </div>

            {machine.photo && (
              <div className="relative mx-auto w-full max-w-lg">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 blur-[4px]"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(252,237,79,.22), rgba(252,237,79,.06) 45%, transparent 72%)",
                  }}
                />
                <Image
                  src={machine.photo.src}
                  alt={machine.machine}
                  width={1100}
                  height={1100}
                  priority
                  className="mx-auto h-auto max-h-[70vh] w-auto max-w-full object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 text-ink sm:py-28">
        <div className="container-start max-w-4xl px-4 lg:px-6">
          <div className="grid gap-10 sm:grid-cols-[1fr_auto] sm:items-start">
            <ul className="space-y-3">
              {machine.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-ink/75">
                  <IconCheck className="size-4 shrink-0 text-ink" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="chamfer-sm flex items-center justify-between gap-6 border-l-4 border-signal bg-ink px-5 py-4 text-paper sm:flex-col sm:items-start sm:justify-start">
              <span className="font-label text-sm font-medium uppercase tracking-widest text-paper/80">
                {t("Оренда безкоштовна від", "Аренда бесплатна от")}
              </span>
              <span className="font-display text-3xl font-bold text-signal">
                {machine.threshold} кг
              </span>
            </div>
          </div>

          {machine.slug.startsWith("dr-coffee") && !machine.photo && (
            <div className="mt-16 border-t border-ink/10 pt-14">
              <h2 className="font-display text-xl font-bold sm:text-2xl">{t("У комплекті:", "В комплекте:")}</h2>
              <p className="mt-2 max-w-lg text-ink/75">
                {t(
                  "Холодильник для молока йде разом з кавомашиною — без окремої оренди чи пошуку постачальника.",
                  "Холодильник для молока идёт вместе с кофемашиной — без отдельной аренды или поиска поставщика.",
                )}
              </p>
              <MachinePhoto
                src={milkFridge.src}
                alt={t("Холодильник для молока", "Холодильник для молока")}
                callouts={milkFridge.callouts}
                className="mt-8 max-w-sm"
              />
            </div>
          )}

          <div className="mt-16 grid gap-10 border-t border-ink/10 pt-14 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-xl font-bold sm:text-2xl">
                {t("Кому підходимо:", "Кому подходим:")}
              </h3>
              <ul className="mt-4 space-y-2">
                {(lang === "ru" ? FIT_AUDIENCE_RU : FIT_AUDIENCE).map((f) => (
                  <li key={f} className="flex items-center gap-3 text-ink/75">
                    <IconCheck className="size-4 shrink-0 text-ink" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold sm:text-2xl">{t("Кому — ні:", "Кому — нет:")}</h3>
              <ul className="mt-4 space-y-2">
                {(lang === "ru" ? NOT_FIT_AUDIENCE_RU : NOT_FIT_AUDIENCE).map((f) => (
                  <li key={f} className="flex items-center gap-3 text-ink/75">
                    <span className="block size-4 shrink-0 text-center leading-4 text-ink">
                      ×
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div id="faq" className="mt-16 scroll-mt-24 border-t border-ink/10 pt-14">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{t("Запитання", "Вопросы")}</h2>
            <Accordion type="single" collapsible className="mt-8 space-y-4">
              {faq.map((item) => (
                <AccordionItem key={item.q} value={item.q}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-center text-paper sm:py-28">
        <div className="mx-auto max-w-2xl px-4 lg:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t("Підключіть", "Подключите")} {machine.machine} {t("до офісу.", "к офису.")}
          </h2>
          <p className="mt-4 text-paper/75">
            {t(
              "Одна розмова на 10 хвилин — і кава перестає бути вашою проблемою.",
              "Один разговор на 10 минут — и кофе перестаёт быть вашей проблемой.",
            )}
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="tel:+380636271567">{t("Провести каву в мій бізнес", "Провести кофе в мой бизнес")}</Button>
          </div>

          <div className="mx-auto mt-14 max-w-sm border-t border-paper/10 pt-10 text-left">
            <p className="text-center text-sm text-paper/75">
              {t("Або залиште контакти — передзвонимо самі.", "Или оставьте контакты — перезвоним сами.")}
            </p>
            <LeadForm source={`Модель — ${machine.machine}`} className="mt-5" />
          </div>
        </div>
      </section>
    </>
  );
}
