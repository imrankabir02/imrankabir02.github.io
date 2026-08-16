import { MY_DETAILS } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="shell flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="font-mono text-label tracking-tight text-fg3">
          © {new Date().getFullYear()} {MY_DETAILS.name} · {MY_DETAILS.address}
        </p>
        <p className="font-mono text-label tracking-tight text-fg3">
          Next.js · Tailwind · static export, deployed on push
        </p>
      </div>
    </footer>
  );
}
