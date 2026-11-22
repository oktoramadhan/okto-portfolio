'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/motion';

// Giant heading whose letters roll like an odometer. The roll is tied to your scroll position, not to a timer:
// it plays as you scroll down to it and plays backwards as you scroll back up, so it can never get stuck.
export default function RollTitle({ lines, className = '' }: { lines: string[]; className?: string }) {
  const root = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return; // stays as plain text
      gsap.to('[data-roll]', {
        yPercent: -50,
        ease: 'none',
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: 'top 92%', end: 'top 30%', scrub: true },
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
