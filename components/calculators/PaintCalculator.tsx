"use client";

import { useMemo, useState } from "react";
import { Field } from "@/components/Field";
import { ResultCard } from "@/components/ResultCard";
import { calculatePaint } from "@/lib/calculators/paint";
import { formatCurrency, formatNumber } from "@/lib/format";

export function PaintCalculator() {
  const [unit, setUnit] = useState<"feet" | "meters">("feet");
  const [length, setLength] = useState(12);
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(8);
  const [doors, setDoors] = useState(1);
  const [windows, setWindows] = useState(2);
  const [coats, setCoats] = useState(2);
  const [coverage, setCoverage] = useState(350);
  const [waste, setWaste] = useState(10);
  const [price, setPrice] = useState(38);

  const results = useMemo(() => {
    const roomLengthFeet = unit === "meters" ? length * 3.28084 : length;
    const roomWidthFeet = unit === "meters" ? width * 3.28084 : width;
    const wallHeightFeet = unit === "meters" ? height * 3.28084 : height;

    return calculatePaint({
      roomLengthFeet,
      roomWidthFeet,
      wallHeightFeet,
      doors,
      windows,
      coats,
      coveragePerGallon: coverage,
      wastePercent: waste,
      pricePerGallon: price
    });
  }, [coats, coverage, doors, height, length, price, unit, waste, width, windows]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <form className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
        <div className="mb-5">
          <label className="mb-2 block text-sm font-semibold text-slate-800" htmlFor="paint-unit">
            Unit
          </label>
          <select
            className="min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2"
            id="paint-unit"
            onChange={(event) => setUnit(event.target.value as "feet" | "meters")}
            value={unit}
          >
            <option value="feet">Feet</option>
            <option value="meters">Meters</option>
          </select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="paint-length" label="Room length" onChange={setLength} suffix={unit === "meters" ? "m" : "ft"} value={length} />
          <Field id="paint-width" label="Room width" onChange={setWidth} suffix={unit === "meters" ? "m" : "ft"} value={width} />
          <Field id="paint-height" label="Wall height" onChange={setHeight} suffix={unit === "meters" ? "m" : "ft"} value={height} />
          <Field id="paint-doors" label="Doors" onChange={setDoors} step={1} suffix="count" value={doors} />
          <Field id="paint-windows" label="Windows" onChange={setWindows} step={1} suffix="count" value={windows} />
          <Field id="paint-coats" label="Coats" onChange={setCoats} step={1} suffix="coats" value={coats} />
          <Field id="paint-coverage" label="Coverage per gallon" onChange={setCoverage} step={10} suffix="sq ft" value={coverage} />
          <Field id="paint-waste" label="Waste allowance" onChange={setWaste} step={1} suffix="%" value={waste} />
          <Field id="paint-price" label="Price per gallon" onChange={setPrice} suffix="$" value={price} />
        </div>
      </form>
      <ResultCard
        note="This estimate subtracts 21 sq ft per door and 15 sq ft per window. Coverage varies by product, color change, texture, and primer use."
        results={[
          { label: "Wall area", value: `${formatNumber(results.wallArea)} sq ft` },
          { label: "Paintable area", value: `${formatNumber(results.paintableArea)} sq ft`, highlight: true },
          { label: "Gallons needed", value: `${formatNumber(results.gallons)} gal` },
          { label: "Gallons to buy", value: `${Math.ceil(results.gallons)} gal` },
          { label: "Estimated cost", value: formatCurrency(results.estimatedCost) }
        ]}
        title="Paint estimate"
      />
    </div>
  );
}
