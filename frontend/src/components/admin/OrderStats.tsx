import React from 'react';
import StatCard from './StatCard';
import { FaShoppingCart } from 'react-icons/fa';

const OrderStats: React.FC = () => {
  return (
    <StatCard title="Publicaciones" value="75" icon={FaShoppingCart} color="purple" />
  );
}

export default OrderStats;
