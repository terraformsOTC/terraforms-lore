'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import ZoneCard from '@/components/ZoneCard';
import SubmitForm from '@/components/SubmitForm';
import { zones, confirmedZones, guessZones, unknownZones, CATEGORIES } from '@/data/zones';

const FILTERS = [
  { key: 'all',       label: 'all' },
  { key: 'confirmed', label: 'confirmed' },
  { key: 'guess',     label: 'community theories' },
  { key: 'unknown',   label: 'unknown' },
];

const CATEGORY_FILTERS = [
  { key: 'all', label: 'all categories' },
  ...Object.entries(CATEGORIES).map(([key, val]) => ({ key, label: val.label })),
];

export default function Home() {
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return zones.filter((z) => {
      if (filter === 'confirmed' && z.status !== 'confirmed') return false;
      if (filter === 'guess'     && z.status !== 'guess')     return false;
      if (filter === 'unknown'   && z.status !== 'unknown')   return false;
      if (categoryFilter !== 'all' && z.category !== categoryFilter) return false;
      const searchable = `${z.name} ${z.reference || ''} ${z.guess || ''}`.toLowerCase();
      if (search && !searchable.includes(search.toLowerCase())) return false;
      return true;
    });
  }, [filter, categoryFilter, search]);

  return (
    <div className="content-wrapper">
      <Header />

      <main className="flex-1 px-6">
        {/* Page title */}
        <h1 className="text-3xl mb-2">zone references</h1>
        <p className="text-sm mb-2" style={{ opacity: 0.55, lineHeight: '1.6' }}>
          Each and every Terraforms zone and biome is an Easter Egg. The community has been cataloging references for years — and there are still many open questions.
        </p>
        <p className="text-sm mb-10" style={{ opacity: 0.35 }}>
          {confirmedZones.length} confirmed &nbsp;·&nbsp; {guessZones.length} theories &nbsp;·&nbsp; {unknownZones.length} unknown &nbsp;·&nbsp; 75 total zones
        </p>

        {/* Filter row */}
        <div className="flex flex-wrap gap-3 mb-5">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setFilter(key); setCategoryFilter('all'); }}
              className="btn-primary btn-sm"
              style={{ opacity: filter === key ? 1 : 0.35 }}
            >
              [{label}]
            </button>
          ))}
        </div>

        {/* Category filter (only when not viewing unknowns) */}
        {filter !== 'unknown' && (
          <div className="flex flex-wrap gap-2 mb-6">
            {CATEGORY_FILTERS.map(({ key, label }) => {
              const cat = CATEGORIES[key];
              const isActive = categoryFilter === key;
              return (
                <button
                  key={key}
                  onClick={() => setCategoryFilter(key)}
                  className="text-xs px-2 py-0.5"
                  style={{
                    border: `1px solid ${isActive && cat ? cat.color : 'rgba(232,232,232,0.2)'}`,
                    color: isActive && cat ? cat.color : 'rgba(232,232,232,0.5)',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    opacity: isActive ? 1 : 0.6,
                    transition: 'opacity 0.15s',
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {/* Search — hide on unknown tab */}
        {filter !== 'unknown' && (
          <div className="mb-8" style={{ maxWidth: '360px' }}>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search zones or references..."
              className="w-full px-3 py-2"
            />
          </div>
        )}

        {/* Results count */}
        <p className="text-xs mb-6" style={{ opacity: 0.3 }}>
          {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
        </p>

        {/* Zone grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            borderTop: '1px solid rgba(232,232,232,0.08)',
            borderLeft: '1px solid rgba(232,232,232,0.08)',
          }}
        >
          {filtered.map((zone) => (
            <ZoneCard key={zone.id} zone={zone} />
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
        <SubmitForm />
      </main>

      <footer className="px-6 mt-8 mb-6 text-xs" style={{ opacity: 0.35 }}>
        <span>terraforms lore is a community maintained resource built by <a href="https://x.com/TerraformsOTC" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>TerraformsOTC</a> and Claude</span>
      </footer>
    </div>
  );
}
