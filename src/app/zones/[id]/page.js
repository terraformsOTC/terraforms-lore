import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import { zones, CATEGORIES } from '@/data/zones';

export async function generateStaticParams() {
  return zones
    .filter((z) => z.status !== 'unknown')
    .map((z) => ({ id: z.id }));
}

export async function generateMetadata({ params }) {
  const zone = zones.find((z) => z.id === params.id);
  if (!zone) return {};
  return {
    title: `${zone.name} — terraforms lore`,
    description: zone.description?.slice(0, 160),
  };
}

export default function ZonePage({ params }) {
  const zone = zones.find((z) => z.id === params.id);

  if (!zone || zone.status === 'unknown') notFound();

  const isGuess = zone.status === 'guess';
  const cat = CATEGORIES[zone.category];

  return (
    <div className="content-wrapper">
      <Header />

      <main className="flex-1 px-6" style={{ maxWidth: '800px' }}>

        {/* Back link */}
        <a
          href="/"
          className="text-xs"
          style={{ opacity: 0.4, display: 'inline-block', marginBottom: '2rem' }}
        >
          ← zone references
        </a>

        {/* Palette swatch */}
        {zone.palette && zone.palette.length > 0 && (
          <div className="flex mb-8" style={{ height: '10px' }}>
            {zone.palette.map((color, i) => (
              <div key={i} style={{ flex: 1, backgroundColor: color }} />
            ))}
          </div>
        )}

        {/* Title row */}
        <div className="flex justify-between items-start gap-4 mb-2">
          <h1 className="text-3xl">{zone.name}</h1>
          {isGuess ? (
            <span
              className="text-xs px-1 shrink-0 mt-2"
              style={{ color: 'rgba(251,191,36,0.7)', border: '1px solid rgba(251,191,36,0.35)' }}
            >
              community theory
            </span>
          ) : cat ? (
            <span
              className="text-xs px-1 shrink-0 mt-2"
              style={{ color: cat.color, border: `1px solid ${cat.color}`, opacity: 0.85 }}
            >
              {cat.label}
            </span>
          ) : null}
        </div>

        {/* Reference / theory subtitle */}
        <p className="text-sm mb-8" style={{ opacity: isGuess ? 0.45 : 0.7 }}>
          {isGuess ? zone.guess : zone.reference}
        </p>

        {/* Description */}
        <p className="text-sm mb-10" style={{ opacity: 0.65, lineHeight: '1.8' }}>
          {zone.description}
        </p>

        {/* Images */}
        {zone.images && (zone.images.zone || zone.images.reference) && (
          <div
            className="grid gap-4 mb-10"
            style={{
              gridTemplateColumns: zone.images.zone && zone.images.reference
                ? '1fr 1fr'
                : '1fr',
            }}
          >
            {zone.images.zone && (
              <div>
                <p className="text-xs mb-2" style={{ opacity: 0.35 }}>zone parcel</p>
                <img
                  src={zone.images.zone}
                  alt={`${zone.name} zone parcel`}
                  className="w-full"
                  style={{ display: 'block' }}
                />
              </div>
            )}
            {zone.images.reference && (
              <div>
                <p className="text-xs mb-2" style={{ opacity: 0.35 }}>
                  {isGuess ? 'possible reference' : 'reference'}
                </p>
                <img
                  src={zone.images.reference}
                  alt={isGuess ? zone.guess : zone.reference}
                  className="w-full"
                  style={{ display: 'block' }}
                />
              </div>
            )}
          </div>
        )}

        {/* Metadata */}
        {!isGuess && (zone.referenceDetail || zone.rarity || zone.creditTo) && (
          <div className="mb-10" style={{ borderTop: '1px solid rgba(232,232,232,0.08)' }}>
            {zone.referenceDetail && (
              <div
                className="flex justify-between items-center py-3"
                style={{ borderBottom: '1px solid rgba(232,232,232,0.08)' }}
              >
                <span className="text-xs" style={{ opacity: 0.4 }}>reference</span>
                <span className="text-xs" style={{ opacity: 0.8 }}>{zone.referenceDetail}</span>
              </div>
            )}
            {zone.rarity && (
              <div
                className="flex justify-between items-center py-3"
                style={{ borderBottom: '1px solid rgba(232,232,232,0.08)' }}
              >
                <span className="text-xs" style={{ opacity: 0.4 }}>rarity</span>
                <span className="text-xs" style={{ opacity: 0.8 }}>{zone.rarity}</span>
              </div>
            )}
            {zone.creditTo && (
              <div
                className="flex justify-between items-center py-3"
                style={{ borderBottom: '1px solid rgba(232,232,232,0.08)' }}
              >
                <span className="text-xs" style={{ opacity: 0.4 }}>identified by</span>
                <span className="text-xs" style={{ opacity: 0.8 }}>{zone.creditTo}</span>
              </div>
            )}
          </div>
        )}

        {/* External links */}
        <div className="flex gap-6 flex-wrap mb-20">
          {zone.referenceLink && (
            <a
              href={zone.referenceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs"
              style={{ opacity: 0.4 }}
            >
              reference ↗
            </a>
          )}
          <a
            href="https://terraformexplorer.xyz/zones"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs"
            style={{ opacity: 0.4 }}
          >
            view on explorer ↗
          </a>
          {zone.sourceUrl && (
            <a
              href={zone.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs"
              style={{ opacity: 0.4 }}
            >
              source thread ↗
            </a>
          )}
        </div>
      </main>

      <footer className="px-6 mt-8 mb-6 text-xs" style={{ opacity: 0.35 }}>
        <span>terraforms lore is a community maintained resource built by <a href="https://x.com/TerraformsOTC" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>TerraformsOTC</a> and Claude</span>
      </footer>
    </div>
  );
}
