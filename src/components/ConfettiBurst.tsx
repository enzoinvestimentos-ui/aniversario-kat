import React, { useEffect, useRef } from 'react';

interface ConfettiBurstProps {
  triggerKey: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vRot: number;
  color: string;
  opacity: number;
  shape: 'rect' | 'circle' | 'heart';
}

const PALETTE = ['#E9A6AD', '#D98C98', '#D6A36A', '#8B5947', '#F4C9CE', '#E5BC8B'];

export const ConfettiBurst: React.FC<ConfettiBurstProps> = ({ triggerKey }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (triggerKey <= 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const particles: Particle[] = Array.from({ length: 46 }, (_, i) => {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.4;
      const speed = 4 + Math.random() * 6.5;
      const shapes: Particle['shape'][] = ['rect', 'circle', 'heart'];
      return {
        x: width * (0.25 + Math.random() * 0.5),
        y: height * 0.35 + (Math.random() - 0.5) * 60,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: 5 + Math.random() * 5,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.14,
        color: PALETTE[i % PALETTE.length],
        opacity: 0.92,
        shape: shapes[i % shapes.length],
      };
    });

    let rafId = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      let active = false;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.16; // soft gravity
        p.vx *= 0.99;
        p.rotation += p.vRot;
        if (p.y > height * 0.72) {
          p.opacity -= 0.022;
        }

        if (p.opacity > 0.02 && p.y < height + 30) {
          active = true;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;

          if (p.shape === 'rect') {
            ctx.fillRect(-p.size / 2, -p.size * 0.32, p.size, p.size * 0.64);
          } else if (p.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
            ctx.fill();
          } else {
            const s = p.size * 0.5;
            ctx.beginPath();
            ctx.moveTo(0, s * 0.6);
            ctx.bezierCurveTo(-s * 1.2, -s * 0.4, -s * 0.5, -s * 1.3, 0, -s * 0.4);
            ctx.bezierCurveTo(s * 0.5, -s * 1.3, s * 1.2, -s * 0.4, 0, s * 0.6);
            ctx.fill();
          }

          ctx.restore();
        }
      }

      if (active) {
        rafId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, [triggerKey]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 w-full h-full"
      aria-hidden="true"
    />
  );
};
