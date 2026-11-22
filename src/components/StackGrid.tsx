import {
  siPython,
  siJavascript,
  siRust,
  siC,
  siOpenjdk,
  siTypescript,
  siReact,
  siNextdotjs,
  siTailwindcss,
  siGreensock,
  siApachemaven,
  siJunit5,
  siGithubactions,
  type SimpleIcon,
} from 'simple-icons';

type Item = { name: string; icon: SimpleIcon };

// Languages first, then the tools around them. Add or remove items here.
const top: Item[] = [
  { name: 'Python', icon: siPython },
  { name: 'JavaScript', icon: siJavascript },
  { name: 'Rust', icon: siRust },
];

const rest: Item[] = [
  { name: 'C', icon: siC },
  { name: 'Java', icon: siOpenjdk },
  { name: 'TypeScript', icon: siTypescript },
  { name: 'React', icon: siReact },
  { name: 'Next.js', icon: siNextdotjs },
  { name: 'Tailwind CSS', icon: siTailwindcss },
  { name: 'GSAP', icon: siGreensock },
  { name: 'Maven', icon: siApachemaven },
  { name: 'JUnit', icon: siJunit5 },
  { name: 'GitHub Actions', icon: siGithubactions },
];

const cell =
  'flex flex-col items-center justify-center gap-3 border-b border-r border-line px-3 text-center transition-colors duration-300 hover:bg-ink hover:text-paper';

function Logo({ icon, className }: { icon: SimpleIcon; className: string }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true" className={className} fill="currentColor">
      <path d={icon.path} />
    </svg>
  );
}

// Hairline grid of logos. Hovering a cell fills it black and the logo turns white.
export default function StackGrid() {
  return (
    <div className="overflow-hidden">
      <ul className="-mr-px grid grid-cols-1 border-t border-line sm:grid-cols-3">
        {top.map((t) => (
          <li key={t.name} className={`${cell} h-[clamp(8rem,17vw,15rem)]`}>
            <Logo icon={t.icon} className="size-[clamp(3.25rem,6.5vw,6rem)]" />
            <span className="text-sm font-semibold">{t.name}</span>
          </li>
        ))}
      </ul>
      <ul className="-mr-px grid grid-cols-2 sm:grid-cols-5">
        {rest.map((t) => (
          <li key={t.name} className={`${cell} h-[clamp(7rem,12vw,10.5rem)]`}>
            <Logo icon={t.icon} className="size-[clamp(2rem,3.6vw,3.25rem)]" />
            <span className="text-xs font-semibold">{t.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
