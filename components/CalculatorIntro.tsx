type CalculatorIntroProps = {
  title: string;
  description: string;
  updated: string;
};

export function CalculatorIntro({ title, description, updated }: CalculatorIntroProps) {
  return (
    <div className="mb-8">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-clay">Free estimator</p>
      <h1 className="text-4xl font-bold text-evergreen">{title}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">{description}</p>
      <p className="mt-3 text-sm text-slate-500">Last updated: {updated}</p>
    </div>
  );
}
