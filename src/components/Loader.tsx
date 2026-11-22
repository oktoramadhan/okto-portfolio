'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/motion';

// Counts 0 to 100 on the first visit of a session, then slides up.
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      if (!html.classList.contains('preload')) return;
      const counter = { v: 0 };
      gsap
        .timeline({
          onComplete: () => {
            html.classList.remove('preload');
            try {
              sessionStorage.setItem('okto-loaded', '1');
            } catch {}
          },
        })
        .to(counter, {
          v: 100,
          duration: 1.3,
          ease: 'power2.out',
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(counter.v));
          },
        })
        .to(root.current, { yPercent: -100, duration: 0.9, ease: 'power3.inOut' });
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="loader fixed inset-0 z-[150] items-end justify-between bg-paper p-[var(--gutter)]">
      <span className="font-bold">Okto Ramadhan</span>
      <span
        ref={count}
        className="text-[clamp(5rem,20vw,16rem)] font-extrabold leading-[0.8] tracking-[-0.05em] tabular-nums">
        0
      </span>
    </div>
  );
}
