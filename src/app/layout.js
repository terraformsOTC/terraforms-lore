import './globals.css';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'terraforms lore',
  description: 'Every Terraform zone is an Easter Egg. Community-cataloged colour palette references across all 75 zones.',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Symbols+2&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
