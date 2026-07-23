import { toNonNegative } from "@/lib/calculators/validation";

type FieldProps = {
  id: string;
  label: string;
  value: number;
  min?: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
};

export function Field({ id, label, value, min = 0, step = 0.1, suffix, onChange }: FieldProps) {
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-2 block text-sm font-semibold text-slate-800">{label}</span>
      <div className="flex overflow-hidden rounded-md border border-slate-300 bg-white focus-within:border-clay">
        <input
          className="min-h-12 w-full border-0 px-3 py-2"
          id={id}
          min={min}
          onChange={(event) => onChange(toNonNegative(Number(event.target.value)))}
          step={step}
          type="number"
          value={value}
        />
        {suffix ? (
          <span className="flex items-center border-l border-slate-200 bg-slate-50 px-3 text-sm text-slate-600">
            {suffix}
          </span>
        ) : null}
      </div>
    </label>
  );
}
