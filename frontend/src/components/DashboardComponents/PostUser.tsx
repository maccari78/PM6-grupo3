import { SalePostCardProps } from '@/interfaces/dashboard';
import Link from 'next/link';
import React from 'react';


const SalePostCard: React.FC<SalePostCardProps> = ({ productName, productDescription, price, imageUrl }) => (
    <div className="bg-[#2d2d2d] border rounded-lg shadow p-4">
    <img className="w-full h-32 object-cover rounded-t-lg" src={imageUrl} alt={productName} />
    <div className="mt-2">
      <h4 className="text-slate-100 font-bold text-lg">{productName}</h4>
      <p className=" text-slate-400 text-sm mt-1">{productDescription}</p>
      <p className="text-gray-300 font-semibold mt-2">{price}</p>
    </div>
    <div className="text-center mt-4">
      <button 
      
      className=" text-gray-800 px-4 py-2 ">
        <Link href={'/vehicle/1'}>Ver más</Link>
      </button>
    </div>
  </div>
);

export default SalePostCard;