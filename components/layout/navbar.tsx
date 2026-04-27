'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden="true">
        <circle cx="12" cy="8" r="3.2" />
        <path d="M6 19c1.4-2.7 3.5-4 6-4s4.6 1.3 6 4" />
      </svg>
    );
  }

  if (type === 'search') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden="true">
        <circle cx="11" cy="11" r="5" />
        <path d="m15 15 4 4" />
      </svg>
    );
  }

  if (type === 'heart') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden="true">
        <path d="M12 20s-6-3.8-6-8.2c0-2.2 1.6-3.8 3.6-3.8 1.3 0 2.1.6 2.4 1.2.3-.6 1.1-1.2 2.4-1.2 2 0 3.6 1.6 3.6 3.8 0 4.4-6 8.2-6 8.2Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden="true">
      <path d="M4 7h2l2.2 8.5h8.6L19 9H8.5" />
      <circle cx="10" cy="18" r="1" />
      <circle cx="17" cy="18" r="1" />
    </svg>
  );
}

export function Navbar({ links, className }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b border-[#e5d6c5] bg-[#fbf7f0]/96 backdrop-blur-sm transition-shadow duration-300 ease-out',
        hasScrolled && 'shadow-[0_4px_12px_rgba(47,29,18,0.05)]',
        className,
      )}
    >
      <div className="border-b border-[#e5d6c5] bg-[#efe4d6] px-4 py-1.5 text-center text-[10px] leading-5 tracking-[0.02em] text-[#7a6654] sm:text-[11px] sm:leading-6">
        شحن سريع لجميع دول الخليج • تصاميم حصرية • جودة استثنائية
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[64px] grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div className="hidden items-center gap-1 text-[#2f1d12] lg:flex">
            {utilityLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-transparent transition-all duration-300 ease-out hover:border-[#e5d6c5] hover:text-[#b8925b]"
              >
                <UtilityIcon type={item.icon} />
              </Link>
            ))}
          </div>

          <Link href="/" className="text-center leading-none text-[#2f1d12]" aria-label="TARAF MUKHAWAR">
            <p className="text-[28px] tracking-[0.2em] [font-family:Georgia,'Times_New_Roman',serif] sm:text-[31px] lg:text-[34px]">TARAF</p>
            <p className="mt-0.5 text-[9px] uppercase tracking-[0.34em] text-[#7a6654]">MUKHAWAR</p>
          </Link>

          <div className="flex items-center justify-end gap-1.5 lg:hidden">
            <Link href="/products" aria-label="البحث" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#e5d6c5] text-[#2f1d12] sm:hidden">
              <UtilityIcon type="search" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#e5d6c5] text-[#2f1d12]"
              aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={mobileOpen}
              aria-controls="storefront-mobile-nav"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                {mobileOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>

            <Link href="/products" aria-label="السلة" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#e5d6c5] text-[#2f1d12]">
              <UtilityIcon type="bag" />
            </Link>
          </div>

          <nav className="hidden items-center justify-end gap-5 text-[13px] text-[#2f1d12] lg:flex xl:gap-8 xl:text-[14px]" aria-label="روابط الموقع">
            {links.map((link) => {
              const active = pathname === link.href;

              return (
                <Link key={link.label} href={link.href} className="group relative pb-1 transition-colors duration-300 ease-out hover:text-[#b8925b]">
                  {link.label}
                  <span
                    className={cn(
                      'absolute bottom-0 right-0 h-px w-full origin-right scale-x-0 bg-[#b8925b] transition-transform duration-300 ease-out group-hover:scale-x-100',
                      active && 'scale-x-100',
                    )}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        <nav
          id="storefront-mobile-nav"
          className={cn(
            'grid overflow-hidden border-t border-[#e5d6c5] text-[#2f1d12] transition-all duration-300 ease-out lg:hidden',
            mobileOpen ? 'max-h-[420px] py-2.5 opacity-100' : 'max-h-0 py-0 opacity-0',
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
                  'block rounded-md px-3 py-3 text-sm',
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
