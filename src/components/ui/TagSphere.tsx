import { useEffect, useLayoutEffect, useMemo, useRef } from "react";

/**
 * TagSphere - an interactive 3D spherical tag cloud.
 *
 * A single, dependency-free component (pure React 18 + DOM refs). It blends:
 *  - Buttery inertia: drag samples angular velocity; on release the excess
 *    over a gentle idle auto-spin is exponentially damped while the velocity
 *    blends back to the baseline, so a thrown sphere coasts and melts into the
 *    slow auto-rotation seamlessly.
 *  - A "wireframe network" constellation: faint lines connect near-neighbor
 *    tags; each line's stroke-width AND stroke-opacity scale with endpoint
 *    depth, so near edges read thicker/brighter and sell the volume.
 *  - A staggered fly-out entrance: outer tags spiral out slightly later than
 *    inner ones over ~0.7s (ease-out cubic), abortable if grabbed mid-fly.
 *  - Smooth depth cues: scale + opacity + zIndex + subtle blur from projected z.
 *
 * Performance: ONE requestAnimationFrame loop writes transform/opacity/zIndex
 * directly to DOM nodes via refs and mutates each pre-created <line>'s
 * geometry - zero per-frame React state. Container metrics are cached and only
 * refreshed via ResizeObserver (no per-frame layout reads); zIndex/blur are only
 * rewritten when they actually change. Layout/edges/buffers recompute when the
 * tag set changes. prefers-reduced-motion disables entrance + auto-spin +
 * release inertia (drag still works). Every color comes from the `accent` prop.
 *
 * Ported from the reference implementation; only the pill font was swapped to
 * match this portfolio's mono stack.
 */

export interface Accent {
  color: string;
  tagBg: string;
  tagBorder: string;
  tagText: string;
  line: string;
}

export interface TagSphereProps {
  tags: string[];
  accent: Accent;
  className?: string;
  /** Accessible name for the cloud (announced to screen readers). */
  label?: string;
}

/** A unit-vector point on the sphere. */
interface SpherePoint {
  x: number;
  y: number;
  z: number;
}

/** An undirected edge between two base points (constellation line). */
interface Edge {
  a: number;
  b: number;
}

// ---- Tunables -------------------------------------------------------------

const HEIGHT_PX = 440;
const RADIUS_RATIO = 0.4; // sphere radius as a fraction of min(container) dimension
const MIN_RADIUS = 130;
const MAX_RADIUS = 230;

const K_NEIGHBORS = 5; // k-nearest neighbors per node — denser "cloud full of lines"
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); // ~2.39996 rad

const AUTO_SPIN_Y = 0.0022; // idle angular velocity baseline
const AUTO_SPIN_X = 0.0006;
const INITIAL_RX = -0.35; // pleasing non-axis-aligned starting tilt

const DAMPING = 0.94; // exponential velocity damping per ~frame on release
const VELOCITY_STOP = 0.00004; // below this, momentum is considered spent
const DRAG_SENSITIVITY = 0.0095; // rad per px dragged
const FLING_CAP = 0.06; // max angular velocity handed to inertia on release

const ENTRANCE_MS = 700;
const STAGGER_FRACTION = 0.35; // portion of entrance reserved for per-tag stagger

// Depth -> visual mapping ranges.
const SCALE_MIN = 0.55;
const SCALE_MAX = 1.15;
const OPACITY_MIN = 0.35;
const OPACITY_MAX = 1;
const BLUR_MAX_PX = 1.6; // applied to the farthest tags only
const BLUR_STEP = 0.4; // quantize blur so the filter string is rarely rewritten

// Line (constellation) depth -> visual mapping. NOTE: accent.line must be a
// SOLID color (alpha 1) — opacity is controlled here. A high minimum keeps
// back-facing edges clearly visible so no tag ever looks disconnected.
const LINE_OPACITY_MIN = 0.22;
const LINE_OPACITY_RANGE = 0.42; // near edges reach ~0.64 opacity
const LINE_WIDTH_MIN = 0.7;
const LINE_WIDTH_RANGE = 1.0; // near edges reach ~1.7px stroke

const PILL_FONT =
  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";

// ---- Pure helpers ---------------------------------------------------------

