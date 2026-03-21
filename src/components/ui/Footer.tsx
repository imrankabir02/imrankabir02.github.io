import { Terminal, Github, Linkedin, Mail } from "lucide-react";
import { HeroSection } from "@/types/portfolio";

interface FooterProps {
  hero: HeroSection;
}

export default function Footer({ hero }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-8">
      <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <span>
            Built by{" "}
            <span className="text-white font-medium">{hero.name}</span> © {year}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {hero.socialLinks.github && (
            <a
              href={hero.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {hero.socialLinks.linkedin && (
            <a
              href={hero.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {hero.socialLinks.email && (
            <a
              href={`mailto:${hero.socialLinks.email}`}
              className="text-slate-500 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
