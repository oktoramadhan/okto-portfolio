'use client';

import { useRef, type ElementType } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/motion';

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
};

// Words slide up out of a mask when they scroll into view. Headings that are already on screen when the page
// loads (page titles) are left alone: the top of every page is always fully visible, never mid-animation.
export default function Rise({ text, as: Tag = 'span', className = '', delay = 0 }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      if (prefersReducedMotion()) return;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return; // already visible: keep it static
      gsap.from('[data-word]', {
        yPercent: 105,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.06,
        delay,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    },
    { scope: root }
  );

  return (
    <Tag ref={root} className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.04em] align-top">
          <span data-word className="inline-block">
            {word}
            {' '}
          </span>
        </span>
      ))}
    </Tag>
  );
}
