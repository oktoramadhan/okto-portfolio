import Link from 'next/link';
import CopyEmail from './CopyEmail';
import { site } from '@/lib/site';

// Tile grid at the end of every page. A giant wordmark sits behind it: it's sharp in the gaps and
// blurred where a (frosted) tile covers it.
const tiles = [
  { href: '/videos', label: 'Videos', cls: 'col-span-2 md:row-span-2' },
  { href: '/dev', label: 'Dev', cls: 'md:row-span-2' },
  { href: '/collaboration', label: 'Collaboration', cls: '' },
  { href: site.socials.instagram.url, label: 'Instagram', cls: 'md:row-span-2', external: true },
  { href: site.socials.youtube.url, label: 'YouTube', cls: 'md:row-span-2', external: true },
  { href: site.socials.github.url, label: 'GitHub', cls: 'col-span-2 md:col-span-1', external: true },
];

export default function Footer() {
  return (
    <footer className="px-gutter pb-28 pt-[clamp(3rem,7vw,6rem)]">
      <div className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[44%] z-0 -translate-x-1/2 -translate-y-1/2 select-none text-[clamp(6rem,24vw,22rem)] font-extrabold leading-none tracking-[-0.06em] text-ink">
          okto
        </span>
        <nav aria-label="Footer" className="relative z-10 grid auto-rows-[clamp(6rem,11vw,10rem)] grid-cols-2 gap-2.5 md:grid-cols-3 md:auto-rows-[clamp(4.5rem,10vw,9.5rem)]">
          {tiles.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              target={t.external ? '_blank' : undefined}
              rel={t.external ? 'noopener' : undefined}
              className={`flex items-end rounded-card bg-tile/35 p-4 text-lg font-semibold no-underline backdrop-blur-[6px] transition-colors duration-300 hover:bg-signal hover:text-ink ${t.cls}`}>
              {t.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 text-sm">
        <p className="text-muted">
          © {site.year} {site.name}. Made between classes and rides.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a href={`mailto:${site.email}`} className="text-link">
            {site.email}
          </a>
          <CopyEmail email={site.email} className="btn btn-ghost !px-4 !py-2.5 text-sm" />
        </div>
      </div>
    </footer>
  );
}
