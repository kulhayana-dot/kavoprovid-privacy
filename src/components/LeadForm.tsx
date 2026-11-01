"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useLang } from "@/i18n/client";

type Status = "idle" | "submitting" | "success" | "error";

// text-base (16px) on phones: anything smaller makes iOS Safari zoom the
// page on focus.
const inputClass =
  "chamfer-sm w-full border border-paper/35 bg-paper/5 px-4 py-3 text-base text-paper placeholder:text-paper/50 focus:border-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal user-invalid:border-red-400 sm:text-sm";

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-paper/85">
        {label}
        <span aria-hidden="true" className="text-signal">
          {" "}*
        </span>
      </label>
      {children}
    </div>
  );
}

function Select({
  id,
  name,
  children,
}: {
  id: string;
  name: string;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        required
        defaultValue=""
        className={cn(inputClass, "appearance-none pr-11 invalid:text-paper/50")}
      >
        {children}
      </select>
      <svg
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-signal"
      >
        <path
          d="M5 8l5 5 5-5"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="square"
        />
      </svg>
    </div>
  );
}

/** Groups a Ukrainian number as "+380 63 627 15 67" while typing. */
function formatUaPhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (!digits.startsWith("380")) return raw;
  const rest = digits.slice(3, 12);
  const parts = [rest.slice(0, 2), rest.slice(2, 5), rest.slice(5, 7), rest.slice(7, 9)].filter(Boolean);
  return ["+380", ...parts].join(" ");
}

export function LeadForm({
  source,
  className,
}: {
  source: string;
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const idPrefix = useId();
  const { lang, t } = useLang();
  // Tag Russian-page leads so the manager knows which language to call in.
  const leadSource = lang === "ru" ? `${source} (RU)` : source;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (data.get("company_site")) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          company: data.get("company"),
          employees: data.get("employees"),
          volume: data.get("volume"),
          source: leadSource,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "generate_lead", form_source: leadSource });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className={cn(
          "chamfer-sm w-full border border-paper/15 bg-paper/5 p-6 text-center",
          className,
        )}
      >
        <p className="font-display text-lg font-bold text-paper">{t("Дякуємо!", "Спасибо!")}</p>
        <p className="mt-2 text-sm text-paper/80">
          {t("Ми зв'яжемося з вами найближчим часом.", "Мы свяжемся с вами в ближайшее время.")}
        </p>
      </div>
    );
  }

  const nameId = `${idPrefix}-name`;
  const phoneId = `${idPrefix}-phone`;
  const companyId = `${idPrefix}-company`;
  const employeesId = `${idPrefix}-employees`;
  const volumeId = `${idPrefix}-volume`;

  return (
    <form onSubmit={handleSubmit} className={cn("w-full space-y-4", className)}>
      <input
        type="text"
        name="company_site"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      />

      <p className="text-sm text-paper/70">
        {t("Усі поля обов'язкові.", "Все поля обязательны.")}
      </p>

      <Field id={nameId} label={t("Ваше ім'я", "Ваше имя")}>
        <input
          id={nameId}
          type="text"
          name="name"
          required
          autoComplete="name"
          placeholder={t("Олена", "Елена")}
          className={inputClass}
        />
      </Field>

      <Field id={phoneId} label="Телефон">
        <input
          id={phoneId}
          type="tel"
          name="phone"
          required
          inputMode="tel"
          autoComplete="tel"
          placeholder="+380 __ ___ __ __"
          minLength={10}
          onFocus={(e) => {
            if (!e.currentTarget.value) e.currentTarget.value = "+380 ";
          }}
          onBlur={(e) => {
            if (e.currentTarget.value.trim() === "+380") e.currentTarget.value = "";
          }}
          onChange={(e) => {
            e.currentTarget.value = formatUaPhone(e.currentTarget.value);
          }}
          className={inputClass}
        />
      </Field>

      <Field id={companyId} label={t("Компанія", "Компания")}>
        <input
          id={companyId}
          type="text"
          name="company"
          required
          autoComplete="organization"
          className={inputClass}
        />
      </Field>

      <Field id={employeesId} label={t("Кількість співробітників", "Количество сотрудников")}>
        <Select id={employeesId} name="employees">
          <option value="" disabled>
            {t("Оберіть варіант", "Выберите вариант")}
          </option>
          <option value="up-to-50">{t("До 50", "До 50")}</option>
          <option value="50+">{t("Від 50", "От 50")}</option>
          <option value="100+">{t("Від 100", "От 100")}</option>
        </Select>
      </Field>

      <Field id={volumeId} label={t("Бажаний об'єм кави на місяць", "Желаемый объём кофе в месяц")}>
        <Select id={volumeId} name="volume">
          <option value="" disabled>
            {t("Оберіть варіант", "Выберите вариант")}
          </option>
          <option value="до 10 кг">До 10 кг</option>
          <option value="10-20 кг">10–20 кг</option>
          <option value="20-40 кг">20–40 кг</option>
          <option value="40+ кг">{t("Понад 40 кг", "Более 40 кг")}</option>
        </Select>
      </Field>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="chamfer-sm min-h-12 w-full bg-signal px-7 py-3.5 text-base font-medium text-ink sm:text-sm transition-[filter,opacity] duration-200 hover:brightness-90 disabled:opacity-50"
      >
        {status === "submitting" ? t("Надсилаємо…", "Отправляем…") : t("Залишити заявку", "Оставить заявку")}
      </button>

      {status === "error" && (
        <p role="alert" className="text-sm text-paper/80">
          {t("Не вдалося надіслати. Зателефонуйте нам:", "Не удалось отправить. Позвоните нам:")}{" "}
          <a href="tel:+380636271567" className="text-paper underline">
            +380 63 627-15-67
          </a>
        </p>
      )}
    </form>
  );
}
