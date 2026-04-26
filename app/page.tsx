import type { ReactNode } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { StorefrontShell } from '@/components/layout/storefront-shell';
import { Card } from '@/components/ui/card';
import { formatProductPrice, getActiveProducts, getFeaturedProducts, getProductPrimaryImage } from '@/lib/products';

const collectionCards = [
  { title: 'مخاوير مناسبات', cta: 'تسوقي الآن' },
  { title: 'مخاوير يومية', cta: 'تسوقي الآن' },
  { title: 'جديد الموسم', cta: 'تسوقي الآن' },
  { title: 'الأكثر طلباً', cta: 'تسوقي الآن' },
] as const;

const testimonials = [
  { quote: 'الخامة فخمة والتطريز راقٍ، من أجمل المخاوير اللي طلبتها.', name: 'أ. نورة' },
  { quote: 'تصاميم راقية وفريدة، طلبت أكثر من مرة وكل مرة أكون مبسوطة.', name: 'أ. شيخة' },
  { quote: 'توصيل سريع وتغليف فخم، تجربة تستاهل التقدير.', name: 'أ. ريم' },
] as const;

function SectionTitle({ children }: { children: string }) {
  return (
    <div className="mb-6 text-center md:mb-7">
      <h2 className="text-[1.85rem] font-semibold leading-tight text-[#2f1d12] md:text-[2rem]">{children}</h2>
      <span className="mx-auto mt-2 block h-px w-14 bg-[#b8925b]/45" />
    </div>
  );
}

function IconBadge({ children }: { children: ReactNode }) {
  return <span className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d8c2a6] text-sm text-[#b8925b]">{children}</span>;
}

function buildImagePool(urls: string[]) {
  const unique = Array.from(new Set(urls.filter(Boolean)));
  if (unique.length === 0) {
    return ['/pics/model111.png', '/pics/model111.png', '/pics/model111.png', '/pics/model111.png', '/pics/model111.png', '/pics/model111.png'];
  }

  const pool = [...unique];
  let idx = 0;
  while (pool.length < 6) {
    pool.push(unique[idx % unique.length]);
    idx += 1;
  }

  return pool.slice(0, 6);
}

