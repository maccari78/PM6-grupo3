import React from 'react';
import StatCard from './StatCard';
import { FaDollarSign } from 'react-icons/fa';

const RevenueStats: React.FC = () => {
  return (
    <StatCard title="Beneficios" value="$5,000" icon={FaDollarSign} color="green" />
  );
}

export default RevenueStats;
