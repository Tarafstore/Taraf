import type { ReactNode } from 'react';

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
    <main className="min-h-screen bg-[#fbf7f0]">
      <Navbar links={topLinks} />
      {containerized ? <section className="container-base py-5 md:py-7">{children}</section> : children}
    </main>
  );
}
