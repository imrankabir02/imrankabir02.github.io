"use client";

import { useState, useEffect } from "react";
import { Menu, X, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
      )}
    >
      <nav className="section-container flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNav("#hero");
          }}
          className="flex items-center gap-2 font-bold text-lg group"
        >
          <Terminal className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
          <span className="text-gradient">IK</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => handleNav(item.href)}
                className="text-sm text-slate-400 hover:text-indigo-400 transition-colors font-medium"
              >
                {item.label}
              </button>
            </li>
          ))}
          <li>
            <a
              href="/admin/"
              className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-full transition-colors font-medium"
            >
              Admin
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-400 hover:text-white"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-md border-b border-white/10">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleNav(item.href)}
                  className="text-slate-300 hover:text-indigo-400 transition-colors text-sm font-medium"
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <a
                href="/admin/"
                className="inline-block text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-full transition-colors font-medium"
              >
                Admin
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
