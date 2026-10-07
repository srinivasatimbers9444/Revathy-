import React, { useEffect, useRef } from 'react';

interface AmbientCanvasProps {
  effectMode?: 'petals' | 'stardust' | 'both';
  speed?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  type: 'petal' | 'star';
  color: string;
}

export const AmbientCanvas: React.FC<AmbientCanvasProps> = ({
  effectMode = 'both',
  speed = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates for gentle wind effect
    let mouseX = width / 2;
    let mouseY = height / 2;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Particle setup
    const particleCount = window.innerWidth < 768 ? 26 : 50;
    const particles: Particle[] = [];

    const petalColors = ['#f43f5e', '#fb7185', '#e11d48', '#fda4af', '#fca5a5'];
    const starColors = ['#fef08a', '#fde047', '#e0a96d', '#ffffff', '#fed7aa'];

    for (let i = 0; i < particleCount; i++) {
      const isPetal = effectMode === 'petals' || (effectMode === 'both' && Math.random() > 0.45);
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isPetal ? Math.random() * 8 + 6 : Math.random() * 2.5 + 1,
        speedY: (Math.random() * 0.7 + 0.3) * speed,
        speedX: (Math.random() * 0.6 - 0.3) * speed,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() * 1.5 - 0.75) * 0.02,
        opacity: Math.random() * 0.6 + 0.25,
        type: isPetal ? 'petal' : 'star',
        color: isPetal
          ? petalColors[Math.floor(Math.random() * petalColors.length)]
          : starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Wind influence from mouse
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.x -= (dx / dist) * 0.8;
          p.y -= (dy / dist) * 0.8;
        }

        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.rotation) * 0.3;
        p.rotation += p.rotSpeed;

        // Wrap around boundaries
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        if (p.type === 'petal') {
          // Draw soft organic rose petal shape
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.ellipse(0, 0, p.size * 1.2, p.size * 0.65, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw soft glowing star / stardust
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [effectMode, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    />
  );
};
