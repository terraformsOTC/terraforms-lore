// Full transcripts linked from the 113isms page.
//
// The JSON files in this folder are generated from the author's source
// transcripts by scripts/normalize-transcripts.mjs — do not hand-edit them.
// Each transcript has the shape:
//   { slug, title, kind, date, dateSort, source, blurb, turns }
// where turns is [{ speaker: string | null, paras: string[] }].

import hivemind from './hivemind-june-2024.json';
import netSociety from './net-society-ep21.json';
import may2026 from './twitter-spaces-may-2026.json';

// Audio availability per transcript, keyed by slug. Kept HERE (never in the
// generated JSON) so re-running scripts/normalize-transcripts.mjs can't clobber
// it. Two mutually-exclusive shapes:
//   mp3      — a self-hosted, downloadable file → native player + download link.
//              e.g. { mp3: 'https://media.terraformlore.xyz/113-spaces-may-2026.mp3',
//                     sizeLabel: '72 MB', durationLabel: '2h 34m' }
//              Host on Cloudflare R2 (zero egress) and set the object's
//              Content-Disposition: attachment so downloads land cleanly.
//   external — hosted elsewhere (the original podcast) → a "listen out" link.
// null means transcript-only (no audio yet).
const audioBySlug = {
  'hivemind-june-2024': null,
  'net-society-ep21': {
    external: { label: 'transistor.fm', url: 'https://share.transistor.fm/s/4cdc9190' },
  },
  'twitter-spaces-may-2026': {
    mp3: 'https://media.terraformlore.xyz/113-spaces-may-2026.mp3',
    sizeLabel: '181 MB',
    durationLabel: '6h 18m',
  },
};

const withAudio = (t) => ({ ...t, audio: audioBySlug[t.slug] || null });

// Ordered oldest → newest to match the 113isms index.
export const transcripts = [hivemind, netSociety, may2026]
  .map(withAudio)
  .sort((a, b) => a.dateSort.localeCompare(b.dateSort));

export const transcriptSlugs = transcripts.map((t) => t.slug);

export function getTranscript(slug) {
  return transcripts.find((t) => t.slug === slug) || null;
}

// Lightweight metadata (no body) for listings.
export const transcriptIndex = transcripts.map(
  ({ slug, title, kind, date, dateSort, blurb, audio }) => ({
    slug,
    title,
    kind,
    date,
    dateSort,
    blurb,
    audio,
  })
);
