# Admin Panel Guide

The portfolio includes a browser-based admin panel that allows you to update all portfolio data **without touching code**. Changes are committed directly to the GitHub repository via the GitHub API, which triggers an automatic redeploy.

## Accessing the Admin Panel

Navigate to: `https://testtracker.me/admin/` (or `http://localhost:3000/admin/` locally)

## Authentication

The admin panel uses a **GitHub Personal Access Token (PAT)** for authentication. Your token is:
- **Never sent to any server** — it stays in your browser's memory
- **Never stored** — it's cleared when you close the browser tab
- Used **directly with the GitHub REST API** from your browser

### Creating a GitHub Personal Access Token

1. Go to [GitHub Settings → Tokens](https://github.com/settings/tokens/new?scopes=repo&description=Portfolio+Admin)
2. Give it a descriptive name: `Portfolio Admin`
3. Select scopes: check **`repo`** (or at minimum `contents:write`)
4. Set expiration (90 days recommended)
5. Click **Generate token**
6. Copy the token (you won't see it again!)

> **Tip**: Use a fine-grained token scoped to only your portfolio repository for better security.

## Using the Admin Panel

### Step 1: Sign In

1. Enter your GitHub username (repository owner)
2. Enter the repository name (default: `imrankabir02.github.io`)
3. Paste your Personal Access Token
4. Click **Sign In**

The panel fetches the current `portfolio.json` from GitHub and loads it into the editor.

### Step 2: Edit Content

The sidebar has sections for each part of the portfolio:

| Section | What you can edit |
|---|---|
| **Hero** | Name, title, tagline, resume URL, avatar, social links |
| **About** | Bio, location, years of experience, highlights list |
| **Skills** | Add/remove/edit skills with category and proficiency level |
| **Experience** | Add/edit/remove work experience with responsibilities and tech stack |
| **Projects** | Add/edit/remove projects with links and tags |
| **Contact** | Email, message, availability status |

### Step 3: Save & Deploy

Click **Save & Deploy** in the top bar. This will:

1. Validate and serialize all your changes
2. Commit the updated `portfolio.json` to the `main` branch via the GitHub API
3. GitHub Actions automatically detects the new commit
4. The CI/CD pipeline builds and deploys the updated site (takes ~2-3 minutes)

You'll see a success toast notification when the save is complete. Refresh your portfolio after a few minutes to see the changes live.

## Editing Skills

- **Category filter** buttons on the Skills section let you view/filter by category
- Drag the range slider to set skill proficiency (1–100%)
- Add new skills with the **+ Add Skill** button
- Click the trash icon to remove a skill

## Editing Experience

- Click any experience card to expand it for editing
- Toggle **Current position** to mark an ongoing role (hides end date)
- Tech stack is entered as a comma-separated list

## Editing Projects

- Toggle **Featured project** to mark a project with a star (appears first)
- Tags are entered as a comma-separated list
- Leave GitHub/Live URL empty to hide those links

## Troubleshooting

| Issue | Solution |
|---|---|
| "Invalid token" error | Ensure the token has `contents:write` scope for the repo |
| "Save failed" error | Check if you have write access to the repository |
| Changes not visible after save | Wait 3-5 minutes for GitHub Actions to rebuild and deploy |
| Admin panel blank | Clear browser cache and reload |
