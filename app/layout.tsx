import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Taraf Mukhawar',
  description: 'Luxury Arabic mukhawar storefront foundation',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-sans">{children}</body>
    </html>
  );
}
