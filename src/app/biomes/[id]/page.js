import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { biomes, BIOME_CATEGORIES } from '@/data/biomes';

export async function generateStaticParams() {
  return biomes
    .filter((b) => b.status !== 'unknown')
    .map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }) {
  const biome = biomes.find((b) => b.id === params.id);
  if (!biome) return {};
  const title = biome.nickname
    ? `${biome.name} — ${biome.nickname} — terraforms lore`
    : `${biome.name} — terraforms lore`;
  return {
    title,
    description: biome.description?.slice(0, 160),
  };
}

export default function BiomePage({ params }) {
  const biome = biomes.find((b) => b.id === params.id);

  if (!biome || biome.status === 'unknown') notFound();

  const isGuess = biome.status === 'guess';
  const cat = BIOME_CATEGORIES[biome.category];

  const displayTitle = biome.nickname
    ? `${biome.name} — ${biome.nickname}`
    : biome.name;

  return (
    <div className="content-wrapper">
      <Header />

      <main className="flex-1 px-6" style={{ maxWidth: '800px' }}>

        {/* Back link */}
        <a
          href="/biomes"
          className="text-xs"
          style={{ opacity: 0.4, display: 'inline-block', marginBottom: '2rem' }}
        >
          ← biome references
        </a>

        {/* Title row */}
        <div className="flex justify-between items-start gap-4 mb-2">
          <h1 className="text-3xl">{displayTitle}</h1>
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
          {isGuess ? biome.guess : biome.reference}
        </p>

        {/* Description */}
        <p className="text-sm mb-10" style={{ opacity: 0.65, lineHeight: '1.8' }}>
          {biome.description}
        </p>

        {/* Images */}
        {biome.images && (biome.images.zone || biome.images.reference) && (
          <div
            className="grid gap-4 mb-10"
            style={{
              gridTemplateColumns: biome.images.zone && biome.images.reference
                ? '1fr 1fr'
                : '1fr',
            }}
          >
            {biome.images.zone && (
              <div>
                <p className="text-xs mb-2" style={{ opacity: 0.35 }}>biome sample</p>
                <img
                  src={biome.images.zone}
                  alt={`${biome.name} sample`}
                  className="w-full"
                  style={{ display: 'block' }}
                />
              </div>
            )}
            {biome.images.reference && (
              <div>
                <p className="text-xs mb-2" style={{ opacity: 0.35 }}>
                  {isGuess ? 'possible reference' : 'reference'}
                </p>
                <img
                  src={biome.images.reference}
                  alt={isGuess ? biome.guess : biome.reference}
                  className="w-full"
                  style={{ display: 'block' }}
                />
              </div>
            )}
          </div>
        )}

        {/* Metadata */}
        {!isGuess && (biome.referenceDetail || biome.creditTo) && (
          <div className="mb-10" style={{ borderTop: '1px solid rgba(232,232,232,0.08)' }}>
            {biome.referenceDetail && (
              <div
                className="flex justify-between items-center py-3"
                style={{ borderBottom: '1px solid rgba(232,232,232,0.08)' }}
              >
                <span className="text-xs" style={{ opacity: 0.4 }}>reference</span>
                <span className="text-xs" style={{ opacity: 0.8 }}>{biome.referenceDetail}</span>
              </div>
            )}
            {biome.creditTo && (
              <div
                className="flex justify-between items-center py-3"
                style={{ borderBottom: '1px solid rgba(232,232,232,0.08)' }}
              >
                <span className="text-xs" style={{ opacity: 0.4 }}>identified by</span>
                <span className="text-xs" style={{ opacity: 0.8 }}>{biome.creditTo}</span>
              </div>
            )}
          </div>
        )}

        {/* External links */}
        <div className="flex gap-6 flex-wrap mb-20">
          {biome.referenceLink && (
            <a
              href={biome.referenceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs"
              style={{ opacity: 0.4 }}
            >
              reference ↗
            </a>
          )}
          <a
            href="https://terraformexplorer.xyz/biomes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs"
            style={{ opacity: 0.4 }}
          >
            view on explorer ↗
          </a>
          {biome.sourceUrl && (
            <a
              href={biome.sourceUrl}
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
