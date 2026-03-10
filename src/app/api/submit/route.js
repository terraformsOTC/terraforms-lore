import { NextResponse } from 'next/server';

// Use Vercel KV in production; fall back to local JSON file in dev
const IS_PROD = !!process.env.KV_REST_API_URL;

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
    const body = await request.json();
    const { type, zone, reference, explanation, sourceLink, handle } = body;

    if (!zone || !reference || !explanation) {
      return NextResponse.json({ error: 'missing required fields' }, { status: 400 });
    }

    const entry = {
      id: Date.now(),
      submittedAt: new Date().toISOString(),
      type: type === 'biome' ? 'biome' : 'zone',
      zone:        String(zone).slice(0, 100),
      reference:   String(reference).slice(0, 200),
      explanation: String(explanation).slice(0, 2000),
      sourceLink:  sourceLink ? String(sourceLink).slice(0, 500) : null,
      handle:      handle     ? String(handle).slice(0, 50)      : null,
    };

    if (IS_PROD) {
      const kv = await getKv();
      // lpush prepends to a Redis list — newest submissions first
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
