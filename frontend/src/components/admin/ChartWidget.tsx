import React from 'react';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  // más datos...
];

const SimpleBarChart: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Revenue Over Time</h2>
      <div className="flex">
        {data.map((entry, index) => (
          <div key={index} className="mr-4">
            <div
              className="bg-blue-500 text-white text-center"
              style={{ height: `${entry.value / 100}px`, width: '50px' }}
            >
              {entry.value}
            </div>
            <div className="text-center mt-2">{entry.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimpleBarChart;