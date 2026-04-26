export function slugifyArabic(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\u0600-\u06FF\w-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
