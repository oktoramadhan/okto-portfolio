import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import CopyEmail from '@/components/CopyEmail';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Email or DM Okto Ramadhan to collaborate on a video, a project or a website.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Let’s talk" lede={`${site.availability}. ${site.replyTime}.`}>
        <a className="btn" href={`mailto:${site.email}`}>
          Email me
        </a>
        <a className="btn btn-ghost" href={site.dm} target="_blank" rel="noopener">
          DM on Instagram
        </a>
      </PageHero>

      <section className="grid gap-[clamp(2rem,5vw,5rem)] px-gutter pb-[clamp(4rem,9vw,8rem)] md:grid-cols-2">
        <div className="border-t-[3px] border-ink pt-5">
          <h2 className="mb-4 text-xl">Email</h2>
          <a href={`mailto:${site.email}`} className="text-mid break-all font-bold tracking-[-0.03em] no-underline hover:text-signal">
            {site.email}
          </a>
          <div className="mt-5">
            <CopyEmail email={site.email} />
          </div>
        </div>
        <div className="border-t-[3px] border-ink pt-5">
          <h2 className="mb-4 text-xl">Or find me on</h2>
          <ul>
            {Object.values(site.socials).map((s) => (
              <li key={s.url} className="flex justify-between gap-4 border-b border-line py-2.5">
                <a className="text-link" href={s.url} target="_blank" rel="noopener">
                  {s.label}
                </a>
                <span className="text-muted">{s.handle}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
