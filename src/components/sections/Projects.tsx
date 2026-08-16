import { ArrowUpRight, Lock } from "lucide-react";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { Metric, OwnershipBadge, StatusBadge } from "../ui/Badge";
import { PROJECTS, type Project } from "@/data/portfolio";

/**
 * Case-file rows instead of cards: a meta rail on the left (ownership,
 * status, metric, context), the argument on the right (serif title, italic
 * claim, prose, highlights), one hairline per system.
 */
function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="grid gap-6 border-b border-line py-12 md:grid-cols-[15rem_1fr] md:gap-10 md:px-4">
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4 md:flex-col md:justify-start">
        <div className="flex flex-col items-start gap-3">
          <OwnershipBadge ownership={project.ownership} />
          <StatusBadge status={project.status} />
        </div>
        {project.metric && project.metricLabel ? (
          <Metric value={project.metric} label={project.metricLabel} />
        ) : null}
        <p className="dataline w-full md:mt-2">
          {project.org ? (
            <>
              {project.org}
              <br />
            </>
          ) : null}
          {project.context}
        </p>
      </div>

      <div>
        <h3 className="font-serif text-h3 font-medium text-fg">
          {project.title}
        </h3>

        <p className="pull mt-5 text-lg">{project.outcome}</p>

        <div className="mt-6 gap-x-12 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
          <p className="text-pretty text-sm text-fg2">{project.description}</p>

          {project.highlights?.length ? (
            <ul className="mt-5 space-y-2.5 lg:mt-0 lg:border-l lg:border-line lg:pl-8">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm text-fg2">
                  <span
                    aria-hidden
                    className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <p className="dataline mt-7">{project.technologies.join(" · ")}</p>

        {project.appLink || project.note ? (
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            {project.appLink ? (
              <a
                href={project.appLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent"
              >
                Visit live site
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  strokeWidth={2}
                />
              </a>
            ) : null}
            {project.note ? (
              <p className="inline-flex items-start gap-2 font-mono text-label text-fg3">
                <Lock className="mt-0.5 h-3 w-3 shrink-0" strokeWidth={1.8} />
                {project.note}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <Section
      id="work"
      index="04"
      eyebrow="Work"
      title="Selected systems"
      lede="Backend systems don't photograph well, so each entry is the problem, the decision I made, and what it cost — not a screenshot. Employer and client work is described at the engineering level only."
    >
      <div className="border-t border-line">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.title} delay={Math.min(i, 3) * 0.04}>
            <ProjectRow project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
