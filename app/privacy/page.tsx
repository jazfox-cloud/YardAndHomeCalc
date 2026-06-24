import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Yard & Home Calc",
  description: "Privacy policy for Yard & Home Calc.",
  alternates: { canonical: "/privacy/" }
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-evergreen">Privacy Policy</h1>
      <div className="mt-6 space-y-5 leading-7 text-slate-700">
        <p>
          Yard & Home Calc is designed as a simple calculator website. Calculator inputs are
          processed in your browser and are not submitted to a backend service by this site.
        </p>
        <p>
          We may use basic analytics, advertising, or affiliate tools in the future to
          understand site usage and support the website. Those services may use cookies or
          similar technologies according to their own policies.
        </p>
        <p>
          If you contact us by email, we may use the information you provide to respond to
          your message and improve the calculators.
        </p>
        <p>Last updated: June 23, 2026.</p>
      </div>
    </main>
  );
}
