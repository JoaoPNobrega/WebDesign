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

    if (animationState !== "done") {
      drawStatic(canvas, particlesRef.current, colorRef.current, globalDpr);
    } else {
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
        return;
      }

      progressRef.current = 0;
      resetParticles(particlesRef.current);
      setAnimationState("vaporizing");
      return;
    }

    if (activationKey === lastActivatedRef.current) {
      return;
    }

    lastActivatedRef.current = activationKey;
    progressRef.current = 0;
    resetParticles(particlesRef.current);
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

      const finished = updateParticles(
        particlesRef.current,
        vaporizeX,
        deltaTime,
        spread,
        density,
        direction,
      );

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawParticles(ctx, particlesRef.current, colorRef.current, globalDpr);

      if (progress >= 1 && finished) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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
  }, [activationKey, animationState, density, direction, globalDpr, onComplete, spread, vaporizeDuration]);

  return (
    <div
      ref={wrapperRef}
      style={{
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
      <SeoElement tag={tag} texts={texts} />
    </div>
  );
}

const SeoElement = memo(({ tag = Tag.P, texts }: { tag: Tag; texts: string[] }) => {
  const style = useMemo(
    () => ({
      position: "absolute" as const,
      width: "0",
      height: "0",
      overflow: "hidden",
      userSelect: "none" as const,
      pointerEvents: "none" as const,
    }),
    [],
  );

  const safeTag = Object.values(Tag).includes(tag) ? tag : "p";
  return createElement(safeTag, { style }, texts.join(" "));
});

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
  vectorViewBox?: {
    width: number;
    height: number;
  };
  vectorScale: number;
}) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

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
    const scale =
      Math.min(
        availableWidth / vectorViewBox.width,
        availableHeight / vectorViewBox.height,
      ) * vectorScale;
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
    const internalFont = `${font?.fontWeight ?? 700} ${fontSize * globalDpr}px ${
      font?.fontFamily ?? "sans-serif"
    }`;

    ctx.font = internalFont;
    ctx.textAlign = alignment;
    ctx.textBaseline = "middle";

    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const ascent = metrics.actualBoundingBoxAscent || fontSize * globalDpr * 0.72;
    const descent = metrics.actualBoundingBoxDescent || fontSize * globalDpr * 0.24;

    let textX = canvas.width / 2;
    if (alignment === "left") {
      textX = 0;
    }
    if (alignment === "right") {
      textX = canvas.width;
    }

    const textY = canvas.height / 2;
    const textLeft =
      alignment === "center"
        ? textX - textWidth / 2
        : alignment === "left"
          ? textX
          : textX - textWidth;

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
    sampleHeight = Math.min(
      canvas.height - sampleTop,
      Math.ceil(ascent + descent + padding * 2),
    );
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

function drawStatic(
  canvas: HTMLCanvasElement,
  particles: Particle[],
  color: ParsedColor,
  globalDpr: number,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawParticles(ctx, particles, color, globalDpr);
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
    if (particle.opacity <= 0.02) {
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
) {
  let allGone = true;
  const velocityBase = 30 + spread * 7;

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
      particle.speed = velocityBase * (0.6 + Math.random() * 0.6);
      particle.velocityX = (Math.random() - 0.5) * particle.speed;
      particle.velocityY = (Math.random() - 0.55) * particle.speed;
      particle.shouldFadeQuickly = Math.random() > density / 10;
    }

    particle.x += particle.velocityX * deltaTime;
    particle.y += particle.velocityY * deltaTime;
    particle.velocityY -= deltaTime * 4;
    particle.velocityX *= 0.985;
    particle.velocityY *= 0.985;

    const fadeRate = particle.shouldFadeQuickly ? 2.8 : 2.1;
    particle.opacity = Math.max(0, particle.opacity - deltaTime * fadeRate);

    if (particle.opacity > 0.02) {
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
    particle.shouldFadeQuickly = false;
  }
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
