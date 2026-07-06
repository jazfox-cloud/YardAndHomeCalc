"use client";

import { useMemo, useState } from "react";
import { Field } from "@/components/Field";
import { ResultCard } from "@/components/ResultCard";
import { calculatePaint } from "@/lib/calculators/paint";
import { formatCurrency, formatNumber } from "@/lib/format";

type PaintProjectType = "room" | "garage" | "exterior";
type CoveragePreset = "smooth-interior" | "unfinished-drywall" | "rough-exterior" | "brick-stucco" | "custom";

const projectTypes: Record<PaintProjectType, { label: string; lengthLabel: string; widthLabel: string; heightLabel: string; note: string }> = {
  room: {
    label: "Room walls",
    lengthLabel: "Room length",
    widthLabel: "Room width",
    heightLabel: "Wall height",
    note: "Best for bedrooms, living rooms, offices, and other interior rooms."
  },
  garage: {
    label: "Garage walls",
    lengthLabel: "Garage length",
    widthLabel: "Garage width",
    heightLabel: "Wall height",
    note: "Count the overhead garage door as an opening if you are not painting it."
  },
  exterior: {
    label: "Exterior wall estimate",
    lengthLabel: "House or wall length",
    widthLabel: "House or wall width",
    heightLabel: "Wall height",
    note: "Use this for simple exterior wall areas. Complex siding, trim, gables, and porches may need a separate estimate."
  }
};

const coveragePresets: Record<CoveragePreset, { label: string; coverage: number; note: string }> = {
  "smooth-interior": {
    label: "Smooth interior wall",
    coverage: 375,
    note: "A common range for many interior paints on smooth, primed walls is about 350 to 400 sq ft per gallon."
  },
  "unfinished-drywall": {
    label: "Unfinished drywall",
    coverage: 300,
    note: "Raw or patched drywall usually absorbs more paint. Primer can improve final coat coverage."
  },
  "rough-exterior": {
    label: "Rough exterior surface",
    coverage: 250,
    note: "Rough siding, weathered surfaces, and spray application can reduce coverage."
  },
  "brick-stucco": {
    label: "Brick, masonry, or stucco",
    coverage: 200,
    note: "Porous masonry and stucco often need a more conservative coverage estimate."
  },
  custom: {
    label: "Custom coverage",
    coverage: 350,
    note: "Use the exact coverage from your paint label when you have it."
  }
};

export function PaintCalculator() {
  const [projectType, setProjectType] = useState<PaintProjectType>("room");
  const [unit, setUnit] = useState<"feet" | "meters">("feet");
  const [length, setLength] = useState(12);
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(8);
  const [doors, setDoors] = useState(1);
  const [windows, setWindows] = useState(2);
  const [coats, setCoats] = useState(2);
  const [coverage, setCoverage] = useState(375);
  const [coveragePreset, setCoveragePreset] = useState<CoveragePreset>("smooth-interior");
  const [waste, setWaste] = useState(10);
  const [price, setPrice] = useState(38);
  const selectedProjectType = projectTypes[projectType];
  const selectedCoveragePreset = coveragePresets[coveragePreset];

  function handleCoveragePresetChange(value: CoveragePreset) {
    setCoveragePreset(value);
    if (value !== "custom") {
      setCoverage(coveragePresets[value].coverage);
    }
  }

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
        <div className="mb-5 grid gap-4 sm:grid-cols-2">
          <label className="block" htmlFor="paint-project-type">
            <span className="mb-2 block text-sm font-semibold text-slate-800">Project type</span>
            <select
              className="min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2"
              id="paint-project-type"
              onChange={(event) => setProjectType(event.target.value as PaintProjectType)}
              value={projectType}
            >
              {Object.entries(projectTypes).map(([value, option]) => (
                <option key={value} value={value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block" htmlFor="paint-unit">
            <span className="mb-2 block text-sm font-semibold text-slate-800">Unit</span>
            <select
              className="min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2"
              id="paint-unit"
              onChange={(event) => setUnit(event.target.value as "feet" | "meters")}
              value={unit}
            >
              <option value="feet">Feet</option>
              <option value="meters">Meters</option>
            </select>
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="paint-length" label={selectedProjectType.lengthLabel} onChange={setLength} suffix={unit === "meters" ? "m" : "ft"} value={length} />
          <Field id="paint-width" label={selectedProjectType.widthLabel} onChange={setWidth} suffix={unit === "meters" ? "m" : "ft"} value={width} />
          <Field id="paint-height" label={selectedProjectType.heightLabel} onChange={setHeight} suffix={unit === "meters" ? "m" : "ft"} value={height} />
          <Field id="paint-doors" label="Doors" onChange={setDoors} step={1} suffix="count" value={doors} />
          <Field id="paint-windows" label="Windows" onChange={setWindows} step={1} suffix="count" value={windows} />
          <Field id="paint-coats" label="Coats" onChange={setCoats} step={1} suffix="coats" value={coats} />
          <label className="block" htmlFor="paint-coverage-preset">
            <span className="mb-2 block text-sm font-semibold text-slate-800">Coverage preset</span>
            <select
              className="min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2"
              id="paint-coverage-preset"
              onChange={(event) => handleCoveragePresetChange(event.target.value as CoveragePreset)}
              value={coveragePreset}
            >
              {Object.entries(coveragePresets).map(([value, option]) => (
                <option key={value} value={value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <Field id="paint-coverage" label="Coverage per gallon" onChange={setCoverage} step={10} suffix="sq ft" value={coverage} />
          <Field id="paint-waste" label="Waste allowance" onChange={setWaste} step={1} suffix="%" value={waste} />
          <Field id="paint-price" label="Price per gallon" onChange={setPrice} suffix="$" value={price} />
        </div>
        <div className="mt-5 rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          <p>
            <strong className="text-evergreen">{selectedProjectType.label}:</strong> {selectedProjectType.note}
          </p>
          <p className="mt-2">
            <strong className="text-evergreen">{selectedCoveragePreset.label}:</strong> {selectedCoveragePreset.note}
          </p>
        </div>
      </form>
      <ResultCard
        note="This estimate subtracts 21 sq ft per door and 15 sq ft per window. Coverage varies by product, color change, texture, and primer use."
        results={[
          { label: "Wall area", value: `${formatNumber(results.wallArea)} sq ft` },
          { label: "Paintable area", value: `${formatNumber(results.paintableArea)} sq ft`, highlight: true },
          { label: "Gallons needed", value: `${formatNumber(results.gallons)} gal` },
          { label: "Recommended gallons to buy", value: `${Math.ceil(results.gallons)} gal` },
          { label: "Coverage used", value: `${formatNumber(coverage, 0)} sq ft/gal` },
          { label: "Estimated cost", value: formatCurrency(results.estimatedCost) }
        ]}
        title="Paint estimate"
      />
    </div>
  );
}
