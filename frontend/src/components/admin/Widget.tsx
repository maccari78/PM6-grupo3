import React from 'react';

interface WidgetProps {
  title: string;
  value: string | number;
}

const Widget: React.FC<WidgetProps> = ({ title, value }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{value}</p>
    </div>
  );
}

export default Widget;