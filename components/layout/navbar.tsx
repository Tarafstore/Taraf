import Link from 'next/link';
import { cn } from '@/lib/utils';

type NavLink = { label: string; href: string };

type NavbarProps = {
  links: NavLink[];
  className?: string;
};

export function Navbar({ links, className }: NavbarProps) {
  return (
    <header className={cn('border-b border-line bg-surface', className)}>
      <div className="container-base flex h-20 items-center justify-between">
        <nav className="flex items-center gap-8 text-sm text-ink">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="transition-colors hover:text-brand">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="text-center">
          <p className="text-xl tracking-[0.2em] text-brand">LAYALI</p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-ink-soft">Mukhawar</p>
        </div>
      </div>
    </header>
  );
}
