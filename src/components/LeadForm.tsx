"use client";

import { useId, useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "chamfer-sm w-full border border-paper/20 bg-paper/5 px-4 py-3 text-sm text-paper placeholder:text-paper/58 focus:border-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal";

export function LeadForm({
  source,
  className,
}: {
  source: string;
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const idPrefix = useId();

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
          source,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "generate_lead", form_source: source });
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
        <p className="font-display text-lg font-bold text-paper">Дякуємо!</p>
        <p className="mt-2 text-sm text-paper/60">
          Ми зв&apos;яжемося з вами найближчим часом.
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
    <form onSubmit={handleSubmit} className={cn("w-full space-y-3", className)}>
      <input
        type="text"
        name="company_site"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      />

      <label htmlFor={nameId} className="sr-only">
        Ваше ім&apos;я
      </label>
      <input
        id={nameId}
        type="text"
        name="name"
        required
        placeholder="Ваше ім'я"
        className={inputClass}
      />

      <label htmlFor={phoneId} className="sr-only">
        Телефон
      </label>
      <input
        id={phoneId}
        type="tel"
        name="phone"
        required
        placeholder="Телефон"
        className={inputClass}
      />

      <label htmlFor={companyId} className="sr-only">
        Компанія
      </label>
      <input
        id={companyId}
        type="text"
        name="company"
        required
        placeholder="Компанія"
        className={inputClass}
      />

      <label htmlFor={employeesId} className="sr-only">
        Кількість співробітників
      </label>
      <select
        id={employeesId}
        name="employees"
        required
        defaultValue=""
        className={inputClass}
      >
        <option value="" disabled>
          Кількість співробітників
        </option>
        <option value="50-100">50–100</option>
        <option value="101-300">101–300</option>
        <option value="301-600">301–600</option>
        <option value="600+">Понад 600</option>
      </select>

      <label htmlFor={volumeId} className="sr-only">
        Бажаний об&apos;єм кави на місяць
      </label>
      <select
        id={volumeId}
        name="volume"
        required
        defaultValue=""
        className={inputClass}
      >
        <option value="" disabled>
          Бажаний об&apos;єм кави на місяць
        </option>
        <option value="до 10 кг">До 10 кг</option>
        <option value="10-20 кг">10–20 кг</option>
        <option value="20-40 кг">20–40 кг</option>
        <option value="40+ кг">Понад 40 кг</option>
      </select>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="chamfer-sm w-full bg-signal px-7 py-3.5 text-sm font-medium text-ink transition-[filter,opacity] duration-200 hover:brightness-90 disabled:opacity-50"
      >
        {status === "submitting" ? "Надсилаємо…" : "Залишити заявку"}
      </button>

      {status === "error" && (
        <p role="alert" className="text-sm text-paper/60">
          Не вдалося надіслати. Зателефонуйте нам:{" "}
          <a href="tel:+380636271567" className="text-paper underline">
            063 627-15-67
          </a>
        </p>
      )}
    </form>
  );
}
