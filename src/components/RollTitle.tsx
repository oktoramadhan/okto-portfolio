'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/motion';

// Giant heading whose letters roll into place like an odometer.
export default function RollTitle({ lines, className = '' }: { lines: string[]; className?: string }) {
  const root = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set('[data-roll]', { yPercent: -50 });
        return;
      }
      gsap.to('[data-roll]', {
        yPercent: -50,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.045,
        scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
      });
    },
    { scope: root }
  );

  return (
    <h2 ref={root} className={className} aria-label={lines.join(' ')}>
      {lines.map((line, li) => (
        <span key={li} className="flex whitespace-nowrap" aria-hidden="true">
          {[...line].map((c, ci) => (
            <span key={ci} className="inline-flex h-[0.86em] overflow-hidden">
              <span data-roll className="flex flex-col leading-[0.86]">
                <span>{c === ' ' ? ' ' : c}</span>
                <span>{c === ' ' ? ' ' : c}</span>
              </span>
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
}
