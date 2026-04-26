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
    <Card className="p-4">
      <p className="mb-6 text-sm font-medium text-ink-soft">لوحة التحكم</p>
      <ul className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className={cn(
                  'block rounded-soft px-3 py-2 text-sm text-ink transition-colors',
                  active ? 'bg-brand text-white' : 'hover:bg-surface-muted'
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
