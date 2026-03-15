import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatusBadge from '@/components/StatusBadge';
import { ImageGrid, MetadataTable, ExternalLinks } from '@/components/DetailSections';
import { biomes, BIOME_CATEGORIES } from '@/data/biomes';

export async function generateStaticParams() {
  return biomes.filter((b) => b.status !== 'unknown').map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const biome = biomes.find((b) => b.id === id);
  if (!biome) return {};
  const title = biome.nickname
    ? `${biome.name} — ${biome.nickname} — terraforms lore`
    : `${biome.name} — terraforms lore`;
  return { title, description: biome.description?.slice(0, 160) };
}

export default async function BiomePage({ params }) {
  const { id } = await params;
  const biome = biomes.find((b) => b.id === id);
  if (!biome || biome.status === 'unknown') notFound();

  const isTheory = biome.status === 'guess';
  const cat = BIOME_CATEGORIES[biome.category];
  const ref = biome.guess || biome.reference;
  const displayTitle = biome.nickname ? `${biome.name} — ${biome.nickname}` : biome.name;

  return (
    <div className="content-wrapper">
      <Header />
      <main className="flex-1 px-6" style={{ maxWidth: '800px' }}>

        <a href="/biomes" className="text-xs dim-40 inline-block mb-8">← biome references</a>

        {/* Character set — mirrors the palette swatch on zone pages */}
        {biome.characterSet && (
          <div className="mb-8">
            <div className="flex flex-wrap" style={{ gap: '12px' }}>
              {[...biome.characterSet].map((char, i) => (
                <div key={i} className="text-center">
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: '60px',
                      height: '60px',
                      border: '1px solid rgba(232,232,232,0.12)',
                      fontSize: '28px',
                      fontFamily: "'Noto Sans Symbols 2', 'Courier New', monospace",
                    }}
                  >
                    {char}
                  </div>
                  <pre className="text-xs mt-2 dim-35" style={{ fontFamily: 'inherit', margin: '6px 0 0' }}>{i}</pre>
                </div>
              ))}
            </div>
            <p className="text-xs mt-3 dim-25">
              {[...biome.characterSet].length} character{[...biome.characterSet].length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        <div className="flex justify-between items-start gap-4 mb-2">
          <h1 className="text-3xl">{displayTitle}</h1>
          <StatusBadge status={biome.status} category={cat} className="mt-2" />
        </div>

        <p className="text-sm mb-8" style={{ opacity: isTheory ? 0.45 : 0.7 }}>{ref}</p>
        <p className="text-sm mb-10 dim-65" style={{ lineHeight: '1.8' }}>{biome.description}</p>

        <ImageGrid images={biome.images} name={biome.name} altText={ref} isTheory={isTheory} sampleLabel="biome sample" />

        {!isTheory && (
          <MetadataTable rows={[
            { label: 'reference', value: biome.referenceDetail },
            { label: 'identified by', value: biome.creditTo },
          ]} />
        )}

        <ExternalLinks
          referenceLink={biome.referenceLink}
          explorerUrl="https://terraformexplorer.xyz/biomes"
          sourceUrl={biome.sourceUrl}
        />
      </main>
      <Footer />
    </div>
  );
}
