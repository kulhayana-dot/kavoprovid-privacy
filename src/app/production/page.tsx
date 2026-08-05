import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { LeadForm } from "@/components/LeadForm";
import { RevealText } from "@/components/RevealText";
import { IconCheck } from "@/components/icons";
import { MACHINES } from "@/lib/machines";

const TITLE = "Кава для виробництва — кавова інфраструктура на зміну | Kavoprovid";
const DESCRIPTION =
  "Кавова інфраструктура для виробництв: обладнання, кава, постачання й сервіс на кожну зміну від Kavoprovid у Києві та Київській області. Без простоїв і зупинки процесів.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/production" },
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

const EXPECTATIONS = [
  "Каву, доступну незалежно від зміни й часу доби",
  "Апарат, розрахований на високий потік людей",
  "Стабільну роботу без простоїв обладнання",
];

const WE_HANDLE = [
  "Обладнання під виробниче навантаження й багатозмінний графік",
  "Постачання великих обсягів кави та витратних матеріалів",
  "Планове обслуговування без зупинки виробничого процесу",
  "Технічну підтримку зі швидким виїздом при поломці",
];

const STEPS = [
  {
    title: "Аналізуємо навантаження",
    text: "Кількість змін, чисельність людей на зміні, розташування точок — розмова про реальний ритм виробництва.",
  },
  {
    title: "Підбираємо обладнання",
    text: "Апарат під потік людей і безперервну роботу, а не універсальну модель для невеликого офісу.",
  },
  {
    title: "Встановлюємо на майданчику",
    text: "Підключаємо апарат там, де він реально потрібен — біля цеху, в зоні відпочинку, на кожній точці.",
  },
  {
    title: "Забезпечуємо об'ємами",
    text: "Постачання великих партій зерна й витратних матеріалів за графіком — без ручного контролю запасів.",
  },
  {
    title: "Обслуговуємо без зупинок",
    text: "Планове обслуговування підлаштовуємо під графік змін. Позаштатний ремонт — технік і підмінне обладнання виїжджають одразу.",
  },
];

const PRODUCTION_MACHINES = MACHINES.filter(
  (m) => m.slug === "dr-coffee-coffeecenter" || m.slug === "dr-coffee-coffeebar-plus",
);

const FAQ = [
  {
    q: "Скільки апаратів потрібно на виробництво з кількома змінами?",
    a: "Залежить від чисельності людей на зміні й кількості точок доступу. Порахуємо разом після короткої розмови про ваш майданчик.",
  },
  {
    q: "Чи обслуговуєте цілодобово?",
    a: "Планове обслуговування підлаштовуємо під графік змін вашого виробництва, а не під наш зручний час.",
  },
  {
    q: "Що якщо апарат вийде з ладу під час зміни?",
    a: "Технік і підмінне обладнання виїжджають одразу — виробництво не лишається без кави на час ремонту.",
  },
  {
    q: "Яка географія обслуговування?",
    a: "Київ та Київська область — технік доїжджає в межах години, а не днів.",
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
    { "@type": "ListItem", position: 1, name: "Kavoprovid", item: "https://kavoprovid.com.ua/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Виробництва",
      item: "https://kavoprovid.com.ua/production",
    },
  ],
};

