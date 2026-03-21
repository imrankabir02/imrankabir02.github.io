"use client";

import { AboutSection as AboutData } from "@/types/portfolio";
import { MapPin, Briefcase, CheckCircle2 } from "lucide-react";

interface AboutProps {
  data: AboutData;
}

export default function About({ data }: AboutProps) {
  return (
    <section id="about" className="section-padding">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-mono font-medium mb-2 uppercase tracking-widest">
            {"// about_me"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Who I Am</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Bio card */}
          <div className="card-glass p-8">
            <p className="text-slate-300 leading-relaxed text-base mb-6">
              {data.bio}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              {data.location && (
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  {data.location}
                </span>
              )}
              {data.yearsOfExperience && (
                <span className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-teal-400" />
                  {data.yearsOfExperience}+ years of experience
                </span>
              )}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Key Highlights</h3>
            <ul className="space-y-4">
              {data.highlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5 shrink-0" />
                  <span className="text-slate-300 text-sm leading-relaxed">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
