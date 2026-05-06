'use client';

import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const onBiomes = pathname.startsWith('/biomes');

  return (
    <header className="z-10 px-6 py-4 md:py-6 md:mb-6 mb-3 sticky top-0 md:relative bg-primary">
      <nav className="flex flex-row justify-between items-center" style={{ minHeight: '36px' }}>
        <a href="/" className="text-lg">[terraform lore]</a>
        <div className="flex items-center gap-4 text-sm opacity-65">
          {onBiomes
            ? <a href="/">[zones]</a>
            : <a href="/biomes">[biomes]</a>
          }
          <a
            href="https://terraformestimator.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            [estimator ↗]
          </a>
          <a
            href="https://terraformmandala.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            [mandala tool ↗]
          </a>
          <a
            href="https://terraformexplorer.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            [tf explorer ↗]
          </a>
        </div>
      </nav>
    </header>
  );
}
