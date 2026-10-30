import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/LeadForm";
import { RevealText } from "@/components/RevealText";
import { IconCheck, IconGauge } from "@/components/icons";
import { MachineCard } from "@/components/MachineCard";
import { MACHINES } from "@/lib/machines";

const TITLE = "Кава для виробництва — кавова інфраструктура | Kavoprovid";
const DESCRIPTION =
  "Кавова інфраструктура для виробництва під ключ: обладнання, кава, постачання й сервіс від Kavoprovid у Києві та області. Без простоїв.";

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
  "Кавомашину, розраховану на високий потік людей",
  "Стабільну роботу без простоїв обладнання",
];

const WE_HANDLE = [
  "Обладнання під виробниче навантаження й багатозмінний графік",
  "Постачання великих обсягів кави та витратних матеріалів",
  "Планове обслуговування виробничого обладнання",
  "Технічну підтримку — ми завжди на зв'язку",
  "Контроль витрат — денний ліміт порцій на кожного співробітника",
];

const STEPS = [
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
];

const PRODUCTION_MACHINES = MACHINES.filter(
  (m) => m.slug === "dr-coffee-coffeecenter" || m.slug === "dr-coffee-coffeebar-plus",
);

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Kavoprovid", item: "https://www.kavoprovid.com.ua/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Виробництва",
      item: "https://www.kavoprovid.com.ua/production",
    },
  ],
};

export default function ProductionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
                <Link href="/" className="hover:text-paper">
                  Головна
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-paper/75" aria-current="page">
                Виробництва
              </li>
            </ol>
          </nav>

          <span className="font-label text-sm font-medium uppercase tracking-widest text-paper/70">
            Для виробництв
          </span>
          <RevealText
            as="h1"
            trigger="load"
            className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Кавова інфраструктура, яка працює разом із вашим виробництвом.
          </RevealText>
          <p className="mt-5 max-w-xl text-paper/85">
            Kavoprovid забезпечує виробництва безперервною кавовою
            інфраструктурою на кожну зміну — обладнання, кава, постачання й
            сервіс в одного партнера.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="tel:+380636271567">Провести каву на виробництво</Button>
            <Button href="#process" variant="secondary">
              Як це працює
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
            Зміна не чекає, поки хтось поїде по каву.
          </RevealText>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="font-label text-sm font-medium uppercase tracking-widest text-ink/70">
                Що важливо на виробництві
              </h3>
              <ul className="mt-4 space-y-3">
                {EXPECTATIONS.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-ink/75">
                    <IconCheck className="mt-1 size-4 shrink-0 text-ink" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-label text-sm font-medium uppercase tracking-widest text-ink/70">
                Що ми беремо на себе
              </h3>
              <ul className="mt-4 space-y-3">
                {WE_HANDLE.map((f) => (
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
                Для великих виробництв
              </span>
              <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Контрольовані витрати на каву.
              </h2>
              <p className="mt-4 max-w-2xl text-ink/75">
                Для виробництв із великим споживанням ми підключаємо систему
                обліку на тих самих картках, які вже використовуються на
                майданчику — наприклад, для доступу через прохідну. До картки
                прив&apos;язується денний ліміт напоїв: компанія встановлює
                норму, скажімо, три порції на співробітника на день —
                кавомашина не видасть понад неї. Пити менше можна, більше — ні.
              </p>
              <p className="mt-4 max-w-2xl text-ink/75">
                Це дає прогнозовані витрати на каву щомісяця: кількість
                співробітників × встановлений ліміт, без несподіванок і без
                ручного контролю споживання.
              </p>
              <Link
                href="/kava-v-biznesi/kontrol-vytrat-na-kavu-na-vyrobnytstvi"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
              >
                Детальніше про систему лімітів
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-24 bg-ink py-16 text-paper sm:py-28">
        <div className="container-start max-w-7xl px-4 lg:px-6">
          <span className="font-label text-sm font-medium uppercase tracking-widest text-paper/70">
            Як це працює
          </span>
          <RevealText
            as="h2"
            className="font-display mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Від навантаження до безперервної роботи — п&apos;ять кроків.
          </RevealText>

          <div className="relative mt-14 max-w-3xl">
            <div className="absolute left-6 top-2 bottom-2 hidden w-0.5 bg-signal/35 sm:block" />
            <div className="space-y-10">
              {STEPS.map((step, i) => (
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
            Обладнання для виробництв
          </span>
          <RevealText
            as="h2"
            className="font-display mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Розраховане на безперервний потік, а не на поодинокі чашки.
          </RevealText>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {PRODUCTION_MACHINES.map((m) => (
              <MachineCard key={m.slug} machine={m} />
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-sm text-ink/75">
            Більше змін, більше людей — інфраструктура масштабується
            додаванням кавомашин і точок доступу, без зупинки процесів на
            майданчику.
          </p>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-ink/10 bg-paper py-16 text-ink sm:py-28">
        <div className="container-start max-w-4xl px-4 lg:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Запитання</h2>
          <p className="mt-3 text-ink/75">
            Відповіді на часті запитання про графік змін, обслуговування й
            контроль витрат зібрані на окремій сторінці.
          </p>
          <div className="mt-6 flex">
            <Button href="/faq" variant="outline">
              Усі запитання <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-center text-paper sm:py-28">
        <div className="mx-auto max-w-2xl px-4 lg:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Підключіть виробництво до кавопроводу.
          </h2>
          <p className="mt-4 text-paper/75">
            Одна розмова на 10 хвилин — і кава перестає бути залежною від
            того, хто сьогодні поїде в магазин.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="tel:+380636271567">Провести каву на виробництво</Button>
          </div>

          <div className="mx-auto mt-14 max-w-sm border-t border-paper/10 pt-10 text-left">
            <p className="text-center text-sm text-paper/75">
              Або залиште контакти — передзвонимо самі.
            </p>
            <LeadForm source="Production page" className="mt-5" />
          </div>
        </div>
      </section>
    </>
  );
}
