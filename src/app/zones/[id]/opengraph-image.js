import { ImageResponse } from 'next/og';
import { zones } from '@/data/zones';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return zones.filter((z) => z.status !== 'unknown').map((z) => ({ id: z.id }));
}

export default function Image({ params }) {
  const zone = zones.find((z) => z.id === params.id);
  if (!zone) return new ImageResponse(<div>Not found</div>, { ...size });

  const ref = zone.reference ?? zone.guess ?? zone.suggestion ?? '';
  const palette = zone.palette ?? [];

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
        fontFamily: '"Courier New", Courier, monospace',
        color: '#e8e8e8',
        position: 'relative',
      }}
    >
      {/* Palette swatches */}
      {palette.length > 0 && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '52px' }}>
          {palette.map((color, i) => (
            <div
              key={i}
              style={{
                width: '52px',
                height: '52px',
                backgroundColor: color,
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* Zone name */}
      <div
        style={{
          fontSize: '80px',
          fontWeight: 'bold',
          lineHeight: 1.05,
          marginBottom: '28px',
          letterSpacing: '-1px',
        }}
      >
        {zone.name}
      </div>

      {/* Reference */}
      {ref && (
        <div style={{ fontSize: '30px', opacity: 0.55 }}>
          {ref}
        </div>
      )}

      {/* Site name */}
      <div
        style={{
          position: 'absolute',
          bottom: '44px',
          right: '80px',
          fontSize: '20px',
          opacity: 0.25,
          letterSpacing: '0.05em',
        }}
      >
        terraforms lore
      </div>
    </div>,
    { ...size }
  );
}
