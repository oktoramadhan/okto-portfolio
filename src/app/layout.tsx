import fs from 'node:fs';
import path from 'node:path';
import type { Metadata, Viewport } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/site';
import { getVideos } from '@/lib/youtube';
import SmoothScroll from '@/components/SmoothScroll';
import Loader from '@/components/Loader';
import TopBar from '@/components/TopBar';
import Dock from '@/components/Dock';
import Footer from '@/components/Footer';

const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

export const metadata: Metadata = {
  title: { default: `${site.name}: vlogger and web developer`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { title: site.name, description: site.description, type: 'website' },
};

export const viewport: Viewport = { themeColor: '#f1f1ef' };

// Show the 0-100 loader only on the first page of a visit, and never with reduced motion.
const preloadScript = `document.documentElement.classList.add('js');try{if(!sessionStorage.getItem('okto-loaded')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('preload')}catch(e){}`;

// Drop a photo at public/okto.jpg and it replaces the "OR" avatar.
const hasPhoto = fs.existsSync(path.join(process.cwd(), 'public', 'okto.jpg'));

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const videos = await getVideos(); // for the Videos preview in the dock menu
  return (
    <html lang="en" className={`${archivo.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preloadScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="absolute -top-16 left-4 z-[200] rounded-lg bg-ink px-4 py-2.5 text-white focus:top-4">
          Skip to content
        </a>
        <SmoothScroll />
        <Loader />
        <TopBar />
        <main id="main">{children}</main>
        <Footer />
        <Dock hasPhoto={hasPhoto} videoId={(videos.find((v) => v.kind === 'video') ?? videos[0]).id} />
      </body>
    </html>
  );
}
