'use client';

import { useState } from 'react';
import { biomes } from '@/data/biomes';

// Biomes sorted numerically, labelled as "Biome N — Nickname" where applicable
const BIOME_OPTIONS = [
  ...biomes
    .slice()
    .sort((a, b) => a.number - b.number)
    .map((b) => ({
      value: b.name,
      label: b.nickname ? `${b.name} — ${b.nickname}` : b.name,
    })),
  { value: 'Other / Not listed', label: 'Other / Not listed' },
];

export default function BiomeSubmitForm() {
  const [form, setForm] = useState({
    biome: '',
    customBiome: '',
    reference: '',
    explanation: '',
    sourceLink: '',
    handle: '',
  });
  const [status, setStatus] = useState(null); // null | 'submitting' | 'success' | 'error'

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    const biomeName = form.biome === 'Other / Not listed' ? form.customBiome : form.biome;
    if (!biomeName || !form.reference || !form.explanation) {
      setStatus('error');
      return;
    }

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'biome',
          zone: biomeName,
          reference: form.reference,
          explanation: form.explanation,
          sourceLink: form.sourceLink,
          handle: form.handle,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ biome: '', customBiome: '', reference: '', explanation: '', sourceLink: '', handle: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="submit" className="mt-20 mb-16" style={{ maxWidth: '560px' }}>
      <h2 className="text-lg mb-1" style={{ opacity: 0.8 }}>submit a biome reference</h2>
      <div className="mb-6" style={{ borderBottom: '1px solid rgba(232,232,232,0.1)' }} />

      <p className="text-sm mb-8" style={{ opacity: 0.5, lineHeight: '1.6' }}>
        There are 92 biomes in total. Most references are still unidentified.
        If you have a theory — confirmed or speculative — submit it here.
        Accepted submissions will be added to the catalog.
      </p>

      {status === 'success' ? (
        <div className="text-sm" style={{ opacity: 0.65 }}>
          <p>submission received. thank you.</p>
          <button
            className="text-xs mt-4"
            style={{
              opacity: 0.4,
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'inherit',
            }}
            onClick={() => setStatus(null)}
          >
            submit another →
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Biome selector */}
          <div className="flex flex-col gap-1">
            <label className="text-xs" style={{ opacity: 0.5 }}>biome *</label>
            <select
              name="biome"
              value={form.biome}
              onChange={handleChange}
              required
              className="w-full px-3 py-2"
              style={{
                background: 'transparent',
                border: '1px solid rgba(232,232,232,0.3)',
                color: form.biome ? 'var(--text-primary)' : 'rgba(232,232,232,0.35)',
                fontFamily: 'inherit',
                fontSize: '13px',
                outline: 'none',
              }}
            >
              <option value="" disabled style={{ background: '#0a0a0a' }}>select a biome</option>
              {BIOME_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} style={{ background: '#0a0a0a' }}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Custom biome name if "Other" */}
          {form.biome === 'Other / Not listed' && (
            <div className="flex flex-col gap-1">
              <label className="text-xs" style={{ opacity: 0.5 }}>biome (type it) *</label>
              <input
                type="text"
                name="customBiome"
                value={form.customBiome}
                onChange={handleChange}
                placeholder="e.g. Biome 42"
                className="w-full px-3 py-2"
                required
              />
            </div>
          )}

          {/* Reference */}
          <div className="flex flex-col gap-1">
            <label className="text-xs" style={{ opacity: 0.5 }}>proposed reference *</label>
            <input
              type="text"
              name="reference"
              value={form.reference}
              onChange={handleChange}
              placeholder="e.g. Tibetan script (language)"
              className="w-full px-3 py-2"
              required
            />
          </div>

          {/* Explanation */}
          <div className="flex flex-col gap-1">
            <label className="text-xs" style={{ opacity: 0.5 }}>explanation / evidence *</label>
            <textarea
              name="explanation"
              value={form.explanation}
              onChange={handleChange}
              placeholder="Describe the character set, visual connection, or other evidence for this reference."
              rows={4}
              className="w-full px-3 py-2 resize-none"
              required
              style={{ lineHeight: '1.5' }}
            />
          </div>

          {/* Source link */}
          <div className="flex flex-col gap-1">
            <label className="text-xs" style={{ opacity: 0.5 }}>source link (optional)</label>
            <input
              type="url"
              name="sourceLink"
              value={form.sourceLink}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-3 py-2"
            />
          </div>

          {/* Handle */}
          <div className="flex flex-col gap-1">
            <label className="text-xs" style={{ opacity: 0.5 }}>your x/twitter handle (optional, for credit)</label>
            <input
              type="text"
              name="handle"
              value={form.handle}
              onChange={handleChange}
              placeholder="@yourhandle"
              className="w-full px-3 py-2"
            />
          </div>

          {status === 'error' && (
            <p className="text-xs" style={{ color: '#f87171' }}>
              something went wrong. please fill in all required fields and try again.
            </p>
          )}

          <button
            type="submit"
            className="btn-primary btn-sm self-start mt-2"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'submitting...' : 'submit reference →'}
          </button>
        </form>
      )}
    </section>
  );
}
