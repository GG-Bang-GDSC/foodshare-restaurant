import React from 'react';
import CardMenu from 'components/card/CardMenu';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  } from "@chakra-ui/modal";
import { DiApple } from 'react-icons/di';
import { DiAndroid } from 'react-icons/di';
import { DiWindows } from 'react-icons/di';
import Card from 'components/card';
import Progress from 'components/progress';
import Link from 'next/link'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useDisclosure } from '@chakra-ui/hooks';
import { db } from 'app/firebase';
import { collection, deleteDoc, doc } from 'firebase/firestore';

type RowObj = {
  name: string
  id: string
  category: ['food', 'drink', 'snack']
  price: number
  stock: number
  discount: number
  description: string
  image: string
  afterPrice: number
  restauranId: string
};

function CheckTable(props: { tableData: any }) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  let defaultData = tableData;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ id, setId ] = React.useState({} as any)
  const [loading, setLoading] = React.useState(true)

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'products', id.id))
      onClose()
    } catch (error) {
      console.log(error)
    }
  }
  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">NAME</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('stock', {
      id: 'stock',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Stock
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('price', {
      id: 'price',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Harga Asli</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {parseInt(info.getValue().toString()).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
        </p>
      ),
    }),
    columnHelper.accessor('discount', {
      id: 'discount',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Discount
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center gap-3">
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {(parseFloat(info.getValue().toString())*100)}%
          </p>
          <Progress width="w-[68px]" value={parseFloat(info.getValue().toString())*100} />
        </div>
      ),
    }),
    columnHelper.accessor('afterPrice', {
      id: 'afterPrice',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Harga Akhir</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue().toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
        </p>
      ),
    }),
    columnHelper.accessor('id', {
      id: 'id',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Action</p>
      ),
      cell: (info) => 
        (
        <div className="flex gap-3">
        <Link href={`/admin/product/${info.getValue()}`}>
        <button  className="rounded-lg bg-brand-500 px-5 py-2.5 text-xs font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
        Edit
        </button>
        </Link>
        {tableData.length > 1 && (<button onClick={()=>{onOpen();setId(info.row.original)}} className="rounded-lg bg-red-500 px-3 py-2.5 text-xs font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200">
        Delete
        </button>)}
        
        <div className='!z-50'>
        
        </div>
   
        </div>
      ),
    }),
    
  ]; // eslint-disable-next-line
  const [data, setData] = React.useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });
  return (
    <Card extra={'w-full h-full sm:overflow-auto px-6'}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Menu Table
        </div>

        <CardMenu />
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30"
                    >
                      <div className="items-center justify-between text-xs text-gray-200">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: '',
                          desc: '',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows
              .map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[150px] cl border-white/0 py-3  pr-4 "
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} >
          <ModalOverlay className="bg-[#000] !opacity-30" />
          <ModalContent className="!z-[1002] !m-auto !w-max min-w-[350px] !max-w-[85%] top-[50vh] md:top-[20vh]">
            <ModalBody>
              <Card extra="px-[30px] pt-[35px] pb-[40px] max-w-[450px] flex flex-col !z-[1004]">
                <h1 className="mb-[20px] text-2xl font-bold">Delete Confirmation</h1>
                <p className="mb-[20px]">
                  Apakah anda ingin menghapus {id.name}?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleDelete}
                    className="linear rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
                  >
                    Delete
                  </button>
                  <button onClick={onClose} className="linear text-navy-700 rounded-xl bg-gray-100 px-5 py-3 text-base font-medium transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30">
                    Close
                  </button>
                </div>
              </Card>
            </ModalBody>
          </ModalContent>
        </Modal>
    </Card>
  );
}

export default CheckTable;
const columnHelper = createColumnHelper<RowObj>();
