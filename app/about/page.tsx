import { StorefrontShell } from '@/components/layout/storefront-shell';

export default function AboutPage() {
  return (
    <StorefrontShell>
      <section className="rounded-2xl border border-line bg-surface p-6 text-right text-ink md:p-8">
        <h1 className="text-2xl font-medium text-brand md:text-3xl">من نحن</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-ink-soft md:text-lg">
          TARAF علامة عربية متخصصة في المخاوير الفاخرة، نركز على القصّات الراقية، الأقمشة عالية الجودة، والتفاصيل التي تمنحك حضورًا
          أنيقًا في كل مناسبة.
        </p>
      </section>
    </StorefrontShell>
  );
}
