import React from 'react';
import UserStats from './UserStats';
import RevenueStats from './RevenueStats';
import OrderStats from './OrderStats';


const MainContent: React.FC = () => {
  return (
    <main className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UserStats />
      <RevenueStats />
      <OrderStats />
    </main>
  );
}

export default MainContent;