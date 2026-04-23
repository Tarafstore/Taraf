import type { Metadata } from 'next';
import { Noto_Kufi_Arabic } from 'next/font/google';
import './globals.css';

const notoKufi = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-kufi',
});

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
      <body className={`${notoKufi.variable} font-sans`}>{children}</body>
    </html>
  );
}
