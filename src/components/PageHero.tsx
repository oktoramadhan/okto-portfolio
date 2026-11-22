import type { ReactNode } from 'react';
import Rise from './Rise';
import { site } from '@/lib/site';

// Page opener: a small bracketed year, a giant uppercase title, then a short intro and actions.
export default function PageHero({ title, lede, children }: { title: string; lede: string; children?: ReactNode }) {
  return (
    <section className="px-gutter pb-[clamp(3rem,7vw,5rem)] pt-[clamp(7rem,15vw,11rem)]">
      <p className="mb-5 text-[0.95rem] font-medium">[{site.year}]</p>
      <h1 className="mb-[clamp(2rem,4vw,3rem)] text-[clamp(3rem,10.5vw,10rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.045em]">
        <Rise text={title} />
      </h1>
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <p className="lede text-ink">{lede}</p>
        {children && <div className="flex flex-wrap gap-2.5">{children}</div>}
      </div>
    </section>
  );
}
