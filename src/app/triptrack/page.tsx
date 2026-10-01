import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Footer from "@/components/ui/Footer";
import { MY_DETAILS } from "@/data/portfolio";

const VERSION = "1.0.0 (build 8)";

// Files live in public/triptrack/. Keep names stable so shared links never
// break when a new build replaces the file.
const BUILDS = [
  {
    abi: "arm64-v8a",
    heading: "Most phones",
    note: "Any phone from roughly 2017 onward. Pick this one if unsure.",
    href: "/triptrack/TripTrack-arm64-v8a.apk",
    size: "31.2 MB",
    sha256: "943de63d6857c48fca15af6260414cc5b3cb4046c682e0a8e1126802a6d8de31",
    primary: true,
  },
  {
    abi: "armeabi-v7a",
    heading: "Older phones",
    note: "32-bit devices. Use only if the other build says it can't be installed.",
    href: "/triptrack/TripTrack-armeabi-v7a.apk",
    size: "26.1 MB",
    sha256: "adf7b9d410c2a56b69e9a721a79b69ff9864129c797d4a99e2316fe97b3f0c3a",
    primary: false,
  },
] as const;

const STEPS = [
  "Tap a download button above. Your browser may ask to confirm keeping an APK file — choose Keep / Download anyway.",
  "Open the downloaded file. If Android says installs from this source are blocked, tap Settings and allow your browser to install apps, then go back.",
  "Tap Install. If Play Protect shows a warning, tap More details → Install anyway.",
];

const WARNINGS = [
  {
    q: "“This type of file can harm your device”",
    a: "Chrome shows this for every APK downloaded outside the Play Store. It is a generic notice about the file type, not a scan result.",
  },
  {
    q: "“Blocked by Play Protect” / “Unknown developer”",
    a: "The app is signed by me, not published through Google Play, so Play Protect has no record of it. Choose More details → Install anyway.",
  },
  {
    q: "“App not installed”",
    a: "Usually the wrong build for your phone. Try the other download. If an older copy of TripTrack signed differently is installed, uninstall it first.",
  },
];

export const metadata: Metadata = {
  title: "TripTrack for Android",
  description: `Download TripTrack ${VERSION} for Android — direct APK, no sign-in.`,
  alternates: { canonical: "/triptrack/" },
  openGraph: {
    type: "website",
    url: "https://imrankabir02.github.io/triptrack/",
    title: "TripTrack for Android",
    description: "Direct APK download. Built by Mridha Imran Kabir.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

export default function TripTrackPage() {
  return (
    <>
      <header className="border-b border-line">
        <nav className="shell flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="font-serif text-xl font-medium tracking-tight text-fg transition-colors hover:text-accent"
          >
            Imran Kabir<span className="text-accent">.</span>
          </Link>
          <div className="flex items-center gap-6">
            <ul className="hidden items-center gap-6 sm:flex">
              {[
                ["About", "/#about"],
                ["Work", "/#work"],
                ["Contact", "/#contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="label text-fg3 transition-colors hover:text-fg"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main className="shell py-section">
        <div className="flex items-center gap-4">
          <span className="label text-accent">App</span>
          <span className="label text-fg3">Android · v{VERSION}</span>
          <span className="rule flex-1" />
        </div>

        <div className="mt-8 flex items-center gap-5">
          <div
            aria-hidden
            className="grid h-16 w-16 shrink-0 place-items-center bg-accent font-serif text-3xl font-medium text-bg"
          >
            T
          </div>
          <h1 className="font-serif text-h1 font-medium">TripTrack</h1>
        </div>

        <p className="mt-6 max-w-prose2 text-pretty font-serif text-deck italic text-fg2">
          An Android app by {MY_DETAILS.name}. Download the APK directly — no
          account, no store.
        </p>

        <section aria-labelledby="download" className="mt-14">
          <h2 id="download" className="label text-fg3">
            Download
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {BUILDS.map((b) => (
              <div key={b.abi} className="border border-line bg-elev p-6">
                <p className="label text-fg3">{b.abi}</p>
                <h3 className="mt-3 font-serif text-h3 font-medium">
                  {b.heading}
                </h3>
                <p className="mt-2 text-sm text-fg2">{b.note}</p>
                <a
                  href={b.href}
                  download
                  className={`${b.primary ? "btn-primary" : "btn-ghost"} mt-6 w-full justify-center`}
                >
                  <Download className="h-4 w-4" strokeWidth={1.6} />
                  Download · {b.size}
                </a>
                <p className="mt-4 break-all font-mono text-xs text-fg3">
                  SHA-256 {b.sha256}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-16 grid gap-14 lg:grid-cols-2">
          <section aria-labelledby="install">
            <h2 id="install" className="font-serif text-h3 font-medium">
              Install in three steps
            </h2>
            <ol className="mt-6 space-y-5">
              {STEPS.map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span className="label tnum mt-1 text-accent">
                    0{i + 1}
                  </span>
                  <p className="text-base text-fg2">{s}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="warnings">
            <h2 id="warnings" className="font-serif text-h3 font-medium">
              If Android warns you
            </h2>
            <dl className="mt-6 space-y-5">
              {WARNINGS.map((w) => (
                <div key={w.q} className="border-l-2 border-accent pl-4">
                  <dt className="font-medium text-fg">{w.q}</dt>
                  <dd className="mt-1 text-sm text-fg2">{w.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <div className="mt-16 flex items-center gap-4 border-t border-line pt-8">
          <p className="text-sm text-fg2">
            Made by {MY_DETAILS.name}.{" "}
            <Link
              href="/"
              className="text-accent underline underline-offset-4 hover:text-fg"
            >
              View portfolio →
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
