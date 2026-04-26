import { loginAdminAction } from '@/app/admin/login/actions';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type AdminLoginPageProps = {
  searchParams: Promise<{ error?: string; success?: string }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams;

  return (
    <div className="container-base flex min-h-screen items-center justify-center py-10">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-center text-2xl font-bold">دخول لوحة التحكم</h1>
        <p className="mt-2 text-center text-sm text-ink-soft">أدخل كلمة مرور المشرف للمتابعة.</p>

        {params.error ? (
          <p className="mt-4 rounded-soft border border-red-300 bg-red-50 p-2 text-sm text-red-700">{decodeURIComponent(params.error)}</p>
        ) : null}

        {params.success ? (
          <p className="mt-4 rounded-soft border border-emerald-300 bg-emerald-50 p-2 text-sm text-emerald-700">
            {decodeURIComponent(params.success)}
          </p>
        ) : null}

        <form action={loginAdminAction} className="mt-5 space-y-4">
          <label className="space-y-2 text-sm">
            <span>كلمة المرور</span>
            <Input name="password" type="password" required autoFocus />
          </label>

          <Button type="submit" className="w-full">
            تسجيل الدخول
          </Button>
        </form>
      </Card>
    </div>
  );
}
