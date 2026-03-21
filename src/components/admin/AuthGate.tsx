"use client";

import { useState } from "react";
import Link from "next/link";
import { PortfolioData } from "@/types/portfolio";
import { signInAdmin, fetchPortfolioData, isSupabaseConfigured } from "@/lib/supabase";
import { Shield, Mail, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface AuthGateProps {
  onAuthenticated: (data: PortfolioData) => void;
}

export default function AuthGate({ onAuthenticated }: AuthGateProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }
    if (!isSupabaseConfigured) {
      setError(
        "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment."
      );
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await signInAdmin(email.trim(), password);
      const portfolioData = await fetchPortfolioData();
      if (!portfolioData) {
        setError(
          "No portfolio data found in Supabase. Run the schema.sql seed first."
        );
        setLoading(false);
        return;
      }
      toast.success("Authenticated successfully!");
      onAuthenticated(portfolioData);
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
            Sign in with your Supabase admin account to manage portfolio data
          </p>
        </div>

        <form onSubmit={handleLogin} className="card-glass p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              <Mail className="w-3.5 h-3.5 inline mr-1 text-indigo-400" />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="admin@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="••••••••"
              autoComplete="current-password"
            />
            <p className="text-xs text-slate-500 mt-1">
              Create your admin user in the{" "}
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline"
              >
                Supabase dashboard →
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
                Signing in...
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
            <strong className="text-yellow-400">Setup required:</strong> Add{" "}
            <code className="text-indigo-400">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code className="text-indigo-400">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to your
            environment, then run <code className="text-indigo-400">supabase/schema.sql</code> in
            the Supabase SQL editor.
          </p>
        </div>

        <p className="text-center mt-6 text-sm text-slate-500">
          <Link href="/" className="text-indigo-400 hover:underline">← Back to portfolio</Link>
        </p>
      </div>
    </div>
  );
}
