import PieChart from "components/charts/PieChart";
import { pieChartData, pieChartOptions } from "variables/charts";
import Card from "components/card";
import { MdBarChart } from "react-icons/md";
import { useState } from "react";

const PieChartCard = ({title}) => {
  const [refresh, setRefresh] = useState(false)
  return (
    <Card extra="rounded-[20px] p-3 h-full">
      <div className="flex flex-row justify-between px-3 pt-2 ">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            {title}
          </h4>
        </div>

        <div className="mb-6 flex items-center justify-center">
        <button onMouseDown={()=> setRefresh(true)} onMouseUp={()=>setRefresh(false)} className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
        </div>
      </div>

      <div className="mb-auto flex h-full w-full items-center justify-center  ">
      {!refresh && <PieChart chartOptions={pieChartOptions} chartData={pieChartData} />}
      </div>
    </Card>
  );
};

export default PieChartCard;
