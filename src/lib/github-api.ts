import { PortfolioData } from "@/types/portfolio";

const GITHUB_API_BASE = "https://api.github.com";

export interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
  filePath: string;
}

export function getDefaultConfig(): GitHubConfig {
  return {
    token: "",
    owner: "imrankabir02",
    repo: "imrankabir02.github.io",
    filePath: "public/data/portfolio.json",
  };
}

export async function fetchFileFromGitHub(config: GitHubConfig): Promise<{
  content: PortfolioData;
  sha: string;
}> {
  const url = `${GITHUB_API_BASE}/repos/${config.owner}/${config.repo}/contents/${config.filePath}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${config.token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(
      err.message || `GitHub API error: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  const content = JSON.parse(atob(data.content.replace(/\n/g, "")));
  return { content, sha: data.sha };
}

export async function saveFileToGitHub(
  config: GitHubConfig,
  data: PortfolioData,
  sha: string
): Promise<void> {
  const url = `${GITHUB_API_BASE}/repos/${config.owner}/${config.repo}/contents/${config.filePath}`;
  const updatedData: PortfolioData = {
    ...data,
    meta: {
      ...data.meta,
      lastUpdated: new Date().toISOString(),
    },
  };

  const contentB64 = btoa(
    unescape(encodeURIComponent(JSON.stringify(updatedData, null, 2)))
  );

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${config.token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `chore: update portfolio data via admin panel [${new Date().toISOString()}]`,
      content: contentB64,
      sha,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(
      err.message || `GitHub API error: ${response.status} ${response.statusText}`
    );
  }
}

export async function validateGitHubToken(
  config: GitHubConfig
): Promise<boolean> {
  try {
    const url = `${GITHUB_API_BASE}/repos/${config.owner}/${config.repo}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${config.token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });
    return response.ok;
  } catch {
    return false;
  }
}
