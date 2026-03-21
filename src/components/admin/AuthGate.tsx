"use client";

import { useState } from "react";
import Link from "next/link";
import { PortfolioData } from "@/types/portfolio";
import { GitHubConfig, validateGitHubToken, fetchFileFromGitHub } from "@/lib/github-api";
import { Shield, Key, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface AuthGateProps {
  onAuthenticated: (config: GitHubConfig, data: PortfolioData, sha: string) => void;
}

export default function AuthGate({ onAuthenticated }: AuthGateProps) {
  const [token, setToken] = useState("");
  const [owner, setOwner] = useState("imrankabir02");
  const [repo, setRepo] = useState("imrankabir02.github.io");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      setError("GitHub token is required");
      return;
    }
    setLoading(true);
    setError(null);

    const config: GitHubConfig = {
      token: token.trim(),
      owner: owner.trim(),
      repo: repo.trim(),
      filePath: "public/data/portfolio.json",
    };

    try {
      const valid = await validateGitHubToken(config);
      if (!valid) {
        setError("Invalid token or you don't have access to this repository.");
        setLoading(false);
        return;
      }

      const { content, sha } = await fetchFileFromGitHub(config);
      toast.success("Authenticated successfully!");
      onAuthenticated(config, content, sha);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500/10 border border-indigo-500/30 rounded-full mb-4">
            <Shield className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-slate-400 text-sm">
            Enter your GitHub Personal Access Token to manage portfolio data
          </p>
        </div>

        <form onSubmit={handleLogin} className="card-glass p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Repository Owner
            </label>
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="your-github-username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Repository Name
            </label>
            <input
              type="text"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="username.github.io"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              <Key className="w-3.5 h-3.5 inline mr-1 text-indigo-400" />
              GitHub Personal Access Token
            </label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors font-mono"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              autoComplete="off"
            />
            <p className="text-xs text-slate-500 mt-1">
              Requires <code className="text-indigo-400">contents:write</code> permission.{" "}
              <a
                href="https://github.com/settings/tokens/new?scopes=repo&description=Portfolio+Admin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline"
              >
                Create token →
              </a>
            </p>
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="mt-4 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
          <p className="text-xs text-yellow-500/80">
            <strong className="text-yellow-400">Security note:</strong> Your token is never
            stored on any server. It lives only in your browser&apos;s memory for this session
            and is used directly with the GitHub API.
          </p>
        </div>

        <p className="text-center mt-6 text-sm text-slate-500">
          <Link href="/" className="text-indigo-400 hover:underline">← Back to portfolio</Link>
        </p>
      </div>
    </div>
  );
}
