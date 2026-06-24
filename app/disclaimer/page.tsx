import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | Yard & Home Calc",
  description: "Estimator disclaimer for Yard & Home Calc.",
  alternates: { canonical: "/disclaimer/" }
};

export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-evergreen">Disclaimer</h1>
      <div className="mt-6 space-y-5 leading-7 text-slate-700">
        <p>
          These calculators are for estimation purposes only. Actual material needs may vary
          based on product type, surface conditions, installation method, waste, and local
          supplier specifications.
        </p>
        <p>
          Always confirm final quantities with your supplier or contractor before purchasing
          materials. Product labels, local codes, site conditions, and professional guidance
          should take priority over a general online estimate.
        </p>
        <p>Last updated: June 23, 2026.</p>
      </div>
    </main>
  );
}
