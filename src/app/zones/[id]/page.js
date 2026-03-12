import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { zones, CATEGORIES } from '@/data/zones';

function isLightColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

export async function generateStaticParams() {
  return zones
    .filter((z) => z.status !== 'unknown')
    .map((z) => ({ id: z.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const zone = zones.find((z) => z.id === id);
  if (!zone) return {};
  return {
    title: `${zone.name} — terraforms lore`,
    description: zone.description?.slice(0, 160),
  };
}

export default async function ZonePage({ params }) {
  const { id } = await params;
  const zone = zones.find((z) => z.id === id);

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

        {/* Palette — explorer style */}
        {zone.palette && zone.palette.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap" style={{ gap: '12px' }}>
              {zone.palette.map((color, i) => {
                const light = isLightColor(color);
                return (
                  <div key={i} className="group text-center">
                    <div
                      className="flex items-center justify-center"
                      style={{ width: '60px', height: '60px', backgroundColor: color }}
                    >
                      <p
                        className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                        style={{ color: light ? '#000000' : '#ffffff', lineHeight: 1.2 }}
                      >
                        {color}
                      </p>
                    </div>
                    <pre
                      className="text-xs mt-2"
                      style={{ opacity: 0.35, fontFamily: 'inherit', margin: '6px 0 0' }}
                    >
                      {i}
                    </pre>
                  </div>
                );
              })}
            </div>
            <p className="text-xs mt-3" style={{ opacity: 0.25 }}>
              {zone.palette.length} colour{zone.palette.length !== 1 ? 's' : ''}
            </p>
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

      <Footer />
    </div>
  );
}
