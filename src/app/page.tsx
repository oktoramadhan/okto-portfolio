import fs from 'node:fs';
import path from 'node:path';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Rise from '@/components/Rise';
import WordsReveal from '@/components/WordsReveal';
import Ticker from '@/components/Ticker';
import RollTitle from '@/components/RollTitle';
import StackGrid from '@/components/StackGrid';
import AppMock from '@/components/AppMock';
import ShortCover from '@/components/ShortCover';
import { Player, Thumb } from '@/components/YouTube';
import { site, project, type Video } from '@/lib/site';
import { getVideos } from '@/lib/youtube';
import { getPortfolioRepos, type Repo } from '@/lib/github';

const hasPhoto = fs.existsSync(path.join(process.cwd(), 'public', 'okto.jpg'));
const yy = site.year.slice(2);

const services = [
  {
    name: 'Video Content',
    text: 'Telling real stories from my rides, my studies and my projects, from the first idea to the final edit, so people connect with what they see and want to come along.',
    tags: ['Concepts', 'Filming', 'Editing', 'Color grading', 'Sound design', 'Storytelling'],
    href: '/videos',
    media: 'video' as const,
  },
  {
    name: 'Brand Collaboration',
    text: 'Helping brands show up in real life, with products used on my rides and in my week, and a plan to reach the people who will care about them.',
    tags: ['Ride along', 'Shorts package', 'Build and film', 'Long-term partner', 'Reporting'],
    href: '/collaboration',
    media: 'collab' as const,
  },
  {
    name: 'Development',
    text: 'Building digital products that combine design, technology and a clear goal to deliver seamless experiences, from desktop apps to fast websites.',
    tags: ['Frontend development', 'Java apps', 'JavaFX', 'Next.js', 'GSAP', 'Testing'],
    href: '/dev',
    media: 'dev' as const,
  },
];

// Dark work card that turns orange on hover
const cardClass =
  'group flex flex-col gap-3.5 overflow-hidden rounded-card bg-dark p-2.5 pb-3.5 text-white no-underline transition-colors duration-300 ease-io hover:bg-signal hover:text-ink';
const mediaClass = 'relative grid aspect-[16/10] w-full place-items-center overflow-hidden rounded-[10px] bg-[#2a2a2a]';

function CardMeta({ icon, name, cat, tags }: { icon: string; name: string; cat: string; tags: string[] }) {
  return (
    <>
      <div className="flex items-center justify-between gap-4 px-2.5 text-[0.95rem] font-bold uppercase">
        <span className="flex min-w-0 items-center gap-2.5">
          <i className="grid size-6 flex-none place-items-center rounded-full bg-white text-[0.7rem] not-italic text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-signal">
            {icon}
          </i>
          <span className="truncate">{name}</span>
        </span>
        <span className="whitespace-nowrap text-[0.85rem] font-semibold text-soft transition-colors duration-300 group-hover:text-ink">{cat}</span>
      </div>
      <Ticker items={tags} className="mono px-2.5 text-dim transition-colors duration-300 group-hover:text-ink/70" />
    </>
  );
}

function VideoCard({ v }: { v: Video }) {
  return (
    <div className={cardClass}>
      <Player id={v.id} title={v.title} className={`${mediaClass} border-0`}>
        {v.kind === 'short' ? (
          <ShortCover id={v.id} />
        ) : (
          <Thumb id={v.id} className="size-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105" />
        )}
      </Player>
      <CardMeta icon="▶" name={v.title} cat={`${v.kind === 'short' ? 'Short' : 'Video'}, ${v.year}`} tags={v.tags} />
    </div>
  );
}

function RepoCard({ r }: { r: Repo }) {
  return (
    <a href={r.url} target="_blank" rel="noopener" className={cardClass}>
      <div className={`${mediaClass} bg-gradient-to-br from-[#2d2d2d] to-[#121212] p-6 text-center`}>
        <span className="grid gap-2">
          <span className="text-big font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-white">{r.name}</span>
          {r.description && <span className="mx-auto max-w-[32ch] text-sm text-soft">{r.description}</span>}
        </span>
      </div>
      <CardMeta icon={r.name.charAt(0).toUpperCase()} name={r.name} cat={`Code, ${r.year}`} tags={[r.language, ...r.topics]} />
    </a>
  );
}

