import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import VideoTile from '@/components/VideoTile';
import { site, topics } from '@/lib/site';
import { getVideos } from '@/lib/youtube';

export const metadata: Metadata = {
  title: 'Videos',
  description: 'Cycling, life updates and project videos by Okto Ramadhan.',
};

export default async function VideosPage() {
  const videos = await getVideos(); // refreshes by itself, new uploads appear here automatically
  const longs = videos.filter((v) => v.kind === 'video');
  const shorts = videos.filter((v) => v.kind === 'short');

  return (
    <>
      <PageHero title="Videos" lede="Rides, everyday life as a student and the projects I’m building. New uploads land on YouTube first.">
        <a className="btn" href={site.socials.youtube.url} target="_blank" rel="noopener">
          Subscribe on YouTube
        </a>
        <a className="btn btn-ghost" href={site.socials.instagram.url} target="_blank" rel="noopener">
          Follow on Instagram
        </a>
      </PageHero>

      {longs.length > 0 && (
        <section className="px-gutter py-[clamp(3rem,7vw,6rem)]">
          <h2 className="mb-8 text-big">Vlogs</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {longs.map((v) => (
              <VideoTile key={v.id} video={v} />
            ))}
          </div>
        </section>
      )}

      <section className="px-gutter pb-[clamp(4rem,9vw,8rem)]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="text-big">Shorts</h2>
            <p className="lede mt-3">Quick edits and moments, made for your phone.</p>
          </div>
          <a className="text-link" href={`${site.socials.youtube.url}/shorts`} target="_blank" rel="noopener">
            All Shorts on YouTube
          </a>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] gap-6">
          {shorts.map((v) => (
            <VideoTile key={v.id} video={v} />
          ))}
          <a
            href={site.socials.youtube.url}
            target="_blank"
            rel="noopener"
            className="flex min-h-80 flex-col justify-end gap-2 rounded-card bg-signal p-7 font-semibold text-ink no-underline">
            <span className="text-mid font-extrabold leading-none">More on the channel</span>
            <span>{site.socials.youtube.handle}</span>
          </a>
        </div>
      </section>

      <section className="panel mb-3 py-[clamp(4rem,9vw,8rem)]">
        <div className="px-[clamp(1.25rem,4vw,3rem)]">
          <h2 className="mb-10 text-big">What’s coming</h2>
          <ul className="grid gap-8 md:grid-cols-3">
            {topics.map((t) => (
              <li key={t.name} className="border-t border-[#444] pt-5">
                <h3 className="mb-2 text-mid">{t.name}</h3>
                <p className="text-dim">{t.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
