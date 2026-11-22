'use client';

import { useEffect, useRef } from 'react';
import FitText from './FitText';
import { Player, Thumb } from './YouTube';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '@/lib/motion';
import type { Video } from '@/lib/site';

// The hero: one video over a giant name.
// - On a computer the video slides left and right along a rail to follow the cursor (no tilt).
// - Scrolling makes the video grow until it fills the screen.
export default function Hero({ video }: { video: Video }) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  // Scroll: --p goes from 0 (small card) to 1 (full screen). CSS reads it for the size.
  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const ease = gsap.parseEase('power2.inOut');
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          el.style.setProperty('--p', ease(Math.min(1, self.progress / 0.8)).toFixed(4));
        },
      });
    },
    { scope: root }
  );

  // Cursor: slide along the rail. The offset fades to 0 as the video grows, since it then fills the width.
  useEffect(() => {
    const area = stage.current;
    const el = card.current;
    if (!area || !el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return; // touch screens keep it centred
      const r = area.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2)); // -1 (left) to 1 (right)
      const smallWidth = Math.min(704, window.innerWidth * 0.86, window.innerHeight * 0.46 * 1.6);
      el.style.setProperty('--x', `${(nx * (r.width - smallWidth)) / 2}px`);
    };
    const reset = () => el.style.setProperty('--x', '0px');

    window.addEventListener('pointermove', move);
    document.documentElement.addEventListener('mouseleave', reset);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('mouseleave', reset);
    };
  }, []);

  return (
    <section ref={root} className="h-[210svh] [--p:0] motion-reduce:h-auto">
      <div className="sticky top-0 grid h-svh grid-cols-[minmax(0,1fr)] grid-rows-[1fr_auto_auto] gap-[clamp(1rem,3vw,2rem)] px-gutter pb-26 pt-24 motion-reduce:relative">
        {/* The rail: the video can slide anywhere inside this area */}
        <div ref={stage} className="pointer-events-none absolute inset-x-[var(--gutter)] top-0 bottom-0" aria-hidden="true" />

        {/* Card: size follows --p (small to full screen). The slide is a CSS transition so it always settles smoothly. */}
        <div
          ref={card}
          className="absolute left-1/2 z-[5] overflow-hidden rounded-card bg-ink transition-transform duration-[800ms] ease-out-expo [--h0:calc(var(--w0)*0.625)] [--w0:min(44rem,86vw,calc(46svh*1.6))]"
          style={{
            top: 'calc((40% - var(--h0) / 2) + (5rem - 40% + var(--h0) / 2) * var(--p))',
            width: 'calc(var(--w0) + (100% - 2 * var(--gutter) - var(--w0)) * var(--p))',
            height: 'calc(var(--h0) + (100% - 5rem - var(--gutter) - var(--h0)) * var(--p))',
            transform: 'translateX(calc(-50% + var(--x, 0px) * (1 - var(--p))))',
          }}>
          <Player id={video.id} title={video.title} className="relative block size-full overflow-hidden border-0 bg-ink p-0">
            <Thumb id={video.id} className="absolute inset-0 size-full object-cover" />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 to-transparent to-45%" />
            <span className="pointer-events-none absolute left-4 top-3.5 z-[1] grid max-w-[min(26ch,85%)] gap-1.5 text-left text-white">
              <span className="mono text-soft">Latest upload</span>
              <span className="text-balance text-[clamp(1rem,calc(1.6vw+1.4vw*var(--p)),3rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em]">
                {video.title}
              </span>
            </span>
            <span className="absolute bottom-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3.5 py-2 text-[0.8rem] font-semibold leading-none text-ink transition-colors group-hover:bg-signal">
              Play video
            </span>
          </Player>
        </div>

        <div />
        <div>
          <div className="mb-[0.4em] flex justify-between text-[clamp(0.8rem,1.3vw,1.05rem)] font-bold uppercase">
            <span>Vlogs</span>
            <span>Rides</span>
            <span>Code</span>
          </div>
          <h1 aria-label="Okto Ramadhan" className="font-extrabold uppercase leading-[0.8] tracking-[-0.05em]">
            <FitText className="hidden sm:block">Okto Ramadhan</FitText>
            {/* Phones: two lines sized to the screen width ("RAMADHAN" fills it) */}
            <span className="block text-[15.2vw] sm:hidden" aria-hidden="true">
              <span className="block whitespace-nowrap">Okto</span>
              <span className="block whitespace-nowrap">Ramadhan</span>
            </span>
          </h1>
        </div>
        <div className="flex justify-between text-[0.95rem] font-semibold">
          <span>↓ Scroll for</span>
          <span>rides and code ↓</span>
        </div>
      </div>
    </section>
  );
}
