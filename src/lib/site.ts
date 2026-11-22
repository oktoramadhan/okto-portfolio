// Everything you'll want to update lives here: links, backup videos, the main project.
// Edit this file and the whole site updates.

export const site = {
  year: '2026',
  // Used to load new videos and projects automatically.
  youtubeChannelId: 'UCw1PPzhIbzy4mTu26E8aaNQ',
  githubUser: 'oktoramadhan',
  name: 'Okto Ramadhan',
  shortName: 'Okto',
  tagline: 'Cycling, life updates and the things I build.',
  description:
    'Okto Ramadhan is a vlogger and web developer documenting cycling, university life and the projects he builds. Open for collaborations and freelance web work.',
  location: 'Indonesia',
  // Business email used by the "Email me" and "Copy email" buttons.
  email: 'oktorochan10@gmail.com',
  availability: 'Open for collaborations and freelance projects',
  replyTime: 'I reply within 2 days',
  // Where the "DM on Instagram" buttons go: your Instagram profile (visitors tap Message there).
  dm: 'https://www.instagram.com/oktoramadhan1/',
  socials: {
    youtube: { label: 'YouTube', handle: '@oktoramadhan1', url: 'https://www.youtube.com/@oktoramadhan1' },
    instagram: { label: 'Instagram', handle: '@oktoramadhan1', url: 'https://www.instagram.com/oktoramadhan1' },
    github: { label: 'GitHub', handle: 'oktoramadhan', url: 'https://github.com/oktoramadhan' },
  },
};

// New uploads appear on their own (see src/lib/youtube.ts). This list only does two jobs:
// 1) give a video a nicer topic and tags by its `id` (the 11-character code after watch?v= or /shorts/)
// 2) act as a backup if YouTube can't be reached.
export type Video = {
  id: string;
  title: string;
  kind: 'short' | 'video';
  topic: string;
  views?: string;
  year: string;
  tags: string[]; // scrolling skill tags on the homepage work cards
};
export const videos: Video[] = [
  {
    id: 'wxg4Vo-8fQM',
    title: 'Kegiatan Mahasiswa Kupu-kupu Semester 3',
    kind: 'video',
    topic: 'Life updates',
    views: '8:07',
    year: '2026',
    tags: ['Vlog', 'Campus life', 'Filming', 'Editing', 'Storytelling', 'YouTube'],
  },
  {
    id: 'y6diWuBIFO8',
    title: 'How to get 3D animated ASCII art in your terminal',
    kind: 'video',
    topic: 'Projects',
    views: '1.7K views',
    year: '2026',
    tags: ['Tutorial', 'Terminal', 'ASCII art', 'Screen recording', 'Editing', 'YouTube'],
  },
  {
    id: 'QNDKw9HkYoE',
    title: 'Porsche edit',
    kind: 'short',
    topic: 'Edits',
    views: '597 views',
    year: '2026',
    tags: ['Short', 'Cars', 'Editing', 'Color grading', 'Sound design', 'Instagram Reels'],
  },
  {
    id: 'VZd5DcPnAuI',
    title: 'Termas de Río Hondo 1:37.678, MotoGP 25',
    kind: 'video',
    topic: 'Gaming',
    views: '1:47',
    year: '2026',
    tags: ['Gaming', 'MotoGP 25', 'Hot lap', 'Racing', 'Editing', 'YouTube'],
  },
];

export const topics = [
  {
    name: 'Cycling',
    text: 'Rides, routes, gear and the slow climb to getting faster.',
  },
  {
    name: 'Life updates',
    text: 'University, freelancing and what a normal week actually looks like.',
  },
  {
    name: 'Projects',
    text: 'Apps and websites I build, from first idea to shipped release.',
  },
];

export const project = {
  name: 'JalokDuitNow',
  summary: 'A desktop money tracker that turns saving into a game.',
  repo: 'https://github.com/oktoramadhan/jalokduitnow',
  version: '1.1.0',
  stack: ['Java 21', 'JavaFX', 'Maven', 'Jackson', 'JUnit 5', 'GitHub Actions'],
  platforms: 'Windows and macOS',
  problem:
    'Most finance apps feel like homework. People log expenses for a week, then stop. I wanted tracking money to feel closer to keeping a streak in a game.',
  approach: [
    {
      title: 'Make the habit the reward',
      text: 'XP, levels, daily streaks with freeze tokens, badges and weekly quests reward the act of logging, not just saving.',
    },
    {
      title: 'Keep data on the device',
      text: 'No account and no server. Everything is stored locally, and data only leaves the computer when the user presses share.',
    },
    {
      title: 'Let people shape it',
      text: 'Custom columns, categories with icons, monthly budgets and savings goals, so it fits how each person thinks about money.',
    },
    {
      title: 'Never lose a record',
      text: 'Daily automatic backups, JSON export, CSV export and restore with a preview and a safety backup first.',
    },
  ],
  features: [
    'Income and expense tracking with search and filters',
    'Dashboard with pie and bar charts',
    'XP, levels, streaks, badges and weekly quests',
    'Monthly reports shareable to WhatsApp',
    'Budget alerts and reminders with quiet hours',
    'Light and dark themes',
    'Installers built for Windows (.msi) and macOS (.dmg)',
    'Tested on Ubuntu, Windows and macOS in CI',
  ],
};

export const devServices = [
  { name: 'Landing pages', text: 'A fast one-page site for a product, event or campaign.' },
  { name: 'Creator and personal sites', text: 'Portfolios like this one, built to turn visitors into contacts.' },
  { name: 'Small business websites', text: 'Clear pages, contact forms and the basics done right.' },
];
