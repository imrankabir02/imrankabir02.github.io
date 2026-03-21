import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Imran Kabir | Backend Software Engineer",
  description:
    "Mid-level backend software engineer specializing in scalable APIs, microservices, and cloud-native systems.",
  keywords: [
    "backend engineer",
    "software engineer",
    "Python",
    "Go",
    "Django",
    "FastAPI",
    "Node.js",
    "microservices",
    "REST API",
    "GraphQL",
  ],
  authors: [{ name: "Imran Kabir" }],
  openGraph: {
    title: "Imran Kabir | Backend Software Engineer",
    description:
      "Mid-level backend software engineer specializing in scalable APIs, microservices, and cloud-native systems.",
    type: "website",
    url: "https://testtracker.me",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imran Kabir | Backend Software Engineer",
    description:
      "Mid-level backend software engineer specializing in scalable APIs, microservices, and cloud-native systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1e1e2e",
              color: "#e2e8f0",
              border: "1px solid #374151",
            },
          }}
        />
      </body>
    </html>
  );
}

