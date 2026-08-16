import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { ABOUT_TEXT, EXPERIENCES, PROJECTS } from "@/data/portfolio";

// The hero already carries paragraph one; About picks up from paragraph two.
const BODY = ABOUT_TEXT.split(/\n\s*\n/)
  .slice(1)
  .map((p) => p.trim())
  .filter(Boolean);

const FACTS = [
  { value: String(EXPERIENCES.length), label: "Roles held" },
  { value: String(PROJECTS.length), label: "Systems shipped" },
  { value: "2024", label: "Shipping since" },
];

export default function About() {
  return (
    <Section id="about" index="01" eyebrow="About" title="The 2am details">
      <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
        <Reveal>
          <div className="space-y-6">
            {BODY.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-pretty text-base text-fg2"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:self-start">
          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-1">
            {FACTS.map((fact) => (
              <div key={fact.label} className="bg-bg px-5 py-6">
                <dd className="tnum font-mono text-metric font-medium text-accent">
                  {fact.value}
                </dd>
                <dt className="label mt-2 text-fg3">{fact.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
