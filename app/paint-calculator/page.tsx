import type { Metadata } from "next";
import { CalculatorIntro } from "@/components/CalculatorIntro";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FAQ, type FAQItem } from "@/components/FAQ";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { PaintCalculator } from "@/components/calculators/PaintCalculator";
import { breadcrumbSchema, faqSchema, webApplicationSchema } from "@/lib/schema";

const description =
  "Estimate gallons of paint for walls, rooms, garages, and exterior surfaces by area, doors, windows, coats, coverage, waste, and cost.";

export const metadata: Metadata = {
  title: "Paint Calculator - Estimate Gallons for Walls, Rooms, and Garages | Yard & Home Calc",
  description,
  alternates: { canonical: "/paint-calculator/" }
};

const faqs: FAQItem[] = [
  {
    question: "How much area does one gallon of paint cover?",
    answer: "Many interior paints cover about 350 to 400 square feet per gallon, but the exact coverage depends on the product, surface, color change, and application method."
  },
  {
    question: "Should I count doors and windows?",
    answer: "Yes. This calculator subtracts common estimates of 21 sq ft per door and 15 sq ft per window to avoid overestimating wall paint."
  },
  {
    question: "Do I need two coats?",
    answer: "Two coats are common for interior walls, especially with a color change. Primer, wall texture, and paint quality can change the final amount."
  },
  {
    question: "Can I use this calculator for a garage?",
    answer: "Yes. Enter the garage length, width, and wall height, then adjust doors and windows. For unfinished drywall, masonry, or rough surfaces, lower the coverage per gallon or add extra waste."
  },
  {
    question: "Can I estimate exterior paint with this tool?",
    answer: "You can use it as a rough exterior paint estimator for simple wall areas. Exterior siding, trim, stucco, brick, weather exposure, and spraying can change coverage, so always check the paint label and supplier guidance."
  },
  {
    question: "Why does paint coverage vary so much?",
    answer: "Coverage changes with surface texture, primer, color change, application method, sheen, and paint quality. A smooth primed wall may cover much farther than raw drywall, stucco, brick, or heavily textured surfaces."
  }
];

export default function PaintCalculatorPage() {
  const schemas = [
    webApplicationSchema("Paint Calculator", "/paint-calculator/", description),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Paint Calculator", path: "/paint-calculator/" }
    ])
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <CalculatorIntro
        description="Use this paint calculator to estimate wall area, paintable area, gallons to buy, and optional paint cost for rooms, garages, and simple exterior wall projects."
        title="Paint Calculator"
        updated="July 6, 2026"
      />
      <PaintCalculator />
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-evergreen">How to measure</h2>
            <p className="mt-3 leading-7 text-slate-700">
              Measure room length, width, and wall height. The calculator uses the room
              perimeter multiplied by wall height, then subtracts estimated door and window
              area before applying coats and coverage.
            </p>
            <p className="mt-3 leading-7 text-slate-700">
              For a garage, use the inside wall dimensions and count the overhead garage door
              as an opening if you are not painting it. For a simple exterior wall estimate,
              measure each wall face separately, subtract large doors or windows, and add the
              totals together.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-evergreen">Formula</h2>
            <p className="mt-3 rounded-lg bg-white p-4 font-mono text-sm text-slate-800">
              wall area = room perimeter x wall height
              <br />
              paintable area = wall area - doors area - windows area
              <br />
              gallons = paintable area x coats / coverage per gallon
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-evergreen">Tips before buying</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">
              <li>Check the coverage on your paint label before buying.</li>
              <li>Plan extra paint for repairs, texture, dark color changes, and future touch-ups.</li>
              <li>Primer may reduce the amount of finish paint needed on patched or porous surfaces.</li>
              <li>Use lower coverage for rough exterior surfaces, unprimed drywall, masonry, brick, or stucco.</li>
              <li>For garage walls, account for unfinished surfaces, shelving, trim, and large overhead doors.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-evergreen">Garage and exterior paint estimates</h2>
            <div className="mt-3 space-y-3 leading-7 text-slate-700">
              <p>
                This calculator works best for interior wall paint, but it can also help with
                quick garage and exterior planning when the project is mostly flat wall area.
                Keep the estimate conservative if the surface is rough or porous.
              </p>
              <p>
                For exterior paint, product coverage can vary widely by siding material,
                surface prep, sprayer use, and weathered paint. Use the label coverage as your
                starting point, then add a waste allowance before buying.
              </p>
            </div>
          </section>
          <FAQ items={faqs} />
          <RelatedCalculators current="/paint-calculator" />
        </div>
        <DisclaimerBox />
      </div>
    </main>
  );
}
