/**
 * Renders public/og.png (1200x630) from scripts/og-card.html.
 *
 * The card is screenshotted out of the real build so it uses the exact Inter
 * and JetBrains Mono files next/font downloads — no second font source to
 * drift. Run after `next build`:
 *
 *   npm run build && npm run og
 *
 * Requires a local Chrome/Chromium. The generated PNG is committed, so this
 * only needs re-running when the card's content or design changes — CI does
 * not run it.
 */
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { readFile, readdir, writeFile, rm, mkdtemp } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "out");
const PORT = 8899;

const BROWSERS = [
  "chromium",
  "chromium-browser",
  "google-chrome",
  "google-chrome-stable",
];

async function findSiteCss() {
  const dir = path.join(OUT, "_next/static/css");
  const files = (await readdir(dir)).filter((f) => f.endsWith(".css"));
  if (!files.length) throw new Error(`No stylesheet in ${dir}`);
  // Largest file is the app stylesheet carrying the @font-face rules.
  const sized = await Promise.all(
    files.map(async (f) => ({
      f,
      size: (await readFile(path.join(dir, f))).length,
    })),
  );
  sized.sort((a, b) => b.size - a.size);
  return `/_next/static/css/${sized[0].f}`;
}

function serve(root) {
  const types = {
    ".html": "text/html",
    ".css": "text/css",
    ".woff2": "font/woff2",
    ".js": "text/javascript",
  };
  const server = createServer(async (req, res) => {
    const rel = decodeURIComponent(req.url.split("?")[0]).replace(/^\/+/, "");
    const file = path.join(root, rel);
    // Keep the handler inside the served root.
    if (!file.startsWith(root) || !existsSync(file)) {
      res.writeHead(404).end("not found");
      return;
    }
    res.writeHead(200, {
      "content-type": types[path.extname(file)] ?? "application/octet-stream",
    });
    res.end(await readFile(file));
  });
  return new Promise((ok) => server.listen(PORT, () => ok(server)));
}

function screenshot(bin, url, dest) {
  return new Promise((resolve, reject) => {
    const proc = spawn(bin, [
      "--headless",
      "--disable-gpu",
      "--no-sandbox",
      "--hide-scrollbars",
      "--window-size=1200,630",
      "--default-background-color=f7f6f3ff",
      `--screenshot=${dest}`,
      url,
    ]);
    proc.on("error", reject);
    proc.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${bin} exited ${code}`)),
    );
  });
}

if (!existsSync(OUT)) {
  console.error("out/ not found — run `npm run build` first.");
  process.exit(1);
}

const css = await findSiteCss();
const template = await readFile(
  path.join(ROOT, "scripts/og-card.html"),
  "utf8",
);

// The card must be served from out/ so its /_next/... asset paths resolve.
const staged = path.join(OUT, "__og.html");
await writeFile(staged, template.replace("__SITE_CSS__", css));

const server = await serve(OUT);
const dest = path.join(ROOT, "public/og.png");
const tmp = await mkdtemp(path.join(tmpdir(), "og-"));

try {
  let done = false;
  for (const bin of BROWSERS) {
    try {
      await screenshot(bin, `http://localhost:${PORT}/__og.html`, dest);
      console.log(`og.png written via ${bin} (stylesheet: ${css})`);
      done = true;
      break;
    } catch (err) {
      if (err.code !== "ENOENT") throw err; // real failure, not a missing binary
    }
  }
  if (!done) throw new Error(`No browser found. Tried: ${BROWSERS.join(", ")}`);
} finally {
  server.close();
  await rm(staged, { force: true });
  await rm(tmp, { recursive: true, force: true });
}
