"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { HOPS, readProgress } from "@/lib/hops";

/**
 * The backdrop: the system stack drawn as stacked circuit boards. Packets
 * route down orthogonal traces from layer to layer; at the RLS gate some are
 * refused and die in place (fail closed), the rest turn green and carry on.
 * The bright packet on the spine is the reader's own request — scrolling
 * moves it, and the camera, down the stack.
 */

const GAP = 5.2;
const W = 7.2;
const D = 4.6;
const COLS = 6;
const ROWS = 4;
const LAST = HOPS.length - 1;
const GATE = HOPS.findIndex((h) => h.gate);
const BLOCK_RATE = 0.28;
const DIE_TIME = 0.9;

interface Link {
  b: number;
  pts: THREE.Vector3[];
  cum: number[];
  len: number;
}

interface Packet {
  layer: number;
  link: Link;
  t: number;
  speed: number;
  dying: number;
  x: number;
  y: number;
  z: number;
}

function mulberry(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function token(name: string) {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  const [r, g, b] = raw.split(/[\s,]+/).map(Number);
  return new THREE.Color().setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace);
}

function sample(link: Link, t: number, out: THREE.Vector3) {
  const { pts, cum } = link;
  let i = 1;
  while (i < cum.length - 1 && cum[i] < t) i++;
  const span = cum[i] - cum[i - 1] || 1;
  return out.lerpVectors(pts[i - 1], pts[i], Math.min(1, (t - cum[i - 1]) / span));
}

function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.25, "rgba(255,255,255,0.85)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

