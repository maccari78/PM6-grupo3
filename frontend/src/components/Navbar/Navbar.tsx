'use client'
import { IUser } from "@/app/interfaces/IUser";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Dropdown from "../DropdownNavbar/Dropdown";

const Navbar = () => {
  const pathname = usePathname();
  const [userSession, setUserSession] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userToken = localStorage.getItem('userSession');
      setUserSession(JSON.parse(userToken!));
    }
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex flex-row justify-between items-center bg-[#222222] text-white p-6 font-sans">
      <div className="flex flex-row gap-4 items-center">
        <Image
          src='/logo.png'
          width={160}
          height={90}
          alt="Logo de la aplicacion You Drive"
        />
        <form className="flex gap-4 w-full md:w-52">
          <input type="string" placeholder="Buscar" className="h-8 rounded-md focus:outline-none text-black p-2 w-full" />
          <button type="button" className="b-none bg-transparent">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-4 fill-white">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </button>
        </form>
      </div>
      <div className="hidden md:flex flex-row items-center gap-8 font-medium">
        {userSession ? (
          <Dropdown />
        ) : (
          <>
            <Link href="#">Iniciar sesion</Link>
            <Link href="#">Registrarse</Link>
          </>
        )}
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="focus:outline-none ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 fill-white stroke-white">
            <path fillRule="evenodd" d="M4 5h16M4 12h16m-7 7h7" />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <>
          {userSession ? (
            <div className="absolute right-3 w-56 mt-2 origin-top-right top-14 bg-[#222222] border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
              <div className="py-1">
                <Link
                  href="/mi-cuenta"
                  className="block px-4 py-2 text-sm text-white hover:bg-[#494949] "
                >
                  Mi cuenta
                </Link>
                <Link
                  href="/publicar-vehiculo"
                  className="block px-4 py-2 text-sm text-white hover:bg-[#494949]"
                >
                  Publicar mi vehículo
                </Link>
                <Link
                  href="/cerrar-sesion"
                  className="block px-4 py-2 text-sm text-white hover:bg-[#494949]"
                >
                  Cerrar sesión
                </Link>
              </div>
            </div>
          ) : (
            <>
              <Link href="#">Iniciar sesion</Link>
              <Link href="#">Registrarse</Link>
            </>
          )}
        </>
      )}
    </header>
  );
};

export default Navbar;
