import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

type SidebarItem = {
  label: string;
  href: string;
  active?: boolean;
};

type AdminSidebarProps = {
  items: SidebarItem[];
};

export function AdminSidebar({ items }: AdminSidebarProps) {
  return (
    <Card className="p-4">
      <p className="mb-6 text-sm font-medium text-ink-soft">لوحة التحكم</p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className={cn(
                'block rounded-soft px-3 py-2 text-sm text-ink transition-colors',
                item.active ? 'bg-brand text-white' : 'hover:bg-surface-muted',
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
