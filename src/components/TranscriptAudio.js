// Presentational audio player for a transcript/recording, pinned at the top of
// its (podcast-style) page.
//
// Data comes from `audio` on a transcript (see src/data/transcripts/index.js):
//   { mp3, sizeLabel?, durationLabel? }  → native player + download link
//   { external: { label, url } }          → "listen out" link
//   null / undefined                      → renders nothing

function meta(audio) {
  return [audio.durationLabel, audio.sizeLabel].filter(Boolean).join(' · ');
}

export default function TranscriptAudio({ audio, slug }) {
  if (!audio) return null;

  // --- external host (e.g. the original podcast) ----------------------------
  if (audio.external) {
    return (
      <div className="audio-shell mb-8">
        <a
          href={audio.external.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm dim-85"
          style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}
        >
          &#9654; listen on {audio.external.label} &#8599;
        </a>
        <p className="text-xs mt-2 dim-35">
          hosted by the original publisher &mdash; opens in a new tab
        </p>
      </div>
    );
  }

  // --- self-hosted mp3 ------------------------------------------------------
  if (audio.mp3) {
    const filename = slug ? `${slug}.mp3` : undefined;
    return (
      <div className="audio-shell mb-8">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio className="audio-native" controls preload="none" src={audio.mp3} />
        <div className="flex items-center justify-between mt-3 text-xs">
          <a href={audio.mp3} download={filename} className="dim-65" style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            download mp3 &darr;
          </a>
          {meta(audio) && <span className="dim-35">{meta(audio)}</span>}
        </div>
      </div>
    );
  }

  return null;
}
