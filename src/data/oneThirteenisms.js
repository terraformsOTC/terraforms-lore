// Content for the 113isms page.
//
// The page has three sections, in order:
//   1. recordings & transcripts — driven by src/data/transcripts (not here).
//   2. quotes         — `quoteGroups` below: pithy pulls, grouped by source.
//   3. other materials — `otherMaterials` below: talks/essays 113 points to.
//
// quoteGroups: each group is a source with a display `source` label and, when a
// full transcript for it lives on the site, a `transcript` slug — the source
// label then links through to that transcript. Groups without a slug render
// unlinked (their source isn't transcribed on-site yet).
//
// Item `type`:
//   'quote' — a direct quote, rendered between typographic quotation marks.
//   'note'  — a pointer or paraphrase (e.g. a Discord breadcrumb), rendered plainly.
// Optional `note` adds a small line of context beneath a quote.

export const quoteGroups = [
  {
    source: 'net society · ep 21 · 2025',
    transcript: 'net-society-ep21',
    items: [
      { type: 'quote', text: "The internet is the art city. It's not New York, it's not Basel, it's not Miami — it's the internet." },
    ],
  },
  {
    source: 'tf 4th birthday twitter spaces · 17 dec 2025',
    items: [
      { type: 'quote', text: 'I like to think of myself as pre-literate in the medium of computing' },
      { type: 'quote', text: 'How can you make an artwork when you can tell that hurricanes of obsolescence are going to crash into your context?' },
      { type: 'quote', text: 'The NFT space is a chalk sigil, you can just step outside of it' },
      { type: 'quote', text: 'Nobody here has yet cleaved the century in half… and you could.' },
    ],
  },
  {
    source: 'twitter spaces · may 2026',
    transcript: 'twitter-spaces-may-2026',
    items: [
      { type: 'quote', text: 'The thoughts that you think when media is cheap or fast or small are different' },
      { type: 'quote', text: 'The economy of how people relate to this image is rugged.' },
      { type: 'quote', text: "It's not that no one takes pictures, it's that pictures are a new phenomenon now" },
      { type: 'quote', text: "I don't want to be in the New York Times in 2026, I want to participate in my century." },
      { type: 'quote', text: 'Futuristic by definition means the past. It means that which we can codify as a widely distributed, known, safe image of the future' },
      { type: 'quote', text: "If it's something that could be called art today, it's not art. Or it's all just macaroni pictures. It's elderly scam calls on institutions that have nothing to say to the century, functionally speaking." },
      { type: 'quote', text: 'You have to put yourself into the lava. You have to dissolve yourself into the conditions of your time' },
    ],
  },
];

// Section 3 — talks & essays 113 cites as influences on their thinking and on
// Terraforms. Seed set below; curate/expand freely. `kind` is a short label
// ('talk' | 'essay'). `note` ties the piece to a 113 theme.
export const otherMaterials = [
  {
    author: 'Bret Victor',
    title: 'Inventing on Principle',
    kind: 'talk',
    year: 2012,
    url: 'https://vimeo.com/36579366',
    note: 'An immediate connection between a creator and what they make — the root of 113’s complaint that computing is an unfinished medium.',
  },
  {
    author: 'Bret Victor',
    title: 'The Future of Programming',
    kind: 'talk',
    year: 2013,
    url: 'https://worrydream.com/dbx/',
    note: 'Performed as a 1973 talk: a warning about how fast a medium ossifies into “known, safe” form — echoes “that which is legible as the future cannot be the future.”',
  },
  {
    author: 'Bret Victor',
    title: 'Media for Thinking the Unthinkable',
    kind: 'talk',
    year: 2013,
    url: 'https://worrydream.com/MediaForThinkingTheUnthinkable/',
    note: 'Representations as instruments of thought — adjacent to Terraforms as “impressionist paintings of n-dimensional worlds.”',
  },
  {
    author: 'Alan Kay',
    title: "The Computer Revolution Hasn't Happened Yet",
    kind: 'talk',
    year: 1997,
    url: 'https://archive.org/details/AlanKayAtOOPSLA1997TheComputerRevolutionHasntHappenedYet',
    note: 'The PARC-era argument that we are still “pre-literate in the medium of computing” — 113’s phrase, near verbatim.',
  },
];
