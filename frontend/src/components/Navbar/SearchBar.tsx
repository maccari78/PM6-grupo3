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
    <div className="flex bg-gray-900 text-white rounded-lg p-4">
      <div className="flex-1">
        <label className="block mb-1">Escribe una direccion</label>
        <input 
          type="text" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none" 
          placeholder="Buenos Aires, Zona oeste.."
        />
      </div>
      <div className="flex-1 mx-4">
        <label className="block mb-1">Dia del Retiro</label>
        <input 
          type="datetime-local" 
          value={pickupDate} 
          onChange={(e) => setPickupDate(e.target.value)} 
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none" 
        />
      </div>
      <div className="flex-1">
        <label className="block mb-1">Dia de Devolucion</label>
        <input 
          type="datetime-local" 
          value={returnDate} 
          onChange={(e) => setReturnDate(e.target.value)} 
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none" 
        />
      </div>
      <button 
        onClick={handleSearch} 
        className="ml-4 p-4 bg-lime-500 text-gray-900 rounded-lg hover:bg-lime-600 transition">
        Buscar
      </button>
    </div>
  );
};

export default SearchComponent;