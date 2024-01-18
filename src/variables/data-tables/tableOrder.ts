type RowObj = {
    name: string;
    quantity: number;
    date: string;
    price: number;
    option?: string
    note?: string;
  };
  
  const orderTableData: RowObj[] = [
    {
      name: 'Indomie',
      quantity: 3,
      date: '12 Jan 2021',
      price: 12000,
      note:"",
      option: "es"
    },
    {
      name: 'Es Teh',
      quantity: 2,
      date: '21 Feb 2021',
      price: 3000,
      note:"",
      option: "es"
    },
    {
      name: 'Bakso Malang',
      quantity: 10,
      date: '13 Mar 2021',
      price: 13000,
      note:"",
      option: "es"
    },
    {
      name: 'Mie Ayam',
      quantity: 2,
      date: '24 Jan 2021',
      price: 15000,
      note:"",
      option: "es"
    },
  ];
  
  export default orderTableData;
  