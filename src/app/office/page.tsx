import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/LeadForm";
import { RevealText } from "@/components/RevealText";
import { IconCheck } from "@/components/icons";
import { MachineCard } from "@/components/MachineCard";
import { MACHINES } from "@/lib/machines";

const TITLE = "Кава в офіс — кавова інфраструктура для команди | Kavoprovid";
const DESCRIPTION =
  "Кавове забезпечення офісу під ключ: обладнання, кава, постачання й сервіс від Kavoprovid у Києві та Київській області. Один партнер замість списку підрядників.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/office" },
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
  "Каву, яка не закінчується посеред дня",
  "Однаковий смак щодня, а не лотерею",
  "Кавомашина, яка не ламається напередодні важливої зустрічі",
];

const WE_HANDLE = [
  "Підбір обладнання під розмір і ритм команди",
  "Постачання зерна та витратних матеріалів за графіком",
  "Планове й позапланове обслуговування",
  "Один контакт замість списку постачальників",
];

const STEPS = [
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
];

const OFFICE_MACHINES = MACHINES.filter((m) => m.slug !== "dr-coffee-coffeecenter");

const FAQ = [
  {
    q: "Скільки коштує кавова інфраструктура для офісу?",
    a: "Оренда обладнання безкоштовна від порогового обсягу кави на місяць — залежить від моделі та розміру команди. Конкретну умову назвемо після короткої розмови про ваш офіс.",
  },
  {
    q: "Що якщо офіс виросте?",
    a: "Додаємо кавомашину або переходимо на модель із більшим навантаженням без розірвання договору — інфраструктура масштабується разом із командою.",
  },
  {
    q: "Хто відповідає за чистку й ремонт?",
    a: "Ми. Планове обслуговування за графіком, а на позаштатний ремонт технік і підмінне обладнання виїжджають одразу.",
  },
  {
    q: "Чи можна спробувати перед підписанням?",
    a: "Так — кавомашина працює у вас 7 днів, команда п'є каву, ви оцінюєте сервіс до підпису договору.",
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
    { "@type": "ListItem", position: 2, name: "Офіси", item: "https://kavoprovid.com.ua/office" },
  ],
};

export default function OfficePage() {
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
            <ol className="flex items-center justify-center gap-2 text-xs text-paper/58">
              <li>
                <Link href="/" className="hover:text-paper/70">
                  Kavoprovid
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-paper/60" aria-current="page">
                Офіси
              </li>
            </ol>
          </nav>

          <span className="font-label text-xs uppercase tracking-widest text-paper/50">
            Для офісів
          </span>
          <RevealText
            as="h1"
            trigger="load"
            className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Кава, яка працює разом із вашим офісом.
          </RevealText>
          <p className="mx-auto mt-5 max-w-xl text-paper/60">
            Kavoprovid бере на себе обладнання, каву, постачання й сервіс для
            офісів у Києві та Київській області — одним рішенням, а не
            списком підрядників.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="tel:+380636271567">Підключити офіс</Button>
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
            Команда очікує каву. Ви — не хочете нею перейматись.
          </RevealText>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="font-label text-xs uppercase tracking-widest text-ink/65">
                Що очікує команда
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
              <h3 className="font-label text-xs uppercase tracking-widest text-ink/65">
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
            Від розмови до кави на столі — п&apos;ять кроків.
          </RevealText>

          <div className="relative mt-14 max-w-3xl">
            <div className="absolute left-6 top-2 bottom-2 hidden w-px bg-paper/10 sm:block" />
            <div className="space-y-10">
              {STEPS.map((step, i) => (
                <div key={step.title} className="relative flex gap-6 sm:gap-8">
                  <div className="font-display chamfer-sm relative z-10 flex size-12 shrink-0 items-center justify-center border border-paper/15 bg-ink text-sm font-bold text-paper/70">
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
          <span className="font-label text-xs uppercase tracking-widest text-ink/65">
            Обладнання для офісів
          </span>
          <RevealText
            as="h2"
            className="font-display mt-4 max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl"
          >
            Модель підбираємо під навантаження, не навпаки.
          </RevealText>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {OFFICE_MACHINES.map((m) => (
              <MachineCard key={m.slug} machine={m} aspectClassName="aspect-square" />
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-sm text-ink/65">
            Офіс виріс — додаємо кавомашину або переходимо на модель із більшим
            навантаженням без розірвання договору. Інфраструктура
            масштабується разом із командою.
          </p>
        </div>
      </section>

      <section className="border-t border-paper/10 bg-ink py-20 text-paper sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <span className="font-label text-xs uppercase tracking-widest text-paper/50">
            Кейси
          </span>
          <h2 className="font-display mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
            Реальні офіси на кавопроводі.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-paper/50">
            Готуємо добірку кейсів наших офісних клієнтів — з&apos;явиться тут
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
            Підключіть офіс до кавопроводу.
          </h2>
          <p className="mt-4 text-paper/60">
            Одна розмова на 10 хвилин — і кава перестає бути вашою проблемою.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="tel:+380636271567">Підключити офіс</Button>
          </div>

          <div className="mx-auto mt-14 max-w-sm border-t border-paper/10 pt-10 text-left">
            <p className="text-center text-sm text-paper/60">
              Або залиште контакти — передзвонимо самі.
            </p>
            <LeadForm source="Office page" className="mt-5" />
          </div>
        </div>
      </section>
    </>
  );
}
