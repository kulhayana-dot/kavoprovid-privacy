import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/LeadForm";
import { RevealText } from "@/components/RevealText";
import { IconCheck, IconGauge } from "@/components/icons";
import { MachineCard } from "@/components/MachineCard";
import { getMachines } from "@/lib/machines";
import { breadcrumbJsonLd, lp, pageMeta, tr, type Lang } from "@/i18n";

export function productionMetadata(lang: Lang): Metadata {
  const t = tr(lang);
  return pageMeta(
    lang,
    "/production",
    t(
      "Кава для виробництва — кавова інфраструктура | Kavoprovid",
      "Кофе для производства — кофейная инфраструктура | Kavoprovid",
    ),
    t(
      "Кавова інфраструктура для виробництва під ключ: обладнання, кава, постачання й сервіс від Kavoprovid у Києві та області. Без простоїв.",
      "Кофейная инфраструктура для производства под ключ: оборудование, кофе, поставки и сервис от Kavoprovid в Киеве и области. Без простоев.",
    ),
  );
}

const EXPECTATIONS = {
  uk: [
  "Каву, доступну незалежно від зміни й часу доби",
  "Кавомашину, розраховану на високий потік людей",
  "Стабільну роботу без простоїв обладнання",
  ],
  ru: [
    "Кофе, доступный независимо от смены и времени суток",
    "Кофемашину, рассчитанную на большой поток людей",
    "Стабильную работу без простоев оборудования",
  ],
};

const WE_HANDLE = {
  uk: [
  "Обладнання під виробниче навантаження й багатозмінний графік",
  "Постачання великих обсягів кави та витратних матеріалів",
  "Планове обслуговування виробничого обладнання",
  "Технічну підтримку — ми завжди на зв'язку",
  "Контроль витрат — денний ліміт порцій на кожного співробітника",
  ],
  ru: [
    "Оборудование под производственную нагрузку и многосменный график",
    "Поставки больших объёмов кофе и расходных материалов",
    "Плановое обслуживание производственного оборудования",
    "Техническую поддержку — мы всегда на связи",
    "Контроль расходов — дневной лимит порций на каждого сотрудника",
  ],
};

const STEPS = {
  uk: [
  {
    title: "Аналізуємо навантаження",
    text: "Кількість змін, чисельність людей на зміні, розташування точок — розмова про реальний ритм виробництва.",
  },
  {
    title: "Підбираємо обладнання",
    text: "Кавомашину під потік людей і безперервну роботу, а не універсальну модель для невеликого офісу.",
  },
  {
    title: "Встановлюємо на майданчику",
    text: "Підключаємо кавомашину там, де вона реально потрібна — біля цеху, в зоні відпочинку, на кожній точці.",
  },
  {
    title: "Забезпечуємо об'ємами",
    text: "Постачання великих партій зерна й витратних матеріалів за графіком — без ручного контролю запасів.",
  },
  {
    title: "Обслуговуємо за графіком змін",
    text: "Планове обслуговування підлаштовуємо під графік змін. При позаштатному ремонті — ми завжди на зв'язку.",
  },
  ],
  ru: [
    {
      title: "Анализируем нагрузку",
      text: "Количество смен, численность людей на смене, расположение точек — разговор о реальном ритме производства.",
    },
    {
      title: "Подбираем оборудование",
      text: "Кофемашину под поток людей и непрерывную работу, а не универсальную модель для небольшого офиса.",
    },
    {
      title: "Устанавливаем на площадке",
      text: "Подключаем кофемашину там, где она реально нужна — возле цеха, в зоне отдыха, на каждой точке.",
    },
    {
      title: "Обеспечиваем объёмами",
      text: "Поставки больших партий зерна и расходных материалов по графику — без ручного контроля запасов.",
    },
    {
      title: "Обслуживаем по графику смен",
      text: "Плановое обслуживание подстраиваем под график смен. При внештатном ремонте — мы всегда на связи.",
    },
  ],
};

const PRODUCTION_SLUGS = ["dr-coffee-coffeecenter", "dr-coffee-coffeebar-plus"];

