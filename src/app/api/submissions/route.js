import { NextResponse } from 'next/server';

const IS_PROD = !!process.env.KV_REST_API_URL;

export async function GET() {
  try {
    if (IS_PROD) {
      const { kv } = await import('@vercel/kv');
      // lrange 0 -1 returns the full list
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
        // no submissions yet
      }
      return NextResponse.json({ submissions });
    }
  } catch (err) {
    console.error('submissions read error:', err);
    return NextResponse.json({ error: 'internal error' }, { status: 500 });
  }
}
