"use client";

import { useState } from "react";
import { Project as ProjectData } from "@/types/portfolio";
import { Github, ExternalLink, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectsProps {
  data: ProjectData[];
}

export default function Projects({ data }: ProjectsProps) {
  const [showAll, setShowAll] = useState(false);
  const allTags = ["All", ...Array.from(new Set(data.flatMap((p) => p.tags)))];
  const [activeTag, setActiveTag] = useState("All");

  const filtered = activeTag === "All" ? data : data.filter((p) => p.tags.includes(activeTag));
  const displayed = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="projects" className="section-padding bg-white/2">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-mono font-medium mb-2 uppercase tracking-widest">
            {"// my_work"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Projects</h2>
        </div>

        {/* Tag filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setActiveTag(tag);
                setShowAll(false);
              }}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                activeTag === tag
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                  : "bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20"
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {displayed.map((project) => (
            <div
              key={project.id}
              className={cn(
                "card-glass p-6 flex flex-col hover:border-indigo-500/30 transition-all duration-200 group",
                project.featured && "border-indigo-500/20"
              )}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {project.featured && (
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  )}
                  <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-white transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-teal-400 transition-colors"
                      aria-label="Live demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="badge bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="badge bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Show more */}
        {filtered.length > 6 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="border border-white/20 hover:border-white/40 text-slate-300 hover:text-white px-8 py-2.5 rounded-full font-medium transition-all duration-200"
            >
              {showAll ? "Show Less" : `Show All (${filtered.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