/** Distribute N points on a unit sphere via the Fibonacci/golden-angle method. */
function fibonacciSphere(n: number): SpherePoint[] {
  const pts: SpherePoint[] = [];
  if (n <= 0) return pts;
  if (n === 1) return [{ x: 0, y: 0, z: 1 }];

  for (let i = 0; i < n; i++) {
    // y from 1 .. -1 (inclusive), evenly spaced.
    const y = 1 - (i / (n - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = GOLDEN_ANGLE * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    pts.push({ x, y, z });
  }
  return pts;
}

/**
 * Compute a deduped k-nearest-neighbor edge set from the base points.
 * Angular distance on a unit sphere is rotation-invariant, so this is
 * computed ONCE and reused across every frame.
 */
function computeEdges(points: SpherePoint[], k: number): Edge[] {
  const n = points.length;
  if (n < 2) return [];
  const seen = new Set<string>();
  const edges: Edge[] = [];

  const addEdge = (i: number, j: number) => {
    if (i === j) return;
    const a = Math.min(i, j);
    const b = Math.max(i, j);
    const key = a + "-" + b;
    if (!seen.has(key)) {
      seen.add(key);
      edges.push({ a, b });
    }
  };

  // Squared chord distance (monotonic in angular distance on a unit sphere).
  const dist2 = (i: number, j: number) => {
    const dx = points[i].x - points[j].x;
    const dy = points[i].y - points[j].y;
    const dz = points[i].z - points[j].z;
    return dx * dx + dy * dy + dz * dz;
  };

  // 1) k-nearest-neighbor edges for every node (each tag gets >= k links).
  for (let i = 0; i < n; i++) {
    const dists: { j: number; d: number }[] = [];
    for (let j = 0; j < n; j++) {
      if (j === i) continue;
      dists.push({ j, d: dist2(i, j) });
    }
    dists.sort((m, q) => m.d - q.d);
    const take = Math.min(k, dists.length);
    for (let t = 0; t < take; t++) addEdge(i, dists[t].j);
  }

  // 2) Guarantee ONE connected network: if k-NN left more than one component,
  //    bridge them with the shortest cross-component edge until everything is
  //    joined (union-find).
  const parent = new Array<number>(n);
  for (let i = 0; i < n; i++) parent[i] = i;
  const find = (x: number): number => {
    let r = x;
    while (parent[r] !== r) r = parent[r];
    while (parent[x] !== r) {
      const next = parent[x];
      parent[x] = r;
      x = next;
    }
    return r;
  };
  const union = (a: number, b: number) => {
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) parent[ra] = rb;
  };
  for (const e of edges) union(e.a, e.b);

  const componentCount = () => {
    let c = 0;
    for (let i = 0; i < n; i++) if (find(i) === i) c++;
    return c;
  };

  let guard = 0;
  while (componentCount() > 1 && guard++ < n) {
    let bi = -1;
    let bj = -1;
    let bd = Infinity;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (find(i) === find(j)) continue;
        const d = dist2(i, j);
        if (d < bd) {
          bd = d;
          bi = i;
          bj = j;
        }
      }
    }
    if (bi < 0) break;
    addEdge(bi, bj);
    union(bi, bj);
  }

  return edges;
}

/** Clamp helper. */
function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}

/** Cubic ease-out. */
function easeOutCubic(t: number): number {
  const u = 1 - t;
  return 1 - u * u * u;
}

/** Defensive prefers-reduced-motion check (client-only SPA, but guard access). */
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

