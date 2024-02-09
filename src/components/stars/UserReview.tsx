import ReviewStar from './ReviewStar';

const UserReview = ({ rating, user, date, review }: { rating: number, user:string, date:string, review:string }) => {
    return (
        <div className="flex flex-col w-3/4">
                    <ReviewStar rating={rating} />
                    <p><span className='font-bold'>{user} </span>| {date}</p>
                    <p>{review}</p>
                </div>
    );
};

export default UserReview;
