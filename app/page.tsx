import Link from "next/link";
import { CalculatorCard } from "@/components/CalculatorCard";
import { DisclaimerBox } from "@/components/DisclaimerBox";

const calculators = [
  {
    title: "Mulch Calculator",
    href: "/mulch-calculator/",
    description: "Estimate cubic feet, cubic yards, bags, and cost for garden beds and landscape areas."
  },
  {
    title: "Concrete Calculator",
    href: "/concrete-calculator/",
    description: "Estimate concrete volume, cubic yards, and 40, 60, or 80 lb bags for slabs and pads."
  },
  {
    title: "Paint Calculator",
    href: "/paint-calculator/",
    description: "Estimate gallons for walls and rooms after doors, windows, coats, and coverage."
  }
];

export default function Home() {
  return (
    <main>
      <section className="bg-evergreen text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-20">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-orange-100">
              Yard & Home Calc
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-normal sm:text-5xl">
              Free calculators for yard and home projects
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-green-50">
              Estimate material quantities and project costs before you buy. Start with mulch,
              concrete, and paint calculators built for common DIY planning questions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="rounded-md bg-clay px-5 py-3 font-semibold text-white shadow-panel"
                href="/mulch-calculator/"
              >
                Start calculating
              </Link>
              <Link
                className="rounded-md border border-white/35 px-5 py-3 font-semibold text-white"
                href="#calculators"
              >
                View tools
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-white/20 bg-white/10 p-5">
            <h2 className="text-xl font-semibold">Popular project calculators</h2>
            <div className="mt-4 space-y-3">
              {calculators.map((calculator) => (
                <Link
                  className="block rounded-md bg-white p-4 text-evergreen shadow-panel transition hover:bg-orange-50"
                  href={calculator.href}
                  key={calculator.href}
                >
                  <span className="font-semibold">{calculator.title}</span>
                  <span className="mt-1 block text-sm text-slate-600">{calculator.description}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8" id="calculators">
        <div className="mb-6 max-w-2xl">
          <h2 className="text-2xl font-bold text-evergreen">Project calculators</h2>
          <p className="mt-2 text-slate-700">
            Pick the tool that matches your project, enter the measurements you have, and
            adjust waste or coverage assumptions before purchasing materials.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {calculators.map((calculator) => (
            <CalculatorCard key={calculator.href} {...calculator} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
          {["Measure your space", "Adjust assumptions", "Review before buying"].map((step, index) => (
            <div key={step}>
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-orange-100 font-bold text-clay">
                {index + 1}
              </div>
              <h2 className="text-lg font-semibold text-evergreen">{step}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {index === 0 &&
                  "Use consistent measurements for length, width, depth, height, and openings."}
                {index === 1 &&
                  "Set waste, coats, coverage, bag size, and optional material price to match your project."}
                {index === 2 &&
                  "Use the estimate as a planning guide, then confirm quantities with your supplier or contractor."}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <DisclaimerBox />
      </section>
    </main>
  );
}
