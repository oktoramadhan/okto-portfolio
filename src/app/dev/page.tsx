import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Rise from '@/components/Rise';
import FitText from '@/components/FitText';
import WordsReveal from '@/components/WordsReveal';
import { project, devServices, site } from '@/lib/site';
import { getLatestVersion, getPortfolioRepos } from '@/lib/github';

export const metadata: Metadata = {
  title: 'Dev',
  description: `${project.name}: ${project.summary} A case study by Okto Ramadhan.`,
};

export default async function DevPage() {
  // Both refresh on their own: the newest release number and any repo you tag with "portfolio" on GitHub.
  const [version, repos] = await Promise.all([getLatestVersion(), getPortfolioRepos()]);
  return (
    <>
      <PageHero title="Dev work" lede="Alongside the videos I write software. Here’s my latest release, and the kind of web work you can hire me for.">
        <Link className="btn" href="/contact">
          Hire me to build
        </Link>
        <a className="btn btn-ghost" href="#case-study">
          Read the case study
        </a>
      </PageHero>

      <article id="case-study" className="px-gutter pb-[clamp(4rem,9vw,8rem)]">
        {/* Dark case-study header */}
        <header className="rounded-card bg-dark p-2.5 text-white">
          <h2 className="px-[8%] py-[clamp(3rem,9vw,7rem)] text-center uppercase tracking-[-0.045em]">
            <FitText>
              <Rise text={project.name} />
            </FitText>
          </h2>
          <dl className="grid gap-x-8 gap-y-6 rounded-[10px] bg-dark-2 p-6 md:grid-cols-[0.6fr_1.2fr_1.4fr]">
            <div>
              <dt className="mono mb-2.5 text-dim">Year</dt>
              <dd className="text-big font-extrabold leading-none tracking-[-0.04em]">{site.year}</dd>
            </div>
            <div>
              <dt className="mono mb-2.5 text-dim">Stack</dt>
              <dd className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="mono mb-2.5 text-dim">Summary</dt>
              <dd className="leading-relaxed">
                {project.summary} Version {version} runs on {project.platforms}. Designed, built and released by
                me under the MIT license.
              </dd>
            </div>
          </dl>
        </header>

        <div className="border-b border-line py-[clamp(2.5rem,6vw,4.5rem)]">
          <h3 className="mb-6 text-mid">The problem</h3>
          <WordsReveal text={project.problem} className="max-w-[32ch] text-mid font-semibold leading-tight" />
        </div>

        <div className="border-b border-line py-[clamp(2.5rem,6vw,4.5rem)]">
          <h3 className="mb-6 text-mid">How I approached it</h3>
          <ul className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            {project.approach.map((a) => (
              <li key={a.title}>
                <h4 className="mb-2 text-xl font-extrabold tracking-[-0.02em]">{a.title}</h4>
                <p className="text-muted">{a.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-12 py-[clamp(2.5rem,6vw,4.5rem)] md:grid-cols-2">
          <div>
            <h3 className="mb-6 text-mid">What it does</h3>
            <ul>
              {project.features.map((f) => (
                <li key={f} className="relative border-b border-line py-3 pl-7 transition-colors duration-300 hover:border-signal hover:text-signal before:absolute before:left-0 before:top-[1.15rem] before:size-3 before:rounded-full before:bg-signal">
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-mid">What I learned</h3>
            <p className="text-lg leading-relaxed">
              Shipping is a different skill from coding. Installers, automated tests on three operating systems, backups
              and restore flows took as much thought as the features themselves.
            </p>
            <a className="btn mt-10" href={project.repo} target="_blank" rel="noopener">
              View the code on GitHub
            </a>
          </div>
        </div>
      </article>

      {repos.length > 0 && (
        <section className="px-gutter pb-[clamp(4rem,9vw,8rem)]">
          <h2 className="mb-8 text-big">More projects</h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {repos.map((r) => (
              <li key={r.name}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener"
                  className="group block rounded-card bg-dark p-6 text-white no-underline transition-colors duration-300 hover:bg-signal hover:text-ink">
                  <span className="mono mb-3 block text-dim transition-colors duration-300 group-hover:text-ink">{r.language}, {r.year}</span>
                  <span className="mb-2 block text-mid font-extrabold tracking-[-0.03em]">{r.name}</span>
                  {r.description && <span className="block text-soft transition-colors duration-300 group-hover:text-ink">{r.description}</span>}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="panel mb-3 py-[clamp(4rem,9vw,8rem)]">
        <div className="grid gap-12 px-[clamp(1.25rem,4vw,3rem)] md:grid-cols-2">
          <div>
            <h2 className="mb-5 max-w-[10ch] text-big">Need a website?</h2>
            <p className="lede">I take on a small number of freelance web projects alongside my studies.</p>
            <Link className="btn mt-8" href="/contact">
              Tell me about your project
            </Link>
          </div>
          <ul className="self-end">
            {devServices.map((s) => (
              <li key={s.name} className="border-t border-[#333] py-5">
                <h3 className="mb-1.5 text-xl">{s.name}</h3>
                <p className="text-soft">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
