export type FAQItem = {
  question: string;
  answer: string;
};

export function FAQ({ items }: { items: FAQItem[] }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-evergreen">FAQ</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <details className="rounded-lg border border-slate-200 bg-white p-4" key={item.question}>
            <summary className="cursor-pointer font-semibold text-evergreen">{item.question}</summary>
            <p className="mt-3 text-sm leading-6 text-slate-700">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
