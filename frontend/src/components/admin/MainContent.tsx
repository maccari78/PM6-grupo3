import React from 'react';
import UserStats from './UserStats';
import RevenueStats from './RevenueStats';
import OrderStats from './OrderStats';
import UserTable from './UserTable';
import ReviewsAdm from './ReviewsAdm';


const MainContent: React.FC<{ userRole: string }> = ({ userRole }) => {
  return (
    <main className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UserStats />
      <RevenueStats />
      <OrderStats />
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <UserTable userRole={userRole} />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <ReviewsAdm />
      </div>
    </main>
  );
};


export default MainContent;