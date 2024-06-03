import { StatCardProps } from '@/interfaces/dashboard'
import React from 'react'

const StatCard: React.FC<StatCardProps> = ({ title, value, description }) => {
  return (
    <>
          <div className="bg-[#313139] p-4 rounded-lg shadow">
      <h4 className="font-bold text-slate-300 text-lg">{title}</h4>
      <p className="text-gray-100 text-2xl font-semibold mt-2">{value}</p>
      <p className="text-gray-300 text-sm mt-1">{description}</p>
    </div>
    </>
  )
}

export default StatCard
