import React from 'react';
import { IconType } from 'react-icons';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
      <div className={`p-3 rounded-full bg-${color}-100 text-${color}-500 mr-4`}>
        <Icon size={24} />
      </div>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600">{value}</p>
      </div>
    </div>
  );
}

export default StatCard;
