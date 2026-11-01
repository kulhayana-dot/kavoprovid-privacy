import type { Metadata } from "next";
import Link from "next/link";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Button } from "@/components/ui/button";
import { RevealText } from "@/components/RevealText";
import { cn } from "@/lib/cn";
import { breadcrumbJsonLd, lp, pageMeta, tr, type Lang } from "@/i18n";

export function faqMetadata(lang: Lang): Metadata {
  const t = tr(lang);
  return pageMeta(
    lang,
    "/faq",
    t(
      "Запитання про Kavoprovid — кавова інфраструктура для бізнесу",
      "Вопросы о Kavoprovid — кофейная инфраструктура для бизнеса",
    ),
    t(
      "Відповіді на часті запитання про кавову інфраструктуру Kavoprovid: вартість, обслуговування, географію та контроль витрат.",
      "Ответы на частые вопросы о кофейной инфраструктуре Kavoprovid: стоимость, обслуживание, география и контроль расходов.",
    ),
  );
}

const FAQ = {
  uk: [
  {
    q: "Скільки коштує кавова інфраструктура для офісу?",
    a: "Оренда обладнання безкоштовна від 12 кг кави на місяць. Конкретну умову для вашого офісу назвемо після короткої розмови про команду.",
  },
  {
    q: "Доставка обладнання платна?",
    a: "Ні, доставка кавомашини безкоштовна.",
  },
  {
    q: "А якщо команда збільшиться?",
    a: "Додамо ще одну кавомашину або поставимо модель на більше навантаження — договір при цьому не переукладаємо.",
  },
  {
    q: "Хто відповідає за чистку й ремонт?",
    a: "Ми. Планове обслуговування за графіком, а на позаштатний ремонт — ми завжди на зв'язку.",
  },
  {
    q: "Скільки кавомашин потрібно на виробництво з кількома змінами?",
    a: "Залежить від чисельності людей на зміні й кількості точок доступу. Порахуємо разом після короткої розмови про ваш майданчик.",
  },
  {
    q: "Чи обслуговуєте цілодобово?",
    a: "Планове обслуговування підлаштовуємо під графік змін вашого виробництва, а не під наш зручний час.",
  },
  {
    q: "Що якщо кавомашина вийде з ладу під час зміни?",
    a: "Ми завжди на зв'язку і підключаємо підмінне обладнання — виробництво не лишається без кави на час ремонту.",
  },
  {
    q: "Чи можна контролювати витрати на каву?",
    a: "Так — підключаємо облік на картках, які вже є на об'єкті. Компанія встановлює денний ліміт напоїв на співробітника, кавомашина не видає понад норму, а витрати стають прогнозованими.",
  },
  {
    q: "Яка географія обслуговування?",
    a: "Київ та Київська область — ми завжди на зв'язку.",
  },
  ],
  ru: [
    {
      q: "Сколько стоит кофейная инфраструктура для офиса?",
      a: "Аренда оборудования бесплатна от 12 кг кофе в месяц. Конкретное условие для вашего офиса назовём после короткого разговора о команде.",
    },
    {
      q: "Доставка оборудования платная?",
      a: "Нет, доставка кофемашины бесплатна.",
    },
    {
      q: "А если команда увеличится?",
      a: "Добавим ещё одну кофемашину или поставим модель на большую нагрузку — договор при этом не перезаключаем.",
    },
    {
      q: "Кто отвечает за чистку и ремонт?",
      a: "Мы. Плановое обслуживание по графику, а на внештатный ремонт — мы всегда на связи.",
    },
    {
      q: "Сколько кофемашин нужно на производство с несколькими сменами?",
      a: "Зависит от численности людей на смене и количества точек доступа. Посчитаем вместе после короткого разговора о вашей площадке.",
    },
    {
      q: "Обслуживаете ли круглосуточно?",
      a: "Плановое обслуживание подстраиваем под график смен вашего производства, а не под удобное нам время.",
    },
    {
      q: "Что если кофемашина выйдет из строя во время смены?",
      a: "Мы всегда на связи и подключаем подменное оборудование — производство не остаётся без кофе на время ремонта.",
    },
    {
      q: "Можно ли контролировать расходы на кофе?",
      a: "Да — подключаем учёт на картах, которые уже есть на объекте. Компания устанавливает дневной лимит напитков на сотрудника, кофемашина не выдаёт сверх нормы, а расходы становятся прогнозируемыми.",
    },
    {
      q: "Какая география обслуживания?",
      a: "Киев и Киевская область — мы всегда на связи.",
    },
  ],
};

