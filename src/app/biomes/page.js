'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import BiomeCard from '@/components/BiomeCard';
import BiomeSubmitForm from '@/components/BiomeSubmitForm';
import {
  biomes,
  confirmedBiomes,
  guessBiomes,
  unknownBiomes,
} from '@/data/biomes';

const FILTERS = [
  { key: 'all',       label: 'all' },
  { key: 'confirmed', label: 'confirmed' },
  { key: 'guess',     label: 'community theories' },
  { key: 'unknown',   label: 'unknown' },
];

export default function BiomesPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return biomes.filter((b) => {
      if (filter === 'confirmed' && b.status !== 'confirmed') return false;
      if (filter === 'guess'     && b.status !== 'guess')     return false;
      if (filter === 'unknown'   && b.status !== 'unknown')   return false;
      const searchable = `${b.name} ${b.nickname || ''} ${b.reference || ''} ${b.guess || ''}`.toLowerCase();
      if (search && !searchable.includes(search.toLowerCase())) return false;
      return true;
    });
  }, [filter, search]);

  return (
    <div className="content-wrapper">
      <Header />

      <main className="flex-1 px-6">
        {/* Page title */}
        <h1 className="text-3xl mb-2">biome references</h1>
        <p className="text-sm mb-2" style={{ opacity: 0.55, lineHeight: '1.6' }}>
          Each and every Terraforms zone and biome is an Easter Egg. The community has been cataloging references for years — and there are still many open questions.
        </p>
        <p className="text-sm mb-10" style={{ opacity: 0.35 }}>
          {confirmedBiomes.length} confirmed &nbsp;·&nbsp; {guessBiomes.length} theories &nbsp;·&nbsp; {unknownBiomes.length} unknown &nbsp;·&nbsp; 92 total biomes
        </p>

        {/* Status filter row */}
        <div className="flex flex-wrap gap-3 mb-5">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className="btn-primary btn-sm"
              style={{ opacity: filter === key ? 1 : 0.35 }}
            >
              [{label}]
            </button>
          ))}
        </div>

        {/* Search — hidden on unknown tab */}
        {filter !== 'unknown' && (
          <div className="mb-8" style={{ maxWidth: '360px' }}>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search biomes or references..."
              className="w-full px-3 py-2"
            />
          </div>
        )}

        {/* Results count */}
        <p className="text-xs mb-6" style={{ opacity: 0.3 }}>
          {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
        </p>

        {/* Biome grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            borderTop:  '1px solid rgba(232,232,232,0.08)',
            borderLeft: '1px solid rgba(232,232,232,0.08)',
          }}
        >
          {filtered.map((biome) => (
            <BiomeCard key={biome.id} biome={biome} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-sm mt-8" style={{ opacity: 0.4 }}>
            no results. try adjusting filters or search.
          </p>
        )}

        {/* Divider */}
        <div className="mt-20 mb-0" style={{ borderBottom: '1px solid rgba(232,232,232,0.08)' }} />

        {/* Submit form */}
        <BiomeSubmitForm />
      </main>

      <footer className="px-6 mt-8 mb-6 text-xs" style={{ opacity: 0.35 }}>
        <span>terraforms lore is a community maintained resource built by <a href="https://x.com/TerraformsOTC" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>TerraformsOTC</a> and Claude</span>
      </footer>
    </div>
  );
}
