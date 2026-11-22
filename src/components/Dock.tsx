'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import Ticker from './Ticker';
import AppMock from './AppMock';
import { Thumb } from './YouTube';
import { roles } from '@/lib/nav';

type Row = { href: string; label: string; thumb: ReactNode };

// Floating bar at the bottom. Opening it grows the bar upward into a list of pages, each with a small preview.
export default function Dock({ hasPhoto, videoId }: { hasPhoto: boolean; videoId: string }) {
  const [open, setOpen] = useState(false);
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstRow = useRef<HTMLAnchorElement>(null);

  // The menu closes by itself after going to another page
  const isOpen = open && openedOn === pathname;

  useEffect(() => {
    if (!isOpen) return;
    firstRow.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const toggle = () => {
    setOpenedOn(pathname);
    setOpen(!isOpen);
  };

  const rows: Row[] = [
    {
      href: '/',
      label: 'Home',
      // eslint-disable-next-line @next/next/no-img-element
      thumb: <img src="/okto-icon.jpg" alt="" className="size-full object-cover" />,
    },
    { href: '/videos', label: 'Videos', thumb: <Thumb id={videoId} className="size-full object-cover" /> },
    {
      href: '/dev',
      label: 'Dev',
      thumb: (
        <span className="relative block size-full bg-gradient-to-br from-[#2d2d2d] to-[#121212]">
          <span className="absolute left-1/2 top-1/2 w-[210px] -translate-x-1/2 -translate-y-1/2 scale-[0.3]">
            <AppMock className="w-full" />
          </span>
        </span>
      ),
    },
    {
      href: '/collaboration',
      label: 'Collaboration',
      thumb: (
        <span className="grid size-full place-items-center bg-signal p-1.5 text-center text-[0.62rem] font-extrabold uppercase leading-tight text-ink">
          Let’s collab
        </span>
      ),
    },
    {
      href: '/contact',
      label: 'Contact',
      thumb: <span className="grid size-full place-items-center bg-paper text-2xl font-extrabold tracking-[-0.05em] text-ink">Hi</span>,
    },
  ];

  return (
    <>
      {/* Clicking anywhere outside closes the menu */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[75] cursor-default bg-paper/50 backdrop-blur-sm"
        />
      )}

      {/* On inner pages a small "Home" card peeks out above the dock, like a way back */}
      {pathname !== '/' && !isOpen && (
        <Link
          href="/"
          className="fixed bottom-[calc(var(--gutter)+3.2rem)] left-1/2 z-[79] flex w-[min(30rem,calc(100%-2*var(--gutter)-1.5rem))] -translate-x-1/2 items-center gap-3 rounded-t-card bg-dark-2 px-3 pb-6 pt-2.5 text-dim no-underline transition-colors duration-300 hover:bg-signal hover:text-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/okto-icon.jpg" alt="" className="size-8 rounded-md" />
          <span className="text-lg font-medium">Home</span>
        </Link>
      )}

      <div className="fixed bottom-[var(--gutter)] left-1/2 z-[80] w-[min(32rem,calc(100%-2*var(--gutter)))] -translate-x-1/2 overflow-hidden rounded-card bg-ink text-white shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]">
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="pages"
              id="site-menu"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden">
              <nav aria-label="Site" className="grid gap-1 px-2 pt-2">
                {rows.map((row, i) => (
                  <motion.div
                    key={row.href}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                    <Link
                      ref={i === 0 ? firstRow : undefined}
                      href={row.href}
                      onClick={() => setOpen(false)}
                      className="group/row flex items-center gap-5 rounded-2xl p-1.5 no-underline transition-colors duration-300 hover:bg-white/10 focus-visible:bg-white/10">
                      <span className="block size-[4.5rem] flex-none overflow-hidden rounded-2xl bg-[#f5f5f5]">{row.thumb}</span>
                      <span className="text-[1.35rem] font-semibold tracking-[-0.02em] transition-colors duration-300 group-hover/row:text-signal">
                        {row.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <hr className="mx-4 mt-2 border-0 border-t border-[#333]" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-3.5 p-1.5">
          <Link
            href="/"
            aria-label="Home"
            className="grid size-[3.4rem] flex-none place-items-center overflow-hidden rounded-[10px] bg-signal text-xl font-extrabold tracking-[-0.04em] text-ink no-underline">
            {hasPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src="/okto.jpg" alt="" className="size-full object-cover object-top" />
            ) : (
              'OR'
            )}
          </Link>
          <div className="grid min-w-0 flex-1 gap-1">
            <strong className="text-[0.95rem] font-bold uppercase">Okto Ramadhan</strong>
            <Ticker items={roles} className="mono text-dim" />
          </div>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={isOpen}
            aria-controls="site-menu"
            onClick={toggle}
            className="relative size-12 flex-none cursor-pointer rounded-[10px] hover:bg-dark-2">
            <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
            <span
              aria-hidden="true"
              className={`absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 bg-white transition-transform duration-300 ${isOpen ? 'translate-y-0 rotate-45' : '-translate-y-[5px]'}`}
            />
            <span
              aria-hidden="true"
              className={`absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 bg-white transition-transform duration-300 ${isOpen ? 'translate-y-0 -rotate-45' : 'translate-y-[5px]'}`}
            />
          </button>
        </div>
      </div>
    </>
  );
}
