import type { Metadata } from "next";
import { CalculatorIntro } from "@/components/CalculatorIntro";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FAQ, type FAQItem } from "@/components/FAQ";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { ConcreteCalculator } from "@/components/calculators/ConcreteCalculator";
import { breadcrumbSchema, faqSchema, webApplicationSchema } from "@/lib/schema";

const description =
  "Estimate concrete cubic feet, cubic yards, 40 lb bags, 60 lb bags, 80 lb bags, and cost for slabs, pads, and small projects.";

export const metadata: Metadata = {
  title: "Concrete Calculator - Bags, Yards, and Slab Estimate | Yard & Home Calc",
  description,
  alternates: { canonical: "/concrete-calculator/" }
};

const faqs: FAQItem[] = [
  {
    question: "How much extra concrete should I order?",
    answer: "A 10% waste allowance is a common planning estimate for uneven subgrade, form variation, spills, and small measurement errors."
  },
  {
    question: "How many cubic feet does an 80 lb bag of concrete make?",
    answer: "An 80 lb bag is commonly estimated at about 0.6 cubic feet. Always check the bag label for the exact product yield."
  },
  {
    question: "When should I order ready-mix instead of bags?",
    answer: "Bagged concrete can work for small projects. Larger slabs may be easier and more consistent with ready-mix delivery."
  },
  {
    question: "Does this concrete calculator include delivery cost?",
    answer: "No. The optional cost field estimates material cost by cubic yard only. Ready-mix delivery, short-load fees, tools, reinforcement, base material, and labor are not included."
  }
];

export default function ConcreteCalculatorPage() {
  const schemas = [
    webApplicationSchema("Concrete Calculator", "/concrete-calculator/", description),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Concrete Calculator", path: "/concrete-calculator/" }
    ])
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <CalculatorIntro
        description="Use this concrete calculator to estimate volume, cubic yards, bag quantities, waste allowance, and optional cost for slabs, pads, walkways, and small pours."
        title="Concrete Calculator"
        updated="July 6, 2026"
      />
      <ConcreteCalculator />
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-evergreen">How to measure</h2>
            <p className="mt-3 leading-7 text-slate-700">
              Measure the slab length, width, and planned thickness. Use the actual formed
              dimensions where possible. For irregular areas, divide the pour into smaller
              rectangles and add the results together.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-evergreen">Formula</h2>
            <p className="mt-3 rounded-lg bg-white p-4 font-mono text-sm text-slate-800">
              cubic feet = length(ft) x width(ft) x thickness(in) / 12
              <br />
              cubic yards = cubic feet / 27
              <br />
              80 lb bags = cubic feet / 0.6
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-evergreen">Concrete cost estimate</h2>
            <div className="mt-3 space-y-3 leading-7 text-slate-700">
              <p>
                The optional price field estimates concrete material cost by cubic yard. This
                is useful for a quick slab budget, but it is not the same as a full delivered
                ready-mix quote.
              </p>
              <p>
                Bagged concrete costs are usually easier to compare by bag count. Ready-mix
                quotes may include delivery, short-load fees, minimum order sizes, fuel
                surcharges, and local taxes. Confirm those details before buying.
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-evergreen">Tips before buying</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">
              <li>Check local requirements for base preparation, reinforcement, and slab thickness.</li>
              <li>Confirm bag yield on the product label before purchasing.</li>
              <li>Plan mixing, placement, screeding, and finishing before concrete starts setting.</li>
              <li>Ask ready-mix suppliers whether delivery, short-load fees, and taxes are included.</li>
            </ul>
          </section>
          <FAQ items={faqs} />
          <RelatedCalculators current="/concrete-calculator" />
        </div>
        <DisclaimerBox />
      </div>
    </main>
  );
}
