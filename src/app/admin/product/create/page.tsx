'use client'
import { db, storage } from 'app/firebase'
import Card from 'components/card'
import CardMenu from 'components/card/CardMenu'
import InputField from 'components/fields/InputField'
import { addDoc, collection } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useState } from 'react'
import Dropdown from 'components/dropdown'
import Upload from 'components/admin/profile/Upload'
import Progress from 'components/progress'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Datepicker from "react-tailwindcss-datepicker"; 


type product = {
  name: string
  id: string
  category: string
  price: number
  stock: number
  discount: number
  description: string
  image: string
  afterPrice: number
  restauranId: string
  bestBefore: string
  foodCreate: string
}

export default function Page () {
  const [newProduct, setNewProduct] = useState({} as product)
  const [imageFile, setImageFile] = useState<File>()
  const [downloadURL, setDownloadURL] = useState('/img/others/noimage.png')
  const [isUploading, setIsUploading] = useState(false)
  const [progressUpload, setProgressUpload] = useState(0)
  const router = useRouter()
  const [value, setValue] = useState({ 
    startDate: new Date(), 
    endDate: new Date().setMonth(11) 
    }); 

    const handleValueChange = (newValue) => {
      console.log("newValue:", newValue); 
      setValue(newValue); 
      } 
    

  const handleSelectedFile = (files: any) => {
    if (files.length == 0) return
    if (files[0].size < 15000000) {
      setImageFile(files[0])
      const name = files[0].name
      const storageRef = ref(storage, `image/${name}`)
      const uploadTask = uploadBytesResumable(storageRef, files[0])
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          setProgressUpload(progress) // to show progress upload

          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        (error) => {
          console.log(error.message)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            //url is download url of file
            setDownloadURL(url)
          })
        },
      )
    }
  }

  const addProduct = async e => {
    e.preventDefault()
    if (newProduct.name !== '' && newProduct.description !== '' && newProduct.price !== 0  && newProduct.category !== '' && imageFile) {
      try {
        await addDoc(collection(db, 'foods'), {
          ...newProduct,
          afterPrice:
            newProduct.price - (newProduct.price * newProduct.discount* 100) / 100,
          image: downloadURL,
          restauranId: 1,
        })
        router.push('/admin/product')
      } catch (error) {
        console.log(error)
      }
    } else{
      alert('Please fill all fields')
    }
  }
  return (
    <div className='mt-5 h-full'>
      <Card extra={'w-full h-full min-h-[100vh] sm:overflow-auto px-6'}>
        <header className='relative flex items-center justify-between pt-4'>
          <div className='text-xl font-bold text-navy-700 dark:text-white'>
            Add Product
          </div>
        </header>

        <div className='mt-8 overflow-x-scroll xl:overflow-x-auto'>
          <div className='w-full'>
            <div className='relative flex flex-col mb-3'>
              {downloadURL && <Image className="flex-fill self-center justify-center items-center" src={downloadURL} alt={downloadURL} width={200} height={200} />}
              <label
              htmlFor='description'
              className='font-bold block text-sm ms-3 text-gray-900 dark:text-white'
            >
              Product Image
            </label>
              <div className="flex flex-row mt-3">
              <input
                accept="image/*"
                type='file'
                multiple={false}
                className='text-sm text-stone-500
                file:mr-5 file:py-2.5 file:px-3 file:border-[0px]
                file:text-xs file:font-medium
                file:bg-brand-500 file:text-stone-700
                file:rounded-lg
                hover:file:cursor-pointer hover:file:bg-blue-50
                file:text-white file:transition file:duration-200 file:hover:bg-brand-700 file:active:bg-brand-700 file:dark:bg-brand-400 file:dark:text-white file:dark:hover:bg-brand-300 file:dark:active:bg-brand-200
                '
              onChange={(files)=> handleSelectedFile(files.target.files)}
              />
              {progressUpload > 0 && progressUpload < 100 ?(<div className="flex flex-col flex-1">
              <Progress value={progressUpload} />
              <p>{Math.round(progressUpload)}%</p>
              </div>) :(<></>)}

              </div>
            </div>
            <InputField
              label='Product Name'
              placeholder='Bakso padang'
              id='name'
              type='text'
              onChange={e =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <label
              htmlFor='description'
              className='font-bold block mb-2 mt-3 text-sm ms-3 text-gray-900 dark:text-white'
            >
              Product description
            </label>

            <textarea
              id='description'
              rows={4}
              className='block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-brand-500 focus:border-gray-500 dark:bg-[#111C44] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-brand-500 dark:focus:border-brand-500'
              placeholder='Bakso padang yang rasanya enak'
              onChange={e =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            ></textarea>
                        <div className='my-3'>
            <label htmlFor="countries" className="ms-3 block mb-2 text-sm font-bold text-gray-900 dark:text-white">Choose Category</label>
                <select onChange={(e)=> setNewProduct({ ...newProduct, category: e.target.value })} id="countries" className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#111C44] dark:text-white dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option className="text-gray-900 dark:text-white" selected>Choose category</option>
                  <option className="text-gray-900 dark:text-white" value="makananBerat">Makanan Berat</option>
                  <option className="text-gray-900 dark:text-white" value="rotiKue">Roti dan Kue</option>
                  <option className="text-gray-900 dark:text-white" value="camilan">Camilan</option>
                  <option className="text-gray-900 dark:text-white" value="minuman">Minuman</option>
                  <option className="text-gray-900 dark:text-white" value="buahSayur">Buah dan Sayur</option>
                  <option className="text-gray-900 dark:text-white" value="vegan">Makanan Vegan</option>
                </select>
            </div>
            <InputField
              label='Price'
              placeholder='10000'
              id='number'
              type='number'
              onChange={e =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <div className="flex gap-x-4 mt-3">
            <InputField
              label='Discount'
              placeholder=' 10 (%)'
              id='discount'
              type='number'
              extra='flex-1'
              onChange={e =>
                setNewProduct({ ...newProduct, discount: e.target.value/100 })
              }
            />
            <InputField
              label='Final Price'
              placeholder={`${newProduct.price - (newProduct.price * newProduct.discount * 100) / 100}`}
              id='discount'
              type='number'
              extra="flex-1"
              disabled
              onChange={e =>
                setNewProduct({ ...newProduct, discount: e.target.value })
              }
            />

            </div>
            <InputField
              label='Stock'
              placeholder='20'
              id='stock'
              type='number'
              onChange={e =>
                setNewProduct({ ...newProduct, stock: e.target.value })
              }
            />
            <div className="flex gap-x-4 flex-col sm:flex-row">
              <div>
              <label
              htmlFor='description'
              className='font-bold block mb-2 mt-3 text-sm ms-3 text-gray-900 dark:text-white'
            >
              Food Created at
            </label>
            <input onChange={e => setNewProduct({ ...newProduct, foodCreate: e.target.value })} className="mt-2 flex h-12 items-center dark:text-white justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 " type="datetime-local" id="birthdaytime" name="birthdaytime"/>
              </div>
            <div>
            <div>
              <label
              htmlFor='description'
              className='font-bold block mb-2 mt-3 text-sm ms-3 text-gray-900 dark:text-white'
            >
             Best before
            </label>
            <input onChange={e => setNewProduct({ ...newProduct, bestBefore: e.target.value })} className="mt-2 flex h-12 items-center dark:text-white justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 " type="datetime-local" id="birthdaytime" name="birthdaytime"/>
              </div>
            </div>
            </div>
            <button
              onClick={addProduct}
              className='text  rounded-lg my-3 bg-brand-500 px-3 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200'
            >
              Add item
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}
