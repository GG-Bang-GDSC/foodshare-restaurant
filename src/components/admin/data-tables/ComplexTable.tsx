import React from 'react'
import CardMenu from 'components/card/CardMenu'
import Card from 'components/card'
import Progress from 'components/progress'
import { MdCancel, MdCheckCircle, MdOutlineError } from 'react-icons/md'
import { collection, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import { db } from 'app/firebase';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import Link from 'next/link'

type RowObj = {
  name: string
  status: string
  date: any
  progress: number
  total: number
  quantity: number
  id: string
  driver: string
  menu:any
}

const columnHelper = createColumnHelper<RowObj>()

// const columns = columnsDataCheck;
export default function ComplexTable (props: { tableData: any }) {
  const { tableData } = props
  const [sorting, setSorting] = React.useState<SortingState>([])
  let defaultData = tableData.filter((item) => item.status !== 'Selesai')

  function unixTimestampToHHMM(timestamp) {
    // Create a new Date object with the timestamp (in milliseconds)
    var date = new Date(timestamp * 1000);
    
    // Extract hours and minutes from the Date object
    var hours = date.getHours();
    var minutes = date.getMinutes();
    
    // Format the hours and minutes with leading zeros if necessary
    var formattedHours = hours < 10 ? "0" + hours : hours;
    var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    
    // Return the formatted time
    return formattedHours + ":" + formattedMinutes;
  }

  const handleConfirm = async (id) => {
    try {
      await updateDoc(doc(db, 'orders', id), {
        status: 'Sedang Disiapkan',
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleReady = async (id) => {
    try {
      await updateDoc(doc(db, 'orders', id), {
        status: 'Siap Diantar',
      })
    } catch (error) {
      console.log(error)
    }
  }
  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: () => (
        <p className='text-sm font-bold text-gray-600 dark:text-white'>
          Customer
        </p>
      ),
      cell: info => (
        <p className='text-sm font-bold text-navy-700 dark:text-white'>
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('date', {
      id: 'date',
      header: () => (
        <p className='text-sm font-bold text-gray-600 dark:text-white'>Time</p>
      ),
      cell: info => (
        <p className='text-sm font-bold text-navy-700 dark:text-white'>
          {new Date(info.row.original.date?.seconds *1000 ?? 1708157213000).toDateString()}
        </p>
      ),
    }),
    columnHelper.accessor('total', {
      id: 'total',
      header: () => (
        <p className='text-sm font-bold text-gray-600 dark:text-white'>
          Total Price
        </p>
      ),
      cell: info => (
        <p className='text-sm font-bold text-navy-700 dark:text-white'>
          {info.row.original.menu.reduce((accumulator, item) => accumulator + (item.quantity*item.price), 0,)
            .toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
        </p>
      ),
    }),
    columnHelper.accessor('quantity', {
      id: 'quantity',
      header: () => (
        <p className='text-sm font-bold text-gray-600 dark:text-white'>
          Quantity
        </p>
      ),
      cell: info => (
        <p className='text-sm font-bold text-navy-700 dark:text-white'>
          {info.row.original.menu.reduce((accumulator, item) => accumulator + (item.quantity), 0,)}
        </p>
      ),
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: () => (
        <p className='text-sm font-bold text-gray-600 dark:text-white'>
          Status
        </p>
      ),
      cell: info => (
        <div className='flex items-center'>
          {info.getValue() === 'Siap Diantar' ? (
            <MdCheckCircle className='me-1 text-green-500 dark:text-green-300' />
          ) : info.getValue() === 'Belum Konfirmasi' ? (
            <MdCancel className='me-1 text-red-500 dark:text-red-300' />
          ) : info.getValue() === 'Sedang Disiapkan' ? (
            <MdOutlineError className='me-1 text-amber-500 dark:text-amber-300' />
          ) : null}
          <p className='text-sm font-bold text-navy-700 dark:text-white'>
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor('driver', {
      id: 'driver',
      header: () => (
        <p className='text-sm font-bold text-gray-600 dark:text-white'>
          Driver
        </p>
      ),
      cell: info => (
        <p className='text-sm font-bold text-navy-700 dark:text-white'>
          {info.getValue() ? info.getValue() : 'Belum ada driver'}
        </p>
      ),
    }),
    columnHelper.accessor('id', {
      id: 'id',
      header: () => (
        <p className='text-sm font-bold text-gray-600 dark:text-white'>
          Action
        </p>
      ),
      cell: info =>
        info.row.original.status === 'Belum Konfirmasi' ? (
          <>
              <button onClick={()=>handleConfirm(info.getValue())} className='rounded-lg bg-green-500 px-5 py-2 text-xs font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200'>
                Konfirmasi
              </button>
          </>
        ) : info.row.original.status === 'Sedang Disiapkan' ? (
          <div className='flex gap-1'>
            <Link href={`/admin/order/${info.getValue()}`}>
              <button className='rounded-lg bg-brand-500 px-5 py-2 text-xs font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200'>
                Detail
              </button>
            </Link>
              <button onClick={()=> handleReady(info.getValue())} className='rounded-lg bg-green-500 px-5 py-2 text-xs font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200'>
                Siap
              </button>
          </div>
        ) : (
          <>
          <Link href={`/admin/order/${info.getValue()}`}>
              <button className='rounded-lg bg-brand-500 px-5 py-2 text-xs font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200'>
                Detail
              </button>
            </Link>
          </>
        ),
    }),
  ] // eslint-disable-next-line
  const [data, setData] = React.useState(() => [...defaultData])
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
  })
  return (
    <Card extra={'w-full h-full px-6 pb-6 sm:overflow-x-auto'}>
      <div className='relative flex items-center justify-between pt-4'>
        <div className='text-xl font-bold text-navy-700 dark:text-white'>
          Order Table
        </div>
      </div>

      <div className='mt-8 overflow-x-auto'>
        <table className='w-full'>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className='!border-px !border-gray-400'>
                {headerGroup.headers.map(header => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className='cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30'
                    >
                      <div className='items-center justify-between text-xs text-gray-200'>
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
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows
              .map(row => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => {
                      return (
                        <td
                          key={cell.id}
                          className='min-w-[150px]  border-white/0 py-3  pr-4'
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
