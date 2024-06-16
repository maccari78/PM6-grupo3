"use client"
import CarPostCard from '@/components/admin/CarPostCard';
import OrderStats from '@/components/admin/OrderStats';
import RevenueStats from '@/components/admin/RevenueStats';
import ReviewsAdm from '@/components/admin/ReviewsAdm';
import SidebarAdm from '@/components/admin/SidebarAdm'
import UserStats from '@/components/admin/UserStats';
import UserTable from '@/components/admin/UserTable';
import React, { useState } from 'react'

const page = () => {
  const [selectedSection, setSelectedSection] = useState('dashboard');

  
  return (
    <div className="flex min-h-screen">
      <SidebarAdm onSelect={setSelectedSection} />
      <div className="flex-grow bg-gray-100 p-6">
        {selectedSection === 'dashboard' && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UserStats />
            <RevenueStats />
            <OrderStats />
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <CarPostCard />
            </div>
          </div>
        )}
        {selectedSection === 'users' && <UserTable />}
        {selectedSection === 'reviews' && <ReviewsAdm />}
      </div>
    </div>
  );
};


export default page
