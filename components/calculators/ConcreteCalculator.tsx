"use client";

import { useMemo, useState } from "react";
import { Field } from "@/components/Field";
import { ResultCard } from "@/components/ResultCard";
import { calculateConcrete } from "@/lib/calculators/concrete";
import { formatCurrency, formatNumber } from "@/lib/format";

export function ConcreteCalculator() {
  const [unit, setUnit] = useState<"feet" | "meters">("feet");
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(8);
  const [thickness, setThickness] = useState(4);
  const [waste, setWaste] = useState(10);
  const [price, setPrice] = useState(150);

  const results = useMemo(() => {
    const lengthFeet = unit === "meters" ? length * 3.28084 : length;
    const widthFeet = unit === "meters" ? width * 3.28084 : width;
    const thicknessInches = unit === "meters" ? thickness / 2.54 : thickness;

    return calculateConcrete({
      lengthFeet,
      widthFeet,
      thicknessInches,
      wastePercent: waste,
      pricePerCubicYard: price
    });
  }, [length, price, thickness, unit, waste, width]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <form className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
        <div className="mb-5">
          <label className="mb-2 block text-sm font-semibold text-slate-800" htmlFor="concrete-unit">
            Unit
          </label>
          <select
            className="min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2"
            id="concrete-unit"
            onChange={(event) => setUnit(event.target.value as "feet" | "meters")}
            value={unit}
          >
            <option value="feet">Feet and inches</option>
            <option value="meters">Meters and centimeters</option>
          </select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="concrete-length" label="Length" onChange={setLength} suffix={unit === "meters" ? "m" : "ft"} value={length} />
          <Field id="concrete-width" label="Width" onChange={setWidth} suffix={unit === "meters" ? "m" : "ft"} value={width} />
          <Field id="concrete-thickness" label="Slab thickness" onChange={setThickness} suffix={unit === "meters" ? "cm" : "in"} value={thickness} />
          <Field id="concrete-waste" label="Waste allowance" onChange={setWaste} step={1} suffix="%" value={waste} />
          <Field id="concrete-price" label="Price per cubic yard" onChange={setPrice} suffix="$" value={price} />
        </div>
      </form>
      <ResultCard
        note="Concrete projects commonly include about 10% extra for waste, uneven excavation, spillage, and form variation."
        results={[
          { label: "Cubic feet", value: `${formatNumber(results.cubicFeet)} cu ft`, highlight: true },
          { label: "Cubic yards", value: `${formatNumber(results.cubicYards)} cu yd` },
          { label: "40 lb bags", value: `${Math.ceil(results.bags40lb)} bags` },
          { label: "60 lb bags", value: `${Math.ceil(results.bags60lb)} bags` },
          { label: "80 lb bags", value: `${Math.ceil(results.bags80lb)} bags` },
          { label: "Estimated cost", value: formatCurrency(results.estimatedCost) }
        ]}
        title="Concrete estimate"
      />
    </div>
  );
}
