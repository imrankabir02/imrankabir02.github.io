import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { EDUCATIONS } from "@/data/portfolio";

export default function Education() {
  return (
    <Section id="education" index="05" eyebrow="Education" title="Education">
      <div className="border-t border-line">
        {EDUCATIONS.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.05}>
            <article className="grid gap-3 border-b border-line py-8 md:grid-cols-[15rem_1fr] md:gap-10 md:px-4">
              <p className="label text-fg3">{item.year}</p>
              <div>
                <h3 className="text-h3 font-semibold text-fg">
                  {item.title}
                </h3>
                <p className="mt-2.5 font-mono text-xs text-fg3">
                  {item.name} · {item.location}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
