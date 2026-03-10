import Link from 'next/link';
import { CATEGORIES } from '@/data/zones';

export default function ZoneCard({ zone }) {
  if (zone.status === 'unknown') {
    return (
      <div
        style={{
          borderBottom: '1px solid rgba(232,232,232,0.06)',
          borderRight: '1px solid rgba(232,232,232,0.06)',
        }}
        className="p-4 flex items-center justify-between"
      >
        <span className="text-sm" style={{ opacity: 0.4 }}>{zone.name}</span>
        <span
          className="text-xs px-1"
          style={{ color: 'rgba(232,232,232,0.2)', border: '1px solid rgba(232,232,232,0.15)' }}
        >
          unidentified
        </span>
      </div>
    );
  }

  const isGuess = zone.status === 'guess';
  const cat = CATEGORIES[zone.category];

  return (
    <Link
      href={`/zones/${zone.id}`}
      style={{
        borderBottom: '1px solid rgba(232,232,232,0.08)',
        borderRight: '1px solid rgba(232,232,232,0.08)',
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <div className="p-4">
        {/* Palette swatch — only if palette has colors */}
        {zone.palette && zone.palette.length > 0 && (
          <div className="flex mb-3" style={{ height: '3px' }}>
            {zone.palette.map((color, i) => (
              <div key={i} style={{ flex: 1, backgroundColor: color }} />
            ))}
          </div>
        )}

        <div className="flex justify-between items-start gap-2">
          <span className="text-sm">{zone.name}</span>
          {isGuess ? (
            <span
              className="text-xs px-1 shrink-0"
              style={{
                color: 'rgba(251,191,36,0.7)',
                border: '1px solid rgba(251,191,36,0.35)',
              }}
            >
              community theory
            </span>
          ) : cat ? (
            <span
              className="text-xs px-1 shrink-0"
              style={{ color: cat.color, border: `1px solid ${cat.color}`, opacity: 0.85 }}
            >
              {cat.label}
            </span>
          ) : null}
        </div>

        <p className="text-xs mt-1" style={{ opacity: 0.45 }}>
          {isGuess ? zone.guess : zone.reference}
        </p>

        <p className="text-xs mt-2" style={{ opacity: 0.25 }}>→</p>
      </div>
    </Link>
  );
}
