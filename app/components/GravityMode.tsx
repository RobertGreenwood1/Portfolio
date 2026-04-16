'use client';

import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

interface Props {
  onClose: () => void;
  initialCursorPos?: { x: number; y: number };
}

// Match the original BlueDot: w-8 h-8 = 32px diameter → radius 16
const CURSOR_R = 16;

function drawCursor(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  const r = CURSOR_R;

  // Subtle glow — matches the box-shadow on the original dot
  ctx.shadowColor = 'rgba(96, 165, 250, 0.5)';
  ctx.shadowBlur = 10;

  // bg-gradient-to-br from-blue-400 (#60a5fa) to-blue-600 (#2563eb)
  const grad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  grad.addColorStop(0, '#60a5fa');
  grad.addColorStop(1, '#2563eb');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowBlur = 0;
}

export default function GravityMode({ onClose, initialCursorPos }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const closingRef = useRef(false);

  const handleClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    cleanupRef.current?.();
    setTimeout(onClose, 350);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);;

    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-gravity]'));

    // ── Clone overlay ─────────────────────────────────────────────────────
    // Originals stay in document flow (just hidden). Clones go into a fixed
    // overlay and are what the physics engine moves. Restoring = unhide originals
    // + remove overlay. No layout reconstruction needed.
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:48;pointer-events:none;overflow:hidden;';
    document.body.appendChild(overlay);

    interface PhysEl {
      original: HTMLElement;
      clone: HTMLElement;
      body: Matter.Body;
      w: number;
      h: number;
    }

    const physEls: PhysEl[] = [];
    const engine = Matter.Engine.create({ gravity: { x: 0, y: 1.8 } });

    for (const el of targets) {
      const rect = el.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) continue;

      // Clone and pin at exact current viewport position
      const clone = el.cloneNode(true) as HTMLElement;
      clone.style.position   = 'fixed';
      clone.style.top        = '0';
      clone.style.left       = '0';
      clone.style.width      = `${rect.width}px`;
      clone.style.margin     = '0';
      clone.style.transition = 'none';
      clone.style.transform  = `translate(${rect.left}px, ${rect.top}px)`;
      overlay.appendChild(clone);

      // Hide original — keeps it in document flow so layout stays intact
      el.style.visibility = 'hidden';

      const w = rect.width;
      const h = Math.max(rect.height, 20);

      const body = Matter.Bodies.rectangle(
        rect.left + w / 2,
        rect.top + h / 2,
        Math.max(w, 48),
        h,
        { restitution: 0.4, friction: 0.4, frictionAir: 0.007, density: 0.0015 },
      );

      // Small random sideways nudge so they scatter, not fall in unison
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 2.5,
        y: Math.random() * 0.5,
      });

      Matter.Composite.add(engine.world, body);
      physEls.push({ original: el, clone, body, w, h });
    }

    // ── Boundaries ────────────────────────────────────────────────────────
    const W = window.innerWidth;
    const H = window.innerHeight;
    Matter.Composite.add(engine.world, [
      Matter.Bodies.rectangle(W / 2, H + 55, W * 4, 110, { isStatic: true, restitution: 0.35, friction: 0.6 }),
      Matter.Bodies.rectangle(-55,    H / 2, 110, H * 4, { isStatic: true }),
      Matter.Bodies.rectangle(W + 55, H / 2, 110, H * 4, { isStatic: true }),
    ]);

    // ── Cursor body — starts at the BlueDot's position ────────────────────
    const startX = initialCursorPos?.x ?? W / 2;
    const startY = initialCursorPos?.y ?? H / 2;

    const cursorBody = Matter.Bodies.circle(startX, startY, CURSOR_R, {
      isStatic: false, restitution: 0.65, friction: 0.05, frictionAir: 0,
    });
    Matter.Body.setMass(cursorBody, 20);
    Matter.Composite.add(engine.world, cursorBody);

    const mouse = { x: startX, y: startY };
    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('mousemove', onMouseMove);

    // ── Loop ──────────────────────────────────────────────────────────────
    let running = true;
    let lastTime = performance.now();

    const tick = (now: number) => {
      if (!running) return;
      const delta = Math.min(now - lastTime, 32);
      lastTime = now;

      Matter.Body.setVelocity(cursorBody, {
        x: (mouse.x - cursorBody.position.x) * 0.85,
        y: (mouse.y - cursorBody.position.y) * 0.85,
      });
      Matter.Body.setPosition(cursorBody, { x: mouse.x, y: mouse.y });
      Matter.Engine.update(engine, delta);

      for (const { clone, body, w, h } of physEls) {
        clone.style.transform = `translate(${(body.position.x - w / 2).toFixed(2)}px, ${(body.position.y - h / 2).toFixed(2)}px) rotate(${body.angle.toFixed(5)}rad)`;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawCursor(ctx, mouse.x, mouse.y);

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);

    // ── Cleanup / restore ─────────────────────────────────────────────────
    const doCleanup = () => {
      running = false;
      window.removeEventListener('mousemove', onMouseMove);

      // Unhide originals — they never left document flow, so layout is perfect
      for (const { original } of physEls) {
        original.style.visibility = '';
      }

      // Fade out the clone overlay
      overlay.style.transition = 'opacity 0.25s ease-out';
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 300);
    };

    cleanupRef.current = doCleanup;

    return () => {
      running = false;
      window.removeEventListener('mousemove', onMouseMove);
      for (const { original } of physEls) original.style.visibility = '';
      overlay.remove();
    };
  }, []);

  return (
    <>
      {/* Canvas — cursor blob, no pointer events */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 51 }} />

      {/* Full-screen click capture */}
      <div className="fixed inset-0 cursor-none" style={{ zIndex: 52 }} onClick={handleClose} />

      {/* Hint pill */}
      <div
        className="fixed bottom-7 left-1/2 -translate-x-1/2 pointer-events-none select-none px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm"
        style={{ zIndex: 53 }}
      >
        <p className="text-white/80 text-xs tracking-wide">click anywhere to restore</p>
      </div>
    </>
  );
}
