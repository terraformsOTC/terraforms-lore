import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  const imgData = readFileSync(join(process.cwd(), 'public/images/og-home.png'));
  const base64 = imgData.toString('base64');

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0a',
        position: 'relative',
      }}
    >
      {/* Hero image centred, letterboxed to fit 1200×630 */}
      <img
        src={`data:image/png;base64,${base64}`}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />

      {/* Tagline overlaid at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '0',
          right: '0',
          textAlign: 'center',
          fontFamily: 'monospace',
          fontSize: '16px',
          color: 'rgba(232,232,232,0.4)',
          letterSpacing: '0.08em',
        }}
      >
        community repository of zone &amp; biome references in the Terraforms collection
      </div>
    </div>,
    { ...size }
  );
}
