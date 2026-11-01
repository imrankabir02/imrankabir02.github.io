import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";

/** The slim header used by the standalone app pages (/triptrack, /moneyos). */
export default function AppPageHeader() {
  return (
    <header className="border-b border-line">
      <nav className="shell flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-serif text-xl font-medium tracking-tight text-fg transition-colors hover:text-accent"
        >
          Imran Kabir<span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 sm:flex">
            {[
              ["About", "/#about"],
              ["Work", "/#work"],
              ["Contact", "/#contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="label text-fg3 transition-colors hover:text-fg"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
