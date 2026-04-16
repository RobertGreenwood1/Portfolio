'use client';

import { useEffect, useState } from 'react';

const SunIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2"  x2="12" y2="5" />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="4.22" y1="4.22"  x2="6.34" y2="6.34" />
    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
    <line x1="2"  y1="12" x2="5"  y2="12" />
    <line x1="19" y1="12" x2="22" y2="12" />
    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
    <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initial = saved || 'light';
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
    document.documentElement.classList.toggle('light', initial === 'light');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    document.documentElement.classList.toggle('light', next === 'light');
  };

  const isDark = theme === 'dark';

  // Track: 52px wide, 26px tall
  // Thumb: 20px, slides 3px → 29px
  const thumbX = isDark ? 29 : 3;

  if (!mounted) {
    return (
      <div
        className="relative flex items-center rounded-full border border-secondary cursor-wait"
        style={{ width: 52, height: 26 }}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative flex items-center rounded-full border border-secondary cursor-pointer focus:outline-none"
      style={{
        width: 52,
        height: 26,
        background: isDark ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
        transition: 'background 0.3s ease',
      }}
    >
      {/* Sun icon — left side */}
      <span
        className="absolute flex items-center justify-center"
        style={{
          left: 7,
          top: '50%',
          transform: 'translateY(-50%)',
          color: isDark ? 'var(--text-muted)' : 'var(--text-secondary)',
          opacity: isDark ? 0.4 : 1,
          transition: 'opacity 0.3s ease, color 0.3s ease',
        }}
      >
        <SunIcon />
      </span>

      {/* Moon icon — right side */}
      <span
        className="absolute flex items-center justify-center"
        style={{
          right: 7,
          top: '50%',
          transform: 'translateY(-50%)',
          color: isDark ? 'var(--text-secondary)' : 'var(--text-muted)',
          opacity: isDark ? 1 : 0.4,
          transition: 'opacity 0.3s ease, color 0.3s ease',
        }}
      >
        <MoonIcon />
      </span>

      {/* Sliding thumb */}
      <span
        style={{
          position: 'absolute',
          top: 3,
          left: thumbX,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: isDark ? '#f3f4f6' : '#111827',
          boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
          transition: 'left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease',
        }}
      />
    </button>
  );
}
