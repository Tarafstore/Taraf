'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { cn } from '@/lib/utils';

type NavLink = {
  label: string;
  href: string;
};

type NavbarProps = {
  links: NavLink[];
  className?: string;
};

const utilityLinks = [
  { label: 'الحساب', href: '/admin/login', icon: 'user' },
  { label: 'البحث', href: '/products', icon: 'search' },
  { label: 'المفضلة', href: '/products', icon: 'heart' },
  { label: 'السلة', href: '/products', icon: 'bag' },
] as const;

function UtilityIcon({ type }: { type: (typeof utilityLinks)[number]['icon'] }) {
  if (type === 'user') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <circle cx="12" cy="8" r="3.2" />
        <path d="M6 19c1.4-2.7 3.5-4 6-4s4.6 1.3 6 4" />
      </svg>
    );
  }

  if (type === 'search') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <circle cx="11" cy="11" r="5" />
        <path d="m15 15 4 4" />
      </svg>
    );
  }

  if (type === 'heart') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <path d="M12 20s-6-3.8-6-8.2c0-2.2 1.6-3.8 3.6-3.8 1.3 0 2.1.6 2.4 1.2.3-.6 1.1-1.2 2.4-1.2 2 0 3.6 1.6 3.6 3.8 0 4.4-6 8.2-6 8.2Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M4 7h2l2.2 8.5h8.6L19 9H8.5" />
      <circle cx="10" cy="18" r="1" />
      <circle cx="17" cy="18" r="1" />
    </svg>
  );
}

export function Navbar({ links, className }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={cn('sticky top-0 z-40 border-b border-[#e5d6c5] bg-[#fbf7f0]/95 backdrop-blur-sm', className)}>
      <div className="h-8 border-b border-[#e5d6c5] bg-[#efe4d6] text-center text-[11px] leading-8 tracking-[0.02em] text-[#7a6654]">
        شحن سريع لجميع دول الخليج • تصاميم حصرية وجودة استثنائية
      </div>

      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid h-[74px] grid-cols-[1fr_auto_1fr] items-center">
          <div className="hidden items-center gap-2 text-[#2f1d12] md:flex">
            {utilityLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent transition-colors hover:border-[#e5d6c5] hover:text-[#b8925b]"
              >
                <UtilityIcon type={item.icon} />
              </Link>
            ))}
          </div>

          <Link href="/" className="text-center leading-none text-[#2f1d12]" aria-label="TARAF MUKHAWAR">
            <p className="text-[34px] tracking-[0.22em] [font-family:Georgia,'Times_New_Roman',serif] md:text-[40px]">TARAF</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.34em] text-[#7a6654]">MUKHAWAR</p>
          </Link>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e5d6c5] text-[#2f1d12] md:hidden"
              aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={mobileOpen}
              aria-controls="storefront-mobile-nav"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                {mobileOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>

            <Link
              href="/products"
              aria-label="السلة"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e5d6c5] text-[#2f1d12] md:hidden"
            >
              <UtilityIcon type="bag" />
            </Link>
          </div>
        </div>

        <nav className="hidden items-center justify-center gap-11 pb-3 text-[15px] text-[#2f1d12] md:flex" aria-label="روابط الموقع">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link key={link.label} href={link.href} className="group relative pb-1.5 transition-colors hover:text-[#b8925b]">
                {link.label}
                <span
                  className={cn(
                    'absolute bottom-0 right-0 h-[1.5px] w-full origin-right scale-x-0 bg-[#b8925b] transition-transform duration-300 group-hover:scale-x-100',
                    active && 'scale-x-100',
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <nav
          id="storefront-mobile-nav"
          className={cn(
            'grid overflow-hidden border-t border-[#e5d6c5] text-[#2f1d12] transition-all duration-200 md:hidden',
            mobileOpen ? 'max-h-80 py-3 opacity-100' : 'max-h-0 py-0 opacity-0',
          )}
          aria-label="روابط الموقع للجوال"
        >
          <div className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block rounded-md px-3 py-2.5 text-sm',
                  pathname === link.href ? 'bg-[#efe4d6] text-[#2f1d12]' : 'hover:bg-[#f3eadf]',
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
