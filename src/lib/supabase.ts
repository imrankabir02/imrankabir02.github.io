import { createClient } from "@supabase/supabase-js";
import { PortfolioData } from "@/types/portfolio";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function fetchPortfolioData(): Promise<PortfolioData | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("portfolio_data")
    .select("data")
    .eq("id", 1)
    .single();
  if (error || !data) return null;
  return data.data as PortfolioData;
}

export async function savePortfolioData(portfolioData: PortfolioData): Promise<void> {
  if (!supabase) throw new Error("Supabase is not configured");
  const { error } = await supabase.from("portfolio_data").upsert({
    id: 1,
    data: {
      ...portfolioData,
      meta: {
        ...portfolioData.meta,
        lastUpdated: new Date().toISOString(),
      },
    },
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
}

export async function signInAdmin(email: string, password: string) {
  if (!supabase) throw new Error("Supabase is not configured");
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data;
}

export async function signOutAdmin() {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function getAdminSession() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}
