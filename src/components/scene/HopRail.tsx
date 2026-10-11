"use client";

import { useEffect, useState } from "react";
import { HOPS, readProgress } from "@/lib/hops";
import { cn } from "@/lib/utils";

/**
 * A fixed trace down the left margin: where the reader's request is in the
 * stack. Works without WebGL — it reads the same progress the scene does.
 */
export default function HopRail() {
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setP(readProgress()));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const active = Math.round(p);
  const fill = (p / (HOPS.length - 1)) * 100;

  return (
    <nav
      aria-label="Request path"
      data-print-hide
      className="fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
    >
      <div className="relative">
        <div className="absolute bottom-[0.45rem] left-[3px] top-[0.45rem] w-px bg-line">
          <div
            className="w-full bg-accent transition-[height] duration-300 ease-out"
            style={{ height: `${fill}%` }}
          />
        </div>
        <ol className="relative space-y-6">
          {HOPS.map((hop, i) => {
            const on = i === active;
            const passed = i < active;
            return (
              <li key={hop.id}>
                <a
                  href={`#${hop.id}`}
                  aria-current={on ? "step" : undefined}
                  className="group flex items-center gap-3"
                >
                  <span
                    className={cn(
                      "h-[7px] w-[7px] shrink-0 border transition-all duration-300",
                      on
                        ? hop.gate
                          ? "scale-125 border-danger bg-danger"
                          : "scale-125 border-accent bg-accent"
                        : passed
                          ? "border-accent bg-bg"
                          : "border-line-strong bg-bg",
                    )}
                  />
                  <span
                    className={cn(
                      "label hidden whitespace-nowrap transition-colors 2xl:inline",
                      on ? "text-fg" : "text-fg3 group-hover:text-fg2",
                    )}
                  >
                    <span className={cn("tnum", on && (hop.gate ? "text-danger" : "text-accent"))}>
                      L{String(i).padStart(2, "0")}
                    </span>{" "}
                    {hop.name}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
