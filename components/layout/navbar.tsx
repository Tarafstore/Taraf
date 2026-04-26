'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

type NavLink = {
  label: string;
  href: string;
};

type NavbarProps = {
  links: NavLink[];
  className?: string;
};

function BrandMark() {
  return (
    <svg viewBox="0 0 40 40" className="h-7 w-7 text-brand" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M20 6l5 5-5 5-5-5 5-5Z" />
      <path d="M20 24l5 5-5 5-5-5 5-5Z" />
      <path d="M6 20l5-5 5 5-5 5-5-5Z" />
      <path d="M24 20l5-5 5 5-5 5-5-5Z" />
      <path d="M20 12v16" />
      <path d="M12 20h16" />
    </svg>
  );
}

export function Navbar({ links, className }: NavbarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={cn('border-b border-line/90 bg-[#f8f3ed]/95 backdrop-blur', className)}>
      <div className="container-base">
        <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-2 md:h-[74px]">
          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-main-nav"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/80 text-ink transition-colors hover:bg-[#efe5d9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              {isMobileMenuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>

          <nav className="hidden items-center justify-start gap-7 text-[14px] text-[#3f2f21] md:flex" aria-label="روابط المتجر الأساسية">
            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn('transition-colors hover:text-brand', isActive && 'text-brand')}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link href="/" className="flex items-center justify-center gap-2 text-brand" aria-label="الانتقال إلى الصفحة الرئيسية">
            <BrandMark />
            <div className="text-center leading-none">
              <p className="text-[22px] tracking-[0.1em] [font-family:Georgia,'Times_New_Roman',serif]">TARAF</p>
              <p className="mt-0.5 text-[8px] uppercase tracking-[0.25em] text-[#6f5a46]">Mukhawar</p>
            </div>
          </Link>

          <div className="hidden md:block" aria-hidden="true" />
        </div>

        <nav
          id="mobile-main-nav"
          aria-label="روابط المتجر الأساسية للجوال"
          className={cn(
            'grid overflow-hidden border-t border-line/70 transition-all duration-200 md:hidden',
            isMobileMenuOpen ? 'max-h-80 py-3 opacity-100' : 'max-h-0 py-0 opacity-0',
          )}
        >
          <div className="flex flex-col gap-1.5 pb-1 text-[15px] text-[#3f2f21]">
            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className={cn(
                    'rounded-lg px-3 py-2.5 transition-colors hover:bg-[#efe5d9]',
                    isActive && 'bg-[#efe5d9] text-brand',
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
