export type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  tone: 'ivory' | 'rose' | 'olive' | 'black';
  isNew?: boolean;
};

export type DashboardStat = {
  label: string;
  value: number;
};

export const products: Product[] = [
  { id: 'mk-1001', name: 'مخور لُفد', price: '520 ريال', image: '/images/mk-1001.jpg', tone: 'ivory', isNew: true },
  { id: 'mk-1002', name: 'مخور ورد', price: '480 ريال', image: '/images/mk-1002.jpg', tone: 'rose', isNew: true },
  { id: 'mk-1003', name: 'مخور سدن', price: '550 ريال', image: '/images/mk-1003.jpg', tone: 'olive', isNew: true },
  { id: 'mk-1004', name: 'مخور ليل', price: '600 ريال', image: '/images/mk-1004.jpg', tone: 'black', isNew: true },
  { id: 'mk-1005', name: 'مخور توليب', price: '490 ريال', image: '/images/mk-1005.jpg', tone: 'rose' },
  { id: 'mk-1006', name: 'مخور نغم', price: '530 ريال', image: '/images/mk-1006.jpg', tone: 'ivory' },
  { id: 'mk-1007', name: 'مخور أفق', price: '510 ريال', image: '/images/mk-1007.jpg', tone: 'black' },
  { id: 'mk-1008', name: 'مخور بيان', price: '560 ريال', image: '/images/mk-1008.jpg', tone: 'ivory' },
];

export const stats: DashboardStat[] = [
  { label: 'إجمالي المنتجات', value: 128 },
  { label: 'الطلبات النشطة', value: 96 },
  { label: 'التصنيفات', value: 8 },
  { label: 'طلبات اليوم', value: 35 },
];
