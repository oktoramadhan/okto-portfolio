import { cacheLife } from 'next/cache';
import { site, project } from './site';

export type Repo = {
  name: string;
  description: string;
  url: string;
  language: string;
  topics: string[];
  year: string;
};

type ApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  pushed_at: string;
};

function headers(): HeadersInit {
  const h: Record<string, string> = { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-site' };
  // Optional: a token raises GitHub's request limit (set GITHUB_TOKEN on your host). The site works without it.
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

const featuredName = project.repo.split('/').pop()?.toLowerCase();

// Other projects to show next to JalokDuitNow. A repository appears here once it has the "portfolio" topic on
// GitHub (repository page, gear icon next to About, Topics). Refreshes by itself about every hour.
export async function getPortfolioRepos(): Promise<Repo[]> {
  'use cache';
  cacheLife({ stale: 600, revalidate: 3600, expire: 86400 });

  try {
    const res = await fetch(`https://api.github.com/users/${site.githubUser}/repos?per_page=100&sort=pushed`, {
      headers: headers(),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`GitHub returned ${res.status}`);
    const repos = (await res.json()) as ApiRepo[];
    return repos
      .filter((r) => !r.fork && !r.archived && r.topics?.includes('portfolio') && r.name.toLowerCase() !== featuredName)
      .map((r) => ({
        name: r.name,
        description: r.description ?? '',
        url: r.html_url,
        language: r.language ?? 'Code',
        topics: (r.topics ?? []).filter((t) => t !== 'portfolio'),
        year: r.pushed_at.slice(0, 4),
      }));
  } catch {
    return [];
  }
}

// The newest release of the main project, so its version number stays current.
export async function getLatestVersion(): Promise<string> {
  'use cache';
  cacheLife({ stale: 600, revalidate: 3600, expire: 86400 });

  try {
    const repoPath = project.repo.replace('https://github.com/', '');
    const res = await fetch(`https://api.github.com/repos/${repoPath}/releases/latest`, {
      headers: headers(),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return project.version;
    const tag = ((await res.json()) as { tag_name?: string }).tag_name;
    return tag ? tag.replace(/^v/i, '') : project.version;
  } catch {
    return project.version;
  }
}
