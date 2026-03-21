# Local Development Setup

## Prerequisites

- **Node.js** 18+ (20 recommended)
- **npm** 9+
- A modern browser

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/imrankabir02/imrankabir02.github.io.git
cd imrankabir02.github.io

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.  
Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin panel.

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production static export to `/out` |
| `npm run start` | Start production server (after build) |
| `npm run lint` | Run ESLint |

## Customizing Portfolio Data

All portfolio content lives in `public/data/portfolio.json`.  
Edit this file directly for quick changes, or use the Admin Panel for a GUI approach.

### Data Structure

```json
{
  "hero": {
    "name": "Your Name",
    "title": "Your Title",
    "tagline": "Your tagline",
    "resumeUrl": "https://...",
    "avatarUrl": "https://...",
    "socialLinks": {
      "github": "https://github.com/username",
      "linkedin": "https://linkedin.com/in/username",
      "twitter": "@handle",
      "email": "you@example.com"
    }
  },
  "about": { ... },
  "skills": { ... },
  "experiences": [ ... ],
  "projects": [ ... ],
  "contact": { ... }
}
```

## Project Dependencies

| Package | Purpose |
|---|---|
| `next` | React framework with static export |
| `react` / `react-dom` | UI library |
| `typescript` | Type safety |
| `tailwindcss` | Utility-first CSS |
| `lucide-react` | Icon library |
| `framer-motion` | Animations |
| `@octokit/rest` | GitHub API client (admin panel) |
| `react-hot-toast` | Toast notifications |
