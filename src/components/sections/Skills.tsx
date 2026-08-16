import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { SKILLSETS, SKILL_GROUPS } from "@/data/portfolio";

export default function Skills() {
  return (
    <Section
      id="skills"
      index="02"
      eyebrow="Skills"
      title="What I work with"
      lede="The problems first, the tools second — the tools change more often than the problems do."
    >
      <Reveal>
        <ul className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {SKILLSETS.map((skill, i) => (
            <li
              key={skill}
              className="group flex items-baseline gap-4 border-b border-line px-1 py-5 transition-colors hover:bg-elev/60 sm:px-4"
            >
              <span className="label tnum text-fg3 transition-colors group-hover:text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-base text-fg2 transition-colors group-hover:text-fg">
                {skill}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* The toolbox as a ledger: category left, tools right, one hairline
          per row — reads like a spec sheet, not a tag cloud. */}
      <div className="mt-16 border-t border-line">
        {SKILL_GROUPS.map((group, i) => (
          <Reveal key={group.heading} delay={i * 0.04}>
            <div className="grid gap-2 border-b border-line py-5 md:grid-cols-[15rem_1fr] md:gap-10 md:px-4">
              <h3 className="label pt-0.5 text-fg3">{group.heading}</h3>
              <p className="font-mono text-sm text-fg2">
                {group.items.join(" · ")}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
