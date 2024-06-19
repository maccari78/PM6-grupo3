import Sidebar from '@/components/DashboardComponents/Sidebar';
import DashboardComprador from '@/components/DashboardComponents/DashboardComprador';
import React, { FC } from 'react';

const Userpage: FC = () => {
  return (
    <>
  <div className='bg-[#313139] font-sans'>
    <Sidebar/>
    <DashboardComprador/>
  </div>

   
    </>
    );
};

export default Userpage;