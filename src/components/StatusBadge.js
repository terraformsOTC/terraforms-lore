const TWIN_COLOR = '#d4d4d4';

export default function StatusBadge({ status, category, twin, className = '' }) {
  const twinBadge = twin ? (
    <span
      className={`text-xs px-1 shrink-0 ${className}`}
      style={{ color: TWIN_COLOR, border: `1px solid ${TWIN_COLOR}`, opacity: 0.7 }}
    >
      twin palette
    </span>
  ) : null;

  if (status === 'llm') {
    return (
      <div className="flex gap-1 flex-wrap justify-end">
        {twinBadge}
        <span
          className={`text-xs px-1 shrink-0 ${className}`}
          style={{ color: 'var(--badge-suggestion)', border: '1px solid var(--badge-suggestion-border)' }}
        >
          LLM suggestion
        </span>
      </div>
    );
  }

  if (status === 'uncertain') {
    return (
      <div className="flex gap-1 flex-wrap justify-end">
        {twinBadge}
        <span
          className={`text-xs px-1 shrink-0 ${className}`}
          style={{ color: 'var(--badge-theory)', border: '1px solid var(--badge-theory-border)' }}
        >
          uncertain
        </span>
      </div>
    );
  }

  if (category) {
    return (
      <div className="flex gap-1 flex-wrap justify-end">
        {twinBadge}
        <span
          className={`text-xs px-1 shrink-0 ${className}`}
          style={{ color: category.color, border: `1px solid ${category.color}`, opacity: 0.85 }}
        >
          {category.label}
        </span>
      </div>
    );
  }

  return twinBadge;
}
