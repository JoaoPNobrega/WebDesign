"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type AetherFlowHeroProps = {
  className?: string;
  /** RGB triple (e.g. "0, 199, 167") used for particles + links. Defaults to the purple aether. */
  colorRgb?: string;
  /** When true, the canvas is cleared each frame (no opaque fill, no vignette) so it can sit subtly over any background. */
  transparent?: boolean;
};

type PointerState = {
  x: number | null;
  y: number | null;
  radius: number;
};

type Particle = {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string;
};

const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

export default function AetherFlowHero({ className, colorRgb, transparent = false }: AetherFlowHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    const particleColor = colorRgb ? `rgba(${colorRgb}, 0.82)` : "rgba(191, 128, 255, 0.82)";
    const lineRgb = colorRgb ?? "200, 150, 255";

    let animationFrameId = 0;
    let particles: Particle[] = [];
    const pointer: PointerState = { x: null, y: null, radius: 180 };
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

    const drawParticle = (particle: Particle) => {
      context.beginPath();
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2, false);
      context.fillStyle = particle.color;
      context.fill();
    };

    const updateParticle = (particle: Particle) => {
      if (particle.x > canvas.width || particle.x < 0) {
        particle.directionX = -particle.directionX;
      }

      if (particle.y > canvas.height || particle.y < 0) {
        particle.directionY = -particle.directionY;
      }

      if (pointer.x !== null && pointer.y !== null) {
        const dx = pointer.x - particle.x;
        const dy = pointer.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;

        if (distance < pointer.radius + particle.size) {
          const force = (pointer.radius - distance) / pointer.radius;
          particle.x -= (dx / distance) * force * 4.5;
          particle.y -= (dy / distance) * force * 4.5;
        }
      }

      if (!shouldReduceMotion) {
        particle.x += particle.directionX;
        particle.y += particle.directionY;
      }

      drawParticle(particle);
    };

    const initParticles = () => {
      particles = [];
      const particleCount = shouldReduceMotion ? 42 : Math.min(118, Math.max(58, Math.floor((canvas.width * canvas.height) / 22000)));

      for (let index = 0; index < particleCount; index += 1) {
        const size = Math.random() * 2 + 1;

        particles.push({
          x: Math.random() * (canvas.width - size * 4) + size * 2,
          y: Math.random() * (canvas.height - size * 4) + size * 2,
          directionX: (Math.random() * 0.42 - 0.21) * pixelRatio,
          directionY: (Math.random() * 0.42 - 0.21) * pixelRatio,
          size: size * pixelRatio,
          color: particleColor,
        });
      }
    };

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();

      canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      initParticles();
    };

    const connectParticles = () => {
      const maxDistance = Math.min(canvas.width, canvas.height) * 0.22;
      const maxDistanceSquared = maxDistance * maxDistance;

      for (let a = 0; a < particles.length; a += 1) {
        for (let b = a + 1; b < particles.length; b += 1) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < maxDistanceSquared) {
            const distance = Math.sqrt(distanceSquared);
            const opacity = Math.max(0, 1 - distance / maxDistance);
            const mouseDx = pointer.x === null ? Infinity : particles[a].x - pointer.x;
            const mouseDy = pointer.y === null ? Infinity : particles[a].y - pointer.y;
            const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

            context.strokeStyle =
              pointer.x !== null && mouseDistance < pointer.radius
                ? `rgba(255, 255, 255, ${opacity * 0.72})`
                : `rgba(${lineRgb}, ${opacity * 0.38})`;
            context.lineWidth = pixelRatio;
            context.beginPath();
            context.moveTo(particles[a].x, particles[a].y);
            context.lineTo(particles[b].x, particles[b].y);
            context.stroke();
          }
        }
      }
    };

    const render = () => {
      if (transparent) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        context.fillStyle = "#070707";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      for (const particle of particles) {
        updateParticle(particle);
      }

      connectParticles();
      animationFrameId = window.requestAnimationFrame(render);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const bounds = canvas.getBoundingClientRect();

      pointer.x = (event.clientX - bounds.left) * pixelRatio;
      pointer.y = (event.clientY - bounds.top) * pixelRatio;
    };

    const handleMouseOut = () => {
      pointer.x = null;
      pointer.y = null;
    };

    resizeCanvas();
    render();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [shouldReduceMotion, colorRgb]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", transparent ? "" : "bg-[#070707]", className)}>
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
      {!transparent && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,7,7,0.18)_46%,rgba(7,7,7,0.82)_100%)]" />
      )}
    </div>
  );
}
