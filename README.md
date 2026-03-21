# Imran Kabir — Portfolio Website

A modern, dynamic portfolio for a mid-level backend software engineer. Built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**, deployed automatically to **GitHub Pages** via **GitHub Actions CI/CD**.

## ✨ Features

| Feature | Details |
|---|---|
| **Modern Stack** | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| **Dynamic Data** | All portfolio content driven from `public/data/portfolio.json` |
| **Admin Panel** | Browser-based admin at `/admin/` — updates data via GitHub API |
| **CI/CD** | Auto-deploy to GitHub Pages on every push to `main` |
| **Static Export** | Pre-rendered static HTML for performance & GitHub Pages compatibility |
| **Responsive** | Mobile-first design across all sections |
| **Dark Theme** | Sleek dark color scheme with indigo/teal accents |

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router, static export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion ready
- **GitHub Integration**: GitHub REST API (admin panel)
- **Notifications**: React Hot Toast
- **CI/CD**: GitHub Actions
- **Hosting**: GitHub Pages

## 📁 Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD: auto-deploy on push to main
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Portfolio home page
│   │   ├── globals.css         # Global styles
│   │   └── admin/
│   │       └── page.tsx        # Admin panel page
│   ├── components/
│   │   ├── sections/           # Portfolio sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── Contact.tsx
│   │   ├── ui/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── admin/
│   │       ├── AuthGate.tsx
│   │       └── AdminDashboard.tsx
│   ├── lib/
│   │   ├── utils.ts
│   │   └── github-api.ts
│   └── types/
│       └── portfolio.ts
├── public/
│   └── data/
│       └── portfolio.json      # All portfolio content lives here
├── docs/
│   ├── SETUP.md
│   ├── ADMIN.md
│   └── DEPLOYMENT.md
├── next.config.mjs
├── tailwind.config.ts
└── package.json
```

## 🚀 Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

See [docs/SETUP.md](docs/SETUP.md) for full setup guide.

## 🔧 Updating Portfolio Content

Visit `/admin/` on your live site with a GitHub token. See [docs/ADMIN.md](docs/ADMIN.md).

## 🚢 Deployment

Automatic via GitHub Actions. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## 📄 License

MIT
