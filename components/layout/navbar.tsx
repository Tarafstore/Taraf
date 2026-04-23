'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type NavLink = { label: string; href: string };

type NavbarProps = {
  links: NavLink[];
  className?: string;
};

function BrandMark() {
  return (
    <svg viewBox="0 0 40 40" className="h-7 w-7 text-brand md:h-8 md:w-8" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M20 6l5 5-5 5-5-5 5-5Z" />
      <path d="M20 24l5 5-5 5-5-5 5-5Z" />
      <path d="M6 20l5-5 5 5-5 5-5-5Z" />
      <path d="M24 20l5-5 5 5-5 5-5-5Z" />
      <path d="M20 12v16" />
      <path d="M12 20h16" />
    </svg>
  );
}

function IconButton({ children, label, onClick, className }: { children: ReactNode; label: string; onClick?: () => void; className?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'inline-flex h-11 w-11 items-center justify-center rounded-full border border-transparent text-ink transition hover:bg-surface-muted/90 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 md:h-9 md:w-9',
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Navbar({ links, className }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={cn('sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur-md', className)}>
        <div className="container-base md:relative md:grid md:h-[88px] md:grid-cols-[1fr_auto] md:items-center md:gap-8">
          <div className="relative flex h-[74px] items-center justify-between md:justify-self-start">
            <div className="flex items-center gap-0.5 text-ink-soft md:hidden">
              <IconButton label="فتح القائمة" onClick={() => setIsMenuOpen(true)}>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </IconButton>
              <IconButton label="بحث">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <circle cx="11" cy="11" r="5" />
                  <path d="m15 15 4 4" />
                </svg>
              </IconButton>
            </div>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 text-center leading-none text-brand md:left-1/2 md:top-1/2 md:w-fit md:-translate-x-1/2 md:-translate-y-1/2">
              <BrandMark />
              <p className="text-[26px] tracking-[0.15em] [font-family:Georgia,'Times_New_Roman',serif] md:text-[37px] md:tracking-[0.18em]">TARAF</p>
              <p className="text-[8px] uppercase tracking-[0.32em] text-ink-soft md:text-[9px] md:tracking-[0.37em]">Mukhawar</p>
            </div>

            <div className="flex items-center gap-0.5 text-ink-soft md:justify-self-end md:gap-1">
              <IconButton label="الملف الشخصي">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <circle cx="12" cy="8" r="3.2" />
                  <path d="M6 19c1.4-2.7 3.5-4 6-4s4.6 1.3 6 4" />
                </svg>
              </IconButton>
              <IconButton label="العربة">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M4 7h2l2.2 8.5h8.6L19 9H8.5" />
                  <circle cx="10" cy="18" r="1" />
                  <circle cx="17" cy="18" r="1" />
                </svg>
              </IconButton>
            </div>
          </div>

          <div className="hidden items-center gap-1 text-ink-soft md:flex">
            <IconButton label="المفضلة" className="h-8 w-8 rounded-none hover:bg-transparent">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M12 20s-6-3.8-6-8.2c0-2.2 1.6-3.8 3.6-3.8 1.3 0 2.1.6 2.4 1.2.3-.6 1.1-1.2 2.4-1.2 2 0 3.6 1.6 3.6 3.8 0 4.4-6 8.2-6 8.2Z" />
              </svg>
            </IconButton>
            <IconButton label="بحث" className="h-8 w-8 rounded-none hover:bg-transparent">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                <circle cx="11" cy="11" r="5" />
                <path d="m15 15 4 4" />
              </svg>
            </IconButton>
          </div>

          <nav className="hidden items-center justify-center gap-9 pb-4 text-[13px] text-ink md:flex md:pb-0">
            {links.map((link) => (
              <Link key={link.label} href={link.href} className="transition-colors hover:text-brand">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className={cn('fixed inset-0 z-50 bg-[#2b231b]/45 transition-opacity md:hidden', isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0')} onClick={() => setIsMenuOpen(false)} />

      <aside
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-[82%] max-w-sm bg-surface p-5 shadow-[-12px_0_30px_rgba(32,22,13,0.16)] transition-transform duration-300 md:hidden',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        aria-hidden={!isMenuOpen}
      >
        <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
          <p className="text-sm tracking-[0.22em] text-ink-soft">القائمة</p>
          <IconButton label="إغلاق القائمة" onClick={() => setIsMenuOpen(false)}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </IconButton>
        </div>

        <nav className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-soft px-3 py-3 text-base text-ink transition-colors hover:bg-surface-muted"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 grid grid-cols-2 gap-2 border-t border-line pt-5 text-sm text-ink-soft">
          <button type="button" className="rounded-soft border border-line bg-surface-muted/50 px-3 py-2.5">المفضلة</button>
          <button type="button" className="rounded-soft border border-line bg-surface-muted/50 px-3 py-2.5">طلباتي</button>
        </div>
      </aside>
    </>
  );
}
