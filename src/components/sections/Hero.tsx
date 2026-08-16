import { ArrowUpRight, Mail } from "lucide-react";
import Reveal from "../ui/Reveal";
import { ABOUT_TEXT, MY_DETAILS } from "@/data/portfolio";
import { cn } from "@/lib/utils";

// First paragraph of the bio doubles as the masthead deck; the rest lives in
// About, so nothing is said twice.
const ABOUT_LEAD = ABOUT_TEXT.split(/\n\s*\n/)[0].trim();

// A data strip reads better than a stock photo for someone whose work is
// invisible by nature — it front-loads the facts a reviewer scans for.
const SPEC = [
  { k: "Focus", v: "Backend systems, end to end" },
  { k: "Stack", v: "Django · Laravel · FastAPI" },
  { k: "Data", v: "PostgreSQL · MySQL · MSSQL · Redis" },
  { k: "Runs on", v: "Docker · Nginx · Linux · AWS" },
  { k: "Based", v: MY_DETAILS.address },
];

/**
 * Newspaper-masthead hero: a mono meta rule, the name set enormous in serif,
 * an italic standfirst, then a ruled data strip across the full measure.
 */
export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid" />

      <div className="shell relative pb-section pt-10 md:pt-14">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line pb-4">
            <p className="label text-fg3">
              {MY_DETAILS.title} · {MY_DETAILS.address}
            </p>
            <a
              href={MY_DETAILS.companyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border border-line px-3 py-1.5 transition-colors hover:border-line-strong"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ok" />
              </span>
              <span className="label text-fg2">
                {MY_DETAILS.role} {MY_DETAILS.company}
              </span>
              <ArrowUpRight
                className="h-3 w-3 text-fg3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-12 text-balance font-serif text-h1 font-medium text-fg">
            {MY_DETAILS.name}
          </h1>
          <div aria-hidden className="mt-8 h-[3px] w-20 bg-accent" />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-3xl text-pretty font-serif text-deck italic text-fg2">
            {ABOUT_LEAD}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn-primary">
              See the work
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
            </a>
            <a href={`mailto:${MY_DETAILS.email}`} className="btn-ghost">
              <Mail className="h-3.5 w-3.5" strokeWidth={1.6} />
              {MY_DETAILS.email}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <dl className="mt-14 grid border-y border-line sm:grid-cols-2 lg:grid-cols-5">
            {SPEC.map((row, i) => (
              <div
                key={row.k}
                className={cn(
                  "py-4 lg:px-6",
                  // Hairlines between cells: rows stack below lg, columns at lg.
                  i > 0 && "border-t border-line sm:border-t",
                  i < 2 && "sm:border-t-0",
                  "lg:border-t-0 lg:border-l lg:border-line",
                  i === 0 && "lg:border-l-0 lg:pl-0",
                )}
              >
                <dt className="label text-fg3">{row.k}</dt>
                <dd className="mt-2 font-mono text-xs text-fg2">{row.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
