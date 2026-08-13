# Local Development Setup

## Prerequisites

- **Node.js** 18+ (20 recommended)
- **npm** 9+

## Installation

```bash
git clone https://github.com/imrankabir02/imrankabir02.github.io.git
cd imrankabir02.github.io
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build + static export to `out/` |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint via `next lint` |
| `npm run typecheck` | `tsc --noEmit` |

## Editing content

All content lives in **`src/data/portfolio.ts`** — a single typed module. There
is no CMS and no database; edit the file, commit, and CI redeploys.

| Export | Drives |
|---|---|
| `MY_DETAILS` | Name, title, current role, email, location, GitHub |
| `ABOUT_TEXT` | Paragraph 1 becomes the hero lead, the rest is the About section |
| `SKILLSETS` | The numbered capability list |
| `SKILL_GROUPS` | The Languages / Frameworks / Data / Infrastructure chips |
| `EXPERIENCES` | The Experience ledger |
| `PROJECTS` | The Work cards (first entry renders as the full-width feature) |
| `EDUCATIONS` | The Education rows |

Each `Experience` and `Project` carries an `ownership` tag (`LEAD`, `SOLE`,
`SOLO`, `BACKEND`) and a one-line `outcome`; `metric` / `metricLabel` are
optional and render as the large figure on the card.

Run `npm run typecheck` after editing — the interfaces at the top of the file
will catch a mistyped or missing field before it reaches CI.

## Design tokens

Colours, both themes, live as CSS custom properties in
`src/app/globals.css` and are exposed to Tailwind (`bg-bg`, `text-fg2`,
`border-line`, `text-accent`, …) via `tailwind.config.ts`. Changing the accent
is a one-line edit in each of the two `:root` blocks.

## Dependencies

| Package | Purpose |
|---|---|
| `next`, `react`, `react-dom` | Framework |
| `tailwindcss`, `postcss` | Styling |
| `lucide-react` | Icons |
| `typescript`, `eslint` | Tooling |
