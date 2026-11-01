"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { getComparisonMachines, type ComparisonMachine } from "@/lib/machines";
import { useLang } from "@/i18n/client";

const BRANDS = ["all", "Dr. Coffee", "Bianchi"] as const;

type T = <V>(uk: V, ru: V) => V;

function specRows(t: T): Array<{
  label: string;
  render: (m: ComparisonMachine) => string;
}> {
  const yes = t("Так", "Да");
  const no = t("Ні", "Нет");
  return [
    { label: t("Напоїв", "Напитков"), render: (m) => String(m.specs.drinksCount) },
    { label: t("Інгредієнтів", "Ингредиентов"), render: (m) => String(m.specs.ingredientsCount) },
    { label: t("Молоко", "Молоко"), render: (m) => m.specs.milk },
    {
      label: t("Продуктивність", "Производительность"),
      render: (m) =>
        `${m.specs.dailyCapacity}/${t("добу", "сутки")} · ${m.specs.hourlyCapacity}/${t("год", "час")}`,
    },
    { label: t("Бункер зерна", "Бункер зерна"), render: (m) => m.specs.beanHopperKg },
    {
      label: t("Бункер порошку", "Бункер порошка"),
      render: (m) => m.specs.powderHopperKg ?? t("Відсутній", "Отсутствует"),
    },
    { label: t("Бак води", "Бак воды"), render: (m) => m.specs.waterTankL },
    { label: t("Контейнер гущі", "Контейнер гущи"), render: (m) => m.specs.groundsCapacity },
    { label: t("Потужність", "Мощность"), render: (m) => m.specs.powerW },
    { label: t("Водопровід", "Водопровод"), render: (m) => (m.specs.plumbing ? yes : no) },
    { label: t("Каналізація", "Канализация"), render: (m) => (m.specs.drainage ? yes : no) },
    { label: t("Вага апарата", "Вес аппарата"), render: (m) => `${m.specs.weightKg} кг` },
    { label: t("Габарити Д×Ш×В", "Габариты Д×Ш×В"), render: (m) => `${m.specs.dimensionsCm} см` },
    {
      label: t("Холодильник для молока", "Холодильник для молока"),
      render: (m) =>
        m.specs.fridgeWeightKg
          ? `${m.specs.fridgeWeightKg} кг, ${m.specs.fridgeDimensionsCm} см`
          : t("Не потрібен", "Не нужен"),
    },
  ];
}

export function MachineComparisonPanel() {
  const [brand, setBrand] = useState<(typeof BRANDS)[number]>("all");
  const [selected, setSelected] = useState<string[]>([]);
  const { lang, t } = useLang();
  const machines = useMemo(() => getComparisonMachines(lang), [lang]);
  const SPEC_ROWS = specRows(t);

  const filtered = useMemo(
    () => (brand === "all" ? machines : machines.filter((m) => m.brand === brand)),
    [brand, machines],
  );

  const selectedMachines = useMemo(
    () => machines.filter((m) => selected.includes(m.slug)),
    [selected, machines],
  );

  function toggle(slug: string) {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }

  return (
    <div>
      <Tabs value={brand} onValueChange={(v) => setBrand(v as typeof brand)}>
        <TabsList>
          {BRANDS.map((b) => (
            <TabsTrigger key={b} value={b}>
              {b === "all" ? t("Усі", "Все") : b}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={brand} className="mt-0">
          <div className="chamfer mt-6 border border-ink/10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10" />
                  <TableHead>{t("Модель", "Модель")}</TableHead>
                  {SPEC_ROWS.map((row) => (
                    <TableHead key={row.label} className="whitespace-nowrap">
                      {row.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((m) => (
                  <TableRow
                    key={m.slug}
                    className={cn(
                      "transition-colors",
                      selected.includes(m.slug) && "bg-signal/[0.06]",
                    )}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selected.includes(m.slug)}
                        onCheckedChange={() => toggle(m.slug)}
                        aria-label={t(`Обрати ${m.machine} для порівняння`, `Выбрать ${m.machine} для сравнения`)}
                      />
                    </TableCell>
                    <TableCell className="whitespace-nowrap font-medium text-ink">
                      {m.detailHref ? (
                        <Link
                          href={m.detailHref}
                          className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
                        >
                          {m.machine}
                        </Link>
                      ) : (
                        m.machine
                      )}
                      {!m.hasPhoto && (
                        <Badge variant="outline" className="ml-2 align-middle">
                          {t("Без фото", "Без фото")}
                        </Badge>
                      )}
                    </TableCell>
                    {SPEC_ROWS.map((row) => (
                      <TableCell key={row.label} className="whitespace-nowrap">
                        {row.render(m)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {selectedMachines.length >= 2 && (
        <div className="mt-14">
          <span className="font-label text-sm font-medium uppercase tracking-widest text-ink/70">
            {t("Порівняння обраного", "Сравнение выбранного")} ({selectedMachines.length})
          </span>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {selectedMachines.map((m) => (
              <div
                key={m.slug}
                className="chamfer border border-signal/30 bg-signal/[0.03] p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-bold">{m.machine}</h3>
                  <button
                    type="button"
                    onClick={() => toggle(m.slug)}
                    className="font-label shrink-0 text-xs uppercase tracking-widest text-ink/60 hover:text-ink"
                    aria-label={t(`Прибрати ${m.machine} з порівняння`, `Убрать ${m.machine} из сравнения`)}
                  >
                    {t("Прибрати", "Убрать")}
                  </button>
                </div>
                <dl className="mt-4 space-y-2 text-sm">
                  {SPEC_ROWS.map((row) => (
                    <div key={row.label} className="flex justify-between gap-4">
                      <dt className="text-ink/70">{row.label}</dt>
                      <dd className="text-right text-ink/80">{row.render(m)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
