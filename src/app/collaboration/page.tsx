import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import CopyEmail from '@/components/CopyEmail';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Collaboration',
  description: 'Ask Okto Ramadhan for a collaboration on a video, a project or something new. Email or DM to start.',
};

export default function CollaborationPage() {
  return (
    <>
      <PageHero
        title="Collaboration"
        lede="Want to collaborate on a video, a project or something new? Ask for a collaboration by email or DM and tell me your idea. I reply within 2 days.">
        <a className="btn" href={`mailto:${site.email}?subject=${encodeURIComponent('Collaboration')}`}>
          Ask for collaboration
        </a>
        <a className="btn btn-ghost" href={site.dm} target="_blank" rel="noopener">
          DM on Instagram
        </a>
      </PageHero>

      <section className="px-gutter pb-[clamp(4rem,9vw,8rem)]">
        <div className="max-w-[40rem] border-t-[3px] border-ink pt-5">
          <h2 className="mb-4 text-xl">What to include</h2>
          <p className="mb-6 text-lg">Who you are, what you want to make together and roughly when. That’s all I need to get started.</p>
          <CopyEmail email={site.email} />
        </div>
      </section>
    </>
  );
}
