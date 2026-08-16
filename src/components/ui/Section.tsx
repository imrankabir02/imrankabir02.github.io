import type { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * Every section shares the same head: a mono index rail, the section name,
 * a hairline out to the margin, then a serif display heading and optional
 * lede — the rhythm of a well-set technical document.
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
    <section id={id} className="scroll-mt-24 py-section">
      <div className="shell">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="label tnum text-accent">{index}</span>
            <span className="label text-fg3">{eyebrow}</span>
            <span className="rule flex-1" />
          </div>

          <h2 className="mt-8 max-w-3xl text-balance font-serif text-h2 font-medium">
            {title}
          </h2>

          {lede ? (
            <p className="mt-5 max-w-prose2 text-pretty text-base text-fg2">
              {lede}
            </p>
          ) : null}
        </Reveal>

        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}
