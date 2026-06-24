"use client";

import { useMemo, useState } from "react";
import { Field } from "@/components/Field";
import { ResultCard } from "@/components/ResultCard";
import { calculateMulch } from "@/lib/calculators/mulch";
import { formatCurrency, formatNumber } from "@/lib/format";

export function MulchCalculator() {
  const [unit, setUnit] = useState<"feet" | "meters">("feet");
  const [length, setLength] = useState(12);
  const [width, setWidth] = useState(6);
  const [depth, setDepth] = useState(3);
  const [waste, setWaste] = useState(10);
  const [bagSize, setBagSize] = useState(2);
  const [price, setPrice] = useState(45);

  const results = useMemo(() => {
    const lengthFeet = unit === "meters" ? length * 3.28084 : length;
    const widthFeet = unit === "meters" ? width * 3.28084 : width;
    const depthInches = unit === "meters" ? depth / 2.54 : depth;

    return calculateMulch({
      lengthFeet,
      widthFeet,
      depthInches,
      wastePercent: waste,
      bagSizeCubicFeet: bagSize,
      pricePerCubicYard: price
    });
  }, [bagSize, depth, length, price, unit, waste, width]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <form className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
        <div className="mb-5">
          <label className="mb-2 block text-sm font-semibold text-slate-800" htmlFor="mulch-unit">
            Unit
          </label>
          <select
            className="min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2"
            id="mulch-unit"
            onChange={(event) => setUnit(event.target.value as "feet" | "meters")}
            value={unit}
          >
            <option value="feet">Feet and inches</option>
            <option value="meters">Meters and centimeters</option>
          </select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="mulch-length" label="Length" onChange={setLength} suffix={unit === "meters" ? "m" : "ft"} value={length} />
          <Field id="mulch-width" label="Width" onChange={setWidth} suffix={unit === "meters" ? "m" : "ft"} value={width} />
          <Field id="mulch-depth" label="Mulch depth" onChange={setDepth} suffix={unit === "meters" ? "cm" : "in"} value={depth} />
          <Field id="mulch-waste" label="Waste allowance" onChange={setWaste} step={1} suffix="%" value={waste} />
          <Field id="mulch-bag" label="Bag size" onChange={setBagSize} suffix="cu ft" value={bagSize} />
          <Field id="mulch-price" label="Price per cubic yard" onChange={setPrice} suffix="$" value={price} />
        </div>
      </form>
      <ResultCard
        note="Most landscape projects use about 2 to 3 inches of mulch. Keep extra material for uneven beds, settling, and edge coverage."
        results={[
          { label: "Cubic feet", value: `${formatNumber(results.cubicFeet)} cu ft`, highlight: true },
          { label: "Cubic yards", value: `${formatNumber(results.cubicYards)} cu yd` },
          { label: "Bags needed", value: `${Math.ceil(results.bags)} bags` },
          { label: "Estimated cost", value: formatCurrency(results.estimatedCost) }
        ]}
        title="Mulch estimate"
      />
    </div>
  );
}
