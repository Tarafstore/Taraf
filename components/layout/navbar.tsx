import type { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type NavLink = { label: string; href: string };

type NavbarProps = {
  links: NavLink[];
  className?: string;
};

function BrandMark() {
  return (
    <svg viewBox="0 0 40 40" className="h-8 w-8 text-brand" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M20 6l5 5-5 5-5-5 5-5Z" />
      <path d="M20 24l5 5-5 5-5-5 5-5Z" />
      <path d="M6 20l5-5 5 5-5 5-5-5Z" />
      <path d="M24 20l5-5 5 5-5 5-5-5Z" />
      <path d="M20 12v16" />
      <path d="M12 20h16" />
    </svg>
  );
}

function ActionIcon({ children, label }: { children: ReactNode; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center text-ink transition-colors hover:text-brand"
    >
      {children}
    </button>
  );
}

export function Navbar({ links, className }: NavbarProps) {
  return (
    <header className={cn('border-b border-line bg-surface/95', className)}>
      <div className="container-base grid h-[88px] grid-cols-[1fr_auto_auto_1fr] items-center gap-8">
        <div className="justify-self-start">
          <div className="flex items-center gap-1 text-ink-soft">
            <ActionIcon label="العربة">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M4 7h2l2.2 8.5h8.6L19 9H8.5" />
                <circle cx="10" cy="18" r="1" />
                <circle cx="17" cy="18" r="1" />
              </svg>
            </ActionIcon>
            <ActionIcon label="الملف الشخصي">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                <circle cx="12" cy="8" r="3.2" />
                <path d="M6 19c1.4-2.7 3.5-4 6-4s4.6 1.3 6 4" />
              </svg>
            </ActionIcon>
            <ActionIcon label="بحث">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                <circle cx="11" cy="11" r="5" />
                <path d="m15 15 4 4" />
              </svg>
            </ActionIcon>
          </div>
        </div>

        <nav className="flex items-center gap-9 text-[13px] text-ink">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="transition-colors hover:text-brand">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex min-w-[130px] flex-col items-center justify-center gap-1 text-center leading-none text-brand">
          <BrandMark />
          <p className="text-[37px] tracking-[0.18em] [font-family:Georgia,'Times_New_Roman',serif]">LAYALI</p>
          <p className="text-[9px] uppercase tracking-[0.37em] text-ink-soft">Mukhawar</p>
        </div>

        <div className="justify-self-end">
          <div className="flex items-center gap-1 text-ink-soft">
            <ActionIcon label="المفضلة">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M12 20s-6-3.8-6-8.2c0-2.2 1.6-3.8 3.6-3.8 1.3 0 2.1.6 2.4 1.2.3-.6 1.1-1.2 2.4-1.2 2 0 3.6 1.6 3.6 3.8 0 4.4-6 8.2-6 8.2Z" />
              </svg>
            </ActionIcon>
            <ActionIcon label="العربة">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M4 7h2l2.2 8.5h8.6L19 9H8.5" />
                <circle cx="10" cy="18" r="1" />
                <circle cx="17" cy="18" r="1" />
              </svg>
            </ActionIcon>
          </div>
        </div>
      </div>
    </header>
  );
}
