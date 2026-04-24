'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/submissions', {
        headers: { Authorization: `Bearer ${password}` },
      });

      if (res.status === 401) {
        setError('wrong password');
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setError('something went wrong');
        setLoading(false);
        return;
      }

      const data = await res.json();
      const sorted = (data.submissions || []).sort(
        (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
      );
      setSubmissions(sorted);
      setToken(password);
    } catch {
      setError('failed to connect');
    }
    setLoading(false);
  }

  async function handleRefresh() {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch('/api/submissions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        const sorted = (data.submissions || []).sort(
          (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
        );
        setSubmissions(sorted);
      }
    } catch {
      // silent
    }
    setLoading(false);
  }

  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // Password screen
  if (!token) {
    return (
      <>
        <div className="content-wrapper">
          <main
            className="flex-1 px-6 flex items-center justify-center"
            style={{ minHeight: '100vh' }}
          >
            <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '320px' }}>
              <p className="text-sm mb-6" style={{ opacity: 0.5 }}>
                admin
              </p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                autoFocus
                className="w-full text-sm py-2 px-3 mb-4"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(232,232,232,0.15)',
                  color: '#e8e8e8',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={loading || !password}
                className="text-sm py-1 px-3"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(232,232,232,0.25)',
                  color: '#e8e8e8',
                  cursor: loading ? 'wait' : 'pointer',
                  opacity: loading || !password ? 0.35 : 1,
                }}
              >
                {loading ? 'checking...' : 'enter →'}
              </button>
              {error && (
                <p className="text-xs mt-4" style={{ color: '#f87171' }}>
                  {error}
                </p>
              )}
            </form>
          </main>
        </div>
      </>
    );
  }

  // Submissions view
  return (
    <>
      <div className="content-wrapper">
        <main className="flex-1 px-6" style={{ maxWidth: '900px' }}>
          <div
            className="flex justify-between items-center mb-8"
            style={{ paddingTop: '2rem' }}
          >
            <div>
              <a
                href="/"
                className="text-xs"
                style={{ opacity: 0.4, display: 'inline-block', marginBottom: '1rem' }}
              >
                ← back to site
              </a>
              <h1 className="text-xl">submissions</h1>
              <p className="text-xs mt-1" style={{ opacity: 0.35 }}>
                {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="text-xs px-2 py-1"
              style={{
                background: 'transparent',
                border: '1px solid rgba(232,232,232,0.15)',
                color: '#e8e8e8',
                cursor: 'pointer',
                opacity: loading ? 0.35 : 0.6,
              }}
            >
              {loading ? 'loading...' : 'refresh'}
            </button>
          </div>

          {submissions.length === 0 ? (
            <p className="text-sm" style={{ opacity: 0.4, marginTop: '4rem' }}>
              no submissions yet.
            </p>
          ) : (
            <div>
              {submissions.map((s) => {
                const isExpanded = expandedId === s.id;
                return (
                  <div
                    key={s.id}
                    style={{
                      borderBottom: '1px solid rgba(232,232,232,0.08)',
                      padding: '1rem 0',
                    }}
                  >
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span
                            className="text-xs px-1 shrink-0"
                            style={{
                              border: '1px solid',
                              borderColor:
                                s.type === 'biome'
                                  ? 'rgba(52,211,153,0.5)'
                                  : 'rgba(96,165,250,0.5)',
                              color:
                                s.type === 'biome'
                                  ? 'rgba(52,211,153,0.8)'
                                  : 'rgba(96,165,250,0.8)',
                            }}
                          >
                            {s.type || 'zone'}
                          </span>
                          <span className="text-sm">{s.zone}</span>
                        </div>
                        <p className="text-sm" style={{ opacity: 0.7 }}>
                          {s.reference}
                        </p>
                      </div>
                      <span
                        className="text-xs shrink-0"
                        style={{ opacity: 0.3 }}
                      >
                        {formatDate(s.submittedAt)}
                      </span>
                    </div>

                    {/* Explanation - truncated or expanded */}
                    <div className="mt-2">
                      <p
                        className="text-xs"
                        style={{
                          opacity: 0.55,
                          lineHeight: '1.7',
                          ...(isExpanded
                            ? {}
                            : {
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                              }),
                        }}
                      >
                        {s.explanation}
                      </p>
                      {s.explanation && s.explanation.length > 120 && (
                        <button
                          onClick={() =>
                            setExpandedId(isExpanded ? null : s.id)
                          }
                          className="text-xs mt-1"
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#e8e8e8',
                            opacity: 0.3,
                            cursor: 'pointer',
                            padding: 0,
                          }}
                        >
                          {isExpanded ? '↑ collapse' : '↓ expand'}
                        </button>
                      )}
                    </div>

                    {/* Meta row */}
                    <div
                      className="flex gap-4 mt-2 flex-wrap"
                      style={{ opacity: 0.35 }}
                    >
                      {s.handle && (
                        <span className="text-xs">by {s.handle}</span>
                      )}
                      {s.sourceLink && (
                        <a
                          href={s.sourceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs"
                          style={{ color: 'inherit' }}
                        >
                          source ↗
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
