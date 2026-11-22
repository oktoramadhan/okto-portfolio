'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/motion';

// A paragraph whose words light up one by one as you scroll through it.
export default function WordsReveal({ text, className = '' }: { text: string; className?: string }) {
  const root = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('[data-w]', {
        opacity: 0.18,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top 85%', end: 'bottom 45%', scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <p ref={root} className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span key={i} data-w aria-hidden="true">
          {word}{' '}
        </span>
      ))}
    </p>
  );
}
