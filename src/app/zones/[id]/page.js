import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatusBadge from '@/components/StatusBadge';
import ParcelViewer from '@/components/ParcelViewer';
import { MetadataTable, ExternalLinks } from '@/components/DetailSections';
import { zones, CATEGORIES } from '@/data/zones';
import { ZONE_PARCEL_IDS } from '@/data/parcelIds';

function isLightColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

export async function generateStaticParams() {
  return zones.filter((z) => z.status !== 'unknown').map((z) => ({ id: z.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const zone = zones.find((z) => z.id === id);
  if (!zone) return {};
  return { title: `${zone.name} — terraforms lore`, description: zone.description?.slice(0, 160) };
}

export default async function ZonePage({ params }) {
  const { id } = await params;
  const zone = zones.find((z) => z.id === id);
  if (!zone || zone.status === 'unknown') notFound();

  const isTheory = zone.status === 'guess' || zone.status === 'suggestion';
  const cat = CATEGORIES[zone.category];
  const ref = zone.suggestion || zone.guess || zone.reference;
  const parcelIds = ZONE_PARCEL_IDS[id] || null;
  const hasReference = zone.images?.reference;

  return (
    <div className="content-wrapper">
      <Header />
      <main className="flex-1 px-6" style={{ maxWidth: '900px' }}>

        <a href="/" className="text-xs dim-40 inline-block mb-8">← zone references</a>

        {/* Palette */}
        {zone.palette?.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap" style={{ gap: '12px' }}>
              {zone.palette.map((color, i) => (
                <div key={i} className="group text-center">
                  <div className="flex items-center justify-center" style={{ width: '60px', height: '60px', backgroundColor: color }}>
                    <p className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                       style={{ color: isLightColor(color) ? '#000' : '#fff', lineHeight: 1.2 }}>
                      {color}
                    </p>
                  </div>
                  <pre className="text-xs mt-2 dim-35" style={{ fontFamily: 'inherit', margin: '6px 0 0' }}>{i}</pre>
                </div>
              ))}
            </div>
            <p className="text-xs mt-3 dim-25">{zone.palette.length} colour{zone.palette.length !== 1 ? 's' : ''}</p>
          </div>
        )}

        {/* Title + badge */}
        <div className="flex justify-between items-start gap-4 mb-6">
          <h1 className="text-3xl">{zone.name}</h1>
          <StatusBadge status={zone.status} category={cat} className="mt-2" />
        </div>

        <p className="text-sm dim-40 mb-4">mathcastles reference</p>
        <p className="text-sm mb-8" style={{ opacity: isTheory ? 0.65 : 0.85 }}>{ref}</p>
        <p className="text-sm mb-10 dim-80" style={{ lineHeight: '1.8', whiteSpace: 'pre-line' }}>{zone.description}</p>

        {/* Parcel + reference image side by side */}
        {(parcelIds || hasReference) && (
          <div
            className="grid gap-6 mb-10"
            style={{ gridTemplateColumns: parcelIds && hasReference ? '277px 1fr' : '277px' }}
          >
            {parcelIds && (
              <ParcelViewer parcelIds={parcelIds} zoneName={zone.name} />
            )}
            {hasReference && (
              <div>
                <p className="text-xs mb-2 dim-35">{isTheory ? 'possible reference' : 'reference'}</p>
                <img
                  src={zone.images.reference}
                  alt={ref}
                  style={{ display: 'block', width: '100%', maxHeight: '400px', objectFit: 'contain', objectPosition: 'left top' }}
                />
              </div>
            )}
          </div>
        )}

        {!isTheory && (
          <MetadataTable rows={[
            { label: 'reference', value: zone.referenceDetail },
            { label: 'rarity', value: zone.rarity },
            { label: 'identified by', value: zone.creditTo },
          ]} />
        )}

        <ExternalLinks
          referenceLink={zone.referenceLink}
          explorerUrl="https://terraformexplorer.xyz/zones"
          sourceUrl={zone.sourceUrl}
        />

        {/* Community references */}
        {zone.referencedBy?.length > 0 && (
          <div className="mt-10">
            <p className="text-sm dim-55 mb-4">community references</p>
            {zone.referencedBy.map((entry, i) => (
              <div key={i} className="border-top pt-4 pb-4">
                <p className="text-sm dim-80" style={{ lineHeight: '1.7' }}>{entry.description}</p>
                {entry.tweet && (
                  <div className="mt-4 p-4" style={{ border: '1px solid rgba(232,232,232,0.1)', maxWidth: '480px' }}>
                    <p className="text-xs dim-80" style={{ lineHeight: '1.8', whiteSpace: 'pre-line' }}>{entry.tweet.text}</p>
                    {entry.tweet.image && (
                      <img src={entry.tweet.image} alt="" style={{ display: 'block', width: '100%', marginTop: '12px', maxHeight: '320px', objectFit: 'cover' }} />
                    )}
                    <div className="flex gap-3 mt-3" style={{ opacity: 0.4 }}>
                      <span className="text-xs">@{entry.tweet.author}</span>
                      <span className="text-xs">{entry.tweet.date}</span>
                      {entry.sourceLink && (
                        <a href={entry.sourceLink} target="_blank" rel="noopener noreferrer"
                          className="text-xs" style={{ color: 'inherit' }}>↗</a>
                      )}
                    </div>
                  </div>
                )}
                <div className="flex gap-4 mt-3" style={{ opacity: 0.3 }}>
                  {entry.handle && <span className="text-xs">submitted by {entry.handle}</span>}
                  {!entry.tweet && entry.sourceLink && (
                    <a href={entry.sourceLink} target="_blank" rel="noopener noreferrer"
                      className="text-xs" style={{ color: 'inherit' }}>
                      source ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
