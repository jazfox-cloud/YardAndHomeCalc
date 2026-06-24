import Link from "next/link";

type CalculatorCardProps = {
  title: string;
  href: string;
  description: string;
};

export function CalculatorCard({ title, href, description }: CalculatorCardProps) {
  return (
    <Link
      className="block rounded-lg border border-slate-200 bg-white p-5 shadow-panel transition hover:border-orange-200 hover:bg-orange-50"
      href={href}
    >
      <h3 className="text-lg font-semibold text-evergreen">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-700">{description}</p>
      <span className="mt-4 inline-block text-sm font-semibold text-clay">Open calculator</span>
    </Link>
  );
}
