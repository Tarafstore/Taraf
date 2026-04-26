import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { Button } from '@/components/ui/button';
import { logoutAdminAction } from '@/app/admin/login/actions';
import { hasAdminSession } from '@/lib/admin/auth';

const navItems = [
  { label: 'لوحة التحكم', href: '/admin' },
  { label: 'المنتجات', href: '/admin/products' },
  { label: 'إضافة منتج', href: '/admin/products/new' },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authenticated = await hasAdminSession();

  if (!authenticated) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-canvas" dir="rtl">
      <header className="border-b border-line bg-surface/95">
        <div className="container-base flex flex-wrap items-center justify-between gap-3 py-4">
          <div className="space-y-0.5 text-right">
            <p className="text-xs tracking-[0.18em] text-ink-soft">TARAF ADMIN</p>
            <h1 className="text-lg font-semibold text-ink">إدارة المتجر</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href="/admin/products/new">
              <Button type="button">إضافة منتج</Button>
            </Link>
            <Link
              href="/"
              className="rounded-soft border border-line bg-white px-4 py-2 text-sm text-ink transition hover:bg-surface-muted"
            >
              العودة للمتجر
            </Link>
            <form action={logoutAdminAction}>
              <Button type="submit" variant="secondary">
                تسجيل الخروج
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="container-base grid gap-5 py-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-4 lg:self-start">
          <AdminSidebar items={navItems} />
          <p className="mt-3 rounded-soft border border-amber-300 bg-amber-50 p-3 text-xs leading-6 text-amber-900">
            تنبيه أمني: إذا كانت لوحة الإدارة تعتمد على مفتاح Supabase العام (anon)، فيجب ضبط RLS وصلاحيات صارمة قبل الإنتاج.
          </p>
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
