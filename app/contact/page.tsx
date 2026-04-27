import { StorefrontShell } from '@/components/layout/storefront-shell';

export default function ContactPage() {
  return (
    <StorefrontShell>
      <section className="mx-auto w-full max-w-[820px] rounded-2xl border border-line bg-surface p-5 text-right text-ink md:p-8">
        <h1 className="text-2xl font-medium text-brand md:text-3xl">تواصل معنا</h1>
        <p className="mt-4 text-base leading-8 text-ink-soft md:text-lg">
          يسعدنا استقبال استفساراتكم عبر البريد الإلكتروني
          <a className="mx-1 text-brand underline-offset-2 hover:underline" href="mailto:hello@taraf.store">
            hello@taraf.store
          </a>
          أو عبر الهاتف
          <a className="mx-1 text-brand underline-offset-2 hover:underline" href="tel:+971500000000">
            +971 50 000 0000
          </a>
          خلال أوقات العمل.
        </p>
      </section>
    </StorefrontShell>
  );
}
