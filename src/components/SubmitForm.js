'use client';

import { useState } from 'react';
import { zones } from '@/data/zones';
import { biomes } from '@/data/biomes';

const ZONE_OPTIONS = [
  ...zones.map((z) => ({ value: z.name, label: z.name })).sort((a, b) => a.label.localeCompare(b.label)),
  { value: 'Other / Not listed', label: 'Other / Not listed' },
];

const BIOME_OPTIONS = [
  ...biomes
    .slice()
    .sort((a, b) => a.number - b.number)
    .map((b) => ({ value: b.name, label: b.nickname ? `${b.name} — ${b.nickname}` : b.name })),
  { value: 'Other / Not listed', label: 'Other / Not listed' },
];

/**
 * Unified submit form for zones and biomes.
 * @param {{ type: 'zone' | 'biome' }} props
 */
export default function SubmitForm({ type = 'zone' }) {
  const isBiome = type === 'biome';
  const options = isBiome ? BIOME_OPTIONS : ZONE_OPTIONS;
  const itemLabel = isBiome ? 'biome' : 'zone';
  const totalCount = isBiome ? 92 : 75;

  const [form, setForm] = useState({ item: '', customItem: '', reference: '', explanation: '', sourceLink: '', handle: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    const itemName = form.item === 'Other / Not listed' ? form.customItem : form.item;
    if (!itemName || !form.reference || !form.explanation) { setStatus('error'); return; }

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(isBiome && { type: 'biome' }),
          zone: itemName,
          reference: form.reference,
          explanation: form.explanation,
          sourceLink: form.sourceLink,
          handle: form.handle,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ item: '', customItem: '', reference: '', explanation: '', sourceLink: '', handle: '' });
      } else {
        setStatus('error');
      }
    } catch { setStatus('error'); }
  };

  return (
    <section id="submit" className="mt-20 mb-16" style={{ maxWidth: '560px' }}>
      <h2 className="text-lg mb-1 dim-80">submit a {isBiome ? 'biome ' : ''}reference</h2>
      <div className="mb-6 divider" />

      <p className="text-sm mb-8 dim-50" style={{ lineHeight: '1.6' }}>
        There are {totalCount} {itemLabel}s in total. {isBiome ? 'Most' : 'Many'} references are still unidentified.
        If you have a theory — confirmed or speculative — submit it here.
        Accepted submissions will be added to the catalog.
      </p>

      {status === 'success' ? (
        <div className="text-sm dim-65">
          <p>submission received. thank you.</p>
          <button className="text-xs mt-4 btn-text dim-40" onClick={() => setStatus(null)}>
            submit another →
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field label={`${itemLabel} name *`}>
            <select name="item" value={form.item} onChange={handleChange} required className="w-full px-3 py-2"
              style={{ color: form.item ? 'var(--text-primary)' : 'rgba(232,232,232,0.35)' }}>
              <option value="" disabled style={{ background: '#0a0a0a' }}>select a {itemLabel}</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value} style={{ background: '#0a0a0a' }}>{opt.label}</option>
              ))}
            </select>
          </Field>

          {form.item === 'Other / Not listed' && (
            <Field label={`${itemLabel} name (type it) *`}>
              <input type="text" name="customItem" value={form.customItem} onChange={handleChange}
                placeholder={isBiome ? 'e.g. Biome 42' : 'e.g. Nebula'} className="w-full px-3 py-2" required />
            </Field>
          )}

          <Field label="proposed reference *">
            <input type="text" name="reference" value={form.reference} onChange={handleChange}
              placeholder={isBiome ? 'e.g. Tibetan script (language)' : 'e.g. Blade Runner (1982 film)'}
              className="w-full px-3 py-2" required />
          </Field>

          <Field label="explanation / evidence *">
            <textarea name="explanation" value={form.explanation} onChange={handleChange}
              placeholder={`Describe the ${isBiome ? 'character set, visual connection' : 'colour palette connection'}, or other evidence for this reference.`}
              rows={4} className="w-full px-3 py-2 resize-none" required style={{ lineHeight: '1.5' }} />
          </Field>

          <Field label="source link (optional)">
            <input type="text" name="sourceLink" value={form.sourceLink} onChange={handleChange}
              placeholder="https://..." className="w-full px-3 py-2" />
          </Field>

          <Field label="your x/twitter handle (optional, for credit)">
            <input type="text" name="handle" value={form.handle} onChange={handleChange}
              placeholder="@yourhandle" className="w-full px-3 py-2" />
          </Field>

          {status === 'error' && (
            <p className="text-xs" style={{ color: '#f87171' }}>
              something went wrong. please fill in all required fields and try again.
            </p>
          )}

          <button type="submit" className="btn-primary btn-sm self-start mt-2" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'submitting...' : 'submit reference →'}
          </button>
        </form>
      )}
    </section>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs dim-50">{label}</label>
      {children}
    </div>
  );
}
