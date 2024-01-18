type RowObj = {
  name: string;
  tech: string[];
  date: string;
  progress: number;
  stock: number
  hargaAsli: number
  discount: number;
  id?: number;
};

const tableDataComplex: RowObj[] = [
  {
    name: 'Donut Cookies',
    tech: ['apple', 'android', 'windows'],
    date: '12.Jan.2021',
    progress: 75.5,
    stock: 28,
    hargaAsli: 10000,
    discount: 50,
    id:1
  },
  {
    name: 'Donut Indomie',
    tech: ['apple'],
    date: '21.Feb.2021',
    progress: 35.4,
    stock: 28,
    hargaAsli: 10000,
    discount: 50,
    id:2
  },
  {
    name: 'Donut 123',
    tech: ['apple', 'windows'],
    date: '13.Mar.2021',
    progress: 25,
    stock: 28,
    hargaAsli: 10000,
    discount: 50,
    id:3
  },
  {
    name: 'Indomie bakso',
    tech: ['apple', 'android', 'windows'],
    date: '24.Jan.2021',
    progress: 100,
    stock: 28,
    hargaAsli: 10000,
    discount: 50,
    id:4
  },
 
];
export default tableDataComplex;
