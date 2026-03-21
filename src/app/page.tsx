"use client";

import { useState, useEffect } from "react";
import staticPortfolioData from "../../public/data/portfolio.json";
import { PortfolioData } from "@/types/portfolio";
import { fetchPortfolioData } from "@/lib/supabase";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [data, setData] = useState<PortfolioData>(staticPortfolioData as PortfolioData);

  useEffect(() => {
    fetchPortfolioData()
      .then((supabaseData) => {
        if (supabaseData) setData(supabaseData);
      })
      .catch(() => {
        // Supabase unavailable – keep the static fallback data already in state
      });
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-slate-100">
      <Navbar />
      <Hero data={data.hero} />
      <About data={data.about} />
      <Skills data={data.skills} />
      <Experience data={data.experiences} />
      <Projects data={data.projects} />
      <Contact data={data.contact} />
      <Footer hero={data.hero} />
    </main>
  );
}
