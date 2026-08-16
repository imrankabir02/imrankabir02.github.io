import type { Config } from "tailwindcss";

/**
 * Type system: Newsreader for display and decks, Inter for body, JetBrains
 * Mono for data. Three body sizes only (sm/base/lg); display sizes are fluid
 * clamp()s so nothing jumps at a breakpoint. Serif display wants far less
 * negative tracking than a grotesk — that's why h1/h2 carry their own.
 */
const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // rgb(var(--x) / <alpha-value>) is what makes `bg-elev/40` and
        // `border-accent/60` actually emit CSS.
        bg: "rgb(var(--bg) / <alpha-value>)",
        elev: "rgb(var(--elev) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        fg2: "rgb(var(--fg-2) / <alpha-value>)",
        fg3: "rgb(var(--fg-3) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        ok: "rgb(var(--ok) / <alpha-value>)",
        // Already alpha by definition — no modifier needed.
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        "accent-soft": "var(--accent-soft)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Mono labels — the smallest type on the site.
        label: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.16em" }],
        // Meta: timestamps, contexts, tech lines, captions.
        xs: ["0.75rem", { lineHeight: "1.6" }],
        sm: ["0.875rem", { lineHeight: "1.6" }],
        // Body.
        base: ["1rem", { lineHeight: "1.7" }],
        // Pull quotes and leads.
        lg: ["1.125rem", { lineHeight: "1.6" }],
        // The serif standfirst under the masthead name.
        deck: [
          "clamp(1.25rem, 1.1rem + 0.75vw, 1.625rem)",
          { lineHeight: "1.5" },
        ],
        // Card and row headings (serif).
        h3: ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        // Section headings (serif).
        h2: [
          "clamp(1.875rem, 1.5rem + 1.8vw, 2.75rem)",
          { lineHeight: "1.1", letterSpacing: "-0.015em" },
        ],
        // Masthead name (serif).
        h1: [
          "clamp(3rem, 2rem + 5vw, 5.5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.02em" },
        ],
        // Big numerals (metrics).
        metric: ["1.75rem", { lineHeight: "1", letterSpacing: "-0.03em" }],
      },
      maxWidth: {
        shell: "72rem",
        prose2: "38rem",
      },
      spacing: {
        // Vertical rhythm step for section padding.
        section: "clamp(4.5rem, 3rem + 6vw, 8rem)",
      },
    },
  },
  plugins: [],
};
export default config;