export function ProductionView({ lang }: { lang: Lang }) {
  const t = tr(lang);
  const jsonLd = breadcrumbJsonLd(lang, [[t("Виробництва", "Производства"), "/production"]]);
  const machines = getMachines(lang).filter((m) => PRODUCTION_SLUGS.includes(m.slug));
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden bg-ink pb-16 pt-32 text-paper sm:pb-24 sm:pt-40">
        <Image
          src="/hero/production.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-contain object-top sm:object-cover sm:object-center"
        />
        {/* Darker on the left, where the text sits over the busiest part of the photo */}
        <div className="absolute inset-0 bg-ink/60 sm:bg-transparent sm:bg-gradient-to-r sm:from-ink/90 sm:via-ink/60 sm:to-ink/20" />
        <div className="relative container-start max-w-4xl px-4 lg:px-6">
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-paper/75">
              <li>
                <Link href={lp(lang, "/")} className="hover:text-paper">
                  {t("Головна", "Главная")}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-paper/75" aria-current="page">
                {t("Виробництва", "Производства")}
              </li>
            </ol>
          </nav>

          <span className="font-label text-sm font-medium uppercase tracking-widest text-paper/70">
            {t("Для виробництв", "Для производств")}
          </span>
          <RevealText
            as="h1"
            trigger="load"
            className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {t(
              "Кавова інфраструктура, яка працює разом із вашим виробництвом.",
              "Кофейная инфраструктура, которая работает вместе с вашим производством.",
            )}
          </RevealText>
          <p className="mt-5 max-w-xl text-paper/85">
            {t(
              "Kavoprovid забезпечує виробництва безперервною кавовою інфраструктурою на кожну зміну — обладнання, кава, постачання й сервіс в одного партнера.",
              "Kavoprovid обеспечивает производства непрерывной кофейной инфраструктурой на каждую смену — оборудование, кофе, поставки и сервис у одного партнёра.",
            )}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="tel:+380636271567">
              {t("Провести каву на виробництво", "Провести кофе на производство")}
            </Button>
            <Button href="#process" variant="secondary">
              {t("Як це працює", "Как это работает")}
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 text-ink sm:py-28">
        <div className="container-start max-w-7xl px-4 lg:px-6">
          <RevealText
            as="h2"
            className="font-display max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {t("Зміна не чекає, поки хтось поїде по каву.", "Смена не ждёт, пока кто-то съездит за кофе.")}
          </RevealText>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="font-label text-sm font-medium uppercase tracking-widest text-ink/70">
                {t("Що важливо на виробництві", "Что важно на производстве")}
              </h3>
              <ul className="mt-4 space-y-3">
                {EXPECTATIONS[lang].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-ink/75">
                    <IconCheck className="mt-1 size-4 shrink-0 text-ink" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-label text-sm font-medium uppercase tracking-widest text-ink/70">
                {t("Що ми беремо на себе", "Что мы берём на себя")}
              </h3>
              <ul className="mt-4 space-y-3">
                {WE_HANDLE[lang].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-ink/75">
                    <IconCheck className="mt-1 size-4 shrink-0 text-ink" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-paper py-16 text-ink sm:py-28">
        <div className="container-start max-w-7xl px-4 lg:px-6">
          <div className="chamfer grid gap-10 border border-ink/10 bg-ink/[0.02] p-8 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-14">
            <div className="chamfer-sm flex size-14 items-center justify-center border border-ink bg-signal">
              <IconGauge className="size-6 text-ink" />
            </div>
            <div>
              <span className="font-label text-sm font-medium uppercase tracking-widest text-ink/70">
                {t("Для великих виробництв", "Для крупных производств")}
              </span>
              <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {t("Контрольовані витрати на каву.", "Контролируемые расходы на кофе.")}
              </h2>
              <p className="mt-4 max-w-2xl text-ink/75">
                {t(
                  "Для виробництв із великим споживанням ми підключаємо систему обліку на тих самих картках, які вже використовуються на майданчику — наприклад, для доступу через прохідну. До картки прив'язується денний ліміт напоїв: компанія встановлює норму, скажімо, три порції на співробітника на день — кавомашина не видасть понад неї. Пити менше можна, більше — ні.",
                  "Для производств с большим потреблением мы подключаем систему учёта на тех же картах, которые уже используются на площадке — например, для прохода через проходную. К карте привязывается дневной лимит напитков: компания устанавливает норму, скажем, три порции на сотрудника в день — кофемашина не выдаст сверх неё. Пить меньше можно, больше — нет.",
                )}
              </p>
              <p className="mt-4 max-w-2xl text-ink/75">
                {t(
                  "Це дає прогнозовані витрати на каву щомісяця: кількість співробітників × встановлений ліміт, без несподіванок і без ручного контролю споживання.",
                  "Это даёт прогнозируемые расходы на кофе каждый месяц: количество сотрудников × установленный лимит, без неожиданностей и без ручного контроля потребления.",
                )}
              </p>
              <Link
                href={lp(lang, "/kava-v-biznesi/kontrol-vytrat-na-kavu-na-vyrobnytstvi")}
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
              >
                {t("Детальніше про систему лімітів", "Подробнее о системе лимитов")}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-24 bg-ink py-16 text-paper sm:py-28">
        <div className="container-start max-w-7xl px-4 lg:px-6">
          <span className="font-label text-sm font-medium uppercase tracking-widest text-paper/70">
            {t("Як це працює", "Как это работает")}
          </span>
          <RevealText
            as="h2"
            className="font-display mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {t(
              "Від навантаження до безперервної роботи — п'ять кроків.",
              "От нагрузки до непрерывной работы — пять шагов.",
            )}
          </RevealText>

          <div className="relative mt-14 max-w-3xl">
            <div className="absolute left-6 top-2 bottom-2 hidden w-0.5 bg-signal/35 sm:block" />
            <div className="space-y-10">
              {STEPS[lang].map((step, i) => (
                <div key={step.title} className="relative flex gap-6 sm:gap-8">
                  <div className="font-display chamfer-sm relative z-10 flex size-12 shrink-0 items-center justify-center border border-signal bg-signal text-sm font-bold text-ink">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="pt-1.5">
                    <h3 className="font-display text-lg font-bold sm:text-xl">{step.title}</h3>
                    <p className="mt-2 max-w-xl text-paper/75">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 text-ink sm:py-28">
        <div className="container-start max-w-7xl px-4 lg:px-6">
          <span className="font-label text-sm font-medium uppercase tracking-widest text-ink/70">
            {t("Обладнання для виробництв", "Оборудование для производств")}
          </span>
          <RevealText
            as="h2"
            className="font-display mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {t(
              "Розраховане на безперервний потік, а не на поодинокі чашки.",
              "Рассчитано на непрерывный поток, а не на единичные чашки.",
            )}
          </RevealText>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {machines.map((m) => (
              <MachineCard key={m.slug} machine={m} lang={lang} />
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-sm text-ink/75">
            {t(
              "Більше змін, більше людей — інфраструктура масштабується додаванням кавомашин і точок доступу, без зупинки процесів на майданчику.",
              "Больше смен, больше людей — инфраструктура масштабируется добавлением кофемашин и точек доступа, без остановки процессов на площадке.",
            )}
          </p>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-ink/10 bg-paper py-16 text-ink sm:py-28">
        <div className="container-start max-w-4xl px-4 lg:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{t("Запитання", "Вопросы")}</h2>
          <p className="mt-3 text-ink/75">
            {t(
              "Відповіді на часті запитання про графік змін, обслуговування й контроль витрат зібрані на окремій сторінці.",
              "Ответы на частые вопросы о графике смен, обслуживании и контроле расходов собраны на отдельной странице.",
            )}
          </p>
          <div className="mt-6 flex">
            <Button href={lp(lang, "/faq")} variant="outline">
              {t("Усі запитання", "Все вопросы")} <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-center text-paper sm:py-28">
        <div className="mx-auto max-w-2xl px-4 lg:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t("Підключіть виробництво до кавопроводу.", "Подключите производство к кавопроводу.")}
          </h2>
          <p className="mt-4 text-paper/75">
            {t(
              "Одна розмова на 10 хвилин — і кава перестає бути залежною від того, хто сьогодні поїде в магазин.",
              "Один разговор на 10 минут — и кофе перестаёт зависеть от того, кто сегодня поедет в магазин.",
            )}
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="tel:+380636271567">
              {t("Провести каву на виробництво", "Провести кофе на производство")}
            </Button>
          </div>

          <div className="mx-auto mt-14 max-w-sm border-t border-paper/10 pt-10 text-left">
            <p className="text-center text-sm text-paper/75">
              {t("Або залиште контакти — передзвонимо самі.", "Или оставьте контакты — перезвоним сами.")}
            </p>
            <LeadForm source="Production page" className="mt-5" />
          </div>
        </div>
      </section>
    </>
  );
}
