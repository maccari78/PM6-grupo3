// components/Dropdown.js
import Link from 'next/link';
import { useState } from 'react';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="hidden md:inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#444343] rounded-md focus:outline-none "
      >
        Mi cuenta
      </button>
      {isOpen && (
        <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
          <div className="py-1">
            <Link
              href="/mi-cuenta"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Mi cuenta
            </Link>
            <Link
              href="/publicar-vehiculo"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Publicar mi vehículo
            </Link>
            <Link
              href="/cerrar-sesion"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Cerrar sesión
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
