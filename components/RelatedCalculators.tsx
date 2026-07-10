import Link from "next/link";

const calculators = [
  { href: "/mulch-calculator/", label: "Mulch Calculator" },
  { href: "/concrete-calculator/", label: "Concrete Calculator" },
  { href: "/paint-calculator/", label: "Paint Calculator" }
];

export function RelatedCalculators({ current }: { current: string }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-evergreen">Related calculators</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {calculators
          .filter((calculator) => calculator.href !== current)
          .map((calculator) => (
            <Link
              className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-evergreen hover:bg-orange-50"
              href={calculator.href}
              key={calculator.href}
            >
              {calculator.label}
            </Link>
          ))}
      </div>
    </section>
  );
}
