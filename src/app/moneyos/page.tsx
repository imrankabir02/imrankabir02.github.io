import type { Metadata } from "next";
import Link from "next/link";
import AppPageHeader from "@/components/ui/AppPageHeader";
import Footer from "@/components/ui/Footer";
import { MY_DETAILS } from "@/data/portfolio";

const FEATURES = [
  "Accounts for cash, bank, cards and mobile wallets, with running balances",
  "Income and expenses in seconds — type or say “tea 20 cash”",
  "Budgets, bills and repeats, savings goals, money lent and borrowed",
  "Read your bKash and bank messages and confirm each as a transaction",
  "Split a bill with friends and track who owes you",
  "Match an account to what you really have, when a hand-kept ledger drifts",
  "Encrypted backups: a passphrase-locked file you can keep anywhere, or your own Google Drive",
  "English and বাংলা",
];

export const metadata: Metadata = {
  title: "MoneyOS — Know your money",
  description:
    "MoneyOS is an offline-first personal finance app for Android: accounts, spending, budgets, bills and encrypted backups, in English and Bangla.",
  alternates: { canonical: "/moneyos/" },
  openGraph: {
    type: "website",
    url: "https://imrankabir02.github.io/moneyos/",
    title: "MoneyOS — Know your money",
    description: "An offline-first personal finance app. Built by Mridha Imran Kabir.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

export default function MoneyOSPage() {
  return (
    <>
      <AppPageHeader />

      <main className="shell py-section">
        <div className="flex items-center gap-4">
          <span className="label text-accent">App</span>
          <span className="label text-fg3">Android</span>
          <span className="rule flex-1" />
        </div>

        <div className="mt-8 flex items-center gap-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/moneyos/logo.png"
            alt="MoneyOS logo"
            width={64}
            height={64}
            className="h-16 w-16 shrink-0 rounded-[22%]"
          />
          <h1 className="font-serif text-h1 font-medium">MoneyOS</h1>
        </div>

        <p className="mt-6 max-w-prose2 text-pretty font-serif text-deck italic text-fg2">
          Know your money. A personal finance app that keeps your records on your
          phone — no account, no ads, no tracking, no server.
        </p>

        <section aria-labelledby="features" className="mt-14">
          <h2 id="features" className="label text-fg3">
            What it does
          </h2>
          <ul className="mt-5 max-w-prose2 space-y-3">
            {FEATURES.map((f) => (
              <li key={f} className="flex gap-4">
                <span className="label mt-1 text-accent">—</span>
                <span className="text-base text-fg2">{f}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-8">
          <Link
            href="/moneyos/privacy/"
            className="text-accent underline underline-offset-4 hover:text-fg"
          >
            Privacy policy
          </Link>
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
