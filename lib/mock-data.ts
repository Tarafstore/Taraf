export type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  tone: 'ivory' | 'rose' | 'olive' | 'black';
  badge?: 'جديد';
};

export type DashboardStat = {
  label: string;
  value: number;
};

export const products: Product[] = [
  {
    id: 'mk-1001',
    name: 'مخور لُفد',
    price: '520 ر.س',
    image: 'https://images.unsplash.com/photo-1618375531912-867984bdfd87?auto=format&fit=crop&w=700&q=80',
    tone: 'ivory',
    badge: 'جديد',
  },
  {
    id: 'mk-1002',
    name: 'مخور ورد',
    price: '480 ر.س',
    image: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?auto=format&fit=crop&w=700&q=80',
    tone: 'rose',
    badge: 'جديد',
  },
  {
    id: 'mk-1003',
    name: 'مخور سدن',
    price: '550 ر.س',
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=700&q=80',
    tone: 'olive',
  },
  {
    id: 'mk-1004',
    name: 'مخور ليل',
    price: '600 ر.س',
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=700&q=80',
    tone: 'black',
    badge: 'جديد',
  },
  {
    id: 'mk-1005',
    name: 'مخور توليب',
    price: '490 ر.س',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80',
    tone: 'rose',
  },
  {
    id: 'mk-1006',
    name: 'مخور نهر',
    price: '530 ر.س',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=700&q=80',
    tone: 'ivory',
  },
  {
    id: 'mk-1007',
    name: 'مخور أفق',
    price: '510 ر.س',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=80',
    tone: 'black',
  },
  {
    id: 'mk-1008',
    name: 'مخور بيان',
    price: '560 ر.س',
    image: 'https://images.unsplash.com/photo-1568251188392-ae32f898cb3b?auto=format&fit=crop&w=700&q=80',
    tone: 'ivory',
  },
];

export const stats: DashboardStat[] = [
  { label: 'إجمالي المنتجات', value: 128 },
  { label: 'الطلبات النشطة', value: 96 },
  { label: 'التصنيفات', value: 8 },
  { label: 'طلبات اليوم', value: 35 },
];
