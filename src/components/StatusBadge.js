export default function StatusBadge({ status, category, className = '' }) {
  if (status === 'suggestion') {
    return (
      <span
        className={`text-xs px-1 shrink-0 ${className}`}
        style={{ color: 'var(--badge-suggestion)', border: '1px solid var(--badge-suggestion-border)' }}
      >
        claude suggestion
      </span>
    );
  }

  if (status === 'guess') {
    return (
      <span
        className={`text-xs px-1 shrink-0 ${className}`}
        style={{ color: 'var(--badge-theory)', border: '1px solid var(--badge-theory-border)' }}
      >
        community theory
      </span>
    );
  }

  if (category) {
    return (
      <span
        className={`text-xs px-1 shrink-0 ${className}`}
        style={{ color: category.color, border: `1px solid ${category.color}`, opacity: 0.85 }}
      >
        {category.label}
      </span>
    );
  }

  return null;
}