export default async function Home() {
  // Both refresh on their own: new uploads and new "portfolio" repos appear without any edit.
  const [videos, repos] = await Promise.all([getVideos(), getPortfolioRepos()]);
  const latest = videos.find((v) => v.kind === 'video') ?? videos[0];
  const works = videos.filter((v) => v.id !== latest.id); // everything except the hero video
  const firstShort = videos.find((v) => v.kind === 'short');

  return (
    <>
      <Hero video={latest} />

      {/* Myself */}
      <section className="grid items-end gap-[clamp(2rem,6vw,6rem)] px-gutter py-[clamp(4rem,9vw,8rem)] md:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="mb-6 text-sm font-bold uppercase">Myself</p>
          <WordsReveal
            className="max-w-[24ch] text-[clamp(1.75rem,3.6vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.035em]"
            text="Passionate about telling real stories on camera and building useful things in code, I make videos and software with purpose. With a focus on honesty, clean editing and detail, I help brands and people bring their ideas to life, from a first ride to a finished release."
          />
          <Link href="/collaboration" className="btn mt-10">
            Ask for collaboration
          </Link>
        </div>
        {hasPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/okto.jpg" alt={site.name} className="aspect-[4/5] w-full max-w-md justify-self-end rounded-card object-cover object-top md:max-w-none" />
        ) : (
          <div aria-hidden="true" className="grid aspect-[4/5] w-full place-items-center rounded-card bg-tile text-[5rem] font-extrabold tracking-[-0.05em] text-muted">
            OR
          </div>
        )}
      </section>

      {/* Work */}
      <section className="px-gutter">
        <div className="mb-4 flex items-end justify-between">
          <Rise as="h2" text="Work" className="display" />
          <span className="display">’{yy}</span>
        </div>
        <div className="rounded-[18px] bg-tile p-3">
          <div className="grid gap-3 md:grid-cols-2">
            <Link href="/dev" className={cardClass}>
              <div className={`${mediaClass} bg-gradient-to-br from-[#2d2d2d] to-[#121212]`}>
                <AppMock className="w-[78%] transition-transform duration-700 ease-out-expo group-hover:scale-105" />
              </div>
              <CardMeta icon="J" name={project.name} cat={`App, ${site.year}`} tags={project.stack} />
            </Link>
            {repos.map((r) => (
              <RepoCard key={r.name} r={r} />
            ))}
            {works.map((v) => (
              <VideoCard key={v.id} v={v} />
            ))}
          </div>
        </div>
        <div className="flex justify-center pt-10">
          <Link href="/videos" className="inline-flex items-center gap-2 text-lg font-semibold transition-colors hover:text-signal">
            See all
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Services: a dark panel inside a darker frame */}
      <section className="mx-gutter mt-[clamp(3rem,7vw,6rem)] rounded-[18px] bg-ink p-3 text-white">
        <div className="rounded-xl bg-dark px-[clamp(1.25rem,4vw,3rem)] py-[clamp(4rem,9vw,8rem)]">
          <div className="mb-[clamp(3rem,7vw,5rem)] grid gap-4 md:grid-cols-[minmax(8rem,1fr)_3fr] md:gap-8">
            <span className="mono pt-2.5 text-dim">Services</span>
            <WordsReveal
              className="max-w-[28ch] text-[clamp(1.5rem,3.4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.03em]"
              text="Evolving with every brief and built for impact, my process spans filming, editing, development and brand collaboration, aligning vision with execution to bring clarity and edge to every project."
            />
          </div>
          <ol>
            {services.map((s, i) => (
              <li
                key={s.name}
                className="group/row grid items-start gap-5 border-t border-[#3a3a3a] py-8 transition-colors duration-300 hover:border-signal md:grid-cols-[minmax(3rem,0.4fr)_1.4fr_1.6fr_minmax(9rem,1fr)] md:gap-8">
                <span className="mono pt-2 text-dim transition-colors duration-300 group-hover/row:text-signal">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] font-medium tracking-[-0.03em] transition-colors duration-300 group-hover/row:text-signal">{s.name}</h3>
                <div>
                  <p className="mb-4 text-soft">{s.text}</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <li key={t} className="chip transition-colors duration-300 group-hover/row:bg-signal group-hover/row:text-ink">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={s.href}
                  aria-label={s.name}
                  className="group relative grid aspect-[4/3] max-w-88 place-items-center overflow-hidden rounded-[10px] bg-[#2a2a2a] no-underline md:max-w-none">
                  {s.media === 'video' && (
                    <Thumb id={latest.id} className="size-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105" />
                  )}
                  {s.media === 'collab' &&
                    (firstShort ? <ShortCover id={firstShort.id} /> : <Thumb id={works[0]?.id ?? latest.id} className="size-full object-cover" />)}
                  {s.media === 'dev' && (
                    <div className="grid size-full place-items-center bg-gradient-to-br from-[#2d2d2d] to-[#121212]">
                      <AppMock className="w-[78%] transition-transform duration-700 ease-out-expo group-hover:scale-105" />
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* I'm professional at */}
      <section className="px-gutter pb-[clamp(4rem,9vw,8rem)] pt-[clamp(4rem,9vw,8rem)]">
        <RollTitle
          lines={['Ride. Film.', 'Build.']}
          className="mb-[clamp(3rem,7vw,5rem)] grid justify-items-center text-[clamp(3.5rem,13vw,13rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.05em]"
        />
        <p className="mb-5 text-sm font-bold uppercase">I’m professional at</p>
        <StackGrid />
      </section>
    </>
  );
}
