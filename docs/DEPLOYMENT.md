# Deployment & CI/CD Guide

This portfolio uses **GitHub Actions** to automatically build and deploy to **GitHub Pages** whenever you push to the `main` branch.

## Architecture

```
Push to main branch
        │
        ▼
GitHub Actions (deploy.yml)
        │
        ├── npm ci (install deps)
        ├── npm run build (Next.js static export → /out)
        └── actions/deploy-pages@v4
                │
                ▼
        GitHub Pages (custom domain: testtracker.me)
```

## GitHub Pages Setup

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings → Pages**
3. Under **Source**, select **GitHub Actions**
4. Save

### 2. Configure Custom Domain (optional)

The `CNAME` file in the repository root already contains `testtracker.me`.

If you want to use a different domain:
1. Update the `CNAME` file with your domain
2. In your DNS provider, add:
   - An **A record** pointing to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or a **CNAME record** pointing to `imrankabir02.github.io`

### 3. Verify Deployment

After pushing to `main`:
1. Go to **Actions** tab in your repository
2. You'll see the "Deploy Portfolio to GitHub Pages" workflow running
3. Green check = deployed successfully
4. Red X = check logs for errors

## CI/CD Workflow Details

The workflow file lives at `.github/workflows/deploy.yml`:

```yaml
name: Deploy Portfolio to GitHub Pages

on:
  push:
    branches: [main]       # Triggers on every push to main
  workflow_dispatch:        # Also allows manual trigger

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js 20
      - npm ci              # Clean install (faster, deterministic)
      - npm run build       # Next.js static export → /out directory
      - Add .nojekyll       # Prevents GitHub Pages from processing with Jekyll
      - Upload artifact

  deploy:
    needs: build
    environment: github-pages
    steps:
      - Deploy to GitHub Pages
```

## How Data Updates Trigger Redeployment

When you edit content:
1. Changes are committed to `src/data/portfolio.ts` in the `main` branch
2. The push to `main` triggers the GitHub Actions workflow
3. The workflow rebuilds the static site with the new data
4. The updated site deploys to GitHub Pages (~2-3 min total)

This is the key to the "dynamic" portfolio — the data file drives the content, and any commit to `main` triggers a full rebuild and deploy.

## Manual Deployment (Local)

You can also build and inspect the static output locally:

```bash
npm run build
# Static files are now in /out directory

# Serve locally for inspection
npx serve out
```

## Environment Variables

No environment variables are required for the basic build. The portfolio data is loaded from the static JSON file.

For advanced configurations (e.g., analytics), you can add variables to `.env.local`:

```bash
# Optional: Override the base URL for sitemap generation
NEXT_PUBLIC_SITE_URL=https://testtracker.me
```

## Troubleshooting Deployments

| Issue | Solution |
|---|---|
| Build fails: "Module not found" | Run `npm ci` locally to ensure all deps are installed |
| 404 on subpages | Ensure `trailingSlash: true` is set in `next.config.mjs` |
| Custom domain not working | Check DNS propagation (can take up to 48h) |
| Site shows old content | Wait for CDN cache to clear (GitHub Pages caches ~10 min) |
| Workflow not triggering | Ensure you're pushing to `main`, not another branch |

## Build Optimization

The static export produces:
- `out/` directory with all HTML, CSS, JS assets
- Zero server-side code — pure static hosting
