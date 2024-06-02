import Link from 'next/link';
import React from 'react';

interface SalePostCardProps {
  productName: string;
  productDescription: string;
  price: string;
  imageUrl: string;
}

const SalePostCard: React.FC<SalePostCardProps> = ({ productName, productDescription, price, imageUrl }) => (
    <div className="bg-white border rounded-lg shadow p-4">
    <img className="w-full h-32 object-cover rounded-t-lg" src={imageUrl} alt={productName} />
    <div className="mt-2">
      <h4 className="font-bold text-lg">{productName}</h4>
      <p className="text-gray-600 text-sm mt-1">{productDescription}</p>
      <p className="text-gray-800 font-semibold mt-2">{price}</p>
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