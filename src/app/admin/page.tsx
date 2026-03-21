"use client";

import { useState } from "react";
import { PortfolioData } from "@/types/portfolio";
import { GitHubConfig } from "@/lib/github-api";
import AuthGate from "@/components/admin/AuthGate";
import AdminDashboard from "@/components/admin/AdminDashboard";

interface AuthState {
  config: GitHubConfig;
  data: PortfolioData;
  sha: string;
}

export default function AdminPage() {
  const [authState, setAuthState] = useState<AuthState | null>(null);

  if (!authState) {
    return (
      <AuthGate
        onAuthenticated={(config, data, sha) =>
          setAuthState({ config, data, sha })
        }
      />
    );
  }

  return (
    <AdminDashboard
      config={authState.config}
      initialData={authState.data}
      initialSha={authState.sha}
      onLogout={() => setAuthState(null)}
    />
  );
}
