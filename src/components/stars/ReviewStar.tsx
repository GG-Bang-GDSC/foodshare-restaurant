import { FaStar } from "react-icons/fa";

const ReviewStar = ({ rating }: { rating: number }) => {
    return (
        <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
            // <svg
            // key={i}
            // className={`w-5 h-5 fill-current ${
            //     i < rating ? "fill-yellow-500" : "fill-gray-300"
            // }`}
            // viewBox="0 0 24 24"
            // xmlns="http://www.w3.org/2000/svg"
            // >
            // <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.4 7.4-6-4.6-6 4.6 2.4-7.4-6-4.6h7.6z" />
            // </svg>
            <FaStar key={i} className={`w-5 h-5 fill-current ${
                i < rating ? "fill-yellow-500" : "fill-gray-300"
            }`}
            
            />
        ))}
        </div>
    );
};

export default ReviewStar;
