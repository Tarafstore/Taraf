import type { ReactNode } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { StorefrontShell } from '@/components/layout/storefront-shell';
import { Card } from '@/components/ui/card';
import { formatProductPrice, getFeaturedProducts, getProductPrimaryImage } from '@/lib/products';

const collectionCards = [
  { title: 'مخاوير مناسبات', cta: 'تسوقي الآن' },
  { title: 'مخاوير يومية', cta: 'تسوقي الآن' },
  { title: 'جديد الموسم', cta: 'تسوقي الآن' },
  { title: 'الأكثر طلباً', cta: 'تسوقي الآن' },
];

const lifestyleImages = Array.from({ length: 6 }, (_, index) => ({ id: index + 1, src: '/pics/model111.png' }));

const testimonials = [
  {
    quote: 'الخامة فخمة والتطريز راقٍ، من أجمل المخاوير اللي طلبتها.',
    name: 'أ. نورة',
  },
  {
    quote: 'تصاميم راقية وفريدة، طلبت أكثر من مرة وكل مرة أكون مبسوطة.',
    name: 'أ. شيخة',
  },
  {
    quote: 'توصيل سريع وتغليف فخم، تجربة تستاهل التقدير.',
    name: 'أ. ريم',
  },
];

function SectionTitle({ children }: { children: string }) {
  return (
    <div className="mb-7 text-center md:mb-9">
      <h2 className="text-2xl font-semibold text-[#2f1d12] md:text-[2rem]">{children}</h2>
      <span className="mx-auto mt-2 block h-[1px] w-16 bg-[#b8925b]/45" />
    </div>
  );
}

function IconBadge({ children }: { children: ReactNode }) {
  return <span className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d8c2a6] text-[#b8925b]">{children}</span>;
}

