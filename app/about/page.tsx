import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About | Yard & Home Calc",
  description: "Learn about Yard & Home Calc, an independent calculator site for yard and home project estimates.",
  path: "/about/"
});

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-evergreen">About Yard & Home Calc</h1>
      <div className="mt-6 space-y-5 leading-7 text-slate-700">
        <p>
          Yard & Home Calc is an independent tool site built to help homeowners, renters,
          and DIY planners estimate material needs before buying supplies.
        </p>
        <p>
          The calculators use common project estimation formulas for mulch, concrete, paint,
          and related yard and home materials. They are designed for quick planning, price
          comparison, and purchase preparation.
        </p>
        <p>
          These tools do not replace professional contractor advice, local building code
          requirements, product labels, or supplier specifications. Always confirm final
          quantities before purchasing materials or starting work.
        </p>
      </div>
    </main>
  );
}
