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
  title: 'terraforms lore',
  description: 'Every Terraform zone is an Easter Egg. Community-cataloged colour palette references across all 75 zones.',
  metadataBase: new URL('https://terraformlore.xyz'),
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    type: 'website',
    siteName: 'terraforms lore',
    title: 'terraforms lore',
    description: 'Every Terraform zone is an Easter Egg. Community-cataloged colour palette references across all 75 zones.',
    url: 'https://terraformlore.xyz',
  },
  twitter: {
    card: 'summary',
    title: 'terraforms lore',
    description: 'Every Terraform zone is an Easter Egg. Community-cataloged colour palette references across all 75 zones.',
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
