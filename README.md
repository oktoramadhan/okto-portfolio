# Okto Ramadhan: portfolio site

Vlogger and web developer portfolio, built with the same stack as the site it takes its style from:

- **Next.js 16** (App Router, Cache Components) with TypeScript
- **Tailwind CSS 4** for styling
- **GSAP** with ScrollTrigger for scroll animations
- **Lenis** for smooth scrolling
- **Motion** for the menu animation

Every page is prerendered as static HTML, so it's fast and cheap to host.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Update your content

Almost everything lives in **`src/lib/site.ts`**:

| What | Where |
|---|---|
| Business email | `site.email` |
| DM link (opens Instagram messages) | `site.dm` |
| Copyright year | `site.year` |
| Media-kit numbers | `stats` |
| Nicer topic and tags for a video (optional) and the offline backup list | `videos` |
| JalokDuitNow case study | `project` |

The pages listed in the dock menu are in `src/components/Dock.tsx`. The stack logos are in `src/components/StackGrid.tsx` (add or remove items there).

**Your photo and icon:** `public/okto.jpg` is your photo (dock avatar and the Myself section) and `src/app/icon.png` is the browser-tab icon.

## What updates by itself

The site refreshes its own data, so you don't edit or redeploy for these:

| New thing | What happens | How often |
|---|---|---|
| A video or Short on your YouTube channel | Appears on the Videos page and the Work section. The newest regular video becomes the homepage hero. View counts update too. | about every 30 minutes |
| A GitHub repository with the **`portfolio`** topic | Appears as a card in Work and in "More projects" on the Dev page (name, description, language, topics) | about every hour |
| A new release of JalokDuitNow | The version number on the Dev page updates | about every hour |

To show another repository, open it on GitHub, click the gear next to **About** and add the topic `portfolio`.

If YouTube or GitHub can't be reached, the site keeps working and uses the backup list in `src/lib/site.ts`.

Optional: set a `GITHUB_TOKEN` environment variable on your host to raise GitHub's request limit. The site works without it.

Still written by hand: the JalokDuitNow case study text, the "Myself" paragraph and the services wording.

## Where things are

```
src/app/            pages: /, /videos, /dev, /collaboration, /contact
src/components/     Hero (video that follows the cursor), Dock (expanding page list), Loader,
                    Rise / WordsReveal / RollTitle (text animations), StackGrid (logos)
src/lib/youtube.ts  loads your videos from YouTube's feed (refreshes by itself)
src/lib/github.ts   loads other projects and the latest release from GitHub
src/lib/motion.ts   GSAP + ScrollTrigger setup and the shared Lenis instance
src/app/globals.css design tokens (Tailwind @theme) and shared classes
```

Design tokens: paper `#f1f1ef`, ink `#141414`, dark panels `#1b1b1b`, tiles `#e3e3e0`, one orange signal `#ff5b1f`. Type is Archivo with JetBrains Mono for tag tickers.

## Deploy

Push to GitHub, then import the repo on [Vercel](https://vercel.com). It detects Next.js automatically.

## Old version

`legacy-astro/` holds the previous Astro version of this site. Delete the folder once you no longer need it.
