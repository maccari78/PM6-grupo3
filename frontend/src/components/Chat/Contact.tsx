import React from 'react'

const Contact: React.FC<{ name: string; message: string; avatarUrl: string }> = ({ name, message, avatarUrl }) => {
  return (
    <>
       <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
    <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
      <img src={avatarUrl} alt={`${name} Avatar`} className="w-12 h-12 rounded-full" />
    </div>
    <div className="flex-1">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-600">{message}</p>
    </div>
  </div>
    </>
  )
}
export default Contact