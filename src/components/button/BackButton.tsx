import { useRouter } from "next/navigation";
import { MdChevronLeft } from "react-icons/md";

const BackButton = () => {
    const router= useRouter()
    return (
        <button onClick={() => router.back()} className="bg-brand-500 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200 flex items-center justify-center rounded-full p-2 text-lg text-white transition duration-200 hover:cursor-pointer dark:text-white">
                <MdChevronLeft />
        </button>
    );
};

export default BackButton;
