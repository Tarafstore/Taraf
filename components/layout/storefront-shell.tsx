import type { ReactNode } from 'react';
import Link from 'next/link';

import { Navbar } from '@/components/layout/navbar';

type StorefrontShellProps = {
  children?: ReactNode;
  showHero?: boolean;
};

const topLinks = [
  { label: 'الرئيسية', href: '/' },
  { label: 'المتجر', href: '/products' },
  { label: 'المخاوير', href: '/products' },
  { label: 'من نحن', href: '/about' },
  { label: 'تواصل معنا', href: '/contact' },
];

function HomeHero() {
  return (
    <>
      <section className="container-base pt-3 md:pt-4">
        <div className="grid overflow-hidden rounded-[18px] border border-line bg-surface-muted shadow-[0_8px_24px_rgba(45,31,18,0.06)] md:min-h-[320px] md:grid-cols-[1.05fr_1fr]">
          <div className="relative min-h-[34svh] bg-[linear-gradient(90deg,#d7c7b7_0%,#cab7a4_45%,#d8c8b8_100%)] md:min-h-[320px]">
            <img src="/pics/model111.png" alt="عارضة ترتدي مخور" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.22),rgba(255,255,255,0)_45%)]" />
          </div>

          <div className="flex flex-col items-center justify-center gap-3 bg-[#efe7de] px-5 py-6 text-center text-brand md:gap-4 md:px-12 md:py-8">
            <p className="text-[11px] tracking-[0.24em] text-ink-soft">تشكيلة رمضان 2026</p>
            <h1 className="text-[28px] font-medium leading-[1.3] md:text-[42px]">فخامة تحاكي ذوقك</h1>
            <p className="max-w-[30ch] text-sm leading-6 text-ink md:text-lg md:leading-8">
              تشكيلة راقية من أجمل المخاوير بتفاصيل أنثوية مترفة تناسب كل إطلالة.
            </p>
            <Link
              href="/products"
              className="inline-flex min-h-10 items-center justify-center rounded-soft bg-brand px-8 py-2.5 text-sm font-medium text-surface transition-colors hover:bg-[#2f2115] md:min-h-11 md:px-10 md:text-base"
            >
              تسوق الآن
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-3 border-y border-line bg-surface-muted/65">
        <div className="container-base grid grid-cols-2 gap-x-3 gap-y-1 py-3 text-center text-xs text-ink md:h-16 md:grid-cols-4 md:items-center md:gap-4 md:py-0 md:text-sm">
          <p>دعم العملاء</p>
          <p>شحن سريع</p>
          <p>تصاميم حصرية</p>
          <p>جودة عالية</p>
        </div>
      </section>
    </>
  );
}

export function StorefrontShell({ children, showHero = false }: StorefrontShellProps) {
  return (
    <main className="min-h-screen bg-canvas">
      <Navbar links={topLinks} />
      {showHero ? <HomeHero /> : null}
      <section className="container-base py-5 md:py-7">{children}</section>
    </main>
  );
}
