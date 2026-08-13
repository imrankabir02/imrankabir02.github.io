import { ArrowUpRight, Lock } from "lucide-react";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { Metric, OwnershipBadge, StatusBadge } from "../ui/Badge";
import { PROJECTS, type Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

function ProjectCard({
  project,
  featured,
}: {
  project: Project;
  featured: boolean;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-line bg-elev/40 p-6 transition-colors duration-300 hover:border-line-strong md:p-7",
      )}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <OwnershipBadge ownership={project.ownership} />
          <StatusBadge status={project.status} />
        </div>
        {project.metric && project.metricLabel ? (
          <Metric value={project.metric} label={project.metricLabel} />
        ) : null}
      </div>

      {/* The lead card gets the full grid width, so its prose and highlights
          sit side by side instead of stranding half the row empty. */}
      <div
        className={cn(
          featured && "lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:gap-14",
        )}
      >
        <div>
          <h3
            className={cn(
              "mt-5 font-semibold tracking-tight text-fg",
              featured ? "text-2xl md:text-[1.75rem]" : "text-xl",
            )}
          >
            {project.title}
          </h3>

          <p className="mt-2 font-mono text-xs leading-relaxed text-fg3">
            {project.org ? `${project.org} · ` : ""}
            {project.context}
          </p>

          <p
            className={cn(
              "mt-5 border-l-2 border-accent/50 pl-4 leading-relaxed text-fg",
              featured ? "text-base md:text-lg" : "text-[0.95rem]",
            )}
          >
            {project.outcome}
          </p>

          <p className="mt-5 max-w-2xl text-pretty text-[0.9375rem] leading-relaxed text-fg2">
            {project.description}
          </p>
        </div>

        {project.highlights?.length ? (
          <ul
            className={cn(
              "mt-5 space-y-2.5",
              featured && "lg:mt-5 lg:self-center lg:border-l lg:border-line lg:pl-10",
            )}
          >
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-3 text-[0.875rem] leading-relaxed text-fg2"
              >
                <span
                  aria-hidden
                  className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-accent"
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* Footer is pushed to the bottom so cards in a row line up. */}
      <div className="mt-auto pt-7">
        <ul className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>

        {project.appLink || project.note ? (
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-5">
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
              <p className="inline-flex items-start gap-2 font-mono text-[0.6875rem] leading-relaxed text-fg3">
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
      lede="Backend systems don't photograph well, so each card is the problem, the decision I made, and what it cost — not a screenshot. Employer and client work is described at the engineering level only."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <Reveal
            key={project.title}
            delay={(i % 2) * 0.06}
            className={cn("h-full", i === 0 && "lg:col-span-2")}
          >
            <ProjectCard project={project} featured={i === 0} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
