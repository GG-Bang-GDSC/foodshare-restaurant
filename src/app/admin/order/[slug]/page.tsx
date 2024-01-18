'use client'
import { db, storage } from 'app/firebase'
import Card from 'components/card'
import CardMenu from 'components/card/CardMenu'
import InputField from 'components/fields/InputField'
import { addDoc, collection, setDoc, doc} from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useEffect, useState } from 'react'
import Dropdown from 'components/dropdown'
import Upload from 'components/admin/profile/Upload'
import Progress from 'components/progress'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import useOrderDetail from '../hooks/getOrderDetail'
import OrderTable from 'components/admin/data-tables/OrderTable'
import tableDataColumns from 'variables/data-tables/tableDataColumns'
import orderTableData from 'variables/data-tables/tableOrder'
import Link from 'next/link'
import {  deleteDoc, updateDoc} from 'firebase/firestore';



export default function Page ({ params }: { params: { slug: string } }) {
    const [order, setOrder] = useState({} as any)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const { slug } = params
    const orderId = slug
    const { data, isError } = useOrderDetail(orderId);
    useEffect(() => {
        if (data) {
            setOrder(data)
            setIsLoading(false)
        }
    }, [data])
    useEffect(()=>{
        console.log(order)
    }, [order])
    if (isLoading) return <div>Loading...</div>
    if (isError) {
      router.replace('/admin/404')
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

  return (
    <div className='mt-5 h-full'>
      <Card extra={'w-full h-full min-h-[100vh] sm:overflow-auto px-6'}>
        <header className='relative flex items-center justify-center pt-4 '>
          <div className='text-2xl mt-5 font-bold text-navy-700 dark:text-white'>
            Order Detail
          </div>
        </header>

        <div className='mt-8 overflow-x-auto xl:overflow-x-auto'>
          <div className="w-full ">
            <div className="grid grid-cols-2">
                <div className="flex flex-col">
                    <div>
                        <p className="font-bold text-lg" >Order Date: Jan 17, 2024</p>
                    </div>
                    <div className='flex flex-col mt-8 gap-2'>
                        <div>
                            <p className="font-bold">Delivery Address</p>
                            <div className="mt-2">
                                <p className="text-sm">{order.user.firstname + " " + order.user.lastname}</p>
                                <p className="text-sm">{order.location}</p>
                                <p className="text-sm mt-3">{order.user.email}</p>
                                <p className="text-sm">{order.user.phone}</p>
                            </div>
                        </div>
                        <div>
                            <p className="font-bold">Payment Method</p>
                            <div className="mt-2">
                                <p className="text-sm">{order.payment}</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div>
                        <p className="font-bold text-lg" >Order Status: {order.status}</p>
                    </div>
                    <div className='flex flex-col mt-8 gap-2'>
                        <div>
                            <p className="font-bold">Pick Up Detail</p>
                            <div className="mt-2">
                                <p className="text-sm">{order.driver.firstname + " " + order.driver.lastname}</p>
                                <p className="text-sm">{order.driver.plat} </p>
                                <p className="text-sm mt-3">{order.driver.phone}</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="mt-3">
            <OrderTable tableData={order.menu} />
            </div>
            <div className='mt-3 mb-1 flex justify-end '>
                <div bg-gray-200 className="border rounded-md border-3  p-4">
                    <div className='flex flex-row justify-between gap-5'>
                    <p className="text-sm font-semibold  " >Product Subtotal: </p>
                    <p className="text-sm font-semibold  " >{order.menu.reduce((accumulator, item) => accumulator + (item.quantity*item.price), 0,).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>

                    </div>
                    <div className='flex flex-row justify-between gap-5'>
                    <p className="text-sm font-semibold  " >Delivery Fee: </p>
                    <p className="text-sm font-semibold  " >{order.shipFee.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>

                    </div>
                    <div className='flex flex-row justify-between gap-5'>
                    <p className="text-sm font-semibold  " >Promotion Code: </p>
                    <p className="text-sm font-semibold  " >-{order.promoDiscount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>

                    </div>
                    <div className='flex flex-row justify-between gap-5'>
                    <p className="text-sm font-semibold  " >Order Total: </p>
                    <p className="text-sm font-semibold  " >{(order.menu.reduce((accumulator, item) => accumulator + (item.quantity*item.price), 0,)+(order.shipFee)-order.promoDiscount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                    </div>
                </div>
            </div>
            <div className='mt-3 mb-1 flex text-center justify-center'>
            {order.status === 'Belum Konfirmasi' ? (
          <>
              <button onClick={()=>handleConfirm(orderId)} className='w-full text-center rounded-lg bg-green-500 px-5 py-3 text-xs font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200'>
                Konfirmasi
              </button>
          </>
        ) : order.status === 'Sedang Disiapkan' ? (
              <button onClick={()=> handleReady(orderId)} className='w-full rounded-lg bg-green-500 px-5 py-3 text-xs font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200'>
                Siap
              </button>
        ) : (
          <>
              <button className=' w-full rounded-lg bg-brand-500 px-5 py-3 text-xs font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200'>
                Selesaikan
              </button>
          </>
        )}
            </div>

          </div>
        </div>
      </Card>
    </div>
  )
}
