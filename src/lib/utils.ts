type ClassValue = string | number | boolean | null | undefined;

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(" ");
}

function parseDateStr(dateStr: string): Date {
  // Support both YYYY-MM and YYYY-MM-DD formats
  const normalized = dateStr.length === 7 ? dateStr + "-01" : dateStr;
  return new Date(normalized);
}

export function formatDate(dateStr: string): string {
  const date = parseDateStr(dateStr);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

export function getDuration(startDate: string, endDate?: string | null): string {
  const start = parseDateStr(startDate);
  const end = endDate ? parseDateStr(endDate) : new Date();
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) return `${remainingMonths} mo`;
  if (remainingMonths === 0) return `${years} yr${years > 1 ? "s" : ""}`;
  return `${years} yr${years > 1 ? "s" : ""} ${remainingMonths} mo`;
}
