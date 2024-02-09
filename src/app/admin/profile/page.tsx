"use client"
import { useState } from 'react';
import Card from 'components/card';
import UserReview from 'components/stars/UserReview';
import BackButton from 'components/button/BackButton';
import userReviews from 'variables/review/userReview';
import { FaStar, FaTimes } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import avatar from '/public/img/avatars/avatar4.png';
import Image from 'next/image';
import InputField from 'components/fields/InputField';


const Page = () => {
  const [editable, setEditable] = useState(false);
  return (
    <div>
      <div className='mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1 '>
        <Card extra={'w-full h-screen sm:overflow-auto px-6'}>
            <header className='relative flex items-center justify-between py-4'>
              <BackButton />
              <button onClick={()=> setEditable(!editable)} className="bg-brand-500 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200 flex items-center justify-center rounded-full p-2 text-lg text-white transition duration-200 hover:cursor-pointer dark:text-white">
                {editable ? <FaTimes/>: <MdEdit />}
              </button>
            </header>
            <div className='flex w-full justify-center'>
                <div className="w-1/2 ">
                    <div className="w-full flex justify-center">
                            <Image
                    width="2"
                    height="20"
                    className="h-32 w-32 rounded-full border-brand-500 dark:border-brand-400 border-4 "
                    src={avatar}
                    alt="Elon Musk"
                    />
                    </div>
                    <div className='w-full flex flex-col my-5 gap-2'>
                    <InputField
                      label='Nama Perusahaan'
                      placeholder='Restoran Ci Lin'
                      value={'Restoran Ci Lin'}
                      id='name'
                      type='text'
                      disabled={!editable}
                    />
                    <InputField
                      label='Email Bisnis'
                      placeholder='aniesmenang@gmail.com'
                      value={'aniesmenang@gmail.com'}
                      id='email'
                      type='email'
                      disabled={!editable}
                    />
                    <InputField
                      label='Alamat FnB'
                      placeholder='Jalan menuju presiden untuk anies 2024'
                      id='address'
                      type='text'
                      value={'Jalan menuju presiden untuk anies 2024'}
                      disabled={!editable}
                    />
                    <InputField
                      label='Contact Number'
                      placeholder='2024 01 01 01 01'
                      id='address'
                      value={'2024 01 01 01 01'}
                      type='text'
                      disabled={!editable}
                    />
                    <div className='flex flex-row gap-5 w-full'>
                    <InputField
                      label='City'
                      placeholder='Jakarta'
                      extra='w-1/2'
                      value={'Jakarta'}
                      id='city'
                      type='text'
                      disabled={!editable}
                    />
                    <InputField
                      label='Regional'
                      placeholder='DKI Jakarta'
                      id='regional'
                      extra='w-1/2'
                      value={'DKI Jakarta'}
                      type='text'
                      disabled={!editable}
                    />
                    </div>
                    {editable && (<button
                      onClick={() => setEditable(false)}
                      className='text  rounded-lg my-3 bg-brand-500 px-3 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200'
                    >
                      Save
                    </button>)}
                    
                    </div>
                
                </div>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default Page;
