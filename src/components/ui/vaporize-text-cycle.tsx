"use client";

import React, { createElement, memo, useEffect, useMemo, useRef, useState } from "react";

export enum Tag {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  P = "p",
}

type VaporizeTextCycleProps = {
  texts: string[];
  font?: {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: number;
  };
  color?: string;
  spread?: number;
  density?: number;
  animation?: {
    vaporizeDuration?: number;
  };
  direction?: "left-to-right" | "right-to-left";
  alignment?: "left" | "center" | "right";
  tag?: Tag;
  activationKey?: number;
  onComplete?: (activationKey: number) => void;
  vectorPath?: string;
  vectorViewBox?: {
    width: number;
    height: number;
  };
  vectorScale?: number;
};

type Particle = {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  opacity: number;
  originalAlpha: number;
  velocityX: number;
  velocityY: number;
  angle: number;
  speed: number;
  size: number;
  shouldFadeQuickly: boolean;
};

type TextBoundaries = {
  left: number;
  right: number;
  width: number;
};

type ParsedColor = {
  css: string;
};

const MAX_RENDER_DPR = 1.2;
const MAX_PARTICLES_DESKTOP = 5400;
const MAX_PARTICLES_MOBILE = 3200;

declare global {
  interface HTMLCanvasElement {
    textBoundaries?: TextBoundaries;
  }
}

