# Mridha Imran Kabir — Portfolio

Personal site for a backend engineer, deployed to GitHub Pages at
**[testtracker.me](https://testtracker.me)**.

Built as a static export: no database, no CMS, no runtime API. All content lives
in one typed TypeScript module, and pushing to `main` rebuilds and redeploys.

## Design

An editorial, typographic layout rather than the usual card-and-gradient
template — the work here is backend systems, which don't photograph well, so the
page leads with problems, decisions, and tradeoffs instead of screenshots.

| Choice | Why |
|---|---|
| Sans body (Inter) + mono micro-labels (JetBrains Mono) | Mono carries the metadata — section indices, years, ownership tags, tech chips — so the prose stays clean |
| Amber accent on near-black, used sparingly | The colour of a warning light, for someone whose pitch is "systems that tell you when they break" |
| Dark default, light theme toggle | Stored in `localStorage`, applied pre-paint so there's no flash |
| Ownership + outcome on every entry | `LEAD` / `SOLE` / `SOLO` / `BACKEND`, plus a one-line result — the two things a reviewer actually scans for |
| Hairline rules, no drop shadows | Structure comes from alignment and rhythm, not decoration |

## Stack

- **Next.js 15** (App Router, `output: "export"`)
- **TypeScript**, **Tailwind CSS**
- **lucide-react** for icons
- GitHub Actions → GitHub Pages

Zero runtime JS dependencies beyond React: the scroll reveals, scrollspy, and
theme toggle are ~100 lines of plain browser API.

## Editing content

Everything on the page — bio, skills, roles, projects, education, contact —
comes from **`src/data/portfolio.ts`**. Edit it, commit, push:

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | Does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static export to `out/` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |

## Structure

```
src/
├── app/
│   ├── layout.tsx        # fonts, metadata, JSON-LD, pre-paint theme script
│   ├── page.tsx          # section composition
│   └── globals.css       # design tokens (light + dark), reveal, primitives
├── components/
│   ├── sections/         # Hero, About, Skills, Experience, Projects, Education, Contact
│   └── ui/               # Nav, Section, Reveal, Badge, ThemeToggle, Footer
├── data/portfolio.ts     # ← all content lives here
└── lib/utils.ts
```

## Accessibility & robustness

- Content is visible with JavaScript disabled — the reveal animation's hidden
  state is gated behind an `html.js` class set by the boot script.
- `prefers-reduced-motion: reduce` disables reveals entirely rather than leaving
  content stranded at `opacity: 0`.
- Both themes define a full palette; neither inherits colours from the other.
- Semantic landmarks, visible focus rings, `aria-current` on the active nav link.

## Deployment

Push to `main`. CI typechecks, lints, builds, and publishes `out/` to GitHub
Pages. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## License

MIT
