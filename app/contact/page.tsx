import { EmailLink } from "@/components/EmailLink";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact | Yard & Home Calc",
  description: "Contact Yard & Home Calc with questions, corrections, or calculator feedback.",
  path: "/contact/"
});

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-evergreen">Contact</h1>
      <div className="mt-6 space-y-5 leading-7 text-slate-700">
        <p>
          Have feedback, a correction, or a calculator request? Contact Yard & Home Calc at:
        </p>
        <p>
          <EmailLink className="font-semibold text-clay hover:underline" />
        </p>
        <p>
          Please include the calculator page, the measurements you entered, and what you
          expected to see so the issue can be reviewed clearly.
        </p>
      </div>
    </main>
  );
}
