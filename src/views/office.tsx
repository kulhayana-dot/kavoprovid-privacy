import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/LeadForm";
import { RevealText } from "@/components/RevealText";
import { IconCheck } from "@/components/icons";
import { MachineCard } from "@/components/MachineCard";
import { getMachines } from "@/lib/machines";
import { breadcrumbJsonLd, lp, pageMeta, tr, type Lang } from "@/i18n";

export function officeMetadata(lang: Lang): Metadata {
  const t = tr(lang);
  return pageMeta(
    lang,
    "/office",
    t(
      "Кава в офіс — кавова інфраструктура для команди | Kavoprovid",
      "Кофе в офис — кофейная инфраструктура для команды | Kavoprovid",
    ),
    t(
      "Кавове забезпечення офісу під ключ: обладнання, кава, постачання й сервіс від Kavoprovid у Києві та області. Один партнер замість підрядників.",
      "Кофейное обеспечение офиса под ключ: оборудование, кофе, поставки и сервис от Kavoprovid в Киеве и области. Один партнёр вместо подрядчиков.",
    ),
  );
}

const EXPECTATIONS = {
  uk: [
  "Каву, яка не закінчується посеред дня",
  "Однаковий смак щодня, а не лотерею",
  "Кавомашина, яка не ламається напередодні важливої зустрічі",
  ],
  ru: [
    "Кофе, который не заканчивается посреди дня",
    "Одинаковый вкус каждый день, а не лотерею",
    "Кофемашину, которая не ломается накануне важной встречи",
  ],
};

const WE_HANDLE = {
  uk: [
  "Підбір обладнання під розмір і ритм команди",
  "Безкоштовна доставка обладнання",
  "Постачання зерна та витратних матеріалів за графіком",
  "Планове й позапланове обслуговування",
  "Один контакт замість списку постачальників",
  ],
  ru: [
    "Подбор оборудования под размер и ритм команды",
    "Бесплатная доставка оборудования",
    "Поставки зерна и расходных материалов по графику",
    "Плановое и внеплановое обслуживание",
    "Один контакт вместо списка поставщиков",
  ],
};

const STEPS = {
  uk: [
  {
    title: "Аналізуємо офіс",
    text: "Скільки людей, який ритм дня, де стоятиме кавомашина — розмова на 10 хвилин.",
  },
  {
    title: "Підбираємо рішення",
    text: "Конкретна модель під навантаження саме вашого офісу, а не каталог на вибір.",
  },
  {
    title: "Встановлюємо",
    text: "Підключаємо кавомашину, налаштовуємо помел і пропорції під вашу воду й зерно на місці.",
  },
  {
    title: "Забезпечуємо кавою",
    text: "Постачання за графіком — зерно, молоко, витратні матеріали не закінчуються несподівано.",
  },
  {
    title: "Обслуговуємо й підтримуємо",
    text: "Чистка, ремонт, підмінне обладнання на час ремонту. Один номер на всі випадки.",
  },
  ],
  ru: [
    {
      title: "Анализируем офис",
      text: "Сколько людей, какой ритм дня, где будет стоять кофемашина — разговор на 10 минут.",
    },
    {
      title: "Подбираем решение",
      text: "Конкретная модель под нагрузку именно вашего офиса, а не каталог на выбор.",
    },
    {
      title: "Устанавливаем",
      text: "Подключаем кофемашину, настраиваем помол и пропорции под вашу воду и зерно на месте.",
    },
    {
      title: "Обеспечиваем кофе",
      text: "Поставки по графику — зерно, молоко, расходные материалы не заканчиваются неожиданно.",
    },
    {
      title: "Обслуживаем и поддерживаем",
      text: "Чистка, ремонт, подменное оборудование на время ремонта. Один номер на все случаи.",
    },
  ],
};


export function OfficeView({ lang }: { lang: Lang }) {
  const t = tr(lang);
  const jsonLd = breadcrumbJsonLd(lang, [[t("Офіси", "Офисы"), "/office"]]);
  const machines = getMachines(lang).filter((m) => m.slug !== "dr-coffee-coffeecenter");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-ink pb-16 pt-32 text-paper sm:pb-24 sm:pt-40">
        <div className="container-start max-w-4xl px-4 lg:px-6">
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-paper/75">
              <li>
                <Link href={lp(lang, "/")} className="hover:text-paper">
                  {t("Головна", "Главная")}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-paper/75" aria-current="page">
                {t("Офіси", "Офисы")}
              </li>
            </ol>
          </nav>

          <span className="font-label text-sm font-medium uppercase tracking-widest text-paper/70">
            {t("Для офісів", "Для офисов")}
          </span>
          <RevealText
            as="h1"
            trigger="load"
            className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {t("Кава, яка працює разом із вашим офісом.", "Кофе, который работает вместе с вашим офисом.")}
          </RevealText>
          <p className="mt-5 max-w-xl text-paper/75">
            {t(
              "Kavoprovid бере на себе обладнання, каву, постачання й сервіс для офісів у Києві та Київській області — одним рішенням, а не списком підрядників.",
              "Kavoprovid берёт на себя оборудование, кофе, поставки и сервис для офисов в Киеве и Киевской области — одним решением, а не списком подрядчиков.",
            )}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="tel:+380636271567">{t("Провести каву в мій бізнес", "Провести кофе в мой бизнес")}</Button>
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
            {t(
              "Команда очікує каву. Ви — не хочете нею перейматись.",
              "Команда ждёт кофе. Вы — не хотите о нём беспокоиться.",
            )}
          </RevealText>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="font-label text-sm font-medium uppercase tracking-widest text-ink/70">
                {t("Що очікує команда", "Чего ждёт команда")}
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

      <section id="process" className="scroll-mt-24 bg-ink py-16 text-paper sm:py-28">
        <div className="container-start max-w-7xl px-4 lg:px-6">
          <span className="font-label text-sm font-medium uppercase tracking-widest text-paper/70">
            {t("Як це працює", "Как это работает")}
          </span>
          <RevealText
            as="h2"
            className="font-display mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {t("Від розмови до кави на столі — п'ять кроків.", "От разговора до кофе на столе — пять шагов.")}
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
            {t("Обладнання для офісів", "Оборудование для офисов")}
          </span>
          <RevealText
            as="h2"
            className="font-display mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {t("Модель підбираємо під навантаження, не навпаки.", "Модель подбираем под нагрузку, а не наоборот.")}
          </RevealText>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {machines.map((m) => (
              <MachineCard key={m.slug} machine={m} aspectClassName="aspect-square" lang={lang} />
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-sm text-ink/75">
            {t(
              "Офіс виріс — додаємо кавомашину або переходимо на модель із більшим навантаженням без розірвання договору. Інфраструктура масштабується разом із командою.",
              "Офис вырос — добавляем кофемашину или переходим на модель с большей нагрузкой без расторжения договора. Инфраструктура масштабируется вместе с командой.",
            )}
          </p>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-ink/10 bg-paper py-16 text-ink sm:py-28">
        <div className="container-start max-w-4xl px-4 lg:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{t("Запитання", "Вопросы")}</h2>
          <p className="mt-3 text-ink/75">
            {t(
              "Відповіді на часті запитання про вартість, обслуговування й географію зібрані на окремій сторінці.",
              "Ответы на частые вопросы о стоимости, обслуживании и географии собраны на отдельной странице.",
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
            {t("Підключіть офіс до кавопроводу.", "Подключите офис к кавопроводу.")}
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
            <LeadForm source="Office page" className="mt-5" />
          </div>
        </div>
      </section>
    </>
  );
}
