export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  website?: string;
}

export interface HeroSection {
  name: string;
  title: string;
  tagline: string;
  resumeUrl?: string;
  avatarUrl?: string;
  socialLinks: SocialLinks;
}

export interface AboutSection {
  bio: string;
  highlights: string[];
  location?: string;
  yearsOfExperience?: number;
}

export interface Skill {
  name: string;
  level: number; // 1-100
  category: string;
}

export interface SkillsSection {
  categories: string[];
  items: Skill[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  responsibilities: string[];
  techStack: string[];
  companyUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  tags: string[];
}

export interface ContactSection {
  email: string;
  availableForWork: boolean;
  preferredContact?: string;
  message?: string;
}

export interface PortfolioData {
  hero: HeroSection;
  about: AboutSection;
  skills: SkillsSection;
  experiences: Experience[];
  projects: Project[];
  contact: ContactSection;
  meta: {
    lastUpdated: string;
    version: string;
  };
}
