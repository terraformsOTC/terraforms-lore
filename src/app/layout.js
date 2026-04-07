import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { Noto_Sans_Symbols_2 } from 'next/font/google';

const notoSymbols = Noto_Sans_Symbols_2({
  weight: '400',
  subsets: ['symbols'],
  display: 'swap',
  variable: '--font-noto-symbols',
});

export const metadata = {
  title: 'terraform lore',
  description: 'A community maintained repository of zone & biome references in the Terraforms collection',
  metadataBase: new URL('https://terraformlore.xyz'),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
    ],
  },
  openGraph: {
    type: 'website',
    siteName: 'terraform lore',
    title: 'terraform lore',
    description: 'A community maintained repository of zone & biome references in the Terraforms collection',
    url: 'https://terraformlore.xyz',
    images: [{ url: '/images/og-home.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@TerraformsOTC',
    title: 'terraform lore',
    description: 'A community maintained repository of zone & biome references in the Terraforms collection',
  },
  alternates: {
    canonical: 'https://terraformlore.xyz',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${notoSymbols.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
