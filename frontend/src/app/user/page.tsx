import Config from '@/components/DashboardComponents/Config';
import MainContent from '@/components/DashboardComponents/MainContent';
import Sidebar from '@/components/DashboardComponents/Sidebar';
import React, { FC } from 'react';

const Userpage: FC = () => {
  return (
    <>
  <div className='bg-gradient-to-bl bg-[#313139] font-sans'>
    <Sidebar/>
    <MainContent/>
    

  </div>

   
    </>
    );
};




export default Userpage;