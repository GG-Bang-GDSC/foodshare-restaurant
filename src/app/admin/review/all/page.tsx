"use client"
import { useState } from 'react';
import Card from 'components/card';
import UserReview from 'components/stars/UserReview';
import BackButton from 'components/button/BackButton';
import userReviews from 'variables/review/userReview';
import { FaStar } from 'react-icons/fa';

const Page = () => {
  const [filteredRating, setFilteredRating] = useState([]);
  const [sortBy, setSortBy] = useState('');

  const handleFilter = (rating) => {
    if (filteredRating.includes(rating)) {
      setFilteredRating(filteredRating.filter((r) => r !== rating));
    } else {
      setFilteredRating([...filteredRating, rating]);
    }
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
  };

  const sortedReviews = [...userReviews].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return 0;
    }
  });

  return (
    <div>
      <div className='mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1'>
        <Card extra={'w-full h-full sm:overflow-auto px-6'}>
          <header className='relative flex items-center justify-between pt-4'>
            <div className='text-xl font-bold text-navy-700 dark:text-white flex flex-row items-center gap-2 py-2.5'>
              <BackButton />
              Reviews
            </div>
            <div className='flex gap-3'>
              <button
                className={`bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md ${
                  sortBy === 'rating' ? 'bg-gray-400' : ''
                }`}
                onClick={() => handleSort('rating')}
              >
                Sort by Rating
              </button>
              <button
                className={`bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md ${
                  sortBy === 'date' ? 'bg-gray-400' : ''
                }`}
                onClick={() => handleSort('date')}
              >
                Sort by Date
              </button>
            </div>
          </header>
          <div className='mt-8 overflow-x-scroll xl:overflow-x-auto'>
            <div className='w-full'>
              <div className='flex gap-3 mb-5'>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    className={`bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md flex flex-row items-center gap-1 ${
                      filteredRating.includes(rating) ? 'bg-gray-400' : ''
                    }`}
                    onClick={() => handleFilter(rating)}
                  >
                    <FaStar className='text-yellow-500' />
                    {rating}
                  </button>
                ))}
              </div>
              <div className='grid grid-cols-2 my-5 gap-y-5'>
                {sortedReviews
                  .filter((review) => {
                    if (filteredRating.length === 0) return true;
                    return filteredRating.includes(review.rating);
                  })
                  .map((review, index) => (
                    <UserReview
                      key={index}
                      rating={review.rating}
                      user={review.user}
                      date={review.date}
                      review={review.review}
                    />
                  ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Page;
