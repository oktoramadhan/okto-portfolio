import Link from 'next/link';
import { site } from '@/lib/site';

// Fixed info bar on a soft frosted strip, so your name stays readable over any section.
export default function TopBar() {
  const items = [
    { title: 'Currently', value: 'Studying, riding, building' },
    { title: 'Availability', value: 'Open for collabs', dot: true },
  ];

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[60]">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[5.25rem] bg-paper/90 backdrop-blur-md [mask-image:linear-gradient(#000_62%,transparent)]"
      />
      <div className="relative flex items-start justify-between gap-4 p-[var(--gutter)]">
        <div className="pointer-events-auto grid max-w-[52rem] flex-1 grid-cols-1 gap-4 md:grid-cols-3">
          <Link href="/" className="flex flex-col text-[0.9rem] leading-snug no-underline">
            <strong className="font-bold">{site.name}</strong>
            <span className="text-muted">Based in {site.location}</span>
          </Link>
          {items.map((item) => (
            <div key={item.title} className="hidden flex-col text-[0.9rem] leading-snug md:flex">
              <strong className="font-bold">{item.title}</strong>
              <span className="text-muted">
                {item.dot && <i className="mr-1.5 inline-block size-2 animate-pulse rounded-full bg-signal" />}
                {item.value}
              </span>
            </div>
          ))}
        </div>
        <Link href="/contact" className="btn pointer-events-auto">
          Get in touch
        </Link>
      </div>
    </header>
  );
}
