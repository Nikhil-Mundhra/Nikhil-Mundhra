"use client";

import { useEffect, useRef } from "react";

export default function ConstellationCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const palette = [
      { r: 22, g: 242, b: 179 },  // #16f2b3 emerald cyan
      { r: 139, g: 92, b: 246 },  // #8b5cf6 violet
      { r: 236, g: 72, b: 153 },  // #ec4899 pink
      { r: 56, g: 189, b: 248 },  // #38bdf8 sky blue
    ];

    const getParticleCount = () => {
      const area = width * height;
      return Math.min(85, Math.max(32, Math.floor(area / 20000)));
    };

    let particles = [];
    const linkDistance = 145;
    const mouseGrabDistance = 190;

    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
    };

    const createParticle = (x, y) => {
      const color = palette[Math.floor(Math.random() * palette.length)];
      const speed = 0.28 + Math.random() * 0.35;
      const angle = Math.random() * Math.PI * 2;
      return {
        x: x ?? Math.random() * width,
        y: y ?? Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 1.2 + Math.random() * 1.8,
        color,
        pulsePhase: Math.random() * Math.PI * 2,
      };
    };

    const initParticles = () => {
      const count = getParticleCount();
      particles = Array.from({ length: count }, () => createParticle());
    };

    initParticles();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handlePointerMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleClick = (e) => {
      if (prefersReducedMotion) return;
      for (let i = 0; i < 3; i++) {
        if (particles.length > 110) particles.shift();
        particles.push(createParticle(e.clientX, e.clientY));
      }
    };

    const renderFrame = (time = 0) => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        const pulse = 0.65 + 0.35 * Math.sin(time * 0.002 + p.pulsePhase);

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${
          0.65 * pulse
        })`;
        ctx.fill();

        // Connect nearby nodes (Euclidean constellation fabric)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < linkDistance * linkDistance) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / linkDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Interactive cursor synaptic grab & gentle repulsion physics
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mDistSq = mdx * mdx + mdy * mdy;

          if (mDistSq < mouseGrabDistance * mouseGrabDistance) {
            const mDist = Math.sqrt(mDistSq);
            const mAlpha = (1 - mDist / mouseGrabDistance) * 0.45;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(22, 242, 179, ${mAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            if (!prefersReducedMotion && mDist < 85 && mDist > 1) {
              const force = (85 - mDist) / 85;
              p.x += (mdx / mDist) * force * 0.9;
              p.y += (mdy / mDist) * force * 0.9;
            }
          }
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = window.requestAnimationFrame(renderFrame);
      }
    };

    renderFrame(0);

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("click", handleClick, { passive: true });

    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 opacity-85"
    />
  );
}
