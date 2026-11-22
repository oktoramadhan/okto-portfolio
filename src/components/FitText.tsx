'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';

// Scales its content so one line exactly fills the width of its container.
// Re-fits whenever the container resizes or a web font finishes loading, so the size never goes stale.
export default function FitText({ children, className = '' }: { children: ReactNode; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const container = box.current;
    const el = line.current;
    if (!container || !el) return;

    const fit = () => {
      const width = container.clientWidth;
      if (!width) return; // hidden (for example a page kept in the background): keep the last size
      el.style.fontSize = '100px';
      const natural = el.scrollWidth;
      if (natural) el.style.fontSize = `${(100 * width) / natural}px`;
    };

    fit();
    const raf = requestAnimationFrame(fit);
    document.fonts?.ready.then(fit);
    document.fonts?.addEventListener('loadingdone', fit);
    window.addEventListener('load', fit);
    const ro = new ResizeObserver(fit);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      document.fonts?.removeEventListener('loadingdone', fit);
      window.removeEventListener('load', fit);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={box} className={className}>
      <span ref={line} className="inline-block whitespace-nowrap" style={{ fontSize: '10vw' }}>
        {children}
      </span>
    </div>
  );
}
