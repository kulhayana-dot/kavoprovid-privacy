import type { Metadata } from "next";
import Link from "next/link";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Button } from "@/components/ui/button";
import { RevealText } from "@/components/RevealText";
import { cn } from "@/lib/cn";
import { Wordmark } from "@/components/Wordmark";

const TITLE = "Запитання про Kavoprovid — кавова інфраструктура для бізнесу";
const DESCRIPTION =
  "Відповіді на часті запитання про кавову інфраструктуру Kavoprovid: вартість, обслуговування, географію та контроль витрат.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    locale: "uk_UA",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

const FAQ = [
  {
    q: "Скільки коштує кавова інфраструктура для офісу?",
    a: "Оренда обладнання безкоштовна від 12 кг кави на місяць. Конкретну умову для вашого офісу назвемо після короткої розмови про команду.",
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
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Kavoprovid", item: "https://www.kavoprovid.com.ua/" },
    { "@type": "ListItem", position: 2, name: "Запитання", item: "https://www.kavoprovid.com.ua/faq" },
  ],
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="relative overflow-hidden bg-ink pb-20 pt-32 text-paper sm:pt-40">
        <div className="absolute inset-x-0 top-24 h-px bg-paper/10" />
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <nav aria-label="breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-paper/50">
              <li>
                <Link href="/" className="inline-flex opacity-90 transition-opacity hover:opacity-100">
                  <Wordmark tone="dark" className="h-4" />
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-paper/70" aria-current="page">
                Запитання
              </li>
            </ol>
          </nav>

          <span className="font-label text-xs uppercase tracking-widest text-paper/50">
            База знань
          </span>
          <RevealText
            as="h1"
            trigger="load"
            className="font-display mt-4 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Питання, які нам ставлять найчастіше.
          </RevealText>
          <p className="mt-5 max-w-xl text-paper/60">
            Якщо тут немає відповіді — зателефонуйте, і ми розберемо саме
            вашу ситуацію.
          </p>
        </div>
      </section>

      <section className="bg-ink pb-28 text-paper">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <AccordionPrimitive.Root type="single" collapsible className="space-y-3">
            {FAQ.map((item, i) => (
              <AccordionPrimitive.Item
                key={item.q}
                value={item.q}
                className="group chamfer-sm border border-paper/12 bg-paper/[0.03] transition-colors data-[state=open]:border-signal/50 data-[state=open]:bg-paper/[0.05]"
              >
                <AccordionPrimitive.Header className="flex">
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
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="flex gap-5 px-6 pb-6">
                    <span className="w-[2ch] shrink-0" aria-hidden="true" />
                    <p className="max-w-xl text-paper/60">{item.a}</p>
                  </div>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </div>
      </section>

      <section className="bg-paper py-20 text-center text-ink sm:py-28">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Не знайшли своє запитання?
          </h2>
          <p className="mt-3 text-ink/60">
            Одна розмова на 10 хвилин — і кава перестає бути вашою проблемою.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="tel:+380636271567">Провести каву в мій бізнес</Button>
          </div>
        </div>
      </section>
    </>
  );
}
