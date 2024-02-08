'use client';
import MiniCalendar from 'components/calendar/MiniCalendar';
import WeeklyRevenue from 'components/admin/default/WeeklyRevenue';
import TotalSpent from 'components/admin/default/TotalSpent';
import PieChartCard from 'components/admin/default/PieChartCard';
import { IoMdHome } from 'react-icons/io';
import { IoDocuments } from 'react-icons/io5';
import { MdBarChart, MdDashboard } from 'react-icons/md';
import { IoIosAlert } from "react-icons/io";

import Widget from 'components/widget/Widget';
import CheckTable from 'components/admin/default/CheckTable';
import ComplexTable from 'components/admin/default/ComplexTable';
import DailyTraffic from 'components/admin/default/DailyTraffic';
import TaskCard from 'components/admin/default/TaskCard';
import tableDataCheck from 'variables/data-tables/tableDataCheck';
import tableDataComplex from 'variables/data-tables/tableDataComplex';
import TotalOrder from 'components/admin/default/TotalOrder';
import TotalSales from 'components/admin/default/TotalSales';
import { FaTrophy } from "react-icons/fa";
import BestProdTable from 'components/admin/default/BesrProdTable';


const Dashboard = () => {
  return (
    <div>
      {/* Card widget */}
      <div className="mt-4 rounded-xl w-full justify-between flex bg-brand-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
        <div className="flex align-center items-center gap-2">
          <IoIosAlert className="w-5 h-5 "/>
          <p>Dashboard dalam tahap pengembangan (dummy data)</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-4">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'Profit'}
          subtitle={'Rp 1.121.921'}
        />
        <Widget
          icon={<IoDocuments className="h-7 w-7" />}
          title={'Sales'}
          subtitle={'Rp 8.361.095'}
        />
        <Widget
          icon={<MdDashboard className="h-7 w-7" />}
          title={'Total Order'}
          subtitle={'491'}
        />
        <Widget
          icon={<FaTrophy  className="h-7 w-7" />}
          title={'Brand Ranking'}
          subtitle={'1/199'}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalOrder />
        <TotalSales />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2 grid-rows-2">
        {/* Check Table */}
        <div>
          {/* <CheckTable tableData={tableDataCheck} /> */}
          <PieChartCard title={"Total Order"} />
        </div>
        <div>
          {/* <CheckTable tableData={tableDataCheck} /> */}
          <PieChartCard title={"Total Revenue"} />
        </div>

        {/* Traffic chart & Pie Chart */}

        {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <DailyTraffic />
          {/* <PieChartCard /> */}
        {/* </div> */}

        {/* Complex Table , Task & Calendar */}

        <BestProdTable tableData={tableDataComplex} />

        {/* Task chart & Calendar */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