export default function VaporizeTextCycle({
  texts = ["DESTRUCTION"],
  font = {
    fontFamily: "sans-serif",
    fontSize: "72px",
    fontWeight: 700,
  },
  color = "rgb(255, 255, 255)",
  spread = 3,
  density = 4,
  animation = {
    vaporizeDuration: 0.95,
  },
  direction = "left-to-right",
  alignment = "center",
  tag = Tag.P,
  activationKey = 0,
  onComplete,
  vectorPath,
  vectorViewBox,
  vectorScale = 1,
}: VaporizeTextCycleProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const textMaskRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number | null>(null);
  const lastActivatedRef = useRef<number | null>(null);
  const lastCompletedRef = useRef<number | null>(null);
  const colorRef = useRef(parseColor(color));
  const progressRef = useRef(0);
  const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });
  const [animationState, setAnimationState] = useState<"idle" | "vaporizing" | "done">("idle");

  const text = texts[0] || "DESTRUCTION";
  const globalDpr = useMemo(() => {
    if (typeof window === "undefined") {
      return 1;
    }
    return Math.min(window.devicePixelRatio || 1, MAX_RENDER_DPR);
  }, []);

  const vaporizeDuration = (animation.vaporizeDuration ?? 0.95) * 1000;

  useEffect(() => {
    const container = wrapperRef.current;
    if (!container) {
      return;
    }

    const updateSize = () => {
      const width = Math.round(container.clientWidth);
      const height = Math.round(container.clientHeight);

      setWrapperSize((currentSize) => {
        if (currentSize.width === width && currentSize.height === height) {
          return currentSize;
        }
        return { width, height };
      });
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => updateSize());
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !wrapperSize.width || !wrapperSize.height) {
      return;
    }

    if (animationState === "idle") {
      colorRef.current = parseColor(color);
      prepareCanvas({
        canvas,
        text,
        font,
        alignment,
        colorRef,
        particlesRef,
        wrapperSize,
        globalDpr,
        density,
        vectorPath,
        vectorViewBox,
        vectorScale,
      });
      drawStatic(canvas); // Keeps canvas clear until trigger
    } else if (animationState === "done") {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [
    alignment,
    animationState,
    color,
    density,
    font,
    globalDpr,
    text,
    vectorPath,
    vectorScale,
    vectorViewBox,
    wrapperSize,
  ]);

  useEffect(() => {
    if (!particlesRef.current.length) {
      return;
    }

    if (lastActivatedRef.current === null) {
      lastActivatedRef.current = activationKey;

      if (activationKey === 0) {
        if (textMaskRef.current) {
          textMaskRef.current.style.opacity = "1";
          textMaskRef.current.style.maskImage = "none";
          textMaskRef.current.style.webkitMaskImage = "none";
        }
        return;
      }

      progressRef.current = 0;
      resetParticles(particlesRef.current);
      if (textMaskRef.current) {
        textMaskRef.current.style.opacity = "1";
        textMaskRef.current.style.maskImage = "none";
        textMaskRef.current.style.WebkitMaskImage = "none";
      }
      setAnimationState("vaporizing");
      return;
    }

    if (activationKey === lastActivatedRef.current) {
      return;
    }

    lastActivatedRef.current = activationKey;
    progressRef.current = 0;
    resetParticles(particlesRef.current);
    if (textMaskRef.current) {
      textMaskRef.current.style.opacity = "1";
      textMaskRef.current.style.maskImage = "none";
      textMaskRef.current.style.WebkitMaskImage = "none";
    }
    setAnimationState("vaporizing");
  }, [activationKey, wrapperSize]);

  useEffect(() => {
    if (animationState !== "vaporizing") {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !canvas.textBoundaries) {
      return;
    }

    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      progressRef.current += (deltaTime * 1000) / vaporizeDuration;
      const progress = Math.min(progressRef.current, 1);
      const vaporizeX =
        direction === "left-to-right"
          ? canvas.textBoundaries!.left + canvas.textBoundaries!.width * progress
          : canvas.textBoundaries!.right - canvas.textBoundaries!.width * progress;

      // Update text wiping mask
      if (textMaskRef.current) {
        if (direction === "left-to-right") {
          const grad = `linear-gradient(to right, transparent ${Math.max(0, vaporizeX - 8)}px, black ${vaporizeX + 8}px)`;
          textMaskRef.current.style.webkitMaskImage = grad;
          textMaskRef.current.style.maskImage = grad;
        } else {
          const grad = `linear-gradient(to right, black ${Math.max(0, vaporizeX - 8)}px, transparent ${vaporizeX + 8}px)`;
          textMaskRef.current.style.webkitMaskImage = grad;
          textMaskRef.current.style.maskImage = grad;
        }
      }

      const finished = updateParticles(
        particlesRef.current,
        vaporizeX,
        deltaTime,
        spread,
        density,
        direction,
        font,
        vaporizeDuration
      );

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawParticles(ctx, particlesRef.current, colorRef.current, globalDpr);

      if (progress >= 1 && finished) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (textMaskRef.current) {
          textMaskRef.current.style.opacity = "0";
        }
        if (lastCompletedRef.current !== activationKey) {
          lastCompletedRef.current = activationKey;
          onComplete?.(activationKey);
        }
        setAnimationState("done");
        frameRef.current = null;
        return;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [activationKey, animationState, density, direction, globalDpr, onComplete, spread, vaporizeDuration, font]);

  return (
    <div
      ref={wrapperRef}
      style={{
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        position: "relative"
      }}
    >
      <div
        ref={textMaskRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: alignment === "left" ? "flex-start" : alignment === "right" ? "flex-end" : "center",
          color: color,
          fontFamily: font?.fontFamily,
          fontSize: font?.fontSize,
          fontWeight: font?.fontWeight,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          opacity: animationState === "done" ? 0 : 1,
        }}
      >
        {text}
      </div>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function prepareCanvas({
  canvas,
  text,
  font,
  alignment,
  colorRef,
  particlesRef,
  wrapperSize,
  globalDpr,
  density,
  vectorPath,
  vectorViewBox,
  vectorScale,
}: {
  canvas: HTMLCanvasElement;
  text: string;
  font: VaporizeTextCycleProps["font"];
  alignment: "left" | "center" | "right";
  colorRef: React.MutableRefObject<ParsedColor>;
  particlesRef: React.MutableRefObject<Particle[]>;
  wrapperSize: { width: number; height: number };
  globalDpr: number;
  density: number;
  vectorPath?: string;
  vectorViewBox?: { width: number; height: number; };
  vectorScale: number;
}) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = Math.floor(wrapperSize.width * globalDpr);
  canvas.height = Math.floor(wrapperSize.height * globalDpr);
  canvas.style.width = `${wrapperSize.width}px`;
  canvas.style.height = `${wrapperSize.height}px`;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = colorRef.current.css;

  let sampleLeft = 0;
  let sampleTop = 0;
  let sampleWidth = 0;
  let sampleHeight = 0;

  if (vectorPath && vectorViewBox) {
    const path = new Path2D(vectorPath);
    const availableWidth = canvas.width * 0.34;
    const availableHeight = canvas.height * 0.72;
    const scale = Math.min(availableWidth / vectorViewBox.width, availableHeight / vectorViewBox.height) * vectorScale;
    const drawnWidth = vectorViewBox.width * scale;
    const drawnHeight = vectorViewBox.height * scale;
    const offsetX = (canvas.width - drawnWidth) / 2;
    const offsetY = (canvas.height - drawnHeight) / 2;

    canvas.textBoundaries = {
      left: offsetX,
      right: offsetX + drawnWidth,
      width: drawnWidth,
    };

    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);
    ctx.fill(path);
    ctx.restore();

    const padding = Math.ceil(14 * globalDpr);
    sampleLeft = Math.max(0, Math.floor(offsetX - padding));
    sampleTop = Math.max(0, Math.floor(offsetY - padding));
    sampleWidth = Math.min(canvas.width - sampleLeft, Math.ceil(drawnWidth + padding * 2));
    sampleHeight = Math.min(canvas.height - sampleTop, Math.ceil(drawnHeight + padding * 2));
  } else {
    const fontSize = parseInt(font?.fontSize?.replace("px", "") || "72", 10);
    const internalFont = `${font?.fontWeight ?? 700} ${fontSize * globalDpr}px ${font?.fontFamily ?? "sans-serif"}`;

    ctx.font = internalFont;
    ctx.textAlign = alignment;
    ctx.textBaseline = "middle";

    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const ascent = metrics.actualBoundingBoxAscent || fontSize * globalDpr * 0.72;
    const descent = metrics.actualBoundingBoxDescent || fontSize * globalDpr * 0.24;

    let textX = canvas.width / 2;
    if (alignment === "left") textX = 0;
    if (alignment === "right") textX = canvas.width;

    const textY = canvas.height / 2;
    const textLeft = alignment === "center" ? textX - textWidth / 2 : alignment === "left" ? textX : textX - textWidth;

    canvas.textBoundaries = {
      left: textLeft,
      right: textLeft + textWidth,
      width: textWidth,
    };

    ctx.fillText(text, textX, textY);

    const padding = Math.ceil(fontSize * globalDpr * 0.18);
    sampleLeft = Math.max(0, Math.floor(textLeft - padding));
    sampleTop = Math.max(0, Math.floor(textY - ascent - padding));
    sampleWidth = Math.min(canvas.width - sampleLeft, Math.ceil(textWidth + padding * 2));
    sampleHeight = Math.min(canvas.height - sampleTop, Math.ceil(ascent + descent + padding * 2));
  }

  const imageData = ctx.getImageData(sampleLeft, sampleTop, sampleWidth, sampleHeight);
  const data = imageData.data;

  const densityStep = density <= 3 ? 5 : density <= 5 ? 4 : 3;
  const drawSize = vectorPath ? 2.4 : density <= 3 ? 2.2 : density <= 5 ? 1.8 : 1.5;
  const maxParticles = wrapperSize.width < 768 ? MAX_PARTICLES_MOBILE : MAX_PARTICLES_DESKTOP;

  const particles: Particle[] = [];

  for (let y = 0; y < sampleHeight; y += densityStep) {
    for (let x = 0; x < sampleWidth; x += densityStep) {
      const index = (y * sampleWidth + x) * 4;
      const alpha = data[index + 3];

      if (alpha > 120) {
        particles.push({
          x: sampleLeft + x,
          y: sampleTop + y,
          originalX: sampleLeft + x,
          originalY: sampleTop + y,
          opacity: alpha / 255,
          originalAlpha: alpha / 255,
          velocityX: 0,
          velocityY: 0,
          angle: 0,
          speed: 0,
          size: drawSize,
          shouldFadeQuickly: false,
        });
      }
    }
  }

  if (particles.length > maxParticles) {
    const stride = Math.ceil(particles.length / maxParticles);
    particlesRef.current = particles.filter((_, index) => index % stride === 0);
  } else {
    particlesRef.current = particles;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawStatic(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  // We explicitly do NOT draw particles here so the user sees only the high-res crisp HTML text.
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  color: ParsedColor,
  globalDpr: number,
) {
  ctx.save();
  ctx.scale(globalDpr, globalDpr);
  ctx.fillStyle = color.css;

  for (const particle of particles) {
    // Only render particles that have actually started moving (speed > 0)
    if (particle.opacity <= 0.02 || particle.speed === 0) {
      continue;
    }

    ctx.globalAlpha = particle.opacity;
    ctx.fillRect(particle.x / globalDpr, particle.y / globalDpr, particle.size, particle.size);
  }

  ctx.restore();
  ctx.globalAlpha = 1;
}

function updateParticles(
  particles: Particle[],
  vaporizeX: number,
  deltaTime: number,
  spread: number,
  density: number,
  direction: "left-to-right" | "right-to-left",
  fontProp: VaporizeTextCycleProps["font"],
  vaporizeDurationMS: number
) {
  let allGone = true;

  const fontSize = parseInt(fontProp?.fontSize?.replace("px", "") || "72", 10);
  const VAPORIZE_SPREAD = calculateVaporizeSpread(fontSize);
  const MULTIPLIED_VAPORIZE_SPREAD = VAPORIZE_SPREAD * spread;
  
  const transformedDensity = 0.3 + (density / 10) * 0.7;

  for (const particle of particles) {
    const shouldMove =
      direction === "left-to-right"
        ? particle.originalX <= vaporizeX
        : particle.originalX >= vaporizeX;

    if (!shouldMove) {
      allGone = false;
      continue;
    }

    if (particle.speed === 0) {
      // Thanos Snap Initial Burst
      const isLeftToRight = direction === "left-to-right";
      const baseAngle = isLeftToRight ? 0 : Math.PI;
      // Shoot out roughly in the direction of the sweep
      particle.angle = baseAngle + (Math.random() - 0.5) * Math.PI * 0.6;
      particle.speed = (Math.random() * 0.6 + 0.5) * MULTIPLIED_VAPORIZE_SPREAD * 1.8;
      
      particle.velocityX = Math.cos(particle.angle) * particle.speed;
      // Add a slight upward kick initially
      particle.velocityY = Math.sin(particle.angle) * particle.speed - MULTIPLIED_VAPORIZE_SPREAD * 1.5;
      
      particle.shouldFadeQuickly = Math.random() > transformedDensity;
    }

    // Thanos Dust Wind Physics: Aerodynamic Drag
    particle.velocityX *= 0.94;
    particle.velocityY *= 0.94;
    
    // Thanos Dust Wind Physics: Directional Wind Drag (drifting up and sideways)
    const windDirection = direction === "left-to-right" ? 1 : -1;
    particle.velocityX += windDirection * MULTIPLIED_VAPORIZE_SPREAD * deltaTime * 50;
    particle.velocityY -= MULTIPLIED_VAPORIZE_SPREAD * deltaTime * 90; // Drifts upward like smoke/dust
    
    particle.x += particle.velocityX * deltaTime * 14;
    particle.y += particle.velocityY * deltaTime * 14;

    const baseFadeRate = particle.shouldFadeQuickly ? 3.0 : 1.4;
    const durationBasedFadeRate = baseFadeRate * (2000 / vaporizeDurationMS);

    particle.opacity = Math.max(0, particle.opacity - deltaTime * durationBasedFadeRate);

    if (particle.opacity > 0.01) {
      allGone = false;
    }
  }

  return allGone;
}

function resetParticles(particles: Particle[]) {
  for (const particle of particles) {
    particle.x = particle.originalX;
    particle.y = particle.originalY;
    particle.opacity = particle.originalAlpha;
    particle.velocityX = 0;
    particle.velocityY = 0;
    particle.speed = 0;
    particle.angle = 0;
    particle.shouldFadeQuickly = false;
  }
}

function calculateVaporizeSpread(fontSize: number) {
  const points = [
    { size: 20, spread: 0.2 },
    { size: 50, spread: 0.5 },
    { size: 100, spread: 1.5 }
  ];

  if (fontSize <= points[0].size) return points[0].spread;
  if (fontSize >= points[points.length - 1].size) return points[points.length - 1].spread;

  let i = 0;
  while (i < points.length - 1 && points[i + 1].size < fontSize) i++;

  const p1 = points[i];
  const p2 = points[i + 1];

  return p1.spread + (fontSize - p1.size) * (p2.spread - p1.spread) / (p2.size - p1.size);
}

function parseColor(color: string): ParsedColor {
  const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  const rgbaMatch = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);

  if (rgbaMatch) {
    const [, red, green, blue] = rgbaMatch;
    return { css: `rgb(${red}, ${green}, ${blue})` };
  }

  if (rgbMatch) {
    const [, red, green, blue] = rgbMatch;
    return { css: `rgb(${red}, ${green}, ${blue})` };
  }

  return { css: "rgb(255, 255, 255)" };
}
