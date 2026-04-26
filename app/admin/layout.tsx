import Link from 'next/link';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

const navItems = [
  { label: 'لوحة التحكم', href: '/admin' },
  { label: 'المنتجات', href: '/admin/products' },
  { label: 'إضافة منتج', href: '/admin/products/new' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas">
      <header className="border-b border-line bg-surface">
        <div className="container-base flex items-center justify-between py-4">
          <div>
            <p className="text-sm text-ink-soft">TARAF Admin</p>
            <h1 className="text-lg font-semibold text-ink">إدارة المتجر</h1>
          </div>
          <Link
            href="/"
            className="rounded-soft border border-line bg-white px-4 py-2 text-sm text-ink transition hover:bg-surface-muted"
          >
            العودة للمتجر
          </Link>
        </div>
      </header>

      <div className="container-base grid gap-6 py-6 lg:grid-cols-[220px_1fr]">
        <aside>
          <AdminSidebar items={navItems} />
          <p className="mt-3 rounded-soft border border-amber-300 bg-amber-50 p-3 text-xs leading-6 text-amber-900">
            تنبيه أمني: إذا كانت لوحة الإدارة تعتمد على مفتاح Supabase العام (anon)، فيجب ضبط RLS وصلاحيات صارمة قبل الإنتاج.
          </p>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
