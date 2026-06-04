"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export type BrainSkill = { name: string; color: string; groupIndex?: number };

type NeuralBrainProps = { skills: BrainSkill[]; activeGroupIndex?: number | null; className?: string };

const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

type BrainNode = {
  bx: number;
  by: number;
  x: number;
  y: number;
  phase: number;
  drift: number;
  amp: number;
  r: number;
  bright: number;
  boundary: boolean;
  skill: number;
};

type BrainEdge = { a: number; b: number; base: number; phase: number; pulse: number };
type Signal = { path: number[]; seg: number; t: number; speed: number };

const LOBES: Array<[number, number, number]> = [
  [0.5, 0.0, 0.52],
  [0.3, -0.46, 0.34],
  [0.64, -0.4, 0.3],
  [0.82, -0.06, 0.32],
  [0.68, 0.4, 0.3],
  [0.36, 0.52, 0.3],
  [0.2, 0.2, 0.37],
  [0.2, -0.2, 0.37],
];
const FISSURE = 0.05;
const TAU = Math.PI * 2;

function inBrain(ux: number, uy: number): boolean {
  if (Math.abs(ux) < FISSURE) return false;
  const ax = Math.abs(ux);
  for (let i = 0; i < LOBES.length; i += 1) {
    const dx = ax - LOBES[i][0];
    const dy = uy - LOBES[i][1];
    if (dx * dx + dy * dy < LOBES[i][2] * LOBES[i][2]) return true;
  }
  return false;
}

