import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { OwnershipBadge } from "../ui/Badge";
import { EXPERIENCES, MY_DETAILS } from "@/data/portfolio";

const COMPANY_LINKS: Record<string, string> = {
  [MY_DETAILS.company]: MY_DETAILS.companyLink,
  Shifttrek: "https://www.shifttrek.com/",
};

export default function Experience() {
  return (
    <Section
      id="experience"
      index="03"
      eyebrow="Experience"
      title="Where I've built things"
    >
      <div className="border-t border-line">
        {EXPERIENCES.map((job, i) => {
          const href = COMPANY_LINKS[job.company];
          return (
            <Reveal key={`${job.company}-${job.year}`} delay={i * 0.05}>
              <article className="group grid gap-6 border-b border-line py-9 transition-colors hover:bg-elev/40 md:grid-cols-[13rem_1fr] md:gap-12 md:px-4">
                <div className="flex items-start justify-between gap-4 md:block">
                  <div>
                    <p className="label text-fg3">{job.year}</p>
                    <div className="mt-3">
                      <OwnershipBadge ownership={job.ownership} />
                    </div>
                  </div>
                  {job.metric && job.metricLabel ? (
                    <div className="md:mt-6 md:text-left">
                      <div className="tnum font-mono text-2xl font-medium leading-none tracking-tight text-fg">
                        {job.metric}
                      </div>
                      <div className="label mt-1.5 text-fg3">
                        {job.metricLabel}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div>
                  <h3 className="text-lg font-medium tracking-tight text-fg md:text-xl">
                    {job.role}
                    <span className="mx-2 text-fg3">·</span>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline"
                      >
                        {job.company}
                      </a>
                    ) : (
                      <span>{job.company}</span>
                    )}
                  </h3>

                  <p className="mt-4 border-l-2 border-accent/50 pl-4 text-[0.95rem] leading-relaxed text-fg">
                    {job.outcome}
                  </p>

                  <p className="mt-4 max-w-2xl text-pretty text-[0.9375rem] leading-relaxed text-fg2">
                    {job.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {job.technologies.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
