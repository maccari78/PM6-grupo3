import React, { useState } from 'react';

interface SearchComponentProps {
  onSearch: (location: string, pickupDate: string, returnDate: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleSearch = () => {
    onSearch(location, pickupDate, returnDate);
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#313139] text-white rounded-lg p-4 space-y-4 md:space-y-0 md:space-x-4">
      <div className="flex-1">
        <label className="block mb-1">Selecciona una Direccion</label>
        <input 
          type="text" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          className="w-full p-2 rounded bg-[#2d2d2d] border border-black focus:outline-none" 
          placeholder="Buenos Aires, CABA"
        />
      </div>
      <div className="flex-1">
        <label className="block mb-1">Dia de Retiro</label>
        <input 
          type="datetime-local" 
          value={pickupDate} 
          onChange={(e) => setPickupDate(e.target.value)} 
          className="w-full p-2 rounded bg-[#2d2d2d] border border-black focus:outline-none" 
        />
      </div>
      <div className="flex-1">
        <label className="block mb-1">Dia de Devolucion</label>
        <input 
          type="datetime-local" 
          value={returnDate} 
          onChange={(e) => setReturnDate(e.target.value)} 
          className="w-full p-2 rounded bg-[#2d2d2d] border border-black focus:outline-none" 
        />
      </div>
      <button 
        onClick={handleSearch} 
        className="w-full md:w-auto p-4 bg-lime-500 text-gray-900 rounded-lg hover:bg-lime-600 transition">
        Buscar
      </button>
    </div>
  );
};

export default SearchComponent;
