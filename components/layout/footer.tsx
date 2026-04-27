import Link from 'next/link';

const footerColumns = [
  {
    title: 'المتجر',
    items: [
      { label: 'جميع المنتجات', href: '/products' },
      { label: 'مخاوير مناسبات', href: '/products' },
      { label: 'مخاوير يومية', href: '/products' },
      { label: 'جديد الموسم', href: '/collections' },
    ],
  },
  {
    title: 'خدمة العملاء',
    items: [
      { label: 'سياسة الاسترجاع', href: '/contact' },
      { label: 'الشحن والتوصيل', href: '/contact' },
      { label: 'الأسئلة الشائعة', href: '/contact' },
    ],
  },
  {
    title: 'معلومات',
    items: [
      { label: 'من نحن', href: '/about' },
      { label: 'سياسة الخصوصية', href: '/contact' },
      { label: 'الشروط والأحكام', href: '/contact' },
    ],
  },
  {
    title: 'تواصلي معنا',
    items: [
      { label: 'واتساب', href: '/contact' },
      { label: 'إنستغرام', href: '/contact' },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-[#2f1d12] py-8 text-[#efe4d6] sm:py-10">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1fr_1fr]">
          <div>
            <p className="text-[1.9rem] tracking-[0.2em] [font-family:Georgia,'Times_New_Roman',serif]">TARAF</p>
            <p className="mt-1 text-xs tracking-[0.28em] text-[#d8c2a6]">MUKHAWAR</p>
            <p className="mt-3 max-w-[30ch] text-sm leading-7 text-[#d9c6b1]">
              فخامة خليجية بلمسة عصرية، تصاميمنا صنعت لتليق بذوقك الرفيع.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-2.5 text-sm font-medium text-[#fbf7f0]">{column.title}</h4>
              <ul className="space-y-1.5 text-sm text-[#d9c6b1]">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="transition-colors hover:text-[#f6e9da]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-1.5 border-t border-[#5a4333] pt-3 text-xs text-[#cdb79e] md:flex-row md:items-center md:justify-between">
          <p>© 2026 TARAF. جميع الحقوق محفوظة.</p>
          <p>Visa / Apple Pay / STC Pay</p>
        </div>
      </div>
    </footer>
  );
}
