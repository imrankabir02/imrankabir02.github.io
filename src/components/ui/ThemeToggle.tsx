"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  // Starts undefined so the button renders inert until we know what the
  // pre-paint script picked — no icon flicker on first load.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // private mode / storage disabled — the theme still applies for this visit
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className={`grid h-9 w-9 place-items-center rounded-full border border-line text-fg2 transition-colors hover:border-line-strong hover:text-fg ${className}`}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" strokeWidth={1.6} />
      ) : (
        <Sun className="h-4 w-4" strokeWidth={1.6} />
      )}
    </button>
  );
}
