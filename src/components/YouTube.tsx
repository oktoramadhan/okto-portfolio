'use client';

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

export const thumb = (id: string, kind: 'video' | 'short' = 'video') =>
  `https://i.ytimg.com/vi/${id}/${kind === 'video' ? 'hq720' : 'hqdefault'}.jpg`;

// Thumbnail with a fallback: not every video has the sharp hq720 image.
export function Thumb({ id, kind = 'video', className = '' }: { id: string; kind?: 'video' | 'short'; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={thumb(id, kind)}
      alt=""
      loading="lazy"
      decoding="async"
      className={className}
      onError={(e) => {
        const img = e.currentTarget;
        const fallback = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
        if (img.src !== fallback) img.src = fallback;
      }}
    />
  );
}

type PlayerProps = {
  id: string;
  title: string;
  className?: string;
  children: ReactNode; // what shows before playing (thumbnail, labels)
};

// Click-to-play YouTube. Nothing loads from YouTube until the visitor presses play.
export function Player({ id, title, className = '', children }: PlayerProps) {
  const [playing, setPlaying] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);

  // Next.js keeps pages you leave mounted but hidden; stop the video when that happens.
  useLayoutEffect(() => {
    const f = frame.current;
    if (!f) return;
    if (f.dataset.paused) {
      f.src = `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
      delete f.dataset.paused;
    }
    return () => {
      f.dataset.paused = '1';
      f.src = 'about:blank';
    };
  }, [playing, id]);

  if (playing) {
    return (
      <iframe
        ref={frame}
        className={className}
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button type="button" className={`${className} group cursor-pointer`} onClick={() => setPlaying(true)} aria-label={`Play: ${title}`}>
      {children}
    </button>
  );
}
