'use client';

import { useEffect, useRef, useState } from 'react';
import GravityMode from './GravityMode';

export default function BlueDot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const orbitDotsRef = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const [ripples, setRipples] = useState<number[]>([]);
  const [gameOpen, setGameOpen] = useState(false);
  const [dotCenter, setDotCenter] = useState<{ x: number; y: number } | undefined>();

  // Animation state — all in refs to avoid re-renders inside RAF
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const orbitAngle = useRef(0);
  const proximity = useRef(0);
  const rafId = useRef<number | undefined>(undefined);

  useEffect(() => {
    const MAGNET_RADIUS = 220;
    const MAX_PULL = 22;
    const LERP = 0.08;
    const ORBIT_R = 22;

    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Smooth proximity value 0→1 as cursor enters radius
      proximity.current = Math.max(0, 1 - dist / MAGNET_RADIUS);

      if (dist < MAGNET_RADIUS && dist > 0.1) {
        const pull = Math.pow(proximity.current, 1.5) * MAX_PULL;
        target.current = { x: (dx / dist) * pull, y: (dy / dist) * pull };
      } else {
        target.current = { x: 0, y: 0 };
      }
    };

    const tick = (time: number) => {
      const prevX = pos.current.x;
      const prevY = pos.current.y;

      // Lerp toward magnetic target
      pos.current.x += (target.current.x - pos.current.x) * LERP;
      pos.current.y += (target.current.y - pos.current.y) * LERP;

      const vx = pos.current.x - prevX;
      const vy = pos.current.y - prevY;
      const speed = Math.sqrt(vx * vx + vy * vy);

      const prox = proximity.current;

      // Subtle idle breathing via sine wave
      const breathe = 1 + Math.sin(time * 0.0015) * 0.04;
      const scale = breathe + speed * 0.6 + prox * 0.1;

      // Dynamic glow: dim at rest, blazing when cursor is close
      const glowSize = 4 + prox * 24;
      const glowAlpha = 0.1 + prox * 0.55;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) scale(${scale.toFixed(4)})`;
        dotRef.current.style.boxShadow = `0 0 ${glowSize}px ${(glowSize * 0.55).toFixed(1)}px rgba(96, 165, 250, ${glowAlpha.toFixed(3)})`;
      }

      // Orbit dots — faster spin when cursor is near, fade in/out
      const orbitSpeed = 0.018 + prox * 0.032;
      orbitAngle.current += orbitSpeed;
      const orbitRadius = ORBIT_R + prox * 10;

      orbitDotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        const angle = orbitAngle.current + (i * 2 * Math.PI) / 3;
        const ox = Math.cos(angle) * orbitRadius + pos.current.x * 0.2;
        const oy = Math.sin(angle) * orbitRadius + pos.current.y * 0.2;
        // Opacity flickers slightly as they orbit for depth
        const opacity = prox * 0.75 * (0.75 + 0.25 * Math.sin(angle * 2 + time * 0.002));

        dot.style.transform = `translate(${ox.toFixed(2)}px, ${oy.toFixed(2)}px)`;
        dot.style.opacity = String(Math.max(0, opacity).toFixed(3));
      });

      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleClick = () => {
    const id = Date.now();
    setRipples(prev => [...prev, id]);
    setTimeout(() => setRipples(prev => prev.filter(r => r !== id)), 800);
    if (containerRef.current) {
      const r = containerRef.current.getBoundingClientRect();
      setDotCenter({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    }
    setGameOpen(true);
  };

  return (
    <>
      {/* The dot — hidden when gravity mode is active so the canvas blob takes over */}
      <div
        ref={containerRef}
        className="relative w-8 h-8 flex items-center justify-center cursor-pointer"
        style={{ overflow: 'visible', visibility: gameOpen ? 'hidden' : undefined }}
        onClick={!gameOpen ? handleClick : undefined}
      >
        {/* Slow pulse ring */}
        <div className="absolute w-8 h-8 rounded-full bg-blue-400/15 dot-pulse-ring pointer-events-none" />

        {/* Orbit micro-dots */}
        {[0, 1, 2].map(i => (
          <div
            key={i}
            ref={el => { orbitDotsRef.current[i] = el; }}
            className="absolute w-1.5 h-1.5 rounded-full bg-blue-400 pointer-events-none"
            style={{ opacity: 0 }}
          />
        ))}

        {/* Click burst ripples */}
        {ripples.map(id => (
          <div
            key={id}
            className="absolute w-8 h-8 rounded-full border border-blue-400 pointer-events-none dot-burst"
          />
        ))}

        {/* Main dot */}
        <div
          ref={dotRef}
          className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"
          style={{ willChange: 'transform, box-shadow' }}
        />
      </div>

      {/* GravityMode is a sibling — NOT inside the hidden container,
          so its fixed-positioned canvas is never affected by visibility:hidden */}
      {gameOpen && (
        <GravityMode
          initialCursorPos={dotCenter}
          onClose={() => setGameOpen(false)}
        />
      )}
    </>
  );
}
