import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Reveal from "../ui/Reveal";
import { ABOUT_TEXT, MY_DETAILS } from "@/data/portfolio";

// First paragraph of the bio doubles as the hero lead; the rest lives in About,
// so nothing is said twice.
const ABOUT_LEAD = ABOUT_TEXT.split(/\n\s*\n/)[0].trim();

// A spec sheet reads better than a stock photo for someone whose work is
// invisible by nature — it front-loads the facts a reviewer scans for.
const SPEC = [
  { k: "Focus", v: "Backend systems, end to end" },
  { k: "Stack", v: "Django · Laravel · FastAPI" },
  { k: "Data", v: "PostgreSQL · MySQL · MSSQL · Redis" },
  { k: "Runs on", v: "Docker · Nginx · Linux · AWS" },
  { k: "Based", v: MY_DETAILS.address },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid" />

      <div className="shell relative pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="grid items-start gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <a
                href={MY_DETAILS.companyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 transition-colors hover:border-line-strong"
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
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-8 text-balance text-4xl font-semibold leading-[1.05] tracking-tightest sm:text-5xl md:text-6xl">
                {MY_DETAILS.name}
              </h1>
              <p className="label mt-4 text-accent">{MY_DETAILS.title}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-fg2 md:text-xl">
                {ABOUT_LEAD}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
                >
                  See the work
                </a>
                <a
                  href={`mailto:${MY_DETAILS.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-line-strong"
                >
                  <Mail className="h-4 w-4" strokeWidth={1.6} />
                  Get in touch
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-fg3">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.6} />
                  {MY_DETAILS.address}
                </span>
                <a
                  href={`mailto:${MY_DETAILS.email}`}
                  className="transition-colors hover:text-accent"
                >
                  {MY_DETAILS.email}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:pt-4">
            <dl className="overflow-hidden rounded-2xl border border-line bg-elev/40">
              {SPEC.map((row, i) => (
                <div
                  key={row.k}
                  className={`flex items-baseline gap-4 px-5 py-4 ${
                    i > 0 ? "border-t border-line" : ""
                  }`}
                >
                  <dt className="label w-20 shrink-0 text-fg3">{row.k}</dt>
                  <dd className="font-mono text-[0.8125rem] leading-relaxed text-fg2">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
