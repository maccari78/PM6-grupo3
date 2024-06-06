import { PublicationCardProps } from '@/interfaces/dashboard'
import React from 'react'

const PublicationCard: React.FC<PublicationCardProps> = ({ carModel, postDate, author, imageUrl }) =>  {
  return (
    <>
        <div className="bg-[#313139] p-4 rounded-lg shadow">
    <img className="w-full h-32 object-cover rounded-t-lg" src={imageUrl} alt={carModel} />
    <div className="mt-2">
      <h4 className="text-slate-100 font-bold text-lg">{carModel}</h4>
      <p className="text-gray-300 text-sm mt-1">{author} - {postDate}</p>
    </div>
  </div>
    </>
  )
}

export default PublicationCard
