import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Dropdown = () => {

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    localStorage.removeItem('userSession')
    router.push("/login")
}

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="hidden md:inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#444343] rounded-md focus:outline-none "
      >
        Mi cuenta
      </button>
      {isOpen && (
        <div className="absolute right-0 w-56 mt-2 origin-top-right bg-[#222222] border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
          <div className="py-1">
            <Link
              href="/user"
              className="block px-4 py-2 text-sm text-white hover:bg-[#494949] "
            >
              Mi cuenta
            </Link>
            <Link
              href="/publicar-vehiculo"
              className="block px-4 py-2 text-sm text-white hover:bg-[#494949] "
            >
              Publicar mi vehículo
            </Link>
            <Link
              href="/ayuda"
              className="block px-4 py-2 text-sm text-white hover:bg-[#494949]"
            >
              Centro de ayuda
            </Link>
            <button
              type="button"
              className="block px-4 mt-2 text-start py-2 text-sm w-full text-white hover:bg-[#494949]"
              onClick={handleLogOut}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
