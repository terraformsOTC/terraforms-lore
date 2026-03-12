import { NextResponse } from 'next/server';

const IS_PROD = !!process.env.KV_REST_API_URL;

export async function GET(request) {
  // Protect with a secret token — set SUBMISSIONS_SECRET in Vercel env vars
  const secret = process.env.SUBMISSIONS_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'server misconfigured' }, { status: 500 });
  }
  const auth = request.headers.get('authorization') ?? '';
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    if (IS_PROD) {
      const { kv } = await import('@vercel/kv');
      const raw = await kv.lrange('submissions', 0, -1);
      const submissions = raw.map((item) =>
        typeof item === 'string' ? JSON.parse(item) : item
      );
      return NextResponse.json({ submissions });
    } else {
      const { readFile } = await import('fs/promises');
      const { default: path } = await import('path');
      const file = path.join(process.cwd(), 'submissions.json');
      let submissions = [];
      try {
        submissions = JSON.parse(await readFile(file, 'utf-8'));
      } catch {
        // no submissions file yet
      }
      return NextResponse.json({ submissions });
    }
  } catch (err) {
    console.error('submissions read error:', err);
    return NextResponse.json({ error: 'internal error' }, { status: 500 });
  }
}
