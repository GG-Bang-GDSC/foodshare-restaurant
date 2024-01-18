import React from 'react';
import { FaBox, FaHistory  } from 'react-icons/fa';
import { FaBoxArchive } from "react-icons/fa6";
import { BiFoodMenu } from "react-icons/bi";
import { LuClipboardList } from "react-icons/lu";
import { MdHistory } from "react-icons/md";

// Admin Imports

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from 'react-icons/md';

const routes = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: 'default',
    icon: <MdHome className="h-6 w-6" />,
  },
  // {
  //   name: 'NFT Marketplace',
  //   layout: '/admin',
  //   path: 'nft-marketplace',
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,

  //   secondary: true,
  // },
  // {
  //   name: 'Data Tables',
  //   layout: '/admin',
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   path: 'data-tables',
  // },
  // {
  //   name: 'Profile',
  //   layout: '/admin',
  //   path: 'profile',
  //   icon: <MdPerson className="h-6 w-6" />,
  // },
  {
    name: 'Menu',
    layout: '/admin',
    path: 'product',
    icon: <BiFoodMenu  className="h-6 w-6" />,
  },
  {
    name: 'Order',
    layout: '/admin',
    path: 'order',
    icon: <LuClipboardList  className="h-6 w-6" />,
  },
  {
    name: 'History',
    layout: '/admin',
    path: 'history',
    icon: <MdHistory  className="h-6 w-6" />,
  },
  // {
  //   name: 'Sign In',
  //   layout: '/auth',
  //   path: 'sign-in',
  //   icon: <MdLock className="h-6 w-6" />,
  // },
  // {
  //   name: 'RTL Admin',
  //   layout: '/rtl',
  //   path: 'rtl-default',
  //   icon: <MdHome className="h-6 w-6" />,
  // },
];
export default routes;
