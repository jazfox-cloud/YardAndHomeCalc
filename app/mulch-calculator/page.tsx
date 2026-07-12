import { CalculatorIntro } from "@/components/CalculatorIntro";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FAQ, type FAQItem } from "@/components/FAQ";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { MulchCalculator } from "@/components/calculators/MulchCalculator";
import { breadcrumbSchema, faqSchema, webApplicationSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";

const description =
  "Estimate how much mulch you need by area, depth, cubic yards, bags, and cost. Free calculator for yard and landscaping projects.";

export const metadata = pageMetadata({
  title: "Mulch Calculator - Estimate Mulch by Cubic Yard | Yard & Home Calc",
  description,
  path: "/mulch-calculator/"
});

const faqs: FAQItem[] = [
  {
    question: "How deep should mulch be?",
    answer: "Most landscape beds use about 2 to 3 inches of mulch. Use less near plant crowns and avoid piling mulch against trunks or stems."
  },
  {
    question: "How many cubic feet are in a cubic yard of mulch?",
    answer: "One cubic yard equals 27 cubic feet. Bagged mulch is usually sold by cubic feet, while bulk mulch is often sold by cubic yards."
  },
  {
    question: "Should I add extra mulch for waste?",
    answer: "A 5% to 10% extra allowance is useful for uneven beds, settling, edging, and measuring variation."
  },
  {
    question: "Should I buy mulch by cubic feet or cubic yards?",
    answer: "Bagged mulch is usually easier to compare by cubic feet, while bulk mulch is commonly sold by cubic yards. One cubic yard equals 27 cubic feet."
  }
];

export default function MulchCalculatorPage() {
  const schemas = [
    webApplicationSchema("Mulch Calculator", "/mulch-calculator/", description),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Mulch Calculator", path: "/mulch-calculator/" }
    ])
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <CalculatorIntro
        description="Use this mulch calculator to estimate cubic feet, cubic yards, bag count, and optional material cost for garden beds, borders, and landscaping areas."
        title="Mulch Calculator"
        updated="July 6, 2026"
      />
      <MulchCalculator />
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-evergreen">How to measure</h2>
            <p className="mt-3 leading-7 text-slate-700">
              Measure the length and width of each bed, then choose your mulch depth. For
              irregular beds, split the space into smaller rectangles and add the estimates
              together. Most beds need a 2 to 3 inch layer.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-evergreen">Formula</h2>
            <p className="mt-3 rounded-lg bg-white p-4 font-mono text-sm text-slate-800">
              cubic feet = length(ft) x width(ft) x depth(in) / 12
              <br />
              cubic yards = cubic feet / 27
              <br />
              bags needed = cubic feet / bag size cubic feet
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-evergreen">Cubic feet vs cubic yards</h2>
            <div className="mt-3 space-y-3 leading-7 text-slate-700">
              <p>
                Mulch bags are often labeled in cubic feet, while bulk mulch from landscape
                suppliers is usually priced by cubic yard. Use cubic feet when comparing bag
                sizes, and cubic yards when ordering bulk delivery.
              </p>
              <p>
                The key conversion is simple: 1 cubic yard = 27 cubic feet. For example, 54
                cubic feet of mulch is 2 cubic yards before any waste allowance.
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-evergreen">Tips before buying</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">
              <li>Confirm whether your supplier sells mulch by bag, cubic foot, or cubic yard.</li>
              <li>Keep mulch thinner near stems, trunks, foundations, and hardscape edges.</li>
              <li>Add extra material for settling and uneven bed surfaces.</li>
              <li>Compare bagged mulch by cubic feet, not just the number of bags.</li>
            </ul>
          </section>
          <FAQ items={faqs} />
          <RelatedCalculators current="/mulch-calculator/" />
        </div>
        <DisclaimerBox />
      </div>
    </main>
  );
}
