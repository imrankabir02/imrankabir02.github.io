import type { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * Every section shares the same head: a mono index rail, the section name,
 * a hairline out to the margin, then a display heading and optional lede.
 */
export default function Section({
  id,
  index,
  eyebrow,
  title,
  lede,
  children,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="label tnum text-accent">{index}</span>
            <span className="label text-fg3">{eyebrow}</span>
            <span className="rule flex-1" />
          </div>

          <h2 className="mt-7 max-w-3xl text-balance text-2xl font-semibold tracking-tightest sm:text-3xl md:text-[2.25rem] md:leading-[1.15]">
            {title}
          </h2>

          {lede ? (
            <p className="mt-4 max-w-prose2 text-pretty text-[0.95rem] leading-relaxed text-fg2">
              {lede}
            </p>
          ) : null}
        </Reveal>

        <div className="mt-12 md:mt-14">{children}</div>
      </div>
    </section>
  );
}
