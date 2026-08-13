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
              className="group flex items-baseline gap-4 border-b border-line px-1 py-5 transition-colors hover:bg-elev/50 sm:px-4"
            >
              <span className="label tnum text-fg3 transition-colors group-hover:text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[0.95rem] text-fg2 transition-colors group-hover:text-fg">
                {skill}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {SKILL_GROUPS.map((group, i) => (
          <Reveal key={group.heading} delay={i * 0.06}>
            <h3 className="label text-fg3">{group.heading}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
