import type { Metadata } from "next";
import Link from "next/link";
import AppPageHeader from "@/components/ui/AppPageHeader";
import Footer from "@/components/ui/Footer";
import { MY_DETAILS } from "@/data/portfolio";

const UPDATED = "1 November 2026";

type Section = { heading: string; body: React.ReactNode };

const SECTIONS: Section[] = [
  {
    heading: "What we collect",
    body: (
      <p>
        Nothing. The app has no analytics, no advertising SDKs, no crash
        reporting and no server of its own. Transactions, accounts, categories
        and budgets are stored in a local database in the app&apos;s private
        storage on your phone. The developer never receives them.
      </p>
    ),
  },
  {
    heading: "Backup files",
    body: (
      <p>
        You can save a backup as a file, locked with a passphrase you choose,
        and send it wherever you like. The passphrase is never stored or sent
        anywhere, and it cannot be recovered: without it the file cannot be
        opened by anyone.
      </p>
    ),
  },
  {
    heading: "Google Drive backups",
    body: (
      <>
        <p>
          If you sign in with Google and create a backup, an encrypted copy of
          your data is uploaded to your own Google Drive account, in a folder the
          app creates, and a small encryption key is kept in the app&apos;s
          hidden application-data area of your Drive so a new phone can read your
          backups. The app asks only for the Drive scopes it needs (
          <code className="font-mono text-sm">drive.file</code> and{" "}
          <code className="font-mono text-sm">drive.appdata</code>): it can see
          files it created, and nothing else in your Drive. The developer has no
          access to your Drive or your backups. You can delete a backup at any
          time from the app or from Drive directly, and revoke the app&apos;s
          access in your Google Account settings.
        </p>
        <p className="mt-3">
          MoneyOS&apos;s use and transfer of information received from Google
          APIs adheres to the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            className="text-accent underline underline-offset-4 hover:text-fg"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements. The information is used only
          to store and restore your backups for you; it is not used for
          advertising, not sold, and not shared with anyone.
        </p>
      </>
    ),
  },
  {
    heading: "Encryption",
    body: (
      <p>
        Drive backups are encrypted with AES-256 before they leave the device.
        The key is generated on the device and held in the platform secure
        storage (Android Keystore). Backup files use a key derived from your
        passphrase instead.
      </p>
    ),
  },
  {
    heading: "Device permissions",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Camera:</strong> only to photograph a receipt you choose to
          attach. Photos are picked with the system photo picker, so the app
          cannot see your gallery.
        </li>
        <li>
          <strong>Microphone:</strong> only while voice entry is listening, to
          turn what you say into text (see below).
        </li>
        <li>
          <strong>Biometrics:</strong> only to unlock the app, if you turn app
          lock on.
        </li>
        <li>
          <strong>Notifications:</strong> only for the budget, bill and daily
          reminders you enable.
        </li>
        <li>
          <strong>Internet:</strong> only for Google Drive backup, if you use it.
        </li>
      </ul>
    ),
  },
  {
    heading: "Voice entry",
    body: (
      <p>
        When you use voice entry, your phone&apos;s own speech-recognition
        service turns speech into text. Depending on your phone and language,
        that service may send the audio to its maker (Google on Android), as it
        does for any voice typing. MoneyOS does not record or keep audio.
      </p>
    ),
  },
  {
    heading: "Messages you paste",
    body: (
      <p>
        Bank and bKash messages you paste are read on your device to suggest a
        transaction. They are not sent anywhere, one-time passwords are ignored,
        and only the transaction you confirm is kept.
      </p>
    ),
  },
  {
    heading: "Deleting your data",
    body: (
      <p>
        Uninstalling the app removes its local database. Backup files you saved,
        and backups in your Google Drive, remain until you delete them.
      </p>
    ),
  },
  {
    heading: "Children",
    body: (
      <p>
        MoneyOS is a general personal-finance tool and is not directed at
        children.
      </p>
    ),
  },
  {
    heading: "Changes",
    body: (
      <p>
        If this policy changes, the new version will be posted here with a new
        date.
      </p>
    ),
  },
];

export const metadata: Metadata = {
  title: "MoneyOS Privacy Policy",
  description:
    "What the MoneyOS app collects (nothing), how backups work, and which permissions it uses.",
  alternates: { canonical: "/moneyos/privacy/" },
  openGraph: {
    type: "article",
    url: "https://imrankabir02.github.io/moneyos/privacy/",
    title: "MoneyOS Privacy Policy",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

export default function MoneyOSPrivacyPage() {
  return (
    <>
      <AppPageHeader />

      <main className="shell py-section">
        <div className="flex items-center gap-4">
          <span className="label text-accent">MoneyOS</span>
          <span className="label text-fg3">Privacy policy</span>
          <span className="rule flex-1" />
        </div>

        <h1 className="mt-8 font-serif text-h1 font-medium">Privacy policy</h1>
        <p className="mt-3 label text-fg3">Last updated {UPDATED}</p>

        <p className="mt-6 max-w-prose2 text-pretty font-serif text-deck italic text-fg2">
          MoneyOS is an offline-first personal finance app. Your financial
          records stay on your device unless you choose to save a backup file or
          back them up to your own Google Drive.
        </p>

        <div className="mt-12 max-w-prose2 space-y-10">
          {SECTIONS.map((s) => (
            <section key={s.heading}>
              <h2 className="font-serif text-h3 font-medium">{s.heading}</h2>
              <div className="mt-3 text-base text-fg2">{s.body}</div>
            </section>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-8">
          <p className="text-sm text-fg2">
            Questions:{" "}
            <a
              href={`mailto:${MY_DETAILS.email}`}
              className="text-accent underline underline-offset-4 hover:text-fg"
            >
              {MY_DETAILS.email}
            </a>
          </p>
          <Link
            href="/moneyos/"
            className="text-sm text-accent underline underline-offset-4 hover:text-fg"
          >
            ← About MoneyOS
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