export default function TagSphere({ tags, accent, className, label }: TagSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Per-tag pill DOM nodes (created by React, mutated by the rAF loop).
  const pillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  // Per-edge line DOM nodes (created once by React, mutated by the loop).
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);

  // Base geometry - recomputed only when the tag set length changes.
  const basePoints = useMemo(() => fibonacciSphere(tags.length), [tags.length]);
  const edges = useMemo(() => computeEdges(basePoints, K_NEIGHBORS), [basePoints]);

  // Keep the ref arrays sized to current data, filled with null (React then
  // populates the slots). Reassign only on length change to stay GC-friendly.
  if (pillRefs.current.length !== tags.length) {
    pillRefs.current = new Array(tags.length).fill(null);
  }
  if (lineRefs.current.length !== edges.length) {
    lineRefs.current = new Array(edges.length).fill(null);
  }

  // ---- Mutable animation state (never triggers re-render) ----------------
  const state = useRef({
    rx: INITIAL_RX,
    ry: 0,
    vx: AUTO_SPIN_X, // current angular velocity X
    vy: AUTO_SPIN_Y, // current angular velocity Y
    dragging: false,
    lastX: 0,
    lastY: 0,
    lastMoveTime: 0,
    dragVX: 0, // velocity sampled from most recent drag movement
    dragVY: 0,
    pointerId: null as number | null,
    entranceStart: 0,
    reduced: false,
  });

  // Stable identity for the geometry; resets entrance when it changes (e.g.
  // switching skill groups). Re-runs both effects below.
  const geomKey = tags.length + ":" + edges.length;

  // Set entrance/baseline pre-paint so there is no flash before the first frame.
  useLayoutEffect(() => {
    const reduced = prefersReducedMotion();
    const s = state.current;
    s.reduced = reduced;
    // reduced -> no entrance fly-out (render settled); else start the timer.
    s.entranceStart = reduced ? -1 : performance.now();
    if (reduced) {
      s.vx = 0;
      s.vy = 0;
    } else {
      s.vx = AUTO_SPIN_X;
      s.vy = AUTO_SPIN_Y;
    }
  }, [geomKey]);

  // ---- The single requestAnimationFrame render loop ----------------------
  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container) return;

    let rafId = 0;
    let prevTime = performance.now();

    const count = basePoints.length;
    // Projected screen coords/depth + each tag's entrance progress, shared
    // between the pill pass and the line pass. Allocated once per geometry.
    const projX = new Float64Array(count);
    const projY = new Float64Array(count);
    const projZ = new Float64Array(count);
    const projLocal = new Float64Array(count);
    // Style caches: only write zIndex / blur filter when they actually change.
    const prevZ = new Int32Array(count).fill(-1);
    const prevBlur = new Float64Array(count).fill(-1);

    const n = count;
    const denom = n > 1 ? n - 1 : 1; // safe stagger divisor
    const localSpan = 1 - STAGGER_FRACTION; // window each tag flies over

    // Container metrics cached here and refreshed on resize (NOT every frame),
    // so the rAF loop never forces a synchronous layout read.
    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let R = 0;
    const measure = () => {
      const rect = container.getBoundingClientRect();
      w = rect.width || container.clientWidth || 1;
      h = rect.height || HEIGHT_PX;
      cx = w / 2;
      cy = h / 2;
      R = clamp(Math.min(w, h) * RADIUS_RATIO, MIN_RADIUS, MAX_RADIUS);
    };
    measure();
    let resizeObs: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObs = new ResizeObserver(measure);
      resizeObs.observe(container);
    }

    const frame = (now: number) => {
      const s = state.current;

      // dt normalized to ~60fps so motion is consistent across refresh rates.
      const dt = clamp((now - prevTime) / 16.6667, 0, 3);
      prevTime = now;

      // --- Integrate rotation ---------------------------------------------
      if (s.dragging) {
        // While dragging, rotation is set directly in pointermove. We only
        // keep the sampled velocity warm for release inertia.
      } else if (s.reduced) {
        // No auto-rotation under reduced motion.
      } else {
        // Blend leftover momentum toward the gentle idle auto-spin so the
        // transition from "thrown" to "idle" is seamless (buttery).
        s.vx += (AUTO_SPIN_X - s.vx) * 0.02 * dt;
        s.vy += (AUTO_SPIN_Y - s.vy) * 0.02 * dt;

        s.rx += s.vx * dt;
        s.ry += s.vy * dt;

        // Exponential damping of the EXCESS velocity over the idle baseline,
        // which decouples throw-decay from the steady auto-spin.
        const dampPow = Math.pow(DAMPING, dt);
        const excessX = s.vx - AUTO_SPIN_X;
        const excessY = s.vy - AUTO_SPIN_Y;
        if (Math.abs(excessX) > VELOCITY_STOP || Math.abs(excessY) > VELOCITY_STOP) {
          s.vx = AUTO_SPIN_X + excessX * dampPow;
          s.vy = AUTO_SPIN_Y + excessY * dampPow;
        }
      }

      // --- Entrance progress (0 -> 1 over ENTRANCE_MS, ease-out) -----------
      let eased = 1;
      let entering = false;
      if (s.entranceStart >= 0) {
        const elapsed = now - s.entranceStart;
        if (elapsed < ENTRANCE_MS) {
          eased = easeOutCubic(clamp(elapsed / ENTRANCE_MS, 0, 1));
          entering = true;
        } else {
          eased = 1;
          s.entranceStart = -1; // entrance finished; stop recomputing
        }
      }

      const cosX = Math.cos(s.rx);
      const sinX = Math.sin(s.rx);
      const cosY = Math.cos(s.ry);
      const sinY = Math.sin(s.ry);

      // --- Project every point and write pill styles ----------------------
      const pills = pillRefs.current;
      for (let i = 0; i < n; i++) {
        const p = basePoints[i];
        if (!p) continue;

        // rotateX
        const y1 = p.y * cosX - p.z * sinX;
        const z1 = p.y * sinX + p.z * cosX;
        const x1 = p.x;
        // rotateY
        const x2 = x1 * cosY + z1 * sinY;
        const z2 = -x1 * sinY + z1 * cosY;
        const y2 = y1;

        // Per-tag staggered fly-out: outer indices reach full radius slightly
        // later than inner ones. `local` is each tag's own 0..1 progress.
        let local = 1;
        if (entering) {
          const stagger = (i / denom) * STAGGER_FRACTION;
          local = clamp((eased - stagger) / localSpan, 0, 1);
        }
        const effR = R * local;

        const sx = cx + x2 * effR;
        const sy = cy + y2 * effR;

        // Fill projection buffers for ALL points before the line pass so edges
        // never read an unset/NaN index.
        projX[i] = sx;
        projY[i] = sy;
        projZ[i] = z2;
        projLocal[i] = local;

        const el = pills[i];
        if (!el) continue;

        // Map depth z2 in [-1,1] -> [0,1] (1 = front/near).
        const depth01 = (z2 + 1) / 2;
        const scale = SCALE_MIN + (SCALE_MAX - SCALE_MIN) * depth01;
        const opacity = (OPACITY_MIN + (OPACITY_MAX - OPACITY_MIN) * depth01) * local;

        // translate(-50%,-50%) centers the pill on its projected point.
        el.style.transform =
          "translate(" + sx + "px," + sy + "px) translate(-50%,-50%) scale(" + scale + ")";
        el.style.opacity = String(opacity);

        const z = 1000 + Math.round(depth01 * 1000);
        if (z !== prevZ[i]) {
          el.style.zIndex = String(z);
          prevZ[i] = z;
        }

        // Quantize the far-tag blur so the (raster-heavy) filter string is only
        // rewritten when the bucket changes, not every frame.
        const blurBucket = Math.round((BLUR_MAX_PX * (1 - depth01)) / BLUR_STEP) * BLUR_STEP;
        if (blurBucket !== prevBlur[i]) {
          el.style.filter = blurBucket > 0.05 ? "blur(" + blurBucket.toFixed(1) + "px)" : "none";
          prevBlur[i] = blurBucket;
        }
      }

      // --- Update constellation lines -------------------------------------
      if (svg) {
        const lines = lineRefs.current;
        for (let e = 0; e < edges.length; e++) {
          const ln = lines[e];
          if (!ln) continue;
          const a = edges[e].a;
          const b = edges[e].b;
          // Numeric coordinate writes (skip string build + attribute parse).
          ln.x1.baseVal.value = projX[a];
          ln.y1.baseVal.value = projY[a];
          ln.x2.baseVal.value = projX[b];
          ln.y2.baseVal.value = projY[b];
          // Average endpoint depth -> opacity AND width (near edges read
          // thicker/brighter, selling real 3D volume).
          const avgDepth01 = ((projZ[a] + projZ[b]) / 2 + 1) / 2;
          // Keep a line invisible until BOTH its pills have flown out.
          const gate = entering ? Math.min(projLocal[a], projLocal[b]) : 1;
          const lineOpacity = (LINE_OPACITY_MIN + LINE_OPACITY_RANGE * avgDepth01) * eased * gate;
          ln.style.strokeOpacity = lineOpacity.toFixed(3);
          ln.style.strokeWidth = (LINE_WIDTH_MIN + LINE_WIDTH_RANGE * avgDepth01).toFixed(2);
        }
      }

      rafId = window.requestAnimationFrame(frame);
    };

    rafId = window.requestAnimationFrame(frame);

    // ---- Pointer interaction (mouse + touch via Pointer Events) ----------
    const onPointerDown = (ev: PointerEvent) => {
      // Only react to the primary button / first touch.
      if (ev.button !== undefined && ev.button > 0) return;
      const s = state.current;
      s.dragging = true;
      s.pointerId = ev.pointerId;
      s.lastX = ev.clientX;
      s.lastY = ev.clientY;
      s.lastMoveTime = performance.now();
      s.dragVX = 0;
      s.dragVY = 0;
      // Kill the entrance instantly if the user grabs mid-fly.
      if (s.entranceStart >= 0) s.entranceStart = -1;
      try {
        container.setPointerCapture(ev.pointerId);
      } catch {
        /* ignore capture failures */
      }
      container.style.cursor = "grabbing";
    };

    const onPointerMove = (ev: PointerEvent) => {
      const s = state.current;
      if (!s.dragging || ev.pointerId !== s.pointerId) return;

      const dx = ev.clientX - s.lastX;
      const dy = ev.clientY - s.lastY;
      s.lastX = ev.clientX;
      s.lastY = ev.clientY;

      const now = performance.now();
      const dtMs = Math.max(1, now - s.lastMoveTime);
      s.lastMoveTime = now;

      // Drag horizontally -> spin around Y; vertically -> spin around X.
      const dRy = dx * DRAG_SENSITIVITY;
      const dRx = -dy * DRAG_SENSITIVITY;
      s.ry += dRy;
      s.rx += dRx;

      // Sample instantaneous angular velocity (rad per ~16.67ms frame).
      const frameScale = 16.6667 / dtMs;
      s.dragVY = dRy * frameScale;
      s.dragVX = dRx * frameScale;
    };

    const release = (ev: PointerEvent) => {
      const s = state.current;
      if (!s.dragging) return;
      if (s.pointerId !== null && ev.pointerId !== s.pointerId) return;
      s.dragging = false;
      s.pointerId = null;

      // Hand the sampled drag velocity to the inertia integrator. Cap it so a
      // violent flick can't make the cloud strobe.
      if (s.reduced) {
        s.vx = 0;
        s.vy = 0;
      } else {
        s.vx = clamp(s.dragVX, -FLING_CAP, FLING_CAP);
        s.vy = clamp(s.dragVY, -FLING_CAP, FLING_CAP);
      }

      try {
        if (ev.pointerId != null) container.releasePointerCapture(ev.pointerId);
      } catch {
        /* ignore */
      }
      container.style.cursor = "grab";
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", release);
    container.addEventListener("pointercancel", release);
    // pointerleave is a safety net: if setPointerCapture failed, a pointer
    // leaving without pointerup still releases the drag (no stuck-drag).
    container.addEventListener("pointerleave", release);

    return () => {
      window.cancelAnimationFrame(rafId);
      if (resizeObs) resizeObs.disconnect();
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", release);
      container.removeEventListener("pointercancel", release);
      container.removeEventListener("pointerleave", release);
    };
    // Re-run when geometry identity changes so closures capture fresh arrays.
  }, [basePoints, edges, tags.length]);

  // ---- Render ------------------------------------------------------------
  return (
    <div
      ref={containerRef}
      className={className}
      role="group"
      aria-label={label}
      style={{
        position: "relative",
        // Own stacking context so the per-pill z-index (up to ~2000) stays
        // contained and can't paint over other layers while scrolling.
        zIndex: 0,
        isolation: "isolate",
        width: "100%",
        height: HEIGHT_PX,
        margin: "0 auto",
        cursor: "grab",
        overflow: "visible",
        // pan-y lets vertical swipes scroll the page (no scroll-trap on touch);
        // horizontal drags still spin the sphere. Mouse drag is unaffected.
        touchAction: "pan-y",
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* Constellation overlay - one SVG, line nodes created once, mutated by
          ref every frame (geometry only, so it stays on the cheap path). */}
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          overflow: "visible",
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        <g>
          {edges.map((e, i) => (
            <line
              key={e.a + "-" + e.b + "-" + i}
              ref={(node) => {
                lineRefs.current[i] = node;
              }}
              x1={0}
              y1={0}
              x2={0}
              y2={0}
              stroke={accent.line}
              strokeWidth={1}
              strokeOpacity={0}
              strokeLinecap="round"
            />
          ))}
        </g>
      </svg>

      {/* Tag pills. Positioned absolutely; transformed every frame via refs. */}
      {tags.map((tag, i) => (
        <span
          key={tag + "-" + i}
          ref={(node) => {
            pillRefs.current[i] = node;
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: "translate(-50%,-50%) scale(0)",
            opacity: 0,
            fontFamily: PILL_FONT,
            fontSize: 13,
            lineHeight: 1,
            padding: "6px 12px",
            borderRadius: 8,
            background: accent.tagBg,
            border: "1px solid " + accent.tagBorder,
            color: accent.tagText,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
