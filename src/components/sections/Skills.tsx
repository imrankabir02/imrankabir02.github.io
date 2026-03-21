"use client";

import { useState } from "react";
import { SkillsSection as SkillsData } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface SkillsProps {
  data: SkillsData;
}

export default function Skills({ data }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const categories = ["All", ...data.categories];

  const filtered =
    activeCategory === "All"
      ? data.items
      : data.items.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section-padding bg-white/2">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-mono font-medium mb-2 uppercase tracking-widest">
            {"// tech_stack"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Skills & Technologies</h2>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                activeCategory === cat
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                  : "bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill) => (
            <div key={skill.name} className="card-glass p-5 group hover:border-indigo-500/30 transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-200">{skill.name}</span>
                <span className="text-xs font-mono text-indigo-400">{skill.level}%</span>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-teal-500 rounded-full transition-all duration-700"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2 group-hover:text-slate-400 transition-colors">
                {skill.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