export function FaqView({ lang }: { lang: Lang }) {
  const t = tr(lang);
  const faq = FAQ[lang];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  const crumbsJsonLd = breadcrumbJsonLd(lang, [[t("Запитання", "Вопросы"), "/faq"]]);
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

      <section className="relative overflow-hidden bg-ink pb-20 pt-32 text-paper sm:pt-40">
        <div className="absolute inset-x-0 top-24 h-px bg-paper/10" />
        <div className="container-start max-w-3xl px-4 lg:px-6">
          <nav aria-label="breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-paper/75">
              <li>
                <Link href={lp(lang, "/")} className="hover:text-paper">
                  {t("Головна", "Главная")}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-paper/70" aria-current="page">
                {t("Запитання", "Вопросы")}
              </li>
            </ol>
          </nav>

          <span className="font-label text-sm font-medium uppercase tracking-widest text-paper/70">
            {t("База знань", "База знаний")}
          </span>
          <RevealText
            as="h1"
            trigger="load"
            className="font-display mt-4 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {t("Питання, які нам ставлять найчастіше.", "Вопросы, которые нам задают чаще всего.")}
          </RevealText>
          <p className="mt-5 max-w-xl text-paper/75">
            {t(
              "Якщо тут немає відповіді — зателефонуйте, і ми розберемо саме вашу ситуацію.",
              "Если здесь нет ответа — позвоните, и мы разберём именно вашу ситуацию.",
            )}
          </p>
        </div>
      </section>

      <section className="bg-ink pb-28 text-paper">
        <div className="container-start max-w-3xl px-4 lg:px-6">
          <AccordionPrimitive.Root type="single" collapsible className="space-y-3">
            {faq.map((item, i) => (
              <AccordionPrimitive.Item
                key={item.q}
                value={item.q}
                className="group chamfer-sm border border-paper/12 bg-paper/[0.03] transition-colors data-[state=open]:border-signal/50 data-[state=open]:bg-paper/[0.05]"
              >
                <AccordionPrimitive.Header asChild>
                  <h2 className="flex">
                    <AccordionPrimitive.Trigger
                      className={cn(
                        "flex w-full items-center gap-5 p-6 text-left",
                        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
                      )}
                    >
                      <span
                        className={cn(
                          "font-display shrink-0 text-2xl font-bold tabular-nums text-paper/25 transition-colors",
                          "group-data-[state=open]:text-signal",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display flex-1 text-lg font-bold leading-snug sm:text-xl">
                        {item.q}
                      </span>
                      <span className="relative size-5 shrink-0" aria-hidden="true">
                        <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 bg-paper/40 transition-colors group-data-[state=open]:bg-signal" />
                        <span className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-paper/40 transition-transform duration-200 group-data-[state=open]:rotate-90 group-data-[state=open]:bg-signal" />
                      </span>
                    </AccordionPrimitive.Trigger>
                  </h2>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="flex gap-5 px-6 pb-6">
                    <span className="w-[2ch] shrink-0" aria-hidden="true" />
                    <p className="max-w-xl text-paper/75">{item.a}</p>
                  </div>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </div>
      </section>

      <section className="bg-paper py-16 text-center text-ink sm:py-28">
        <div className="mx-auto max-w-2xl px-4 lg:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t("Не знайшли своє запитання?", "Не нашли свой вопрос?")}
          </h2>
          <p className="mt-3 text-ink/75">
            {t(
              "Одна розмова на 10 хвилин — і кава перестає бути вашою проблемою.",
              "Один разговор на 10 минут — и кофе перестаёт быть вашей проблемой.",
            )}
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="tel:+380636271567">{t("Провести каву в мій бізнес", "Провести кофе в мой бизнес")}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
