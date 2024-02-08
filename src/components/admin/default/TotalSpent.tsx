import {
  MdArrowDropUp,
  MdOutlineCalendarToday,
  MdBarChart,
} from "react-icons/md";
import Card from "components/card";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";
import {useState} from 'react'
import LineChart from "components/charts/LineChart";

const TotalSpent = () => {
  const [refresh, setRefresh] = useState(false)
  return (
    <Card extra="!p-[20px] text-center">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">
          Monthly Revenue
        </h2>
        <button onMouseDown={()=> setRefresh(true)} onMouseUp={()=>setRefresh(false)} className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="flex h-full w-full flex-row lg:flex-col justify-start sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="flex flex-row gap-2 justify-start text-start">
          <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
            Rp 8.361.095
          </p>
          <div className="flex flex-col items-start">
            <p className="mt-2 text-sm text-gray-600">Last Month</p>
            <div className="flex flex-row items-center justify-center">
              <MdArrowDropUp className="font-medium text-green-500" />
              <p className="text-sm font-bold text-green-500"> +50% </p>
            </div>
          </div>
        </div>
        <div className="h-full w-full">
        {!refresh &&
          <LineChart
            chartOptions={lineChartOptionsTotalSpent}
            chartData={lineChartDataTotalSpent}
          />}
        </div>
      </div>
    </Card>
  );
};

export default TotalSpent;
