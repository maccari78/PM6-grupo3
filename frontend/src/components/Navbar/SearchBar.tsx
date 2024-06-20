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

  const handleSearch = async (searchType: 'available'| 'allavailable'| 'all') => {
    setLoading(true);
    try {
      let response;
      if (searchType === 'available') {
        const queryParams = new URLSearchParams({
          location: location,
        });
        response = await fetch(`${searchBarUrl}/available?${queryParams.toString()}`);
      } else if(searchType === 'allavailable'){
        response = await fetch(`${searchBarUrl}/available`);
      } else {
        response = await fetch(`${searchBarUrl}`);
      }
      const data: IPost[] = await response.json();
      onSearch(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center w-full mt-6'>

    <div className="flex flex-col md:flex-row bg-[#313139] text-white rounded-lg p-5 md:space-y-3 md:space-x-4" >
      <div className="flex-1">
        <label className="block mb-1">Buscar por ciudad, provincia o país:</label>
        <input 
          type="text" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          className="w-full p-2 pr-20 rounded bg-[#2d2d2d] border border-black focus:outline-none" 
          placeholder="Buenos Aires, CABA"
        />
      </div>
      <button 
        onClick={() => handleSearch('available')} 
        className="w-full md:w-auto px-4 mt-4 mb-4 bg-[#c4ff0d] text-gray-900 rounded-lg hover:bg-lime-600 transition">
        Buscar
      </button>

      <div className='px-4'>
        <div className="h-full border-l border-gray-500 "></div>
      </div>

      <button 
        onClick={() => handleSearch('allavailable')} 
        className="w-full md:w-auto px-4 mt-4 mb-4 bg-[#c4ff0d] text-gray-900 rounded-lg hover:bg-lime-600 transition">
        Vehículos Disponibles
      </button>
      <button 
        onClick={() => handleSearch('all')} 
        className="w-full md:w-auto px-4 mt-4 mb-4 bg-[#c4ff0d] text-gray-900 rounded-lg hover:bg-lime-600 transition">
        Todos
      </button>
    </div>
    </div>
  );
};

export default SearchComponent;
