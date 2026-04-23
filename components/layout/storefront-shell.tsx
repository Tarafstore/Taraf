import type { ReactNode } from 'react';
import { Navbar } from '@/components/layout/navbar';

type StorefrontShellProps = {
  children?: ReactNode;
};

const topLinks = [
  { label: 'الرئيسية', href: '#' },
  { label: 'المتجر', href: '#' },
  { label: 'المخاوير', href: '#' },
  { label: 'من نحن', href: '#' },
  { label: 'تواصل معنا', href: '#' },
];

export function StorefrontShell({ children }: StorefrontShellProps) {
  return (
    <main className="min-h-screen bg-canvas">
      <Navbar links={topLinks} />

      <section className="container-base pt-4">
        <div className="grid min-h-[435px] grid-cols-[1.1fr_1fr] overflow-hidden border border-line bg-surface-muted">
          <div className="relative bg-[linear-gradient(90deg,#d7c7b7_0%,#cab7a4_45%,#d8c8b8_100%)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.32),rgba(255,255,255,0)_45%)]" />
          </div>

          <div className="flex flex-col items-center justify-center gap-6 bg-[#efe7de] px-16 text-center text-brand">
            <h1 className="text-[56px] font-medium leading-[1.2]">فخامة تحاكي ذوقك</h1>
            <p className="text-2xl text-ink">تشكيلة راقية من أجمل المخاوير</p>
            <button type="button" className="rounded-soft bg-brand px-14 py-4 text-lg text-surface transition-colors hover:bg-[#2f2115]">
              تسوق الآن
            </button>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface-muted/70">
        <div className="container-base grid h-24 grid-cols-4 items-center gap-6 text-center text-sm text-ink">
          <p>دعم العملاء</p>
          <p>شحن سريع</p>
          <p>تصاميم حصرية</p>
          <p>جودة عالية</p>
        </div>
      </section>

      <section className="container-base section-y-sm">{children}</section>
    </main>
  );
}
