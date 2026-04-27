import Image from 'next/image';
import Link from 'next/link';

import { StorefrontShell } from '@/components/layout/storefront-shell';

const ABOUT_STILL_LIFE_IMAGE = '/pics/model111.png';
const ABOUT_MODEL_IMAGE = '/pics/model111.png';
const ABOUT_FABRIC_IMAGE = '/pics/model111.png';

const reasons = [
  {
    title: 'جودة عالية',
    text: 'نختار أجود الخامات ونضمن لك أعلى معايير الجودة في كل قطعة.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden="true">
        <path d="M12 3 4.5 6v5.7c0 4.2 2.7 7.9 7.5 9.3 4.8-1.4 7.5-5.1 7.5-9.3V6L12 3Z" />
        <path d="m9.2 12.1 2 2 3.6-3.7" />
      </svg>
    ),
  },
  {
    title: 'تصميم راقٍ',
    text: 'تصاميم عصرية راقية تجمع بين الأنوثة والفخامة لتناسب كل مناسبة.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden="true">
        <path d="M10 3h4" />
        <path d="M9 3v4l-3.5 5.5A5 5 0 0 0 9.7 20h4.6a5 5 0 0 0 4.2-7.5L15 7V3" />
      </svg>
    ),
  },
  {
    title: 'شحن سريع',
    text: 'نوفر شحنًا سريعًا وآمنًا لجميع دول الخليج لتصلك طلباتك بأسرع وقت.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden="true">
        <path d="M3.5 7.5h10v9h-10z" />
        <path d="M13.5 10h3.7l2.3 2.7v3.8h-6" />
        <circle cx="8" cy="18" r="1.8" />
        <circle cx="17" cy="18" r="1.8" />
      </svg>
    ),
  },
];

function GoldDivider() {
  return (
    <span className="mx-auto mt-3 mb-5 block h-px w-16 bg-gradient-to-r from-transparent via-[#b8925b] to-transparent" aria-hidden="true" />
  );
}

export default function AboutPage() {
  return (
    <StorefrontShell>
      <div className="mx-auto w-full max-w-[1120px] space-y-4 text-right md:space-y-5">
        <section className="overflow-hidden rounded-[30px] border border-[#e2d6c8] bg-[#f9f4ed] shadow-[0_12px_35px_-28px_rgba(47,29,18,0.35)]">
          <div className="grid min-h-[320px] md:grid-cols-[1.06fr_1fr]">
            <div className="relative min-h-[250px] md:min-h-[320px]">
              <Image src={ABOUT_STILL_LIFE_IMAGE} alt="تنسيق هادئ يعكس فخامة ترف" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-l from-[#f9f4ed]/5 to-[#2f1d12]/15" aria-hidden="true" />
            </div>

            <div className="flex items-center justify-center p-6 md:p-10">
              <div className="max-w-[430px] text-center text-[#3a2a1d]">
                <h1 className="text-[clamp(2rem,7vw,3rem)] font-medium leading-tight">من نحن</h1>
                <GoldDivider />
                <p className="text-base leading-8 text-[#665548] md:text-lg">
                  ترف (TARAF) علامة عربية متخصصة في المخاوير الراقية، نقدم تصاميم تجمع بين الأناقة المعاصرة والتفاصيل الرفيعة لتمنحك
                  حضورًا أنيقًا في كل مناسبة.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-[30px] border border-[#e2d6c8] bg-[#fbf7f0] shadow-[0_10px_30px_-26px_rgba(47,29,18,0.35)]">
          <div className="grid md:grid-cols-2">
            <article className="flex items-center p-6 md:p-10 lg:p-12">
              <div className="mx-auto max-w-[440px] text-[#3a2a1d]">
                <h2 className="text-center text-3xl font-medium">قصتنا</h2>
                <GoldDivider />
                <p className="whitespace-pre-line text-center text-base leading-8 text-[#665548] md:text-lg">
                  {'بدأت ترف من شغفنا بالأناقة والرغبة في تقديم مخاوير تعبّر عن هوية المرأة العربية بروح عصرية راقية.\n\nنختار أجود الخامات، ونعتني بأدق التفاصيل في التصميم والقصة، لنصنع قطعًا تمنحك الراحة، الثقة، والجمال في كل إطلالة.\n\nهدفنا أن تكون ترف خيارك الأول عندما تبحثين عن التميز والرقي في كل مناسبة.'}
                </p>
              </div>
            </article>

            <div className="relative min-h-[330px] md:min-h-full">
              <Image src={ABOUT_MODEL_IMAGE} alt="موديل ترتدي مخوار راقٍ من ترف" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-l from-[#2f1d12]/20 via-transparent to-transparent" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className="rounded-[30px] border border-[#e2d6c8] bg-[#fbf7f0] p-6 shadow-[0_10px_30px_-26px_rgba(47,29,18,0.35)] md:p-8">
          <h2 className="text-center text-3xl font-medium text-[#3a2a1d]">لماذا ترف؟</h2>
          <GoldDivider />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {reasons.map((reason) => (
              <article
                key={reason.title}
                className="rounded-3xl border border-[#e2d6c8] bg-[#fcf8f2] p-6 text-center text-[#3a2a1d] shadow-[0_8px_20px_-22px_rgba(47,29,18,0.45)]"
              >
                <span className="mx-auto mb-3 block w-fit text-[#b8925b]">{reason.icon}</span>
                <h3 className="text-[1.65rem] font-medium leading-tight">{reason.title}</h3>
                <p className="mt-2 text-base leading-8 text-[#665548]">{reason.text}</p>
              </article>
            ))}
          </div>

          <div className="relative mt-5 h-[180px] overflow-hidden rounded-[24px] md:h-[210px]">
            <Image src={ABOUT_FABRIC_IMAGE} alt="تفاصيل تطريز فاخرة" fill className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#2f1d12]/20 to-[#2f1d12]/5" aria-hidden="true" />
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[30px] border border-[#e2d6c8] bg-[#f7f1e8] p-8 text-center shadow-[0_10px_30px_-26px_rgba(47,29,18,0.35)] md:p-10">
          <div className="pointer-events-none absolute -bottom-10 left-0 h-36 w-36 rounded-full bg-[#efe4d6]/70 blur-2xl" aria-hidden="true" />
          <h2 className="text-[clamp(2rem,7vw,2.25rem)] font-medium text-[#3a2a1d]">اكتشفي مجموعتنا</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-[#665548] md:text-lg">تسوّقي أحدث تصاميم المخاوير الراقية المصممة لك.</p>
          <Link
            href="/products"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl border border-[#2f1d12] bg-[#2f1d12] px-10 text-lg font-medium text-[#f7efe5] transition-all duration-300 hover:bg-[#4a3324] hover:text-[#fff7ed]"
          >
            تسوقي الآن
          </Link>
        </section>
      </div>
    </StorefrontShell>
  );
}
