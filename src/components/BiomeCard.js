import Link from 'next/link';
import { BIOME_CATEGORIES } from '@/data/biomes';

export default function BiomeCard({ biome }) {
  if (biome.status === 'unknown') {
    return (
      <div
        style={{
          borderBottom: '1px solid rgba(232,232,232,0.06)',
          borderRight:  '1px solid rgba(232,232,232,0.06)',
        }}
        className="p-4"
      >
        <span className="text-sm" style={{ opacity: 0.4 }}>{biome.name}</span>
        {biome.nickname && (
          <span className="text-xs ml-2" style={{ opacity: 0.2 }}>— {biome.nickname}</span>
        )}
      </div>
    );
  }

  const isGuess = biome.status === 'guess';
  const catDef  = BIOME_CATEGORIES[biome.category];

  return (
    <Link
      href={`/biomes/${biome.id}`}
      style={{
        borderBottom: '1px solid rgba(232,232,232,0.08)',
        borderRight:  '1px solid rgba(232,232,232,0.08)',
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <div className="p-4">
        <div className="flex justify-between items-start gap-2 mb-1">
          <div>
            <span className="text-sm">{biome.name}</span>
            {biome.nickname && (
              <span className="text-xs ml-2" style={{ opacity: 0.35 }}>— {biome.nickname}</span>
            )}
          </div>

          {isGuess ? (
            <span
              className="text-xs px-1 shrink-0"
              style={{ color: 'rgba(251,191,36,0.7)', border: '1px solid rgba(251,191,36,0.35)' }}
            >
              community theory
            </span>
          ) : catDef ? (
            <span
              className="text-xs px-1 shrink-0"
              style={{ color: catDef.color, border: `1px solid ${catDef.color}`, opacity: 0.85 }}
            >
              {catDef.label}
            </span>
          ) : null}
        </div>

        <p className="text-xs mt-1" style={{ opacity: 0.45 }}>
          {isGuess ? biome.guess : biome.reference}
        </p>

        <p className="text-xs mt-2" style={{ opacity: 0.25 }}>→</p>
      </div>
    </Link>
  );
}
