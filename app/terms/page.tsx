import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms of Use | Yard & Home Calc",
  description: "Terms of use for Yard & Home Calc.",
  path: "/terms/"
});

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-evergreen">Terms of Use</h1>
      <div className="mt-6 space-y-5 leading-7 text-slate-700">
        <p>
          By using Yard & Home Calc, you agree that the calculators and content are provided
          for general informational and estimation purposes only.
        </p>
        <p>
          You are responsible for verifying measurements, product specifications, code
          requirements, supplier recommendations, and final purchasing quantities.
        </p>
        <p>
          Yard & Home Calc is not liable for purchase decisions, project costs, installation
          outcomes, or damages resulting from use of the calculators.
        </p>
        <p>Last updated: June 23, 2026.</p>
      </div>
    </main>
  );
}
