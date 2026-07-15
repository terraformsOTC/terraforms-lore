import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { quoteGroups, otherMaterials } from '@/data/oneThirteenisms';
import { transcriptIndex } from '@/data/transcripts';

export const metadata = {
  title: '113isms · Terraform Lore',
  description: 'Recordings, quotes and influences from the Mathcastles co-founder.',
  // Hidden page: reachable by direct URL only, kept out of search indexes.
  robots: { index: false, follow: false },
};

function SectionHeading({ label, blurb }) {
  return (
    <div className="mb-8" style={{ borderTop: '1px solid rgba(232, 232, 232, 0.12)', paddingTop: '14px' }}>
      <h2 className="text-sm" style={{ letterSpacing: '0.06em' }}>{label}</h2>
      {blurb && <p className="text-xs mt-1 dim-45" style={{ lineHeight: '1.6' }}>{blurb}</p>}
    </div>
  );
}

export default function OneThirteenismsPage() {
  return (
    <div className="content-wrapper">
      <Header />
      <main className="flex-1 px-6">
        <h1 className="text-3xl mb-2">113isms</h1>
        <p className="text-sm mb-14 dim-70" style={{ maxWidth: '640px', lineHeight: '1.6' }}>
          Recordings, quotes and influences from the Mathcastles co-founder.
          Sourced manually from Twitter spaces I&apos;ve listened in on and podcast
          appearances.
        </p>

        <div style={{ maxWidth: '720px' }}>
          {/* 1 — audio recordings & transcripts ------------------------------ */}
          <section className="mb-16">
            <SectionHeading
              label="audio recordings & transcripts"
              blurb="Full conversations — play the recording and read along, or open the transcript on its own page."
            />
            <ul className="flex flex-col">
              {transcriptIndex.map((t) => {
                const href = `/113isms/transcripts/${t.slug}`;
                return (
                  <li key={t.slug} className="mb-9">
                    <p className="text-xs mb-1 dim-50" style={{ letterSpacing: '0.04em' }}>
                      {t.kind} &middot; {t.date}
                    </p>
                    <h3 className="text-lg mb-2">
                      <a href={href}>{t.title}</a>
                    </h3>
                    {t.blurb && (
                      <p className="text-sm mb-2 dim-70" style={{ lineHeight: '1.6' }}>
                        {t.blurb}
                      </p>
                    )}
                    <a href={href} className="inline-block text-xs dim-65" style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                      {t.audio ? '▶ listen + read transcript' : 'read transcript'} &rarr;
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* 2 — quotes ------------------------------------------------------ */}
          <section className="mb-16">
            <SectionHeading
              label="quotes"
              blurb="Pithier pulls, grouped by source. Where the full talk lives here, the source links through to it."
            />
            {quoteGroups.map((group) => (
              <div key={group.source} className="mb-11">
                {group.transcript ? (
                  <a
                    href={`/113isms/transcripts/${group.transcript}`}
                    className="inline-block text-xs mb-4 dim-65"
                    style={{ letterSpacing: '0.04em', textDecoration: 'underline', textUnderlineOffset: '2px' }}
                  >
                    {group.source} &rarr;
                  </a>
                ) : (
                  <p className="text-xs mb-4 dim-50" style={{ letterSpacing: '0.04em' }}>
                    {group.source}
                  </p>
                )}
                <ul className="flex flex-col">
                  {group.items.map((item, i) =>
                    item.type === 'quote' ? (
                      <li
                        key={i}
                        className="mb-5"
                        style={{ borderLeft: '1px solid rgba(232, 232, 232, 0.18)', paddingLeft: '14px' }}
                      >
                        <p className="text-sm dim-85" style={{ lineHeight: '1.6' }}>
                          &ldquo;{item.text}&rdquo;
                        </p>
                        {item.note && <p className="text-xs mt-1 dim-35">{item.note}</p>}
                      </li>
                    ) : (
                      <li key={i} className="mb-5" style={{ paddingLeft: '14px' }}>
                        <p className="text-sm dim-45" style={{ lineHeight: '1.6' }}>
                          <span className="dim-40">&rsaquo;&nbsp;</span>
                          {item.text}
                        </p>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </section>

          {/* 3 — other materials -------------------------------------------- */}
          <section className="mb-16">
            <SectionHeading
              label="other materials"
              blurb="Talks from others 113 has cited as influences on their thinking."
            />
            <ul className="flex flex-col">
              {otherMaterials.map((m) => (
                <li key={m.url} className="mb-8">
                  <p className="text-xs mb-1 dim-50" style={{ letterSpacing: '0.04em' }}>
                    {m.author} &middot; {m.kind} &middot; {m.year}
                  </p>
                  <h3 className="text-base mb-2">
                    <a
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}
                    >
                      {m.title} &#8599;
                    </a>
                  </h3>
                  {m.note && (
                    <p className="text-sm dim-45" style={{ lineHeight: '1.6' }}>
                      {m.note}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
