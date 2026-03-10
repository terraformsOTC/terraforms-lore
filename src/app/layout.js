import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
