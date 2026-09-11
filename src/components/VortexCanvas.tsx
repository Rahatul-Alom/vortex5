import { useEffect, useRef } from 'react';

export default function VortexCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particles system
    const particleCount = 140;
    const particles: {
      angle: number;
      radius: number;
      speed: number;
      size: number;
      baseAlpha: number;
      color: string;
      drift: number;
    }[] = [];

    const colors = ['#38bdf8', '#818cf8', '#22d3ee', '#6366f1', '#e0e7ff'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: 40 + Math.random() * (Math.min(width, height) * 0.48),
        speed: (0.003 + Math.random() * 0.008) * (Math.random() > 0.5 ? 1 : -1),
        size: 1 + Math.random() * 2.2,
        baseAlpha: 0.15 + Math.random() * 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        drift: (Math.random() - 0.5) * 0.2
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let time = 0;
    const render = () => {
      time += 0.01;
      // Smooth lerp toward mouse center
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.65 + (mouseX - width / 2) * 0.1;
      const centerY = height * 0.48 + (mouseY - height / 2) * 0.1;

      const isLight = document.documentElement.classList.contains('light');

      // Draw subtle orbital rings
      const ringRadii = [120, 220, 340, 480];
      ringRadii.forEach((r, idx) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = isLight
          ? (idx % 2 === 0 ? 'rgba(2, 132, 199, 0.09)' : 'rgba(79, 70, 229, 0.07)')
          : (idx % 2 === 0 ? 'rgba(56, 189, 248, 0.04)' : 'rgba(129, 140, 248, 0.03)');
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw central glow
      const radialGlow = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 280);
      radialGlow.addColorStop(0, isLight ? 'rgba(2, 132, 199, 0.12)' : 'rgba(56, 189, 248, 0.14)');
      radialGlow.addColorStop(0.5, isLight ? 'rgba(79, 70, 229, 0.05)' : 'rgba(99, 102, 241, 0.05)');
      radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 280, 0, Math.PI * 2);
      ctx.fill();

      // Update and draw particles
      particles.forEach((p) => {
        p.angle += p.speed;
        p.radius += p.drift;
        if (p.radius > Math.min(width, height) * 0.5) p.drift = -Math.abs(p.drift);
        if (p.radius < 50) p.drift = Math.abs(p.drift);

        // Orbital coordinates with slight elliptical skew
        const x = centerX + Math.cos(p.angle) * p.radius;
        const y = centerY + Math.sin(p.angle) * (p.radius * 0.75);

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isLight && p.color === '#e0e7ff' ? '#0369a1' : p.color;
        ctx.globalAlpha = p.baseAlpha * (0.8 + 0.2 * Math.sin(time * 2 + p.angle));
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="vortex-canvas-bg"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-85"
    />
  );
}
