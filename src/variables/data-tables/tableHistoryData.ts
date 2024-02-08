type HistoryObj = {
    id: number;
    status: string;
    orderTime: string;
    deliveryTime: string;
    total: number;
  }

const tableDataHistory: HistoryObj[] = [
    {
        id: 1,
        status: "Selesai",
        orderTime: "22/11/2023 22:27",
        deliveryTime: "14/12/2021 18:10",
        total: 425707
    },
    {
        id: 2,
        status: "Diprosess",
        orderTime: "23/12/2022 20:40",
        deliveryTime: "11/05/2021 02:11",
        total: 77952
    },
    {
        id: 3,
        status: "Dibatalkan",
        orderTime: "19/11/2021 06:22",
        deliveryTime: "03/10/2023 23:49",
        total: 104306
    },
    {
        id: 4,
        status: "Selesai",
        orderTime: "06/04/2022 06:02",
        deliveryTime: "26/01/2024 19:15",
        total: 505332
    },
    {
        id: 5,
        status: "Selesai",
        orderTime: "31/03/2021 05:57",
        deliveryTime: "15/05/2022 06:26",
        total: 312426
    },
    {
        id: 6,
        status: "Selesai",
        orderTime: "29/08/2020 02:32",
        deliveryTime: "25/07/2023 09:55",
        total: 492192
    },
    {
        id: 7,
        status: "Selesai",
        orderTime: "22/07/2023 14:24",
        deliveryTime: "07/05/2023 19:30",
        total: 239034
    },
    {
        id: 8,
        status: "Selesai",
        orderTime: "02/08/2023 11:09",
        deliveryTime: "24/06/2022 08:39",
        total: 342646
    },
    {
        id: 9,
        status: "Selesai",
        orderTime: "05/11/2020, 03:25",
        deliveryTime: "05/10/2023, 19:18",
        total: 756002
    },
    {
        id: 10,
        status: "Selesai",
        orderTime: "27/09/2023, 03:40",
        deliveryTime: "07/12/2020, 04:21",
        total: 727385
    }
  ]

export default tableDataHistory;