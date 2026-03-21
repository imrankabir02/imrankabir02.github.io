"use client";

import { useState } from "react";
import { PortfolioData, Experience, Project, Skill } from "@/types/portfolio";
import { GitHubConfig, saveFileToGitHub } from "@/lib/github-api";
import {
  Save, LogOut, Plus, Trash2, Loader2, User, Briefcase,
  Code2, FolderGit2, Mail, ChevronDown, ChevronUp
} from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface AdminDashboardProps {
  config: GitHubConfig;
  initialData: PortfolioData;
  initialSha: string;
  onLogout: () => void;
}

type Section = "hero" | "about" | "skills" | "experience" | "projects" | "contact";

export default function AdminDashboard({
  config, initialData, initialSha, onLogout,
}: AdminDashboardProps) {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [sha, setSha] = useState(initialSha);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("hero");

  const navSections: { key: Section; label: string; icon: React.ReactNode }[] = [
    { key: "hero", label: "Hero", icon: <User className="w-4 h-4" /> },
    { key: "about", label: "About", icon: <User className="w-4 h-4" /> },
    { key: "skills", label: "Skills", icon: <Code2 className="w-4 h-4" /> },
    { key: "experience", label: "Experience", icon: <Briefcase className="w-4 h-4" /> },
    { key: "projects", label: "Projects", icon: <FolderGit2 className="w-4 h-4" /> },
    { key: "contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
  ];

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveFileToGitHub(config, data, sha);
      toast.success("Portfolio saved! GitHub Actions will redeploy your site shortly.");
      // Fetch updated sha for next save
      const { fetchFileFromGitHub } = await import("@/lib/github-api");
      const { sha: newSha } = await fetchFileFromGitHub(config);
      setSha(newSha);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const Input = ({
    label, value, onChange, type = "text", placeholder = "", mono = false, multiline = false,
  }: {
    label: string; value: string; onChange: (v: string) => void;
    type?: string; placeholder?: string; mono?: boolean; multiline?: boolean;
  }) => (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          placeholder={placeholder}
          className={cn(
            "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-slate-200 text-sm",
            "focus:outline-none focus:border-indigo-500 transition-colors resize-y",
            mono && "font-mono"
          )}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-slate-200 text-sm",
            "focus:outline-none focus:border-indigo-500 transition-colors",
            mono && "font-mono"
          )}
        />
      )}
    </div>
  );

  const Toggle = ({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) => (
    <div className="flex items-center justify-between">
      <label className="text-sm text-slate-300">{label}</label>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={cn(
          "relative w-10 h-5 rounded-full transition-colors",
          value ? "bg-indigo-600" : "bg-white/10"
        )}
      >
        <span className={cn(
          "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform",
          value && "translate-x-5"
        )} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 flex flex-col">
      {/* Top bar */}
      <header className="border-b border-white/10 px-6 py-3 flex items-center justify-between bg-[#111118]">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg text-gradient">Portfolio Admin</span>
          <span className="text-xs text-slate-500 font-mono">{config.owner}/{config.repo}</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            View Site →
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : "Save & Deploy"}
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-48 border-r border-white/10 bg-[#111118] p-3 space-y-1 shrink-0">
          {navSections.map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveSection(s.key)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors text-left",
                activeSection === s.key
                  ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              {s.icon}
              {s.label}
            </button>
          ))}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* HERO */}
          {activeSection === "hero" && (
            <div className="max-w-2xl space-y-4">
              <h2 className="text-xl font-semibold text-white mb-6">Hero Section</h2>
              <Input label="Full Name" value={data.hero.name} onChange={(v) => setData({ ...data, hero: { ...data.hero, name: v } })} />
              <Input label="Title / Role" value={data.hero.title} onChange={(v) => setData({ ...data, hero: { ...data.hero, title: v } })} />
              <Input label="Tagline" value={data.hero.tagline} onChange={(v) => setData({ ...data, hero: { ...data.hero, tagline: v } })} multiline />
              <Input label="Resume URL (optional)" value={data.hero.resumeUrl || ""} onChange={(v) => setData({ ...data, hero: { ...data.hero, resumeUrl: v } })} placeholder="https://..." />
              <Input label="Avatar URL (optional)" value={data.hero.avatarUrl || ""} onChange={(v) => setData({ ...data, hero: { ...data.hero, avatarUrl: v } })} placeholder="https://..." />
              <div className="border-t border-white/10 pt-4">
                <h3 className="text-sm font-medium text-slate-300 mb-4">Social Links</h3>
                <div className="space-y-3">
                  <Input label="GitHub URL" value={data.hero.socialLinks.github || ""} onChange={(v) => setData({ ...data, hero: { ...data.hero, socialLinks: { ...data.hero.socialLinks, github: v } } })} placeholder="https://github.com/username" />
                  <Input label="LinkedIn URL" value={data.hero.socialLinks.linkedin || ""} onChange={(v) => setData({ ...data, hero: { ...data.hero, socialLinks: { ...data.hero.socialLinks, linkedin: v } } })} placeholder="https://linkedin.com/in/username" />
                  <Input label="Twitter Handle (with or without @)" value={data.hero.socialLinks.twitter || ""} onChange={(v) => setData({ ...data, hero: { ...data.hero, socialLinks: { ...data.hero.socialLinks, twitter: v } } })} placeholder="username or @username" />
                  <Input label="Email" value={data.hero.socialLinks.email || ""} onChange={(v) => setData({ ...data, hero: { ...data.hero, socialLinks: { ...data.hero.socialLinks, email: v } } })} type="email" />
                </div>
              </div>
            </div>
          )}

          {/* ABOUT */}
          {activeSection === "about" && (
            <div className="max-w-2xl space-y-4">
              <h2 className="text-xl font-semibold text-white mb-6">About Section</h2>
              <Input label="Bio" value={data.about.bio} onChange={(v) => setData({ ...data, about: { ...data.about, bio: v } })} multiline />
              <Input label="Location" value={data.about.location || ""} onChange={(v) => setData({ ...data, about: { ...data.about, location: v } })} />
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Years of Experience</label>
                <input
                  type="number"
                  value={data.about.yearsOfExperience || 0}
                  onChange={(e) => setData({ ...data, about: { ...data.about, yearsOfExperience: Number(e.target.value) } })}
                  className="w-24 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-slate-400">Highlights</label>
                  <button
                    onClick={() => setData({ ...data, about: { ...data.about, highlights: [...data.about.highlights, ""] } })}
                    className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
                  >
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
                <div className="space-y-2">
                  {data.about.highlights.map((h, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        value={h}
                        onChange={(e) => {
                          const hl = [...data.about.highlights];
                          hl[i] = e.target.value;
                          setData({ ...data, about: { ...data.about, highlights: hl } });
                        }}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                      />
                      <button
                        onClick={() => {
                          const hl = data.about.highlights.filter((_, idx) => idx !== i);
                          setData({ ...data, about: { ...data.about, highlights: hl } });
                        }}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SKILLS */}
          {activeSection === "skills" && (
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Skills</h2>
                <button
                  onClick={() => {
                    const newSkill: Skill = { name: "", level: 75, category: data.skills.categories[0] || "" };
                    setData({ ...data, skills: { ...data.skills, items: [...data.skills.items, newSkill] } });
                  }}
                  className="flex items-center gap-1.5 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 px-3 py-1.5 rounded-lg text-sm hover:bg-indigo-600/30 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Skill
                </button>
              </div>

              <div className="space-y-3">
                {data.skills.items.map((skill, i) => (
                  <div key={i} className="card-glass p-4 flex flex-wrap gap-3 items-center">
                    <input
                      value={skill.name}
                      onChange={(e) => {
                        const items = [...data.skills.items];
                        items[i] = { ...items[i], name: e.target.value };
                        setData({ ...data, skills: { ...data.skills, items } });
                      }}
                      placeholder="Skill name"
                      className="flex-1 min-w-[120px] bg-white/5 border border-white/10 rounded px-2 py-1 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                    />
                    <select
                      value={skill.category}
                      onChange={(e) => {
                        const items = [...data.skills.items];
                        items[i] = { ...items[i], category: e.target.value };
                        setData({ ...data, skills: { ...data.skills, items } });
                      }}
                      className="bg-white/5 border border-white/10 rounded px-2 py-1 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                    >
                      {data.skills.categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <div className="flex items-center gap-2">
                      <input
                        type="range" min="1" max="100" value={skill.level}
                        onChange={(e) => {
                          const items = [...data.skills.items];
                          items[i] = { ...items[i], level: Number(e.target.value) };
                          setData({ ...data, skills: { ...data.skills, items } });
                        }}
                        className="w-20 accent-indigo-500"
                      />
                      <span className="text-xs text-indigo-400 w-8 text-right">{skill.level}%</span>
                    </div>
                    <button
                      onClick={() => {
                        const items = data.skills.items.filter((_, idx) => idx !== i);
                        setData({ ...data, skills: { ...data.skills, items } });
                      }}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EXPERIENCE */}
          {activeSection === "experience" && (
            <ExperienceEditor data={data} setData={setData} />
          )}

          {/* PROJECTS */}
          {activeSection === "projects" && (
            <ProjectsEditor data={data} setData={setData} />
          )}

          {/* CONTACT */}
          {activeSection === "contact" && (
            <div className="max-w-2xl space-y-4">
              <h2 className="text-xl font-semibold text-white mb-6">Contact Section</h2>
              <Input label="Email" value={data.contact.email} onChange={(v) => setData({ ...data, contact: { ...data.contact, email: v } })} type="email" />
              <Input label="Message" value={data.contact.message || ""} onChange={(v) => setData({ ...data, contact: { ...data.contact, message: v } })} multiline />
              <Input label="Preferred Contact Method" value={data.contact.preferredContact || ""} onChange={(v) => setData({ ...data, contact: { ...data.contact, preferredContact: v } })} placeholder="email, linkedin, etc." />
              <Toggle
                label="Available for Work"
                value={data.contact.availableForWork}
                onChange={(v) => setData({ ...data, contact: { ...data.contact, availableForWork: v } })}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function ExperienceEditor({ data, setData }: { data: PortfolioData; setData: (d: PortfolioData) => void }) {
  const [expanded, setExpanded] = useState<string | null>(data.experiences[0]?.id || null);

  const addExp = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      company: "New Company",
      role: "Software Engineer",
      startDate: new Date().toISOString().slice(0, 7),
      current: true,
      description: "",
      responsibilities: [],
      techStack: [],
    };
    setData({ ...data, experiences: [newExp, ...data.experiences] });
    setExpanded(newExp.id);
  };

  const updateExp = (id: string, updates: Partial<Experience>) => {
    setData({
      ...data,
      experiences: data.experiences.map((e) => e.id === id ? { ...e, ...updates } : e),
    });
  };

  const removeExp = (id: string) => {
    setData({ ...data, experiences: data.experiences.filter((e) => e.id !== id) });
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Experience</h2>
        <button onClick={addExp} className="flex items-center gap-1.5 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 px-3 py-1.5 rounded-lg text-sm hover:bg-indigo-600/30 transition-colors">
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </div>

      <div className="space-y-3">
        {data.experiences.map((exp) => (
          <div key={exp.id} className="card-glass overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-white/2 transition-colors"
            >
              <div>
                <p className="font-medium text-white text-sm">{exp.role}</p>
                <p className="text-xs text-slate-400">{exp.company}</p>
              </div>
              <div className="flex items-center gap-3">
                {exp.current && <span className="badge bg-teal-500/15 text-teal-400 border border-teal-500/30">Current</span>}
                {expanded === exp.id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </button>

            {expanded === exp.id && (
              <div className="px-4 pb-4 space-y-3 border-t border-white/10 pt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Company</label>
                    <input value={exp.company} onChange={(e) => updateExp(exp.id, { company: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Role</label>
                    <input value={exp.role} onChange={(e) => updateExp(exp.id, { role: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Start Date (YYYY-MM)</label>
                    <input value={exp.startDate} onChange={(e) => updateExp(exp.id, { startDate: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">End Date (YYYY-MM)</label>
                    <input value={exp.endDate || ""} disabled={exp.current} onChange={(e) => updateExp(exp.id, { endDate: e.target.value })} placeholder={exp.current ? "Present" : "YYYY-MM"} className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 disabled:opacity-50" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id={`current-${exp.id}`} checked={exp.current || false} onChange={(e) => updateExp(exp.id, { current: e.target.checked, endDate: e.target.checked ? undefined : exp.endDate })} className="accent-indigo-500" />
                  <label htmlFor={`current-${exp.id}`} className="text-sm text-slate-300">Current position</label>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Description</label>
                  <textarea value={exp.description} onChange={(e) => updateExp(exp.id, { description: e.target.value })} rows={2} className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 resize-none" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs text-slate-400">Responsibilities</label>
                    <button onClick={() => updateExp(exp.id, { responsibilities: [...exp.responsibilities, ""] })} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"><Plus className="w-3 h-3" />Add</button>
                  </div>
                  <div className="space-y-1.5">
                    {exp.responsibilities.map((r, i) => (
                      <div key={i} className="flex gap-2">
                        <input value={r} onChange={(e) => { const rs = [...exp.responsibilities]; rs[i] = e.target.value; updateExp(exp.id, { responsibilities: rs }); }} className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-indigo-500" />
                        <button onClick={() => updateExp(exp.id, { responsibilities: exp.responsibilities.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-300"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Tech Stack (comma-separated)</label>
                  <input
                    value={exp.techStack.join(", ")}
                    onChange={(e) => updateExp(exp.id, { techStack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                    className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                    placeholder="Python, Django, PostgreSQL, ..."
                  />
                </div>

                <button onClick={() => removeExp(exp.id)} className="flex items-center gap-1.5 text-red-400 hover:text-red-300 text-sm transition-colors mt-2">
                  <Trash2 className="w-4 h-4" /> Remove Experience
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsEditor({ data, setData }: { data: PortfolioData; setData: (d: PortfolioData) => void }) {
  const [expanded, setExpanded] = useState<string | null>(data.projects[0]?.id || null);

  const addProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: "New Project",
      description: "",
      techStack: [],
      tags: [],
      featured: false,
    };
    setData({ ...data, projects: [newProj, ...data.projects] });
    setExpanded(newProj.id);
  };

  const updateProj = (id: string, updates: Partial<Project>) => {
    setData({ ...data, projects: data.projects.map((p) => p.id === id ? { ...p, ...updates } : p) });
  };

  const removeProj = (id: string) => {
    setData({ ...data, projects: data.projects.filter((p) => p.id !== id) });
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Projects</h2>
        <button onClick={addProject} className="flex items-center gap-1.5 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 px-3 py-1.5 rounded-lg text-sm hover:bg-indigo-600/30 transition-colors">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="space-y-3">
        {data.projects.map((proj) => (
          <div key={proj.id} className="card-glass overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === proj.id ? null : proj.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-white/2 transition-colors"
            >
              <div>
                <p className="font-medium text-white text-sm">{proj.title}</p>
                <p className="text-xs text-slate-400 line-clamp-1">{proj.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {proj.featured && <span className="badge bg-yellow-500/15 text-yellow-400 border border-yellow-500/30">Featured</span>}
                {expanded === proj.id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </button>

            {expanded === proj.id && (
              <div className="px-4 pb-4 space-y-3 border-t border-white/10 pt-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Title</label>
                  <input value={proj.title} onChange={(e) => updateProj(proj.id, { title: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Description</label>
                  <textarea value={proj.description} onChange={(e) => updateProj(proj.id, { description: e.target.value })} rows={3} className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">GitHub URL</label>
                    <input value={proj.githubUrl || ""} onChange={(e) => updateProj(proj.id, { githubUrl: e.target.value })} placeholder="https://github.com/..." className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Live URL</label>
                    <input value={proj.liveUrl || ""} onChange={(e) => updateProj(proj.id, { liveUrl: e.target.value })} placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Tech Stack (comma-separated)</label>
                  <input value={proj.techStack.join(", ")} onChange={(e) => updateProj(proj.id, { techStack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500" placeholder="Go, Redis, PostgreSQL, ..." />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Tags (comma-separated)</label>
                  <input value={proj.tags.join(", ")} onChange={(e) => updateProj(proj.id, { tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500" placeholder="Backend, API, Python, ..." />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id={`featured-${proj.id}`} checked={proj.featured || false} onChange={(e) => updateProj(proj.id, { featured: e.target.checked })} className="accent-indigo-500" />
                  <label htmlFor={`featured-${proj.id}`} className="text-sm text-slate-300">Featured project</label>
                </div>
                <button onClick={() => removeProj(proj.id)} className="flex items-center gap-1.5 text-red-400 hover:text-red-300 text-sm transition-colors">
                  <Trash2 className="w-4 h-4" /> Remove Project
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
