'use server';

import { redirect } from 'next/navigation';
import { clearAdminSessionCookie, createAdminSessionCookie, verifyAdminPassword } from '@/lib/admin/auth';

export async function loginAdminAction(formData: FormData) {
  const password = `${formData.get('password') ?? ''}`;

  if (!password.trim()) {
    redirect('/admin/login?error=يرجى+إدخال+كلمة+المرور');
  }

  const valid = verifyAdminPassword(password);

  if (!valid) {
    redirect('/admin/login?error=كلمة+المرور+غير+صحيحة');
  }

  await createAdminSessionCookie();
  redirect('/admin');
}

export async function logoutAdminAction() {
  await clearAdminSessionCookie();
  redirect('/admin/login?success=تم+تسجيل+الخروج+بنجاح');
}