export default function ProductionPage() {
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

      <section className="bg-ink pb-16 pt-32 text-paper sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="flex items-center justify-center gap-2 text-xs text-paper/40">
              <li>
                <Link href="/" className="hover:text-paper/70">
                  Kavoprovid
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-paper/60" aria-current="page">
                Виробництва
              </li>
            </ol>
          </nav>

          <span className="font-label text-xs uppercase tracking-widest text-paper/50">
            Для виробництв
          </span>
          <RevealText
            as="h1"
            trigger="load"
            className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Кавова інфраструктура, яка працює разом із вашим виробництвом.
          </RevealText>
          <p className="mx-auto mt-5 max-w-xl text-paper/60">
            Kavoprovid забезпечує виробництва безперервною кавовою
            інфраструктурою на кожну зміну — обладнання, кава, постачання й
            сервіс в одного партнера.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="tel:+380636271567">Підключити виробництво</Button>
            <Button href="#process" variant="secondary">
              Як це працює
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 text-ink sm:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <RevealText
            as="h2"
            className="font-display max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl"
          >
            Зміна не чекає, поки хтось поїде по каву.
          </RevealText>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="font-label text-xs uppercase tracking-widest text-ink/50">
                Що важливо на виробництві
              </h3>
              <ul className="mt-4 space-y-3">
                {EXPECTATIONS.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-ink/70">
                    <IconCheck className="mt-1 size-4 shrink-0 text-signal" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-label text-xs uppercase tracking-widest text-ink/50">
                Що ми беремо на себе
              </h3>
              <ul className="mt-4 space-y-3">
                {WE_HANDLE.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-ink/70">
                    <IconCheck className="mt-1 size-4 shrink-0 text-signal" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-24 bg-ink py-20 text-paper sm:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <span className="font-label text-xs uppercase tracking-widest text-paper/50">
            Як це працює
          </span>
          <RevealText
            as="h2"
            className="font-display mt-4 max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl"
          >
            Від навантаження до безперервної роботи — п&apos;ять кроків.
          </RevealText>

          <div className="relative mt-14 max-w-3xl">
            <div className="absolute left-6 top-2 bottom-2 hidden w-px bg-paper/10 sm:block" />
            <div className="space-y-10">
              {STEPS.map((step, i) => (
                <div key={step.title} className="relative flex gap-6 sm:gap-8">
                  <div className="font-label chamfer-sm relative z-10 flex size-12 shrink-0 items-center justify-center border border-paper/15 bg-ink text-sm font-bold text-paper/70">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="pt-1.5">
                    <h3 className="font-display text-lg font-bold">{step.title}</h3>
                    <p className="mt-2 max-w-xl text-paper/60">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 text-ink sm:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <span className="font-label text-xs uppercase tracking-widest text-ink/50">
            Обладнання для виробництв
          </span>
          <RevealText
            as="h2"
            className="font-display mt-4 max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl"
          >
            Розраховане на потік, а не на тишу офісу.
          </RevealText>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {PRODUCTION_MACHINES.map((m) => (
              <Link
                key={m.slug}
                href={`/rishennya/${m.slug}`}
                className="chamfer group flex flex-col border border-ink/10 bg-ink/[0.02] p-6 transition-colors hover:border-signal"
              >
                <span className="font-label border border-ink/20 px-3 py-1 text-[11px] uppercase tracking-widest text-ink/60">
                  {m.tag}
                </span>
                <h3 className="font-display mt-4 text-lg font-bold">{m.machine}</h3>
                <p className="font-label mt-2 text-[11px] uppercase tracking-widest text-ink/40">
                  {m.audienceFit}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-ink/30 underline-offset-4 transition-colors group-hover:decoration-ink">
                  Детальніше про модель
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-sm text-ink/50">
            Більше змін, більше людей — інфраструктура масштабується
            додаванням апаратів і точок доступу, без зупинки процесів на
            майданчику.
          </p>
        </div>
      </section>

      <section className="border-t border-paper/10 bg-ink py-20 text-paper sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <span className="font-label text-xs uppercase tracking-widest text-paper/50">
            Кейси
          </span>
          <h2 className="font-display mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
            Реальні виробництва на кавопроводі.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-paper/50">
            Готуємо добірку кейсів наших виробничих клієнтів — з&apos;явиться тут
            найближчим часом.
          </p>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 bg-paper py-20 text-ink sm:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Запитання</h2>
          <div className="mt-8 space-y-6">
            {FAQ.map((item) => (
              <details key={item.q} className="chamfer-sm group border border-ink/10 p-5">
                <summary className="cursor-pointer list-none font-medium text-ink marker:content-none">
                  {item.q}
                </summary>
                <p className="mt-3 text-ink/60">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-center text-paper sm:py-28">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Підключіть виробництво до кавопроводу.
          </h2>
          <p className="mt-4 text-paper/60">
            Одна розмова на 10 хвилин — і кава перестає бути залежною від
            того, хто сьогодні поїде в магазин.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="tel:+380636271567">Підключити виробництво</Button>
          </div>

          <div className="mx-auto mt-14 max-w-sm border-t border-paper/10 pt-10 text-left">
            <p className="text-center text-sm text-paper/60">
              Або залиште контакти — передзвонимо самі.
            </p>
            <LeadForm source="Production page" className="mt-5" />
          </div>
        </div>
      </section>
    </>
  );
}
