import { project } from '@/lib/site';

// A small drawing of the JalokDuitNow app, used as the project's preview image.
// Pass a width class (default 78% of its container).
export default function AppMock({ className = 'w-[78%]' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`overflow-hidden rounded-[10px] bg-white text-[0.8rem] text-ink ${className}`}>
      <div className="flex items-center gap-1.5 bg-ink px-3 py-2 font-bold text-white">
        <i className="size-2 rounded-full bg-[#444]" />
        <i className="size-2 rounded-full bg-[#444]" />
        <i className="size-2 rounded-full bg-[#444]" />
        <span className="ml-1.5">{project.name}</span>
      </div>
      <div className="grid gap-3 p-3.5">
        <div className="flex justify-between font-bold">
          <span>Level 7</span>
          <span>1,240 / 1,500 XP</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-tile">
          <b className="block h-full w-[83%] bg-signal" />
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-3">
          <div className="grid place-items-center rounded-lg bg-ink px-3.5 py-2.5 text-white">
            <strong className="text-[1.6rem] leading-none">21</strong>
            <span className="text-[0.65rem]">day streak</span>
          </div>
          <div className="grid content-center rounded-lg bg-paper p-2.5">
            <span className="text-muted">Weekly quest</span>
            <strong>Log 5 days in a row</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
