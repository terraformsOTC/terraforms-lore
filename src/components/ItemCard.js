import Link from 'next/link';
import StatusBadge from './StatusBadge';

/**
 * Unified card for both zones and biomes.
 *
 * Props:
 *   item      — zone or biome object
 *   href      — link target (e.g. /zones/foo or /biomes/biome-42)
 *   category  — resolved category object { label, color } or null
 *   subtitle  — optional secondary text next to the name (e.g. biome nickname)
 *   palette   — optional hex array to render as a color swatch bar
 */
export default function ItemCard({ item, href, category, subtitle, palette }) {
  if (item.status === 'unknown') {
    return (
      <div className="card-border p-4 flex items-center justify-between">
        <div>
          <span className="text-sm dim-40">{item.name}</span>
          {subtitle && <span className="text-xs ml-2 dim-20">— {subtitle}</span>}
        </div>
        {!subtitle && (
          <span className="text-xs px-1 dim-20" style={{ border: '1px solid var(--border-dim)' }}>
            unidentified
          </span>
        )}
      </div>
    );
  }

  const ref = item.suggestion || item.guess || item.reference;

  return (
    <Link href={href} className="card-border block" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="p-4">
        {palette && palette.length > 0 && (
          <div className="flex mb-3" style={{ height: '6px', gap: '1px' }}>
            {palette.map((color, i) => (
              <div key={i} style={{ flex: 1, backgroundColor: color }} />
            ))}
          </div>
        )}

        <div className="flex justify-between items-start gap-2 mb-1">
          <div>
            <span className="text-sm">{item.name}</span>
            {subtitle && <span className="text-xs ml-2 dim-35">— {subtitle}</span>}
          </div>
          <StatusBadge status={item.status} category={category} twin={item.twin} />
        </div>

        <p className="text-xs mt-1 dim-65">{ref}</p>
        <p className="text-xs mt-2 dim-25">→</p>
      </div>
    </Link>
  );
}
