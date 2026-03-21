"use client";

import { Experience as ExperienceData } from "@/types/portfolio";
import { formatDate, getDuration } from "@/lib/utils";
import { Briefcase, ExternalLink, CalendarDays } from "lucide-react";

interface ExperienceProps {
  data: ExperienceData[];
}

export default function Experience({ data }: ExperienceProps) {
  return (
    <section id="experience" className="section-padding">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-mono font-medium mb-2 uppercase tracking-widest">
            {"// work_history"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Experience</h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />

          <div className="space-y-12">
            {data.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 z-10">
                  <div className="w-4 h-4 rounded-full bg-indigo-500 border-4 border-[#0a0a0f] shadow-lg shadow-indigo-500/50" />
                </div>

                {/* Content card */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="card-glass p-6 hover:border-indigo-500/30 transition-all duration-200">
                    {/* Company & role */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Briefcase className="w-4 h-4 text-indigo-400" />
                          <h3 className="font-semibold text-white text-lg">{exp.role}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-teal-400 font-medium text-sm">
                            {exp.company}
                          </span>
                          {exp.companyUrl && (
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-500 hover:text-slate-300 transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                      {exp.current && (
                        <span className="badge bg-teal-500/15 text-teal-400 border border-teal-500/30">
                          Current
                        </span>
                      )}
                    </div>

                    {/* Dates */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                      <CalendarDays className="w-3.5 h-3.5" />
                      <span>
                        {formatDate(exp.startDate)} –{" "}
                        {exp.current ? "Present" : exp.endDate ? formatDate(exp.endDate) : ""}
                      </span>
                      <span className="text-indigo-400">
                        · {getDuration(exp.startDate, exp.endDate)}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Responsibilities */}
                    <ul className="space-y-2 mb-4">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                          <span className="text-indigo-400 mt-1.5 shrink-0">›</span>
                          {r}
                        </li>
                      ))}
                    </ul>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="badge bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
