/**
 * The page is a request travelling down a system stack: each section is one
 * hop, and the 3D scene, the side rail and the section heads all read from
 * this list so they can never disagree about where the reader is.
 */
export interface Hop {
  id: string;
  name: string;
  detail: string;
  gate?: boolean;
  ok?: boolean;
}

export const HOPS: Hop[] = [
  { id: "top", name: "Edge", detail: "nginx · tls" },
  { id: "about", name: "API", detail: "fastapi · django" },
  { id: "skills", name: "Services", detail: "domain logic" },
  { id: "experience", name: "Queue", detail: "celery · workers" },
  { id: "work", name: "RLS gate", detail: "fails closed", gate: true },
  { id: "education", name: "Storage", detail: "postgresql" },
  { id: "contact", name: "Response", detail: "200 ok", ok: true },
];

export const hopFor = (id: string) => HOPS.find((h) => h.id === id);

/**
 * Continuous position down the stack: 2.5 means halfway through the third
 * section. Measured against a line 42% down the viewport, the band the eye
 * actually reads in.
 */
export function readProgress(): number {
  const doc = document.documentElement;
  if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) {
    return HOPS.length - 1;
  }
  const anchor = window.innerHeight * 0.42;
  let p = 0;
  for (let i = 0; i < HOPS.length; i++) {
    const el = document.getElementById(HOPS[i].id);
    if (!el) continue;
    const r = el.getBoundingClientRect();
    if (r.top <= anchor) {
      p = i + Math.min(1, Math.max(0, (anchor - r.top) / Math.max(r.height, 1)));
    }
  }
  return Math.min(p, HOPS.length - 1);
}
