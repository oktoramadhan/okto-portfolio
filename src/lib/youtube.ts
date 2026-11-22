import { cacheLife } from 'next/cache';
import { site, videos as curated, type Video } from './site';

const decode = (s: string) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");

const formatViews = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '')}K views` : `${n} ${n === 1 ? 'view' : 'views'}`;

// Turns YouTube's public feed into our Video type. Shorts are recognised by their /shorts/ link.
function parseFeed(xml: string): Video[] {
  return xml
    .split('<entry>')
    .slice(1)
    .map((entry): Video | null => {
      const id = /<yt:videoId>([^<]+)</.exec(entry)?.[1];
      const title = /<title>([^<]*)</.exec(entry)?.[1];
      if (!id || !title) return null;
      const kind: Video['kind'] = /rel="alternate" href="[^"]*\/shorts\//.test(entry) ? 'short' : 'video';
      const year = (/<published>(\d{4})/.exec(entry)?.[1] ?? site.year).trim();
      const views = Number(/<media:statistics views="(\d+)"/.exec(entry)?.[1] ?? 0);
      const note = curated.find((v) => v.id === id); // your own topic and tags, if you wrote any
      return {
        id,
        kind,
        year,
        title: decode(title),
        views: formatViews(views),
        topic: note?.topic ?? (kind === 'short' ? 'Short' : 'Vlog'),
        tags: note?.tags ?? (kind === 'short' ? ['Short', 'Editing', 'YouTube Shorts', 'Instagram Reels'] : ['Vlog', 'Filming', 'Editing', 'YouTube']),
      };
    })
    .filter((v): v is Video => v !== null);
}

// Your channel's videos and Shorts, newest first. Refreshes by itself about every 30 minutes,
// so a new upload shows up on the site without you doing anything. If YouTube can't be reached
// it quietly falls back to the backup list in site.ts.
export async function getVideos(): Promise<Video[]> {
  'use cache';
  cacheLife({ stale: 300, revalidate: 1800, expire: 86400 });

  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${site.youtubeChannelId}`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`YouTube feed returned ${res.status}`);
    const list = parseFeed(await res.text());
    return list.length > 0 ? list : curated;
  } catch {
    return curated;
  }
}
