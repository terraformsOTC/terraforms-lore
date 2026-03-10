'use client';

import { useState } from 'react';
import { zones } from '@/data/zones';

// Sorted alphabetically; "Other" appended at end
const ZONE_NAMES = [
  ...zones.map((z) => z.name).sort((a, b) => a.localeCompare(b)),
  'Other / Not listed',
];

export default function SubmitForm() {
  const [form, setForm] = useState({
    zone: '',
    customZone: '',
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

    const zoneName = form.zone === 'Other / Not listed' ? form.customZone : form.zone;
    if (!zoneName || !form.reference || !form.explanation) {
      setStatus('error');
      return;
    }

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, zone: zoneName }),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ zone: '', customZone: '', reference: '', explanation: '', sourceLink: '', handle: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="submit" className="mt-20 mb-16" style={{ maxWidth: '560px' }}>
      <h2 className="text-lg mb-1" style={{ opacity: 0.8 }}>submit a reference</h2>
      <div className="mb-6" style={{ borderBottom: '1px solid rgba(232,232,232,0.1)' }} />

      <p className="text-sm mb-8" style={{ opacity: 0.5, lineHeight: '1.6' }}>
        There are 75 zones in total. Many references are still unidentified.
        If you have a theory — confirmed or speculative — submit it here.
        Accepted submissions will be added to the catalog.
      </p>

      {status === 'success' ? (
        <div className="text-sm" style={{ opacity: 0.65 }}>
          <p>submission received. thank you.</p>
          <button
            className="text-xs mt-4"
            style={{ opacity: 0.4, background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}
            onClick={() => setStatus(null)}
          >
            submit another →
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Zone selector */}
          <div className="flex flex-col gap-1">
            <label className="text-xs" style={{ opacity: 0.5 }}>zone name *</label>
            <select
              name="zone"
              value={form.zone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2"
              style={{
                background: 'transparent',
                border: '1px solid rgba(232,232,232,0.3)',
                color: form.zone ? 'var(--text-primary)' : 'rgba(232,232,232,0.35)',
                fontFamily: 'inherit',
                fontSize: '13px',
                outline: 'none',
              }}
            >
              <option value="" disabled style={{ background: '#0a0a0a' }}>select a zone</option>
              {ZONE_NAMES.map((z) => (
                <option key={z} value={z} style={{ background: '#0a0a0a' }}>{z}</option>
              ))}
            </select>
          </div>

          {/* Custom zone name if "Other" */}
          {form.zone === 'Other / Not listed' && (
            <div className="flex flex-col gap-1">
              <label className="text-xs" style={{ opacity: 0.5 }}>zone name (type it) *</label>
              <input
                type="text"
                name="customZone"
                value={form.customZone}
                onChange={handleChange}
                placeholder="e.g. Nebula"
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
              placeholder="e.g. Blade Runner (1982 film)"
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
              placeholder="Describe the colour palette connection or other evidence for this reference."
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
