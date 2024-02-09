import Progress from 'components/progress'

const EachStar = ({ star, starCount, progress }: { star: number, starCount:number, progress:number }) => {
    return (
        <div className="w-[50%] flex flex-row items-center gap-1">
            <div className="flex flex-row w-[10%] justify-between">
            {star}
                        <svg
                        className="w-5 h-5 fill-current fill-black"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.4 7.4-6-4.6-6 4.6 2.4-7.4-6-4.6h7.6z" />
                        </svg>
            </div>
                        
                        <Progress color="yellow" width={"w-[75%]"} value={progress}/>
                        {starCount}
        </div>
    );
};

export default EachStar;