function makeGlowSprite(rgb: string): HTMLCanvasElement {
  const size = 64;
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;
  const g = sprite.getContext("2d");
  if (g) {
    const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, `rgba(${rgb},0.95)`);
    grad.addColorStop(0.4, `rgba(${rgb},0.32)`);
    grad.addColorStop(1, `rgba(${rgb},0)`);
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
  }
  return sprite;
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export default function NeuralBrain({ skills, activeGroupIndex = null, className }: NeuralBrainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const skillsRef = useRef(skills);
  const activeGroupRef = useRef<number | null>(activeGroupIndex);
  skillsRef.current = skills;
  activeGroupRef.current = activeGroupIndex;
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const pr = Math.min(window.devicePixelRatio || 1, 2);
    const mintGlow = makeGlowSprite("167,239,158");
    const whiteGlow = makeGlowSprite("214,255,205");

    let W = 0;
    let H = 0;
    let nodes: BrainNode[] = [];
    let edges: BrainEdge[] = [];
    let adj: number[][] = [];
    let signals: Signal[] = [];
    let skillNodes: number[] = [];
    let cx = 0;
    let brainW = 0;

    let rafId = 0;
    let running = false;
    let startTime = 0;
    let lastTime = 0;
    let spawnTimer = 0;
    let hovered = -1;
    const pointer = { x: -9999, y: -9999, active: false };

    const buildPath = (): number[] | null => {
      if (!nodes.length) return null;
      const len = 5 + Math.floor(Math.random() * 7);
      const path = [Math.floor(Math.random() * nodes.length)];
      let prev = -1;
      let cur = path[0];
      for (let k = 0; k < len; k += 1) {
        const options = adj[cur].filter((n) => n !== prev);
        if (!options.length) break;
        const next = options[Math.floor(Math.random() * options.length)];
        path.push(next);
        prev = cur;
        cur = next;
      }
      return path.length >= 2 ? path : null;
    };

    const pickSkillNodes = (count: number) => {
      skillNodes = [];
      if (!nodes.length || count <= 0) return;
      let seed = 0;
      for (let i = 1; i < nodes.length; i += 1) {
        if (nodes[i].bx > nodes[seed].bx) seed = i;
      }
      skillNodes.push(seed);
      const minDist = nodes.map(() => Infinity);
      while (skillNodes.length < Math.min(count, nodes.length)) {
        const last = skillNodes[skillNodes.length - 1];
        let best = -1;
        let bestD = -1;
        for (let i = 0; i < nodes.length; i += 1) {
          if (nodes[i].skill !== -1) continue;
          const dx = nodes[i].bx - nodes[last].bx;
          const dy = nodes[i].by - nodes[last].by;
          minDist[i] = Math.min(minDist[i], dx * dx + dy * dy);
          if (minDist[i] > bestD) {
            bestD = minDist[i];
            best = i;
          }
        }
        if (best === -1) break;
        skillNodes.push(best);
        nodes[best].skill = skillNodes.length - 1;
      }
      nodes[seed].skill = 0;
      for (let s = 0; s < skillNodes.length; s += 1) {
        const n = nodes[skillNodes[s]];
        n.skill = s;
        n.r = Math.max(n.r, 2.1);
        n.bright = 1;
        n.boundary = false;
      }
    };

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = Math.max(1, Math.floor(W * pr));
      canvas.height = Math.max(1, Math.floor(H * pr));
      ctx.setTransform(pr, 0, 0, pr, 0, 0);

      const bw = Math.min(W * 0.82, 1060);
      const bh = Math.min(bw * 0.64, H * 0.94);
      brainW = bw;
      const hw = bw / 2 / 1.16;
      const hh = bh / 2 / 0.86;
      cx = W / 2;
      const cy = H * 0.5;
      const amp = bw * 0.006;

      const target = clamp(Math.round((bw * bh) / 7600), 90, shouldReduceMotion ? 130 : 200);
      nodes = [];
      let attempts = 0;
      while (nodes.length < target && attempts < target * 60) {
        attempts += 1;
        const ux = (Math.random() * 2 - 1) * 1.16;
        const uy = (Math.random() * 2 - 1) * 0.92;
        if (!inBrain(ux, uy)) continue;
        const boundary = !inBrain(ux * 1.1, uy * 1.1) || Math.abs(ux) - 0.07 < FISSURE;
        nodes.push({
          bx: cx + ux * hw,
          by: cy + uy * hh,
          x: cx + ux * hw,
          y: cy + uy * hh,
          phase: Math.random() * TAU,
          drift: 0.5 + Math.random() * 0.9,
          amp,
          r: boundary ? 1.1 + Math.random() * 0.9 : 0.7 + Math.random() * 1.0,
          bright: boundary ? 0.8 + Math.random() * 0.2 : 0.35 + Math.random() * 0.4,
          boundary,
          skill: -1,
        });
      }

      const maxD = bw * 0.118;
      const maxD2 = maxD * maxD;
      adj = nodes.map(() => []);
      edges = [];
      const seen = new Set<number>();
      for (let i = 0; i < nodes.length; i += 1) {
        const near: Array<[number, number]> = [];
        for (let j = 0; j < nodes.length; j += 1) {
          if (i === j) continue;
          const dx = nodes[i].bx - nodes[j].bx;
          const dy = nodes[i].by - nodes[j].by;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxD2) near.push([j, d2]);
        }
        near.sort((a, b) => a[1] - b[1]);
        const keep = near.slice(0, 5);
        for (let k = 0; k < keep.length; k += 1) {
          const j = keep[k][0];
          const lo = Math.min(i, j);
          const hi = Math.max(i, j);
          const key = lo * 100000 + hi;
          if (seen.has(key)) continue;
          seen.add(key);
          const d = Math.sqrt(keep[k][1]);
          edges.push({ a: lo, b: hi, base: 1 - d / maxD, phase: Math.random() * TAU, pulse: 0.5 + Math.random() * 1.1 });
          adj[lo].push(hi);
          adj[hi].push(lo);
        }
      }
      signals = [];
      pickSkillNodes(skillsRef.current.length);
    };

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000) || 0.016;
      lastTime = now;
      const t = now / 1000;
      const formation = shouldReduceMotion ? 1 : easeOut(clamp((now - startTime) / 1700, 0, 1));
      const skillList = skillsRef.current;
      const selectedGroup = activeGroupRef.current;

      ctx.clearRect(0, 0, W, H);

      if (!shouldReduceMotion) {
        for (let i = 0; i < nodes.length; i += 1) {
          const n = nodes[i];
          n.x = n.bx + Math.cos(t * n.drift + n.phase) * n.amp;
          n.y = n.by + Math.sin(t * n.drift * 0.9 + n.phase) * n.amp;
        }
      }

      hovered = -1;
      if (pointer.active) {
        let bestD = Infinity;
        for (let s = 0; s < skillNodes.length; s += 1) {
          const n = nodes[skillNodes[s]];
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < bestD) {
            bestD = d2;
            hovered = d2 < 30 * 30 ? skillNodes[s] : hovered;
          }
        }
      }
      const hoveredNeighbors = hovered >= 0 ? new Set(adj[hovered]) : null;
      const activeGroupNodes =
        selectedGroup === null
          ? null
          : new Set(
              skillNodes.filter((nodeIndex) => {
                const skill = skillList[nodes[nodeIndex].skill];
                return skill?.groupIndex === selectedGroup;
              }),
            );
      const activeGroupNeighbors = activeGroupNodes
        ? new Set(Array.from(activeGroupNodes).flatMap((nodeIndex) => adj[nodeIndex]))
        : null;

      ctx.globalCompositeOperation = "lighter";

      ctx.lineWidth = 1;
      for (let e = 0; e < edges.length; e += 1) {
        const edge = edges[e];
        const n1 = nodes[edge.a];
        const n2 = nodes[edge.b];
        const isGroupEdge = activeGroupNodes ? activeGroupNodes.has(edge.a) || activeGroupNodes.has(edge.b) : false;
        let alpha = edge.base * (0.18 + 0.15 * Math.sin(t * edge.pulse + edge.phase)) * formation;
        if (activeGroupNodes) alpha *= isGroupEdge ? 1.75 : 0.22;
        if (hovered >= 0 && (edge.a === hovered || edge.b === hovered)) {
          alpha += 0.55 * formation;
        }
        if (alpha <= 0.002) continue;
        ctx.strokeStyle = `rgba(167,239,158,${alpha})`;
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.stroke();
      }

      if (!shouldReduceMotion) {
        spawnTimer -= dt;
        const maxSignals = Math.round(nodes.length / 24) + 2;
        if (spawnTimer <= 0 && signals.length < maxSignals) {
          const path = buildPath();
          if (path) signals.push({ path, seg: 0, t: 0, speed: 0.7 + Math.random() * 0.8 });
          spawnTimer = 0.26 + Math.random() * 0.5;
        }
        for (let s = signals.length - 1; s >= 0; s -= 1) {
          const sig = signals[s];
          sig.t += sig.speed * dt * 1.7;
          while (sig.t >= 1) {
            sig.t -= 1;
            sig.seg += 1;
          }
          if (sig.seg >= sig.path.length - 1) {
            signals.splice(s, 1);
            continue;
          }
          const a = nodes[sig.path[sig.seg]];
          const b = nodes[sig.path[sig.seg + 1]];
          const px = a.x + (b.x - a.x) * sig.t;
          const py = a.y + (b.y - a.y) * sig.t;
          ctx.strokeStyle = `rgba(198,255,206,${0.55 * formation})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(px, py);
          ctx.stroke();
          ctx.lineWidth = 1;
          const hs = 22;
          ctx.globalAlpha = formation;
          ctx.drawImage(whiteGlow, px - hs / 2, py - hs / 2, hs, hs);
          ctx.globalAlpha = 1;
          ctx.fillStyle = `rgba(235,255,235,${0.95 * formation})`;
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, TAU);
          ctx.fill();
        }
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const n = nodes[i];
        if (n.skill !== -1) continue;
        let b = n.bright;
        if (hoveredNeighbors && hoveredNeighbors.has(i)) b = Math.min(1, b + 0.5);
        if (activeGroupNeighbors) b = activeGroupNeighbors.has(i) ? Math.min(1, b + 0.45) : b * 0.32;
        const gs = n.r * (n.boundary ? 9 : 6);
        ctx.globalAlpha = b * formation * 0.62;
        ctx.drawImage(mintGlow, n.x - gs / 2, n.y - gs / 2, gs, gs);
        ctx.globalAlpha = 1;
        ctx.fillStyle = `rgba(205,255,196,${b * formation})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 0.8, 0, TAU);
        ctx.fill();
      }

      for (let s = 0; s < skillNodes.length; s += 1) {
        const idx = skillNodes[s];
        const n = nodes[idx];
        const skill = skillList[n.skill];
        if (!skill) continue;
        const isHover = idx === hovered;
        const isGroupActive = selectedGroup === null || skill.groupIndex === selectedGroup;
        const dimmed = (hovered >= 0 && !isHover ? 0.45 : 1) * (isGroupActive ? 1 : 0.18);
        const rr =
          (isHover ? n.r * 2.2 : n.r * (isGroupActive && selectedGroup !== null ? 1.9 : 1.5)) *
          (0.5 + 0.5 * formation);
        const gs = rr * 7;
        ctx.globalAlpha = formation * dimmed * (isHover ? 1 : 0.78);
        ctx.drawImage(whiteGlow, n.x - gs / 2, n.y - gs / 2, gs, gs);
        ctx.globalAlpha = 1;
        ctx.fillStyle = skill.color;
        ctx.globalAlpha = formation * dimmed;
        ctx.beginPath();
        ctx.arc(n.x, n.y, rr, 0, TAU);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      ctx.globalCompositeOperation = "source-over";
      ctx.textBaseline = "middle";
      for (let s = 0; s < skillNodes.length; s += 1) {
        const idx = skillNodes[s];
        const n = nodes[idx];
        const skill = skillList[n.skill];
        if (!skill) continue;
        const isHover = idx === hovered;
        const isGroupActive = selectedGroup === null || skill.groupIndex === selectedGroup;
        const dimmed = (hovered >= 0 && !isHover ? 0.18 : 1) * (isGroupActive ? 1 : 0.16);
        const ringR =
          (isHover ? n.r * 2.2 : n.r * (isGroupActive && selectedGroup !== null ? 1.9 : 1.5)) *
            (0.5 + 0.5 * formation) +
          4;

        ctx.strokeStyle = `rgba(255,255,255,${(isHover ? 0.72 : 0.34) * formation * dimmed})`;
        ctx.lineWidth = isHover ? 1.4 : 1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, ringR, 0, TAU);
        ctx.stroke();

        ctx.font = isHover
          ? "700 14px ui-monospace, SFMono-Regular, Menlo, monospace"
          : "700 12px ui-monospace, SFMono-Regular, Menlo, monospace";
        const tw = ctx.measureText(skill.name).width;
        const gap = ringR + 10;
        let side = n.bx < cx ? -1 : 1;
        const padX = isHover ? 8 : 7;
        const labelHeight = isHover ? 24 : 21;
        if (side > 0 && n.x + gap + tw + padX * 2 > W - 6) side = -1;
        else if (side < 0 && n.x - gap - tw - padX * 2 < 6) side = 1;
        const lx = n.x + side * gap;
        ctx.textAlign = side < 0 ? "right" : "left";

        if (isHover) {
          ctx.strokeStyle = "rgba(167,239,158,0.5)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n.x + side * (ringR + 1), n.y);
          ctx.lineTo(lx - side * 2, n.y);
          ctx.stroke();
        }

        const labelAlpha = (isHover || (isGroupActive && selectedGroup !== null) ? 1 : 0.74) * formation * dimmed;
        const bgWidth = tw + padX * 2;
        const bgX = side < 0 ? lx - bgWidth + padX : lx - padX;
        const bgY = n.y - labelHeight / 2;
        ctx.shadowColor = "rgba(0,0,0,0.8)";
        ctx.shadowBlur = isHover ? 18 : 10;
        ctx.fillStyle = `rgba(5,8,7,${(isHover ? 0.82 : 0.58) * formation * dimmed})`;
        roundedRect(ctx, bgX, bgY, bgWidth, labelHeight, 8);
        ctx.fill();
        ctx.strokeStyle = `rgba(167,239,158,${(isHover ? 0.34 : 0.16) * formation * dimmed})`;
        ctx.lineWidth = 1;
        roundedRect(ctx, bgX, bgY, bgWidth, labelHeight, 8);
        ctx.stroke();

        if (isHover) {
          ctx.shadowColor = "rgba(0,0,0,0.95)";
          ctx.shadowBlur = 12;
          ctx.fillStyle = skill.color;
          ctx.globalAlpha = formation;
        } else {
          ctx.shadowColor = "rgba(0,0,0,0.9)";
          ctx.shadowBlur = 8;
          ctx.fillStyle = `rgba(228,236,228,${labelAlpha})`;
          ctx.globalAlpha = 1;
        }
        ctx.fillText(skill.name, lx, n.y);
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }

      if (!shouldReduceMotion && running) {
        rafId = window.requestAnimationFrame(draw);
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      if (!startTime) startTime = performance.now();
      lastTime = performance.now();
      if (shouldReduceMotion) draw(performance.now());
      else rafId = window.requestAnimationFrame(draw);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(rafId);
    };

    const handlePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = pointer.x >= -40 && pointer.x <= W + 40 && pointer.y >= -40 && pointer.y <= H + 40;
    };
    const handlePointerLeave = () => {
      pointer.active = false;
    };

    let resizeTimer = 0;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const wasRunning = running;
        stop();
        startTime = 0;
        setup();
        if (shouldReduceMotion) draw(performance.now());
        else if (wasRunning) start();
      }, 180);
    };

    setup();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) start();
          else stop();
        }
      },
      { threshold: 0.02 },
    );
    observer.observe(canvas);

    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      stop();
      window.clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [shouldReduceMotion]);

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 h-[74%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(167,239,158,0.08),transparent_62%)] blur-2xl" />
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