export default async function Home() {
  let featuredProducts = [] as Awaited<ReturnType<typeof getFeaturedProducts>>;
  let activeProducts = [] as Awaited<ReturnType<typeof getActiveProducts>>;

  try {
    [featuredProducts, activeProducts] = await Promise.all([getFeaturedProducts(), getActiveProducts()]);
  } catch {
    featuredProducts = [];
    activeProducts = [];
  }

  const poolSource = [...featuredProducts, ...activeProducts];
  const imagePool = buildImagePool(poolSource.map((product) => getProductPrimaryImage(product)));

  return (
    <StorefrontShell containerized={false}>
      <div className="mx-auto w-full max-w-[1320px] px-4 pb-12 pt-3 sm:px-6 lg:px-8 lg:pb-14">
        <section className="overflow-hidden rounded-[18px] border border-[#e5d6c5] bg-[#f6efe6] shadow-[0_12px_28px_rgba(47,29,18,0.07)]">
          <div className="grid md:min-h-[440px] md:grid-cols-2">
            <div className="relative min-h-[300px] overflow-hidden md:order-1 md:min-h-[440px]">
              <Image src={imagePool[0]} alt="عارضة ترتدي مخور فاخر" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-300 ease-out hover:scale-[1.02]" priority />
            </div>

            <div className="relative flex flex-col items-center justify-center px-6 py-8 text-center md:px-12 md:py-10">
              <span className="mb-3 text-sm text-[#7a6654]">تشكيلة رمضان 2026</span>
              <h1 className="text-[2.3rem] font-semibold leading-[1.18] text-[#2f1d12] md:text-[3.55rem]">فخامة تحاكي ذوقك</h1>
              <p className="mt-3 max-w-[34ch] text-[15px] leading-7 text-[#7a6654] md:text-lg md:leading-8">
                تصاميم راقية من أجمل المخاوير بتفاصيل أنثوية فاخرة تناسب كل إطلالة
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                <Link href="/products" className="inline-flex h-11 min-w-[132px] items-center justify-center rounded-md bg-[#2f1d12] px-6 text-sm font-medium text-[#fbf7f0] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#24150d]">
                  تسوق الآن
                </Link>
                <Link href="#collections" className="inline-flex h-11 min-w-[132px] items-center justify-center rounded-md border border-[#d8c2a6] px-6 text-sm font-medium text-[#2f1d12] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#b8925b] hover:text-[#b8925b]">
                  اكتشف المجموعة
                </Link>
              </div>

              <div className="pointer-events-none absolute left-6 top-4 text-[66px] leading-none text-[#d8c2a6]/20">❋</div>
            </div>
          </div>
        </section>

        <section className="mt-5 grid grid-cols-2 gap-2.5 border-y border-[#e5d6c5] py-3.5 md:grid-cols-4 md:gap-4 md:py-4">
          {[
            ['شحن سريع', 'إلى جميع دول الخليج'],
            ['تصاميم حصرية', 'تصاميم محدودة ومميزة'],
            ['جودة عالية', 'خامات مختارة بعناية'],
            ['دعم العملاء', 'خدمة عملاء راقية'],
          ].map(([title, subtitle], index) => (
            <div key={title} className="text-center">
              <IconBadge>{['✦', '◇', '✧', '◌'][index]}</IconBadge>
              <p className="text-sm font-medium text-[#2f1d12]">{title}</p>
              <p className="mt-1 text-[12px] text-[#7a6654]">{subtitle}</p>
            </div>
          ))}
        </section>

        <section id="collections" className="py-10 md:py-12">
          <SectionTitle>تسوقي حسب المجموعة</SectionTitle>
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {collectionCards.map((item, index) => (
              <Link key={item.title} href="/products" className="group relative block overflow-hidden rounded-[14px] border border-[#e5d6c5]">
                <div className="relative aspect-[4/3]">
                  <Image src={imagePool[index + 1]} alt={item.title} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2f1d12]/75 via-[#2f1d12]/30 to-[#2f1d12]/5 transition-colors duration-300 ease-out group-hover:from-[#2f1d12]/80" />
                  <div className="absolute inset-x-0 bottom-4 text-center text-[#fbf7f0]">
                    <p className="text-xl font-medium">{item.title}</p>
                    <p className="mt-1 text-sm text-[#efe4d6]">{item.cta}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-10 md:py-12">
          <SectionTitle>منتجات مميزة</SectionTitle>

          {featuredProducts.length === 0 ? (
            <Card className="rounded-[14px] border border-[#e5d6c5] bg-white/80 p-6 text-center text-[#7a6654]">لا توجد منتجات مميزة حالياً.</Card>
          ) : (
            <div className="mx-auto grid max-w-[1180px] gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.slice(0, 4).map((product, index) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-[#e5d6c5] bg-[#fffdfb] shadow-[0_6px_18px_rgba(47,29,18,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#b8925b]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#f3ebdf]">
                    <Image
                      src={getProductPrimaryImage(product) || imagePool[index]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    />
                    <span className="absolute right-2 top-2 rounded bg-[#2f1d12] px-2 py-[3px] text-[10px] text-[#fbf7f0]">
                      {index % 2 === 0 ? 'جديد' : 'الأكثر مبيعاً'}
                    </span>
                    <span className="absolute left-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#fbf7f0]/95 text-[#b8925b]">♡</span>
                  </div>

                  <div className="flex flex-1 flex-col space-y-2 p-3.5 text-center">
                    <h3 className="text-base font-medium leading-6 text-[#2f1d12]">{product.name}</h3>
                    <p className="text-[17px] font-medium text-[#7a6654]">{formatProductPrice(product.price)}</p>
                    <div className="mt-auto flex items-center gap-2">
                      <span className="inline-flex h-9 flex-1 items-center justify-center rounded-md border border-[#d8c2a6] text-xs text-[#2f1d12]">عرض سريع</span>
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#2f1d12] text-[#fbf7f0]">👜</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="overflow-hidden rounded-[18px] border border-[#e5d6c5] bg-[#f6efe6]">
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-[250px] md:min-h-[320px]">
              <Image src={imagePool[2]} alt="عن طرف" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="relative flex items-center justify-center px-6 py-8 text-center md:px-12">
              <div>
                <h3 className="text-[2rem] font-semibold text-[#2f1d12]">عن طرف</h3>
                <p className="mx-auto mt-3 max-w-[32ch] text-[15px] leading-7 text-[#7a6654] md:text-base md:leading-8">
                  في TARAF نصمم المخور بروح إماراتية وأناقة معاصرة لنمنحك إطلالة تجمع بين الأصالة والفخامة في كل مناسبة.
                </p>
                <Link href="/about" className="mt-5 inline-flex h-10 items-center rounded-md bg-[#2f1d12] px-7 text-sm text-[#fbf7f0] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#24150d]">
                  تعرفي علينا
                </Link>
              </div>
              <span className="pointer-events-none absolute bottom-4 left-5 text-[76px] text-[#d8c2a6]/25">✿</span>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-12">
          <SectionTitle>لماذا تختارين طرف؟</SectionTitle>
          <div className="grid gap-3.5 text-center sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['خامات مختارة بعناية', 'جودة استثنائية تدوم', '✦'],
              ['تصاميم محدودة', 'قطع حصرية لك فقط', '◇'],
              ['تفاصيل فاخرة', 'تشطيبات يدوية راقية', '✧'],
              ['شحن سريع وآمن', 'إلى جميع دول الخليج', '◌'],
            ].map(([title, sub, icon]) => (
              <div key={title} className="rounded-md border border-[#eadfd2] px-3 py-4 lg:border-y-0 lg:border-s lg:border-e-0">
                <IconBadge>{icon}</IconBadge>
                <p className="text-sm font-medium text-[#2f1d12]">{title}</p>
                <p className="mt-1 text-xs text-[#7a6654]">{sub}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10 md:py-12">
          <SectionTitle>ماذا يقول عملاؤنا</SectionTitle>
          <div className="grid gap-3.5 md:grid-cols-3">
            {testimonials.map((item) => (
              <Card key={item.name} className="flex h-full flex-col rounded-[14px] border border-[#e5d6c5] bg-[#fffdfb] p-5 text-center shadow-[0_6px_18px_rgba(47,29,18,0.05)]">
                <span className="text-3xl leading-none text-[#d8c2a6]">“</span>
                <p className="mt-2 flex-1 text-sm leading-7 text-[#2f1d12]">{item.quote}</p>
                <p className="mt-3 tracking-[0.15em] text-[#b8925b]">★★★★★</p>
                <p className="mt-2 text-sm text-[#7a6654]">— {item.name}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-10 md:py-12">
          <SectionTitle>#طرف_تجمعنا</SectionTitle>
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-6">
            {imagePool.map((image, index) => (
              <div key={`${image}-${index}`} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-[#e5d6c5]">
                <Image
                  src={image}
                  alt={`صورة أسلوب حياة ${index + 1}`}
                  fill
                  sizes="(max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-all duration-300 ease-out group-hover:scale-[1.02] group-hover:opacity-90"
                />
              </div>
            ))}
          </div>
          <div className="mt-5 text-center">
            <Link href="/contact" className="inline-flex h-10 items-center gap-2 rounded-md border border-[#d8c2a6] px-6 text-sm text-[#2f1d12] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#b8925b]">
              تابعينا على إنستغرام <span>◎</span>
            </Link>
          </div>
        </section>
      </div>

      <section className="bg-[#efe4d6] py-6">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-start justify-between gap-4 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <h3 className="text-[1.7rem] font-semibold text-[#2f1d12]">اشتركي ليصلك الجديد والعروض الخاصة</h3>
            <p className="mt-1 text-sm text-[#7a6654]">كوني أول من يعرف عن أحدث التصاميم والعروض الحصرية</p>
          </div>
          <form className="flex w-full max-w-[520px] items-center gap-2">
            <input type="email" placeholder="أدخلي بريدك الإلكتروني" className="h-10 flex-1 rounded-md border border-[#d8c2a6] bg-[#fbf7f0] px-4 text-sm text-[#2f1d12] outline-none" />
            <button type="submit" className="h-10 rounded-md bg-[#2f1d12] px-6 text-sm text-[#fbf7f0]">اشتركي الآن</button>
          </form>
        </div>
      </section>

      <footer className="bg-[#2f1d12] py-8 text-[#efe4d6]">
        <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-7 lg:grid-cols-[1.25fr_1fr_1fr_1fr_1fr]">
            <div>
              <p className="text-[2rem] tracking-[0.2em] [font-family:Georgia,'Times_New_Roman',serif]">TARAF</p>
              <p className="mt-1 text-xs tracking-[0.28em] text-[#d8c2a6]">MUKHAWAR</p>
              <p className="mt-3 max-w-[28ch] text-sm leading-7 text-[#d9c6b1]">فخامة خليجية بلمسة عصرية، تصاميمنا صنعت لتليق بذوقك الرفيع.</p>
            </div>

            <div>
              <h4 className="mb-2.5 text-sm font-medium text-[#fbf7f0]">المتجر</h4>
              <ul className="space-y-1.5 text-sm text-[#d9c6b1]">
                <li>جميع المنتجات</li>
                <li>مخاوير مناسبات</li>
                <li>مخاوير يومية</li>
                <li>جديد الموسم</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2.5 text-sm font-medium text-[#fbf7f0]">خدمة العملاء</h4>
              <ul className="space-y-1.5 text-sm text-[#d9c6b1]">
                <li>سياسة الاسترجاع</li>
                <li>الشحن والتوصيل</li>
                <li>الأسئلة الشائعة</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2.5 text-sm font-medium text-[#fbf7f0]">معلومات</h4>
              <ul className="space-y-1.5 text-sm text-[#d9c6b1]">
                <li>من نحن</li>
                <li>سياسة الخصوصية</li>
                <li>الشروط والأحكام</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2.5 text-sm font-medium text-[#fbf7f0]">تواصلي معنا</h4>
              <ul className="space-y-1.5 text-sm text-[#d9c6b1]">
                <li>واتساب</li>
                <li>إنستغرام</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-1.5 border-t border-[#5a4333] pt-3 text-xs text-[#cdb79e] md:flex-row md:items-center md:justify-between">
            <p>© 2026 TARAF. جميع الحقوق محفوظة.</p>
            <p>Visa / Apple Pay / STC Pay</p>
          </div>
        </div>
      </footer>
    </StorefrontShell>
  );
}
