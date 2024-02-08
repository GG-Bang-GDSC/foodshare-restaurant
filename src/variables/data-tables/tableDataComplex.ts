type RowObj = {
  name: string;
  status: string;
  date: string;
  progress: number;
  total: number;
  quantity: number;
  driver?:string;
};

type HistoryObj = {
  id: number;
  status: string;
  orderTime: string;
  deliveryTime: string;
  total: number;
}

const tableDataComplex: RowObj[] = [
  {
    name: 'Krupuk',
    progress: 75.5,
    status: 'Belum Konfirmasi',
    date: '01:20',
    total: 1000000,
    quantity: 10,
    driver: 'asep gemoy'
  },
  {
    name: 'Es Teh',
    progress: 25.5,
    status: 'Siap Diantar',
    date: '02:30',
    total: 130000,
    quantity: 2,
    driver: 'asep gemoy'
  },
  {
    name: 'Indomie',
    progress: 90,
    status: 'Siap Diantar',
    date: '05:30',
    total: 230000,
    quantity: 3,
    driver: 'asep gemoy'
  },
  {
    name: 'Ayam Geprek',
    progress: 50.5,
    status: 'Sedang Disiapkan',
    date: '06:10',
    total: 30000,
    quantity: 4,
    driver: 'asep gemoy'
  },
];



export default tableDataComplex;
