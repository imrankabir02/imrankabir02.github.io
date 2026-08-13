type ClassValue = string | number | false | null | undefined;

/** Tiny classnames joiner — enough for conditional Tailwind, no dependency. */
export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(" ");
}
