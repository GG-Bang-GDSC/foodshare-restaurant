type RowObj = {
  name: string;
  status: string;
  date: string;
  progress: number;
  total: number;
  quantity: number;
  driver?:string;
};

const tableDataComplex: RowObj[] = [
  {
    name: 'Joko Widodo',
    progress: 75.5,
    status: 'Belum Konfirmasi',
    date: '23:12',
    total: 1000000,
    quantity: 10,
    driver: 'asep gemoy'
  },
  {
    name: 'Prabowo Gemoy',
    progress: 25.5,
    status: 'Siap Diantar',
    date: '23:12',
    total: 130000,
    quantity: 2,
    driver: 'asep gemoy'
  },
  {
    name: 'Anis Muhaimin',
    progress: 90,
    status: 'Siap Diantar',
    date: '23:12',
    total: 230000,
    quantity: 3,
    driver: 'asep gemoy'
  },
  {
    name: 'Ganzar',
    progress: 50.5,
    status: 'Sedang Disiapkan',
    date: '23:12',
    total: 30000,
    quantity: 4,
    driver: 'asep gemoy'
  },
];
export default tableDataComplex;
