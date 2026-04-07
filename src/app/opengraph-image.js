import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  const imgData = readFileSync(join(process.cwd(), 'public/images/og-home.png.png'));
  const base64 = `data:image/png;base64,${imgData.toString('base64')}`;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0a',
      }}
    >
      <img src={base64} style={{ width: '1200px', height: '630px' }} />
    </div>,
    { ...size }
  );
}