export default function StackScene() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      return; // No WebGL: the page reads fine without its backdrop.
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rand = mulberry(20260213);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 200);
    const stack = new THREE.Group();
    scene.add(stack);

    // ---------- Nodes and links ----------
    const nodes: THREE.Vector3[][] = HOPS.map((_, i) => {
      const row: THREE.Vector3[] = [];
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          row.push(
            new THREE.Vector3(
              (c / (COLS - 1) - 0.5) * (W - 1.4) + (rand() - 0.5) * 0.35,
              -i * GAP,
              (r / (ROWS - 1) - 0.5) * (D - 1.3) + (rand() - 0.5) * 0.3,
            ),
          );
        }
      }
      return row;
    });

    // Each node routes to two nearby nodes on the layer below, along
    // circuit-style traces: drop, run across, drop.
    const out: Link[][][] = HOPS.map(() => []);
    const tracePts: number[] = [];
    for (let i = 0; i < LAST; i++) {
      nodes[i].forEach((a, ai) => {
        const ranked = nodes[i + 1]
          .map((b, bi) => ({ bi, d: a.distanceTo(b) + rand() * 2.2 }))
          .sort((x, y) => x.d - y.d)
          .slice(0, 2);
        out[i][ai] = ranked.map(({ bi }) => {
          const b = nodes[i + 1][bi];
          const ym = a.y - GAP * (0.35 + rand() * 0.3);
          const pts = [
            a.clone(),
            new THREE.Vector3(a.x, ym, a.z),
            new THREE.Vector3(b.x, ym, b.z),
            b.clone(),
          ];
          const cum = [0];
          for (let k = 1; k < pts.length; k++) {
            cum.push(cum[k - 1] + pts[k].distanceTo(pts[k - 1]));
            tracePts.push(...pts[k - 1].toArray(), ...pts[k].toArray());
          }
          return { b: bi, pts, cum, len: cum[cum.length - 1] };
        });
      });
    }

    const traceGeo = new THREE.BufferGeometry();
    traceGeo.setAttribute("position", new THREE.Float32BufferAttribute(tracePts, 3));
    const traceMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.14 });
    stack.add(new THREE.LineSegments(traceGeo, traceMat));

    // ---------- Layers ----------
    const monoFamily =
      getComputedStyle(document.body).getPropertyValue("--font-mono").trim() ||
      "monospace";

    const layers = HOPS.map((hop, i) => {
      const y = -i * GAP;
      const g = new THREE.Group();
      g.position.y = y;

      const slabMat = new THREE.MeshBasicMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const slab = new THREE.Mesh(new THREE.PlaneGeometry(W, D), slabMat);
      slab.rotation.x = -Math.PI / 2;
      g.add(slab);

      // Outline with corner registration ticks, like a board's silkscreen.
      const hw = W / 2;
      const hd = D / 2;
      const tick = 0.35;
      const edge = [
        -hw, 0, -hd, hw, 0, -hd, hw, 0, -hd, hw, 0, hd,
        hw, 0, hd, -hw, 0, hd, -hw, 0, hd, -hw, 0, -hd,
      ];
      for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
        const cx = sx * (hw + 0.18);
        const cz = sz * (hd + 0.18);
        edge.push(cx, 0, cz, cx - sx * tick, 0, cz, cx, 0, cz, cx, 0, cz - sz * tick);
      }
      const edgeGeo = new THREE.BufferGeometry();
      edgeGeo.setAttribute("position", new THREE.Float32BufferAttribute(edge, 3));
      const edgeMat = new THREE.LineBasicMaterial({ transparent: true });
      g.add(new THREE.LineSegments(edgeGeo, edgeMat));

      // The gate gets a shutter of dense rails across its face.
      let shutterMat: THREE.LineBasicMaterial | null = null;
      if (hop.gate) {
        const rails: number[] = [];
        for (let k = 1; k < 22; k++) {
          const x = -hw + (k / 22) * W;
          rails.push(x, 0.01, -hd, x, 0.01, hd);
        }
        const railGeo = new THREE.BufferGeometry();
        railGeo.setAttribute("position", new THREE.Float32BufferAttribute(rails, 3));
        shutterMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.18 });
        g.add(new THREE.LineSegments(railGeo, shutterMat));
      }

      // Pads where traces land.
      const padGeo = new THREE.BufferGeometry().setFromPoints(
        nodes[i].map((n) => new THREE.Vector3(n.x, 0, n.z)),
      );
      const padMat = new THREE.PointsMaterial({ size: 0.09, transparent: true });
      g.add(new THREE.Points(padGeo, padMat));

      // The layer's name, printed flat on the front edge of the board.
      const lc = document.createElement("canvas");
      lc.width = 1024;
      lc.height = 96;
      const labelTex = new THREE.CanvasTexture(lc);
      labelTex.anisotropy = 4;
      const labelMat = new THREE.MeshBasicMaterial({
        map: labelTex,
        transparent: true,
        depthWrite: false,
      });
      const label = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 0.4875), labelMat);
      label.rotation.x = -Math.PI / 2;
      label.position.set(-hw + 2.6, 0, hd + 0.62);
      g.add(label);

      const drawLabel = (fg: string, accent: string) => {
        const ctx = lc.getContext("2d")!;
        ctx.clearRect(0, 0, lc.width, lc.height);
        ctx.font = `500 40px ${monoFamily}`;
        ctx.textBaseline = "middle";
        ctx.fillStyle = accent;
        const code = `L${String(i).padStart(2, "0")}`;
        ctx.fillText(code, 0, 48);
        const w = ctx.measureText(code + "  ").width;
        ctx.fillStyle = fg;
        ctx.fillText(`${hop.name.toUpperCase()}  ·  ${hop.detail}`, w, 48);
        labelTex.needsUpdate = true;
      };

      stack.add(g);
      return { hop, slabMat, edgeMat, shutterMat, padMat, labelMat, drawLabel };
    });

    // The spine the reader's request travels down.
    const spineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 2.5, 0),
      new THREE.Vector3(0, -LAST * GAP, 0),
    ]);
    const spineMat = new THREE.LineDashedMaterial({
      dashSize: 0.18,
      gapSize: 0.22,
      transparent: true,
      opacity: 0.45,
    });
    const spine = new THREE.Line(spineGeo, spineMat);
    spine.computeLineDistances();
    stack.add(spine);

    // ---------- Packets ----------
    const mobile = window.innerWidth < 768;
    const COUNT = mobile ? 70 : 170;
    const glow = glowTexture();
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 4);
    const packetGeo = new THREE.BufferGeometry();
    packetGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    packetGeo.setAttribute("color", new THREE.BufferAttribute(col, 4));
    const packetMat = new THREE.PointsMaterial({
      size: 0.2,
      map: glow,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
    });
    stack.add(new THREE.Points(packetGeo, packetMat));

    const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)];
    const enter = (pk: Packet, layer: number, node: number) => {
      pk.layer = layer;
      pk.link = pick(out[layer][node]);
    };
    const packets: Packet[] = Array.from({ length: COUNT }, () => {
      const pk = { t: 0, speed: 1.3 + rand() * 1.4, dying: -1, x: 0, y: 0, z: 0 } as Packet;
      enter(pk, Math.floor(rand() * LAST), Math.floor(rand() * COLS * ROWS));
      pk.t = rand() * pk.link.len;
      return pk;
    });

    // The reader's own request, with a short comet tail and a landing ring.
    const meMat = new THREE.SpriteMaterial({ map: glow, transparent: true, depthWrite: false });
    const me = new THREE.Sprite(meMat);
    me.scale.setScalar(0.42);
    stack.add(me);

    const tailGeo = new THREE.BufferGeometry();
    tailGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6), 3));
    tailGeo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(8), 4));
    const tailMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true });
    stack.add(new THREE.Line(tailGeo, tailMat));

    const ringMat = new THREE.MeshBasicMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.34, 0.38, 64), ringMat);
    ring.rotation.x = -Math.PI / 2;
    stack.add(ring);

    // ---------- Theme ----------
    const palette = { fg: new THREE.Color(), accent: new THREE.Color(), ok: new THREE.Color(), danger: new THREE.Color() };
    let dark = false;
    const applyTheme = () => {
      dark = document.documentElement.getAttribute("data-theme") === "dark";
      palette.fg = token("--fg");
      palette.accent = token("--accent");
      palette.ok = token("--ok");
      palette.danger = token("--danger");
      const fg3 = token("--fg-3");
      const blend = dark ? THREE.AdditiveBlending : THREE.NormalBlending;

      traceMat.color.copy(fg3);
      spineMat.color.copy(palette.accent);
      packetMat.blending = blend;
      meMat.blending = blend;
      packetMat.needsUpdate = meMat.needsUpdate = true;
      meMat.color.copy(dark ? palette.fg : palette.accent);
      ringMat.color.copy(palette.accent);
      tailMat.blending = blend;
      tailMat.needsUpdate = true;

      for (const l of layers) {
        const tone = l.hop.gate ? palette.danger : l.hop.ok ? palette.ok : palette.accent;
        l.slabMat.color.copy(tone);
        l.edgeMat.color.copy(l.hop.gate || l.hop.ok ? tone : fg3);
        l.padMat.color.copy(tone);
        l.shutterMat?.color.copy(palette.danger);
        l.drawLabel(
          `#${fg3.getHexString(THREE.SRGBColorSpace)}`,
          `#${tone.getHexString(THREE.SRGBColorSpace)}`,
        );
      }
      render();
    };

    // ---------- Frame ----------
    let pTarget = readProgress();
    let p = pTarget;
    let time = 0;
    const tmp = new THREE.Vector3();

    const stepPackets = (dt: number) => {
      for (let k = 0; k < COUNT; k++) {
        const pk = packets[k];
        if (pk.dying >= 0) {
          pk.dying -= dt;
          if (pk.dying < 0) {
            enter(pk, 0, Math.floor(rand() * COLS * ROWS));
            pk.t = 0;
          }
        } else {
          pk.t += pk.speed * dt;
          if (pk.t >= pk.link.len) {
            const next = pk.layer + 1;
            const end = pk.link.pts[pk.link.pts.length - 1];
            if (next === GATE && rand() < BLOCK_RATE) {
              pk.dying = DIE_TIME;
              pk.x = end.x;
              pk.y = end.y;
              pk.z = end.z;
            } else if (next >= LAST) {
              enter(pk, 0, Math.floor(rand() * COLS * ROWS));
              pk.t = 0;
            } else {
              const node = pk.link.b;
              pk.t -= pk.link.len;
              enter(pk, next, node);
            }
          }
        }

        let c: THREE.Color;
        let a = 1;
        if (pk.dying >= 0) {
          c = palette.danger;
          a = pk.dying / DIE_TIME;
          pos[k * 3] = pk.x;
          pos[k * 3 + 1] = pk.y + (1 - a) * 0.25;
          pos[k * 3 + 2] = pk.z;
        } else {
          sample(pk.link, pk.t, tmp);
          pos[k * 3] = tmp.x;
          pos[k * 3 + 1] = tmp.y;
          pos[k * 3 + 2] = tmp.z;
          c = pk.layer >= GATE ? palette.ok : palette.accent;
          a = Math.min(1, pk.t * 2 + (pk.layer > 0 ? 1 : 0));
        }
        col[k * 4] = c.r;
        col[k * 4 + 1] = c.g;
        col[k * 4 + 2] = c.b;
        col[k * 4 + 3] = a * (dark ? 0.95 : 0.85);
      }
      packetGeo.attributes.position.needsUpdate = true;
      packetGeo.attributes.color.needsUpdate = true;
    };

    const placeCamera = () => {
      const ty = -p * GAP;
      const intro = Math.max(0, 1 - p); // pulled back on the hero, closer once reading
      const dist = 1 + intro * 0.32;
      camera.position.set(8.4 * dist, ty + 5.6 * dist, 11.4 * dist);
      camera.lookAt(0, ty - 0.6, 0);

      stack.rotation.y = reduced ? -0.12 : -0.12 + Math.sin(time * 0.06) * 0.16;

      for (let i = 0; i < layers.length; i++) {
        const near = Math.max(0, 1 - Math.abs(i - p));
        const l = layers[i];
        l.slabMat.opacity = 0.02 + near * (dark ? 0.07 : 0.05);
        l.edgeMat.opacity = 0.3 + near * 0.6;
        l.padMat.opacity = 0.35 + near * 0.6;
        l.labelMat.opacity = 0.3 + near * 0.35;
      }

      // The reader's packet and its tail.
      me.position.set(0, ty, 0);
      const tp = tailGeo.attributes.position as THREE.BufferAttribute;
      tp.setXYZ(0, 0, ty + 1.6, 0);
      tp.setXYZ(1, 0, ty, 0);
      tp.needsUpdate = true;
      const tc = tailGeo.attributes.color as THREE.BufferAttribute;
      const mc = meMat.color;
      tc.setXYZW(0, mc.r, mc.g, mc.b, 0);
      tc.setXYZW(1, mc.r, mc.g, mc.b, 0.9);
      tc.needsUpdate = true;

      const pulse = reduced ? 0.4 : (time * 0.7) % 1;
      const layerY = -Math.round(p) * GAP;
      ring.position.set(0, layerY + 0.01, 0);
      ring.scale.setScalar(1 + pulse * 2.4);
      ringMat.opacity = (1 - pulse) * 0.8;

      // Loud on the hero and the closing response, quiet behind reading.
      const base = mobile ? 0.22 : 0.46;
      const peak = mobile ? 0.5 : 1;
      const loud = Math.max(Math.max(0, 1 - p), Math.max(0, 1 - (LAST - p)) * 0.5);
      canvas.style.opacity = String(base + (peak - base) * loud);
    };

    const render = () => {
      placeCamera();
      renderer.render(scene, camera);
    };

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // On wide screens the stack sits right of the text column.
      if (w >= 1024) camera.setViewOffset(w, h, -w * 0.3, 0, w, h);
      else camera.clearViewOffset();
      camera.updateProjectionMatrix();
      render();
    };

    const onScroll = () => {
      pTarget = readProgress();
      if (reduced) {
        p = pTarget;
        render();
      }
    };

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (document.hidden) return;
      time += dt;
      p += (pTarget - p) * (1 - Math.exp(-dt * 4.5));
      stepPackets(dt);
      render();
    };

    applyTheme();
    stepPackets(0);
    resize();
    if (!reduced) raf = requestAnimationFrame(frame);
    canvas.classList.add("is-ready");

    // Labels are drawn on canvas, so redraw once the mono face has loaded.
    document.fonts?.ready.then(applyTheme).catch(() => {});

    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, { attributeFilter: ["data-theme"] });
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => {
          (x as THREE.MeshBasicMaterial).map?.dispose();
          x.dispose();
        });
      });
      glow.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      data-print-hide
      className="stack-canvas pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
