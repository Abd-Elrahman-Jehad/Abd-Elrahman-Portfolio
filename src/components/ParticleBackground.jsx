import { useEffect, useRef } from "react";

export default function ParticleBackground({ paused }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null });
  const rafRef = useRef(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmallScreen = window.matchMedia("(max-width: 640px)").matches;

    function resize() {
      // Keep the canvas in CSS pixels. A large devicePixelRatio would multiply
      // the drawing cost without adding useful detail to this subtle background.
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initParticles() {
      const count = Math.min(isSmallScreen ? 34 : 62, Math.max(18, Math.floor(window.innerWidth / (isSmallScreen ? 22 : 19))));
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (isSmallScreen ? 0.18 : 0.3),
        vy: (Math.random() - 0.5) * (isSmallScreen ? 0.18 : 0.3),
        r: Math.random() * 1.4 + 0.5,
      }));
    }

    function onMouseMove(e) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }

    function clearMouse() {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    }

    resize();
    initParticles();
    window.addEventListener("resize", resize);
    window.addEventListener("resize", initParticles);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", clearMouse);

    function animate() {
      if (pausedRef.current || document.hidden) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const dotColor = isLight ? "91,140,255" : "139,168,255";
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const connectionDistance = isSmallScreen ? 92 : 110;
      const connectionDistanceSq = connectionDistance * connectionDistance;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        if (mouse.x !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 130 * 130 && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            p.x += (dx / dist) * 0.45;
            p.y += (dy / dist) * 0.45;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor},0.6)`;
        ctx.fill();
      }

      // Avoid a second sqrt for every particle pair. On phones the particle
      // count is also lower, which keeps scrolling and touch interactions fluid.
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistanceSq) {
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${dotColor},${0.12 * (1 - dist / connectionDistance)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    if (!prefersReduced) {
      rafRef.current = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", initParticles);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", clearMouse);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <canvas id="bg-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
