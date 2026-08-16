import { cn } from "@/lib/utils";

// LEAD / SOLE / SOLO are the claims worth emphasising; BACKEND stays neutral
// so the strong ones actually read as strong.
const EMPHASISED = new Set(["LEAD", "SOLE", "SOLO"]);

export function OwnershipBadge({ ownership }: { ownership: string }) {
  const strong = EMPHASISED.has(ownership.toUpperCase());
  return (
    <span
      className={cn(
        "label inline-flex items-center rounded px-1.5 py-1",
        strong
          ? "bg-accent-soft text-accent"
          : "border border-line text-fg3",
      )}
    >
      {ownership}
    </span>
  );
}

const LIVE = new Set(["in production", "live"]);

export function StatusBadge({ status }: { status: string }) {
  const live = LIVE.has(status.toLowerCase());
  return (
    <span className="label inline-flex items-center gap-1.5 text-fg3">
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          live ? "bg-ok" : "bg-fg3",
        )}
      />
      {status}
    </span>
  );
}

export function Metric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="text-right">
      <div className="tnum font-mono text-metric font-medium text-fg">
        {value}
      </div>
      <div className="label mt-1.5 text-fg3">{label}</div>
    </div>
  );
}
