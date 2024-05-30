import React, { FC } from 'react';

const Sidebar: FC = () => {
  interface SidebarIconProps {
    href: string;
    iconPath: string;
    className?: string;
  }
  
  const SidebarIcon: FC<SidebarIconProps> = ({ href, iconPath, className = "" }) => (
    <a className={`flex items-center justify-center flex-shrink-0 w-10 h-10 mt-4 rounded hover:bg-gray-800 ${className}`} href={href}>
      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
      </svg>
    </a>
  );
  
  return (
    <div className="flex text-[#ffffff] bg-[#222222]">
      {/* Sidebar */}
      <div className="flex flex-col items-center w-16 pb-4 overflow-auto border-r border-gray-800 text-gray-500">
        <a className="flex items-center justify-center flex-shrink-0 w-full h-16" href="#">
          <svg className="w-8 h-8 stroke-current text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </a>
        {/* Iconos */}
        <SidebarIcon href="#" iconPath="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        <SidebarIcon href="#" iconPath="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        <SidebarIcon href="#" iconPath="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        <SidebarIcon href="#" iconPath="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        <SidebarIcon href="#" iconPath="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        <SidebarIcon href="#" iconPath="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" className="mt-auto" />
      </div>
      {/* Main Content */}
  
      <div className="flex flex-col flex-grow">
        <div className="flex items-center flex-shrink-0 h-16 px-8 border-b border-gray-800">
          <h1 className="text-lg font-medium">Panel de Usuario</h1>
        </div>
        <div className="flex-grow p-6 overflow-auto bg-[#444343]">
          <div className="grid grid-cols-3 gap-6">
            <div className="h-24 col-span-1 bg-[#A29E9E]"></div>
            <div className="h-24 col-span-1 bg-[#A29E9E]"></div>
            <div className="h-24 col-span-1 bg-[#A29E9E]"></div>
            <div className="h-24 col-span-2 bg-[#A29E9E]"></div>
            <div className="h-24 col-span-1 bg-[#A29E9E]"></div>
            <div className="h-24 col-span-2 bg-[#A29E9E]"></div>
            <div className="h-24 col-span-3 bg-[#A29E9E]"></div>

          </div>
        </div>
      </div>
    </div>
  );
};




export default Sidebar;