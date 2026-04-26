'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

type SidebarItem = {
  label: string;
  href: string;
};

type AdminSidebarProps = {
  items: SidebarItem[];
};

export function AdminSidebar({ items }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <Card className="overflow-hidden p-0 shadow-[0_14px_34px_-28px_rgba(52,36,23,0.9)]">
      <div className="border-b border-line bg-surface-muted/60 px-4 py-3 text-right">
        <p className="text-[11px] uppercase tracking-[0.18em] text-ink-soft">Navigation</p>
        <p className="mt-1 text-sm font-semibold text-ink">لوحة التحكم</p>
      </div>
      <ul className="space-y-1 p-3">
        {items.map((item) => {
          const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className={cn(
                  'block rounded-soft px-3 py-2 text-right text-sm font-medium text-ink transition-colors',
                  active ? 'bg-brand text-white shadow-[0_8px_20px_-14px_rgba(52,36,23,1)]' : 'hover:bg-surface-muted'
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
