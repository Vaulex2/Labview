"use client";

import { useEffect, useRef } from "react";

/* ─── GraphiCode hero dataflow backdrop ──────────────────────────────────────
   An ambient LabVIEW-style block-diagram network: terminal nodes wired by
   orthogonal (90°) elbow paths, with glowing data packets continuously
   travelling the wires. Plain canvas 2D, no deps. Deterministic layout so it
   stays stable across renders; DPR-aware; pauses when the tab is hidden;
   renders a single static frame under prefers-reduced-motion.
─────────────────────────────────────────────────────────────────────────── */

// Geniestudio palette — tuned for the light Sky Wash canvas
const NODE = "79,190,255"; // Cornflower #4fbeff
const WIRE = "0,153,255"; // Signal Blue #0099ff
const PACKET = "0,105,224"; // Deep Cobalt #0069e0

type Pt = { x: number; y: number };
type Node = { fx: number; fy: number; depth: number; pulse: number };
type Wire = { a: number; b: number; bendX: boolean };
type Packet = { wire: number; t: number; speed: number; size: number };

// Tiny deterministic PRNG so node layout is identical every mount.
function mulberry32(seed: number) {
  let s = seed >>> 0;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGraph() {
  const rng = mulberry32(0x6c41b);
  // Loose 6×4 grid of cells; sample a subset for a block-diagram feel.
  const cols = 6;
  const rows = 4;
  const cells: { c: number; r: number }[] = [];
  for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) cells.push({ c, r });
  // Shuffle, keep ~13 cells.
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  const chosen = cells.slice(0, 13);

  const nodes: Node[] = chosen.map(({ c, r }) => ({
    fx: (c + 0.5) / cols + (rng() - 0.5) * 0.07,
    fy: (r + 0.5) / rows + (rng() - 0.5) * 0.12,
    depth: 0.45 + rng() * 0.55, // parallax + alpha depth
    pulse: rng() * Math.PI * 2,
  }));

  // Wire each node to its nearest unused-ish neighbour to the right/below,
  // forming a left-to-right flowing graph plus a few cross links.
  const wires: Wire[] = [];
  const order = nodes
    .map((n, i) => ({ i, key: n.fx + n.fy * 0.15 }))
    .sort((p, q) => p.key - q.key)
    .map((p) => p.i);
  for (let k = 0; k < order.length - 1; k++) {
    wires.push({ a: order[k], b: order[k + 1], bendX: rng() > 0.5 });
    if (k + 2 < order.length && rng() > 0.55) {
      wires.push({ a: order[k], b: order[k + 2], bendX: rng() > 0.5 });
    }
  }

  // 1–2 packets per wire, staggered so it never looks mechanical.
  const packets: Packet[] = [];
  wires.forEach((_, wi) => {
    const count = 1 + (rng() > 0.6 ? 1 : 0);
    for (let p = 0; p < count; p++) {
      packets.push({
        wire: wi,
        t: rng(),
        speed: 0.05 + rng() * 0.10, // units of path-fraction per second
        size: 1.6 + rng() * 1.4,
      });
    }
  });

  return { nodes, wires, packets };
}

// Elbow path (A → bend → B) in pixel space.
function wirePath(a: Pt, b: Pt, bendX: boolean): Pt[] {
  const bend = bendX ? { x: b.x, y: a.y } : { x: a.x, y: b.y };
  return [a, bend, b];
}

// Position at fraction t (0..1) along a multi-segment polyline.
function pointAlong(pts: Pt[], t: number): Pt {
  let total = 0;
  const segLen: number[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const l = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
    segLen.push(l);
    total += l;
  }
  if (total === 0) return pts[0];
  let dist = t * total;
  for (let i = 0; i < segLen.length; i++) {
    if (dist <= segLen[i]) {
      const f = segLen[i] === 0 ? 0 : dist / segLen[i];
      return {
        x: pts[i].x + (pts[i + 1].x - pts[i].x) * f,
        y: pts[i].y + (pts[i + 1].y - pts[i].y) * f,
      };
    }
    dist -= segLen[i];
  }
  return pts[pts.length - 1];
}

export function HeroDataflow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const graph = buildGraph();
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    const mouse = { x: 0, y: 0 }; // target parallax (−1..1)
    const drift = { x: 0, y: 0 }; // eased

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const px = (n: Node): Pt => ({ x: n.fx * width, y: n.fy * height });

    const draw = (timeSec: number) => {
      ctx.clearRect(0, 0, width, height);

      // Eased parallax toward mouse target.
      drift.x += (mouse.x - drift.x) * 0.04;
      drift.y += (mouse.y - drift.y) * 0.04;

      const off = (n: Node): Pt => {
        const p = px(n);
        const k = n.depth * 14; // px parallax range by depth
        return { x: p.x + drift.x * k, y: p.y + drift.y * k };
      };

      // Wires
      for (const w of graph.wires) {
        const na = graph.nodes[w.a];
        const nb = graph.nodes[w.b];
        const pts = wirePath(off(na), off(nb), w.bendX);
        const depth = (na.depth + nb.depth) / 2;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.strokeStyle = `rgba(${WIRE},${0.08 + depth * 0.14})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Nodes — small rounded terminals with a gentle breathing pulse.
      for (const n of graph.nodes) {
        const p = off(n);
        const breathe = reduce ? 0 : Math.sin(timeSec * 1.1 + n.pulse) * 0.5 + 0.5;
        const s = 4 + n.depth * 3;
        const a = 0.16 + n.depth * 0.16 + breathe * 0.08;
        ctx.beginPath();
        if (typeof ctx.roundRect === "function") {
          ctx.roundRect(p.x - s, p.y - s, s * 2, s * 2, 2.5);
        } else {
          ctx.rect(p.x - s, p.y - s, s * 2, s * 2);
        }
        ctx.strokeStyle = `rgba(${NODE},${a})`;
        ctx.lineWidth = 1.25;
        ctx.stroke();
      }

      // Data packets — the "alive" element. Glowing dots along the wires.
      ctx.save();
      for (const pk of graph.packets) {
        const w = graph.wires[pk.wire];
        const na = graph.nodes[w.a];
        const nb = graph.nodes[w.b];
        const pts = wirePath(off(na), off(nb), w.bendX);
        const pos = pointAlong(pts, reduce ? 0.5 : pk.t);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pk.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PACKET},0.85)`;
        ctx.shadowColor = `rgba(${WIRE},0.55)`;
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      ctx.restore();
    };

    let raf = 0;
    let last = performance.now();
    let elapsed = 0;

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      elapsed += dt;
      for (const pk of graph.packets) {
        pk.t = (pk.t + pk.speed * dt) % 1;
      }
      draw(elapsed);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (raf || reduce) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const onResize = () => {
      resize();
      if (reduce) draw(0);
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);
    resize();

    if (reduce) {
      draw(0); // single static frame, no motion
    } else {
      window.addEventListener("mousemove", onMouse, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      start();
    }

    return () => {
      stop();
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 h-full w-full pointer-events-none"
    />
  );
}
