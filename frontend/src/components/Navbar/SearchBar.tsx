import React, { useState } from 'react';
import { IPost } from '../VehiclesComponent/interfaces/IPost';

const searchBarUrl = process.env.NEXT_PUBLIC_API_POSTS;
if (!searchBarUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_API_POSTS is not set");
}

interface SearchComponentProps {
  onSearch: (posts: IPost[]) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

   const handleSearch = async () => {
  //   try {
  //     const response = await fetch(`${searchBarUrl}`)
  //     const data: IPost[] = await response.json();
  //     onSearch(data);
  //   } catch (error) {
  //     console.error('Error fetching available posts:', error);
  //   }

  try {
    const queryParams = new URLSearchParams({
      location: location,
    });

    const response = await fetch(`${searchBarUrl}/available?${queryParams.toString()}`);
    const data: IPost[] = await response.json();
    onSearch(data);
    
  } catch (error) {
    console.error('Error fetching available posts:', error);
  }
 };

  return (
    <div className='flex justify-center w-full mt-6'>

    <div className="flex flex-col md:flex-row bg-[#313139] text-white rounded-lg p-4 space-y-4 md:space-y-0 md:space-x-4">
      <div className="flex-1">
        <label className="block mb-1">Ingresa tu ciudad o estado:</label>
        <input 
          type="text" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          className="w-full p-2 rounded bg-[#2d2d2d] border border-black focus:outline-none" 
          placeholder="Buenos Aires, CABA"
        />
      </div>
      <div className="flex-1">
        <label className="block mb-1">Dia de Retiro:</label>
        <input 
          type="datetime-local" 
          value={pickupDate} 
          onChange={(e) => setPickupDate(e.target.value)} 
          className="w-full p-2 rounded bg-[#2d2d2d] border border-black focus:outline-none" 
        />
      </div>
      <div className="flex-1">
        <label className="block mb-1">Dia de Devolución:</label>
        <input 
          type="datetime-local" 
          value={returnDate} 
          onChange={(e) => setReturnDate(e.target.value)} 
          className="w-full p-2 rounded bg-[#2d2d2d] border border-black focus:outline-none" 
        />
      </div>
      <button 
        onClick={handleSearch} 
        className="w-full md:w-auto p-4 bg-[#c4ff0d] text-gray-900 rounded-lg hover:bg-lime-600 transition">
        Buscar
      </button>
    </div>
    </div>
  );
};

export default SearchComponent;
