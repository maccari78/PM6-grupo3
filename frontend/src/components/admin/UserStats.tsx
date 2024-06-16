import React from 'react';
import StatCard from './StatCard';
import { FaUsers } from 'react-icons/fa';

const UserStats: React.FC = () => {
  return (
    <StatCard title="Users" value="120" icon={FaUsers} color="blue" />
  );
}

export default UserStats;
