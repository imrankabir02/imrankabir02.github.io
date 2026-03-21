"use client";

import { useState } from "react";
import { PortfolioData } from "@/types/portfolio";
import { signOutAdmin } from "@/lib/supabase";
import AuthGate from "@/components/admin/AuthGate";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);

  const handleLogout = async () => {
    await signOutAdmin();
    setPortfolioData(null);
  };

  if (!portfolioData) {
    return <AuthGate onAuthenticated={(data) => setPortfolioData(data)} />;
  }

  return (
    <AdminDashboard
      initialData={portfolioData}
      onLogout={handleLogout}
    />
  );
}
