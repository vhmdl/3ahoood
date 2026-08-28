import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  /** Accent tint (hex) blended into the nebula, e.g. the active stone color. */
  tint?: string | undefined;
  /** 0 = calm drift, 1 = energised. */
  intensity?: number;
  /**
   * Freeze the canvas star field and pause the nebula drift.
   * Used to free up the main thread / GPU during short, GPU-heavy
   * foreground transitions (e.g. the stone-open transition) so they
   * don't stutter on lower-power devices like older iPhones.
   */
  paused?: boolean;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
}

export function CosmicBackground({ tint, intensity = 0, paused = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const intensityRef = useRef(intensity);
  const pausedRef = useRef(paused);
  const reduced = useReducedMotion();

  intensityRef.current = intensity;
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let raf = 0;

    const seed = () => {
      const isSmall = width < 700;
      const count = reduced ? 40 : isSmall ? 70 : 160;
      particles = Array.from({ length: count }, () => {
        const z = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          r: 0.3 + z * 1.4,
          vx: (Math.random() - 0.5) * 0.06 * (0.3 + z),
          vy: (Math.random() - 0.5) * 0.06 * (0.3 + z),
          a: 0.15 + Math.random() * 0.6,
        };
      });
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    const draw = () => {
      // While paused, skip all redraw work (leaves the last frame on
      // screen) but keep the rAF chain alive so it resumes instantly.
      if (pausedRef.current) {
        raf = requestAnimationFrame(draw);
        return;
      }
      t += 1;
      ctx.clearRect(0, 0, width, height);
      const boost = 1 + intensityRef.current * 2.5;

      for (const p of particles) {
        if (!reduced) {
          p.x += p.vx * boost;
          p.y += p.vy * boost;
          if (p.x < -5) p.x = width + 5;
          if (p.x > width + 5) p.x = -5;
          if (p.y < -5) p.y = height + 5;
          if (p.y > height + 5) p.y = -5;
        }
        const twinkle = reduced ? 1 : 0.75 + Math.sin((t + p.x) * 0.01) * 0.25;
        ctx.globalAlpha = Math.min(1, p.a * twinkle);
        ctx.fillStyle = p.z > 0.75 ? "#dbe7ff" : "#8ea3c8";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#03040a]">
      <div className="nebula nebula-a" style={{ animationPlayState: paused ? "paused" : "running" }} />
      <div className="nebula nebula-b" style={{ animationPlayState: paused ? "paused" : "running" }} />
      {tint ? (
        <div
          className="absolute inset-0 transition-[background,opacity] duration-[1600ms] ease-out"
          style={{
            background: `radial-gradient(60% 60% at 50% 50%, ${tint}22 0%, transparent 70%)`,
          }}
        />
      ) : null}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,transparent_35%,#000000cc_100%)]" />
    </div>
  );
}
