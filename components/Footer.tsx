import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" }
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-evergreen">Yard & Home Calc</p>
            <p className="mt-1 text-sm text-slate-600">Free calculators for yard and home projects.</p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-3 text-sm text-slate-600">
            {footerLinks.map((link) => (
              <Link className="hover:text-evergreen" href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-6 text-xs text-slate-500">
          Copyright {new Date().getFullYear()} Yard & Home Calc. Estimates are for planning only.
        </p>
      </div>
    </footer>
  );
}
