import React, { use } from 'react'
import CardMenu from 'components/card/CardMenu'
import Card from 'components/card'
import Progress from 'components/progress'
import { MdCancel, MdCheckCircle, MdDownload, MdOutlineError } from 'react-icons/md'
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from 'app/firebase'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import Link from 'next/link'
import { useDownloadExcel } from 'react-export-table-to-excel'

type RowObj = {
  name: string
  status: string
  date: any
  progress: number
  total: number
  quantity: number
  id: string
  driver: string
  menu: any
  no: any
  end: any
  orderTime: any
}

const columnHelper = createColumnHelper<RowObj>()

// const columns = columnsDataCheck;
export default function HistoryTable (props: { tableData: any }) {
  const { tableData } = props
  console.log(tableData)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const tableRef = React.useRef(null)
  const [filter, setFilter] = React.useState({
    from: '',
    to: '',
    status: 'all',
  })
  let defaultData = tableData
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Order History',
    sheet: `${new Date()}`,
})

  const handleConfirm = async id => {
    try {
      await updateDoc(doc(db, 'orders', id), {
        status: 'Sedang Disiapkan',
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleReady = async id => {
    try {
      await updateDoc(doc(db, 'orders', id), {
        status: 'Siap Diantar',
      })
    } catch (error) {
      console.log(error)
    }
  }
  const columns = [
    // columnHelper.accessor('id', {
    //   id: 'id',
    //   header: () => (
    //     <p className='text-sm font-bold text-gray-600 dark:text-white'>No</p>
    //   ),
    //   cell: info => (
    //     <p className='text-sm font-bold text-navy-700 dark:text-white'>
    //       {info.row.index + 1}
    //     </p>
    //   ),
    // }),
    columnHelper.accessor('date', {
      id: 'date',
      header: () => (
        <p className='text-sm font-bold text-gray-600 dark:text-white'>
          Order Time
        </p>
      ),
      cell: info => (
        <p className='text-sm font-bold text-navy-700 dark:text-white'>
          {new Date(info.row.original.date?.seconds *1000 ?? 1708157213000).toDateString()}
        </p>
      ),
    }),
    columnHelper.accessor('end', {
      id: 'end',
      header: () => (
        <p className='text-sm font-bold text-gray-600 dark:text-white'>
          Delivery Time
        </p>
      ),
      cell: info => (
        <p className='text-sm font-bold text-navy-700 dark:text-white'>
          { info.row.original.end? new Date(info.row.original.end.seconds *1000).toDateString() : '-'}
        </p>
      ),
    }),
    columnHelper.accessor('menu', {
      id: 'menu',
      header: () => (
        <p className='text-sm font-bold text-gray-600 dark:text-white'>
          Total Order
        </p>
      ),
      cell: info => (
        <p className='text-sm font-bold text-navy-700 dark:text-white'>
          {info.row.original.menu.reduce((accumulator, item) => accumulator + (item.quantity*item.price), 0,)
            .toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
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
          {info.getValue() === 'Selesai' ? (
            <MdCheckCircle className='me-1 text-green-500 dark:text-green-300' />
          ) : info.getValue() === 'Dibatalkan' ? (
            <MdCancel className='me-1 text-red-500 dark:text-red-300' />
          ) : ["Belum Konfirmasi", "Sedang Disiapkan", "Siap Diantar"].includes(info.getValue()) ? (
            <MdOutlineError className='me-1 text-amber-500 dark:text-amber-300' />
          ) : null}
          <p className='text-sm font-bold text-navy-700 dark:text-white'>
            {info.getValue()}
          </p>
        </div>
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
          <div className='flex gap-1'>
            <Link href={`/admin/order/${info.getValue()}`}>
              <button className='rounded-lg bg-brand-500 px-5 py-2 text-xs font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200'>
                Detail
              </button>
            </Link>
          </div>
    }),
  ] // eslint-disable-next-line
  const [data, setData] = React.useState(() => [...defaultData])

  React.useEffect(() => {
    let filteredData = [...defaultData];
  
    // Filter by status
    if (filter.status !== 'all') {
      filteredData = filteredData.filter(row => row.status === filter.status);
    }
  
    // Filter by date range (from and to)
    if (filter.from && filter.to) {
      const fromDate = new Date(filter.from);
      const toDate = new Date(filter.to);
      
      filteredData = filteredData.filter(row => {
        const orderDate = new Date(row.date.seconds * 1000); // Assuming orderTime is a date property
        return orderDate >= fromDate && orderDate <= toDate;
      });
    }
  
    // Update the state with the filtered data
    setData(filteredData);
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
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
    <Card extra={'w-full h-full px-6 py-6 sm:overflow-x-auto'}>
      <div className='relative flex items-center justify-between'>
        <div className='text-xl font-bold text-navy-700 dark:text-white'>
          Order History
        </div>
        <button onClick={onDownload} className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdDownload className="h-6 w-6" />
        </button>
      </div>
      <div className='mt-3 flex flex-row gap-5'>
        <div>
          <label
            htmlFor='description'
            className='font-bold block mb-2 mt-3 ms-1 text-sm text-gray-900 dark:text-white'
          >
            From Date
          </label>
          <input
            onChange={(e)=> setFilter({...filter, from: e.target.value})}
            className='mt-2 flex h-12 items-center dark:text-white justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 '
            type='datetime-local'
            id='birthdaytime'
            name='birthdaytime'
          />
        </div>
        <div>
          <label
            htmlFor='description'
            className='font-bold block mb-2 mt-3 ms-1 text-sm text-gray-900 dark:text-white'
          >
            To Date
          </label>
          <input
            onChange={(e)=> setFilter({...filter, to: e.target.value})}
            className='mt-2 flex h-12 items-center dark:text-white justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 '
            type='datetime-local'
            id='birthdaytime'
            name='birthdaytime'
          />
        </div>
        <div>
          <label
            htmlFor='description'
            className='font-bold block mb-2 mt-3 ms-1 text-sm text-gray-900 dark:text-white'
          >
            Status
          </label>
          <select onChange={(e)=> setFilter({...filter, status: e.target.value})}  id="countries" className="mt-2 flex h-12 items-center dark:text-white justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 ">
                  <option value='all' className="text-gray-900 dark:text-white" selected>Status</option>
                    <option className="text-gray-900 dark:text-white">Belum Konfirmasi</option>
                    <option className="text-gray-900 dark:text-white">Sedang Disiapkan</option>
                    <option className="text-gray-900 dark:text-white">Siap Diantar</option>
                    <option className="text-gray-900 dark:text-white">Selesai</option>
                    <option className="text-gray-900 dark:text-white">Dibatalkan</option>
                  
                </select>
        </div>
        
      </div>

      <div className='mt-8 overflow-x-auto'>
        <table className='w-full' ref={tableRef}>
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
            {table.getRowModel().rows.map(row => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id} className='  border-white/0 py-3  pr-4'>
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
