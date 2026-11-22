import { Player, Thumb } from './YouTube';
import type { Video } from '@/lib/site';

export default function VideoTile({ video }: { video: Video }) {
  const ratio = video.kind === 'short' ? 'aspect-[9/16]' : 'aspect-video';
  return (
    <article className="group/tile flex flex-col gap-3.5">
      <Player id={video.id} title={video.title} className={`relative block w-full overflow-hidden rounded-card border-0 bg-ink p-0 ${ratio}`}>
        <Thumb id={video.id} kind={video.kind} className="size-full object-cover transition-transform duration-700 ease-out-expo group-hover/tile:scale-105" />
        <span
          aria-hidden="true"
          className="absolute bottom-4 left-4 grid size-13 place-items-center rounded-full bg-signal text-ink transition-transform duration-300 group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="w-5">
            <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
          </svg>
        </span>
      </Player>
      <div>
        <h3 className="text-xl leading-tight tracking-[-0.01em] underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-300 group-hover/tile:text-signal group-hover/tile:decoration-signal">
          {video.title}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {video.topic}
          {video.views ? `, ${video.views}` : ''}
        </p>
      </div>
    </article>
  );
}
