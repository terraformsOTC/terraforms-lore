import { NextResponse } from 'next/server';

// Use Vercel KV in production; fall back to local JSON file in dev
const IS_PROD = !!process.env.KV_REST_API_URL;

// Max POST body: 8 KB — more than enough for a reference submission
const MAX_BODY_BYTES = 8 * 1024;

// Allowed origins for CSRF protection
const ALLOWED_ORIGINS = [
  'https://terraformlore.xyz',
  'https://www.terraformlore.xyz',
];

// Lazy-import so the module doesn't crash locally where KV env vars aren't set
async function getKv() {
  const { kv } = await import('@vercel/kv');
  return kv;
}

// Local dev fallback — write to submissions.json
async function saveLocally(entry) {
  const { writeFile, readFile } = await import('fs/promises');
  const { default: path } = await import('path');
  const file = path.join(process.cwd(), 'submissions.json');
  let submissions = [];
  try {
    submissions = JSON.parse(await readFile(file, 'utf-8'));
  } catch {
    // file doesn't exist yet
  }
  submissions.push(entry);
  await writeFile(file, JSON.stringify(submissions, null, 2), 'utf-8');
}

export async function POST(request) {
  try {
    // CSRF: verify origin in production
    if (IS_PROD) {
      const origin = request.headers.get('origin');
      if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
        return NextResponse.json({ error: 'forbidden' }, { status: 403 });
      }
    }

    // Reject oversized bodies before parsing (read as text to enforce real size)
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'request too large' }, { status: 413 });
    }

    const body = JSON.parse(raw);
    const { type, zone, reference, explanation, sourceLink, handle } = body;

    if (!zone || !reference || !explanation) {
      return NextResponse.json({ error: 'missing required fields' }, { status: 400 });
    }

    const entry = {
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
      type: type === 'biome' ? 'biome' : 'zone',
      zone:        String(zone).slice(0, 100),
      reference:   String(reference).slice(0, 200),
      explanation: String(explanation).slice(0, 2000),
      sourceLink:  sourceLink && /^https?:\/\//i.test(String(sourceLink))
                     ? String(sourceLink).slice(0, 500) : null,
      handle:      handle     ? String(handle).slice(0, 50)      : null,
    };

    if (IS_PROD) {
      const kv = await getKv();
      await kv.lpush('submissions', JSON.stringify(entry));
    } else {
      await saveLocally(entry);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('submit error:', err);
    return NextResponse.json({ error: 'internal error' }, { status: 500 });
  }
}
