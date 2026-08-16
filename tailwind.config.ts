import type { Config } from "tailwindcss";

/**
 * Type scale is deliberately small and fluid. Six near-identical body sizes
 * read as noise, so there are exactly three: `sm` for meta, `base` for body,
 * `lg` for leads. Display sizes scale with the viewport via clamp() so there
 * is no size jump at a breakpoint.
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
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Mono labels — the smallest type on the site.
        label: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.16em" }],
        // Meta: timestamps, contexts, chips, captions.
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.6" }],
        // Body.
        base: ["1rem", { lineHeight: "1.7" }],
        // Leads and pull quotes.
        lg: ["1.125rem", { lineHeight: "1.65" }],
        xl: ["1.25rem", { lineHeight: "1.55" }],
        // Card and row headings.
        h3: ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.02em" }],
        h3lg: [
          "clamp(1.375rem, 1.22rem + 0.7vw, 1.75rem)",
          { lineHeight: "1.25", letterSpacing: "-0.025em" },
        ],
        // Section headings.
        h2: [
          "clamp(1.75rem, 1.35rem + 1.85vw, 2.625rem)",
          { lineHeight: "1.15", letterSpacing: "-0.03em" },
        ],
        // Hero.
        h1: [
          "clamp(2.5rem, 1.6rem + 4.1vw, 4.5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.04em" },
        ],
        // Big numerals (metrics).
        metric: ["1.75rem", { lineHeight: "1", letterSpacing: "-0.03em" }],
      },
      maxWidth: {
        shell: "72rem",
        prose2: "38rem",
      },
      letterSpacing: {
        tightest: "-0.035em",
      },
      spacing: {
        // Vertical rhythm steps, used for section padding and stack gaps.
        section: "clamp(4.5rem, 3rem + 6vw, 8rem)",
      },
    },
  },
  plugins: [],
};
export default config;