export default async function Home() {
  let featuredProducts = [] as Awaited<ReturnType<typeof getFeaturedProducts>>;

  try {
    featuredProducts = await getFeaturedProducts();
  } catch {
    featuredProducts = [];
  }

  return (
    <StorefrontShell containerized={false}>
      <div className="mx-auto w-full max-w-[1320px] px-4 pb-16 pt-4 sm:px-6 lg:px-8 lg:pb-20">
        <section className="overflow-hidden rounded-[20px] border border-[#e5d6c5] bg-[#f6efe6] shadow-[0_14px_35px_rgba(47,29,18,0.08)]">
          <div className="grid md:min-h-[460px] md:grid-cols-2">
            <div className="relative min-h-[330px] overflow-hidden md:order-1 md:min-h-[460px]">
              <Image
                src="/pics/model111.png"
                alt="عارضة ترتدي مخور فاخر"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>

            <div className="relative flex flex-col items-center justify-center px-6 py-10 text-center md:px-12">
              <span className="mb-3 text-sm text-[#7a6654]">تشكيلة رمضان 2026</span>
              <h1 className="text-[2.2rem] font-semibold leading-tight text-[#2f1d12] md:text-[3.75rem]">فخامة تحاكي ذوقك</h1>
              <p className="mt-4 max-w-[34ch] text-base leading-8 text-[#7a6654] md:text-xl">
                تصاميم راقية من أجمل المخاوير بتفاصيل أنثوية فاخرة تناسب كل إطلالة
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Link href="/products" className="rounded-md bg-[#2f1d12] px-8 py-3 text-sm font-medium text-[#fbf7f0] transition-colors hover:bg-[#24150d]">
                  تسوق الآن
                </Link>
                <Link href="/products" className="rounded-md border border-[#d8c2a6] px-8 py-3 text-sm font-medium text-[#2f1d12] transition-colors hover:border-[#b8925b] hover:text-[#b8925b]">
                  اكتشف المجموعة
                </Link>
              </div>
              <div className="pointer-events-none absolute left-6 top-6 text-[72px] leading-none text-[#d8c2a6]/20">❋</div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-2 gap-3 border-y border-[#e5d6c5] py-5 md:grid-cols-4 md:gap-5">
          {[
            ['شحن سريع', 'إلى جميع دول الخليج'],
            ['تصاميم حصرية', 'تصاميم محدودة ومميزة'],
            ['جودة عالية', 'خامات مختارة بعناية'],
            ['دعم العملاء', 'خدمة عملاء راقية'],
          ].map(([title, subtitle], index) => (
            <div key={title} className="text-center">
              <IconBadge>{['✦', '◇', '✧', '◌'][index]}</IconBadge>
              <p className="text-sm font-medium text-[#2f1d12]">{title}</p>
              <p className="mt-1 text-xs text-[#7a6654]">{subtitle}</p>
            </div>
          ))}
        </section>

        <section className="py-12 md:py-16">
          <SectionTitle>تسوقي حسب المجموعة</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {collectionCards.map((item) => (
              <Link key={item.title} href="/products" className="group relative block overflow-hidden rounded-2xl border border-[#e5d6c5]">
                <div className="relative aspect-[4/3]">
                  <Image src="/pics/model111.png" alt={item.title} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2f1d12]/70 via-[#2f1d12]/20 to-transparent transition-colors group-hover:from-[#2f1d12]/80" />
                  <div className="absolute inset-x-0 bottom-5 text-center text-[#fbf7f0]">
                    <p className="text-xl font-medium">{item.title}</p>
                    <p className="mt-1 text-sm text-[#efe4d6]">{item.cta}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-12 md:py-16">
          <SectionTitle>منتجات مميزة</SectionTitle>

          {featuredProducts.length === 0 ? (
            <Card className="rounded-2xl border border-[#e5d6c5] bg-white/80 p-8 text-center text-[#7a6654]">لا توجد منتجات مميزة حالياً.</Card>
          ) : (
            <div className="mx-auto grid max-w-[1120px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.slice(0, 4).map((product, index) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group overflow-hidden rounded-2xl border border-[#e5d6c5] bg-[#fffdfb] shadow-[0_8px_22px_rgba(47,29,18,0.06)] transition-all hover:-translate-y-1 hover:border-[#b8925b]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#f3ebdf]">
                    <Image
                      src={getProductPrimaryImage(product) || '/pics/model111.png'}
                      alt={product.name}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute right-2 top-2 rounded bg-[#2f1d12] px-2 py-1 text-[10px] text-[#fbf7f0]">{index % 2 === 0 ? 'جديد' : 'الأكثر مبيعاً'}</span>
                    <button type="button" className="absolute left-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#fbf7f0]/90 text-[#b8925b]" aria-label="إضافة للمفضلة">
                      ♡
                    </button>
                  </div>
                  <div className="space-y-2 p-4 text-center">
                    <h3 className="text-sm font-medium text-[#2f1d12]">{product.name}</h3>
                    <p className="text-base font-medium text-[#7a6654]">{formatProductPrice(product.price)}</p>
                    <div className="flex items-center gap-2">
                      <span className="flex-1 rounded-md border border-[#d8c2a6] py-2 text-xs text-[#2f1d12]">عرض سريع</span>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#2f1d12] text-[#fbf7f0]">👜</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="overflow-hidden rounded-[20px] border border-[#e5d6c5] bg-[#f6efe6] py-0">
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-[280px]">
              <Image src="/pics/model111.png" alt="عن طرف" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="relative flex items-center justify-center px-6 py-10 text-center md:px-14">
              <div>
                <h3 className="text-[2rem] font-semibold text-[#2f1d12]">عن طرف</h3>
                <p className="mt-4 max-w-[35ch] text-base leading-8 text-[#7a6654]">
                  في TARAF نصمم المخور بروح إماراتية وأناقة معاصرة لنمنحك إطلالة تجمع بين الأصالة والفخامة في كل مناسبة.
                </p>
                <Link href="/about" className="mt-6 inline-flex rounded-md bg-[#2f1d12] px-7 py-3 text-sm text-[#fbf7f0] hover:bg-[#24150d]">
                  تعرفي علينا
                </Link>
              </div>
              <span className="pointer-events-none absolute bottom-5 left-6 text-[84px] text-[#d8c2a6]/30">✿</span>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <SectionTitle>لماذا تختارين طرف؟</SectionTitle>
          <div className="grid gap-5 text-center sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['خامات مختارة بعناية', 'جودة استثنائية تدوم', '✦'],
              ['تصاميم محدودة', 'قطع حصرية لك فقط', '◇'],
              ['تفاصيل فاخرة', 'تشطيبات يدوية راقية', '✧'],
              ['شحن سريع وآمن', 'إلى جميع دول الخليج', '◌'],
            ].map(([title, sub, icon]) => (
              <div key={title} className="border-s border-[#eadfd2] px-3 first:border-s-0">
                <IconBadge>{icon}</IconBadge>
                <p className="text-sm font-medium text-[#2f1d12]">{title}</p>
                <p className="mt-1 text-xs text-[#7a6654]">{sub}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 md:py-16">
          <SectionTitle>ماذا يقول عملاؤنا</SectionTitle>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <Card key={item.name} className="flex h-full flex-col rounded-2xl border border-[#e5d6c5] bg-[#fffdfb] p-6 text-center shadow-[0_8px_20px_rgba(47,29,18,0.05)]">
                <span className="text-3xl text-[#d8c2a6]">“</span>
                <p className="mt-2 flex-1 text-sm leading-7 text-[#2f1d12]">{item.quote}</p>
                <p className="mt-4 text-[#b8925b]">★★★★★</p>
                <p className="mt-2 text-sm text-[#7a6654]">— {item.name}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-12 md:py-16">
          <SectionTitle>#طرف_تجمعنا</SectionTitle>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {lifestyleImages.map((image) => (
              <div key={image.id} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-[#e5d6c5]">
                <Image src={image.src} alt={`صورة أسلوب حياة ${image.id}`} fill sizes="(max-width: 1024px) 33vw, 16vw" className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-90" />
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-md border border-[#d8c2a6] px-7 py-2.5 text-sm text-[#2f1d12]">
              تابعينا على إنستغرام <span>◎</span>
            </Link>
          </div>
        </section>
      </div>

      <section className="bg-[#efe4d6] py-8">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-start justify-between gap-5 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <h3 className="text-2xl font-semibold text-[#2f1d12]">اشتركي ليصلك الجديد والعروض الخاصة</h3>
            <p className="mt-1 text-sm text-[#7a6654]">كوني أول من يعرف عن أحدث التصاميم والعروض الحصرية</p>
          </div>
          <form className="flex w-full max-w-[520px] items-center gap-2">
            <input type="email" placeholder="أدخلي بريدك الإلكتروني" className="h-11 flex-1 rounded-md border border-[#d8c2a6] bg-[#fbf7f0] px-4 text-sm text-[#2f1d12] outline-none" />
            <button type="submit" className="h-11 rounded-md bg-[#2f1d12] px-6 text-sm text-[#fbf7f0]">اشتركي الآن</button>
          </form>
        </div>
      </section>

      <footer className="bg-[#2f1d12] py-10 text-[#efe4d6]">
        <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
            <div>
              <p className="text-3xl tracking-[0.2em] [font-family:Georgia,'Times_New_Roman',serif]">TARAF</p>
              <p className="mt-1 text-xs tracking-[0.28em] text-[#d8c2a6]">MUKHAWAR</p>
              <p className="mt-4 max-w-[28ch] text-sm leading-7 text-[#d9c6b1]">فخامة خليجية بلمسة عصرية، تصاميمنا صنعت لتليق بذوقك الرفيع.</p>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-medium text-[#fbf7f0]">المتجر</h4>
              <ul className="space-y-2 text-sm text-[#d9c6b1]">
                <li>جميع المنتجات</li>
                <li>مخاوير مناسبات</li>
                <li>مخاوير يومية</li>
                <li>جديد الموسم</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-medium text-[#fbf7f0]">خدمة العملاء</h4>
              <ul className="space-y-2 text-sm text-[#d9c6b1]">
                <li>سياسة الاسترجاع</li>
                <li>الشحن والتوصيل</li>
                <li>الأسئلة الشائعة</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-medium text-[#fbf7f0]">معلومات</h4>
              <ul className="space-y-2 text-sm text-[#d9c6b1]">
                <li>من نحن</li>
                <li>سياسة الخصوصية</li>
                <li>الشروط والأحكام</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-medium text-[#fbf7f0]">تواصلي معنا</h4>
              <ul className="space-y-2 text-sm text-[#d9c6b1]">
                <li>واتساب</li>
                <li>إنستغرام</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-[#5a4333] pt-4 text-xs text-[#cdb79e] md:flex-row md:items-center md:justify-between">
            <p>© 2026 TARAF. جميع الحقوق محفوظة.</p>
            <p>Visa / Apple Pay / STC Pay</p>
          </div>
        </div>
      </footer>
    </StorefrontShell>
  );
}
