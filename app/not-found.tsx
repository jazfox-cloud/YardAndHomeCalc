import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | Yard & Home Calc",
  description: "The requested Yard & Home Calc page could not be found.",
  alternates: {
    canonical: null
  },
  openGraph: null,
  twitter: null
};

export default function NotFound() {
  return (
    <>
      <meta name="robots" content="noindex, follow" />
      <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-clay">404 error</p>
        <h1 className="mt-3 text-4xl font-bold text-evergreen">Page not found</h1>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-700">
          The page you requested does not exist or may have moved.
        </p>
        <Link
          className="mt-8 inline-flex rounded-md bg-evergreen px-5 py-3 font-semibold text-white"
          href="/"
        >
          Return home
        </Link>
      </main>
    </>
  );
}
