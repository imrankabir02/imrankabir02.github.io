"use client";

import { HeroSection as HeroData } from "@/types/portfolio";
import { Github, Linkedin, Twitter, Mail, Download, ArrowDown } from "lucide-react";

interface HeroProps {
  data: HeroData;
}

export default function Hero({ data }: HeroProps) {
  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  const socialIcons: Record<string, React.ReactNode> = {
    github: <Github className="w-5 h-5" />,
    linkedin: <Linkedin className="w-5 h-5" />,
    twitter: <Twitter className="w-5 h-5" />,
    email: <Mail className="w-5 h-5" />,
  };

  const socialHrefs: Record<string, string> = {
    github: data.socialLinks.github || "#",
    linkedin: data.socialLinks.linkedin || "#",
    twitter: data.socialLinks.twitter
      ? `https://twitter.com/${data.socialLinks.twitter.replace(/^@/, "")}`
      : "#",
    email: data.socialLinks.email ? `mailto:${data.socialLinks.email}` : "#",
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99,102,241,0.3) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
          <span className="text-sm text-indigo-300 font-medium">
            {data.title}
          </span>
        </div>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 tracking-tight">
          <span className="text-white">Hi, I&apos;m </span>
          <span className="text-gradient">{data.name}</span>
        </h1>

        {/* Title */}
        <p className="text-xl sm:text-2xl text-slate-400 mb-6 font-medium">
          {data.title}
        </p>

        {/* Tagline */}
        <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          {data.tagline}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            onClick={() =>
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 shadow-lg shadow-indigo-500/25"
          >
            View Projects
          </button>
          {data.resumeUrl && (
            <a
              href={data.resumeUrl}
              download
              className="flex items-center gap-2 border border-white/20 hover:border-white/40 text-slate-300 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
          )}
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4 mb-16">
          {Object.entries(data.socialLinks).map(([key, value]) => {
            if (!value) return null;
            return (
              <a
                key={key}
                href={socialHrefs[key]}
                target={key !== "email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 transition-all duration-200 hover:scale-110"
                aria-label={key}
              >
                {socialIcons[key]}
              </a>
            );
          })}
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-2 text-slate-500 hover:text-slate-400 transition-colors mx-auto"
          aria-label="Scroll down"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
