import type { ReactNode } from 'react';

import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';

type StorefrontShellProps = {
  children?: ReactNode;
  containerized?: boolean;
};

const topLinks = [
  { label: 'الرئيسية', href: '/' },
  { label: 'المتجر', href: '/products' },
  { label: 'المخاوير', href: '/collections' },
  { label: 'من نحن', href: '/about' },
  { label: 'تواصل معنا', href: '/contact' },
];

export function StorefrontShell({ children, containerized = true }: StorefrontShellProps) {
  return (
    <main className="min-h-screen bg-[#fbf7f0] overflow-x-clip">
      <Navbar links={topLinks} />
      {containerized ? <section className="container-base py-4 md:py-6 lg:py-8">{children}</section> : children}
      <Footer />
    </main>
  );
}
