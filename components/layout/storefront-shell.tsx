import type { ReactNode } from 'react';
import { Navbar } from '@/components/layout/navbar';

type StorefrontShellProps = {
  children?: ReactNode;
};

const topLinks = [
  { label: 'الرئيسية', href: '/' },
  { label: 'المتجر', href: '/products' },
  { label: 'المخاوير', href: '/products' },
  { label: 'من نحن', href: '/about' },
  { label: 'تواصل معنا', href: '/contact' },
];

export function StorefrontShell({ children }: StorefrontShellProps) {
  return (
    <main className="min-h-screen bg-canvas">
      <Navbar links={topLinks} />

      <section className="container-base pt-3 md:pt-4">
        <div className="grid overflow-hidden rounded-[20px] border border-line bg-surface-muted shadow-[0_10px_30px_rgba(45,31,18,0.08)] md:min-h-[435px] md:grid-cols-[1.1fr_1fr] md:rounded-none md:shadow-none">
          <div className="relative min-h-[50svh] bg-[linear-gradient(90deg,#d7c7b7_0%,#cab7a4_45%,#d8c8b8_100%)] md:min-h-0">
            <img
              src="/pics/model111.png"
              alt="عارضة ترتدي مخور"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.32),rgba(255,255,255,0)_45%)]" />
          </div>

          <div className="flex flex-col items-center justify-center gap-4 bg-[#efe7de] px-5 py-8 text-center text-brand md:gap-6 md:px-16 md:py-0">
            <p className="text-xs tracking-[0.32em] text-ink-soft">تشكيلة رمضان 2026</p>
            <h1 className="text-[34px] font-medium leading-[1.35] md:text-[56px] md:leading-[1.2]">فخامة تحاكي ذوقك</h1>
            <p className="max-w-[30ch] text-base leading-7 text-ink md:text-2xl">تشكيلة راقية من أجمل المخاوير بتفاصيل أنثوية مترفة تناسب كل إطلالة.</p>
            <button
              type="button"
              className="min-h-12 w-full max-w-xs rounded-soft bg-brand px-8 py-3 text-base font-medium text-surface transition-colors hover:bg-[#2f2115] md:w-auto md:px-14 md:py-4 md:text-lg"
            >
              تسوق الآن
            </button>
          </div>
        </div>
      </section>

      <section className="mt-4 border-y border-line bg-surface-muted/70 md:mt-0">
        <div className="container-base grid grid-cols-2 gap-x-3 gap-y-1 py-4 text-center text-sm text-ink md:h-24 md:grid-cols-4 md:items-center md:gap-6 md:py-0">
          <p>دعم العملاء</p>
          <p>شحن سريع</p>
          <p>تصاميم حصرية</p>
          <p>جودة عالية</p>
        </div>
      </section>

      <section className="container-base py-8 md:section-y-sm">{children}</section>
    </main>
  );
}
