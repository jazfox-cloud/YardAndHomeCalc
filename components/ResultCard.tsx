type ResultCardProps = {
  title: string;
  results: Array<{
    label: string;
    value: string;
    highlight?: boolean;
  }>;
  note?: string;
};

export function ResultCard({ title, results, note }: ResultCardProps) {
  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
      <h2 className="text-xl font-bold text-evergreen">{title}</h2>
      <dl className="mt-5 space-y-3">
        {results.map((result) => (
          <div
            className={`flex items-start justify-between gap-4 rounded-md p-3 ${
              result.highlight ? "bg-orange-50" : "bg-slate-50"
            }`}
            key={result.label}
          >
            <dt className="text-sm text-slate-600">{result.label}</dt>
            <dd className="text-right font-semibold text-slate-950">{result.value}</dd>
          </div>
        ))}
      </dl>
      {note ? <p className="mt-4 text-sm leading-6 text-slate-600">{note}</p> : null}
    </aside>
  );
}
