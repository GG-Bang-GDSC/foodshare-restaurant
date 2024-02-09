'use client'
import ReviewStar from 'components/stars/ReviewStar'
import EachStar from 'components/stars/EachStar'
import Card from 'components/card'
import UserReview from 'components/stars/UserReview'
import Link from 'next/link'

const Tables = () => {
  return (
    <div>
      <div className='mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1'>
        <Card extra={'w-full h-full sm:overflow-auto px-6'}>
          <header className='relative flex items-center justify-between pt-4'>
            <div className='text-xl font-bold text-navy-700 dark:text-white'>
              Reviews
            </div>

            <Link href={"/admin/review/all"}  className='text  rounded-lg my-3 bg-brand-500 px-3 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200'>
              View All
            </Link>
          </header>
          <div className='mt-8 overflow-x-scroll xl:overflow-x-auto'>
            <div className='w-full'>
              <div className='grid grid-cols-2 '>
                <div className="flex flex-col">
                    <p className="text-lg">Rating Snapshot</p>
                    <div className="flex my-5 w-full flex-col ">
                    <EachStar star={5} starCount={213}  progress={213*100/(213+40+31+1+19)} />
                    <EachStar star={4} starCount={40}  progress={40*100/(213+40+31+1+19)} />
                    <EachStar star={3} starCount={31}  progress={31*100/(213+40+31+1+19)} />
                    <EachStar star={2} starCount={15}  progress={15*100/(213+40+31+1+19)} />
                    <EachStar star={1} starCount={19}  progress={19*100/(213+40+31+1+19)} />
                    </div>
                </div>
                <div>
                <p className="text-lg">Average Customer Ratings</p>
                <div className="flex my-5 w-full flex-col ">
                    <div className="flex flex-row justify-between w-1/2">
                        <p>Overall</p>
                        <ReviewStar rating={4} />
                        <p>4.3</p>
                    </div>
                    <div className="w-1/2 text-center mt-5">
                        <p>Rating dan ulasan diverifikasi dan berasal dari user yang menggunakan aplikasi FoodShare</p>
                    </div>
                </div>
                </div>
              </div>
              <div className='grid grid-cols-2 my-5 gap-y-5'>
                <UserReview rating={5} user={'anies'} date='14 Februari 2024' review='2024 Presiden cuyyyy Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias velit necessitatibus id quod culpa non! Omnis incidunt repudiandae quas, obcaecati ipsa eum in facilis impedit, corporis soluta sapiente laborum sequi!' />
                <UserReview rating={3} user={'prabowo'} date='14 Februari 2024' review='Makan siang gratis, pejabat senang Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias velit necessitatibus id quod culpa non! Omnis incidunt repudiandae quas, obcaecati ipsa eum in facilis impedit, corporis soluta sapiente laborum sequi!' />
                <UserReview rating={4} user={'ganjar'} date='14 Februari 2024' review='SatSet dulu petugas par... Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias velit necessitatibus id quod culpa non! Omnis incidunt repudiandae quas, obcaecati ipsa eum in facilis impedit, corporis soluta sapiente laborum sequi!' />
                <UserReview rating={1} user={'gibran'} date='14 Februari 2024' review='' />
            </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Tables
