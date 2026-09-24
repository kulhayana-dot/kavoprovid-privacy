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
import { COMPARISON_MACHINES, type ComparisonMachine } from "@/lib/machines";

const BRANDS = ["Усі", "Dr. Coffee", "Bianchi"] as const;

const SPEC_ROWS: Array<{
  label: string;
  render: (m: ComparisonMachine) => string;
}> = [
  { label: "Напоїв", render: (m) => String(m.specs.drinksCount) },
  { label: "Інгредієнтів", render: (m) => String(m.specs.ingredientsCount) },
  { label: "Молоко", render: (m) => m.specs.milk },
  {
    label: "Продуктивність",
    render: (m) => `${m.specs.dailyCapacity}/добу · ${m.specs.hourlyCapacity}/год`,
  },
  { label: "Бункер зерна", render: (m) => m.specs.beanHopperKg },
  { label: "Бункер порошку", render: (m) => m.specs.powderHopperKg ?? "Відсутній" },
  { label: "Бак води", render: (m) => m.specs.waterTankL },
  { label: "Контейнер гущі", render: (m) => m.specs.groundsCapacity },
  { label: "Потужність", render: (m) => m.specs.powerW },
  { label: "Водопровід", render: (m) => (m.specs.plumbing ? "Так" : "Ні") },
  { label: "Каналізація", render: (m) => (m.specs.drainage ? "Так" : "Ні") },
  { label: "Вага апарата", render: (m) => `${m.specs.weightKg} кг` },
  { label: "Габарити Д×Ш×В", render: (m) => `${m.specs.dimensionsCm} см` },
  {
    label: "Холодильник для молока",
    render: (m) =>
      m.specs.fridgeWeightKg
        ? `${m.specs.fridgeWeightKg} кг, ${m.specs.fridgeDimensionsCm} см`
        : "Не потрібен",
  },
];

export function MachineComparisonPanel() {
  const [brand, setBrand] = useState<(typeof BRANDS)[number]>("Усі");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(
    () =>
      brand === "Усі"
        ? COMPARISON_MACHINES
        : COMPARISON_MACHINES.filter((m) => m.brand === brand),
    [brand],
  );

  const selectedMachines = useMemo(
    () => COMPARISON_MACHINES.filter((m) => selected.includes(m.slug)),
    [selected],
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
              {b}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={brand} className="mt-0">
          <div className="chamfer mt-6 border border-ink/10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10" />
                  <TableHead>Модель</TableHead>
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
                        aria-label={`Обрати ${m.machine} для порівняння`}
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
                          Без фото
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
          <span className="font-label text-xs uppercase tracking-widest text-ink/50">
            Порівняння обраного ({selectedMachines.length})
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
                    className="font-label shrink-0 text-xs uppercase tracking-widest text-ink/40 hover:text-ink"
                    aria-label={`Прибрати ${m.machine} з порівняння`}
                  >
                    Прибрати
                  </button>
                </div>
                <dl className="mt-4 space-y-2 text-sm">
                  {SPEC_ROWS.map((row) => (
                    <div key={row.label} className="flex justify-between gap-4">
                      <dt className="text-ink/50">{row.label}</dt>
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
