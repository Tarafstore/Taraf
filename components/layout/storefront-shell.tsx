import Image from 'next/image';
import { Navbar } from '@/components/layout/navbar';
import { ProductsPreview } from '@/components/product/products-preview';

const topLinks = [
  { label: 'الرئيسية', href: '#' },
  { label: 'المتجر', href: '#' },
  { label: 'المخاوير', href: '#' },
  { label: 'من نحن', href: '#' },
  { label: 'تواصل معنا', href: '#' },
];

export function StorefrontShell() {
  return (
    <main className="min-h-screen bg-canvas">
      <Navbar links={topLinks} />

      <section className="container-base py-3">
        <div className="overflow-hidden rounded-[4px] border border-line bg-[#eae1d7]" dir="ltr">
          <div className="grid min-h-[435px] grid-cols-[56%_44%]">
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1600&q=80"
                alt="عارضة أزياء ترتدي مخور بلون بيج"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 56vw"
                className="object-cover"
              />
            </div>

            <div className="flex items-center justify-center px-14" dir="rtl">
              <div className="max-w-[430px] space-y-6 text-center text-brand">
                <h1 className="text-[56px] font-medium leading-[1.25] tracking-[-0.01em]">فخامة تحاكي ذوقك</h1>
                <p className="text-[18px] leading-[1.8] text-ink">تشكيلة راقية من أجمل المخاوير</p>
                <button
                  type="button"
                  className="mx-auto block rounded-soft bg-brand px-14 py-[15px] text-[18px] text-surface transition-colors hover:bg-[#2f2115]"
                >
                  تسوق الآن
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductsPreview />
    </main>
  );
}
