import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { MY_DETAILS } from "@/data/portfolio";

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const SITE_URL = "https://testtracker.me";
const DESCRIPTION =
  "Backend engineer working in Django, Laravel, and FastAPI — multi-tenant data isolation, background jobs that survive bad input, query optimisation, and the deployments underneath them.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${MY_DETAILS.name} — ${MY_DETAILS.title}`,
    template: `%s · ${MY_DETAILS.name}`,
  },
  description: DESCRIPTION,
  keywords: [
    "backend engineer",
    "Django",
    "FastAPI",
    "Laravel",
    "PostgreSQL",
    "Celery",
    "multi-tenant",
    "Row-Level Security",
    "Bangladesh",
  ],
  authors: [{ name: MY_DETAILS.name, url: SITE_URL }],
  creator: MY_DETAILS.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: MY_DETAILS.name,
    title: `${MY_DETAILS.name} — ${MY_DETAILS.title}`,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${MY_DETAILS.name} — ${MY_DETAILS.title}`,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

// Runs before paint so the stored theme is applied without a flash.
const BOOT = `(function(){document.documentElement.classList.add("js");try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: MY_DETAILS.name,
  jobTitle: MY_DETAILS.title,
  email: `mailto:${MY_DETAILS.email}`,
  url: SITE_URL,
  sameAs: [MY_DETAILS.github],
  worksFor: { "@type": "Organization", name: MY_DETAILS.company },
  address: { "@type": "PostalAddress", addressLocality: MY_DETAILS.address },
  knowsAbout: ["Django", "FastAPI", "Laravel", "PostgreSQL", "Celery", "Docker"],
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0b0d" },
    { media: "(prefers-color-scheme: light)", color: "#fbfaf8" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body
        className={`${sans.variable} ${mono.variable} bg-bg font-sans text-fg antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
