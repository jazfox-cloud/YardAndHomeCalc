import Link from "next/link";

const navItems = [
  { href: "/mulch-calculator/", label: "Mulch" },
  { href: "/concrete-calculator/", label: "Concrete" },
  { href: "/paint-calculator/", label: "Paint" },
  { href: "/about/", label: "About" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <Link className="text-lg font-bold text-evergreen" href="/">
          Yard & Home Calc
        </Link>
        <nav aria-label="Main navigation" className="flex flex-wrap gap-2 text-sm font-medium text-slate-700">
          {navItems.map((item) => (
            <Link className="rounded-md px-3 py-2 hover:bg-orange-50 hover:text-evergreen" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
