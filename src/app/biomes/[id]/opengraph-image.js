import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';
import { biomes } from '@/data/biomes';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return biomes.filter((b) => b.status !== 'unknown').map((b) => ({ id: b.id }));
}

export default function Image({ params }) {
  const biome = biomes.find((b) => b.id === params.id);
  if (!biome) return new ImageResponse(<div>Not found</div>, { ...size });

  const fontData = readFileSync(join(process.cwd(), 'public/fonts/NotoSansSymbols2-Regular.ttf'));
  const monoData = readFileSync(join(process.cwd(), 'public/fonts/SpaceMono-Regular.ttf'));

  const chars = biome.characterSet ?? '';
  const label = biome.nickname ?? biome.name;
  const ref = biome.guess ?? biome.reference ?? '';

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 80px',
        backgroundColor: '#0a0a0a',
        color: '#e8e8e8',
        position: 'relative',
      }}
    >
      {/* Character set */}
      {chars && (
        <div
          style={{
            display: 'flex',
            fontSize: '96px',
            letterSpacing: '12px',
            marginBottom: '48px',
            fontFamily: 'NotoSymbols',
            opacity: 0.9,
          }}
        >
          {chars}
        </div>
      )}

      {/* Biome name */}
      <div
        style={{
          fontSize: '64px',
          fontFamily: 'SpaceMono',
          fontWeight: 400,
          lineHeight: 1.05,
          marginBottom: ref ? '20px' : '0',
        }}
      >
        {label}
      </div>

      {/* Reference if known */}
      {ref && (
        <div style={{ fontSize: '26px', fontFamily: 'SpaceMono', opacity: 0.5 }}>
          {ref}
        </div>
      )}

      {/* Watermark */}
      <div
        style={{
          position: 'absolute',
          bottom: '44px',
          right: '80px',
          fontSize: '18px',
          fontFamily: 'SpaceMono',
          opacity: 0.2,
          letterSpacing: '0.05em',
        }}
      >
        terraform lore
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'NotoSymbols', data: fontData, weight: 400, style: 'normal' },
        { name: 'SpaceMono',   data: monoData,  weight: 400, style: 'normal' },
      ],
    }
  );
}
