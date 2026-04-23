export type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  tone: 'ivory' | 'rose' | 'olive' | 'black';
};

export type DashboardStat = {
  label: string;
  value: number;
};

export const products: Product[] = [
  { id: 'mk-1001', name: 'مخور لُفد', price: '520 ر.س', image: '/images/mk-1001.jpg', tone: 'ivory' },
  { id: 'mk-1002', name: 'مخور ورد', price: '480 ر.س', image: '/images/mk-1002.jpg', tone: 'rose' },
  { id: 'mk-1003', name: 'مخور سدن', price: '550 ر.س', image: '/images/mk-1003.jpg', tone: 'olive' },
  { id: 'mk-1004', name: 'مخور ليل', price: '600 ر.س', image: '/images/mk-1004.jpg', tone: 'black' },
];

export const stats: DashboardStat[] = [
  { label: 'إجمالي المنتجات', value: 128 },
  { label: 'الطلبات النشطة', value: 96 },
  { label: 'التصنيفات', value: 8 },
  { label: 'طلبات اليوم', value: 35 },
];
