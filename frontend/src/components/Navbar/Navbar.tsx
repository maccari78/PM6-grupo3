"use client";
import { IUser } from "@/interfaces/IUser";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Dropdown from "../DropdownNavbar/Dropdown";
import Swal from "sweetalert2";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [userSession, setUserSession] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userToken = localStorage.getItem("userSession");
      setUserSession(!!userToken);
    }
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogOut = () => {
    Swal.fire({
      title: "Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cierra sesion!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Sesion cerrada!",
          text: "Has cerrado sesion con exito.",
          icon: "success",
        });
        window.localStorage.removeItem("userSession");
        router.push("/login");
      }
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="flex flex-row justify-between items-center bg-[#222222] text-white p-6 font-sans">
      <div className="flex flex-row gap-4 items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            width={160}
            height={90}
            alt="Logo de la aplicacion You Drive"
          />
        </Link>
      </div>
      <div className=" md:w-[400px]">
        <form className="flex items-center">
          <div className="relative w-full">
            <input
              type="text"
              id="voice-search"
              className="bg-gray-300 border rounded-l-2xl text-sm outline-none text-gray-900  focus:border-[#c2e94e] block w-full pl-10 p-2.5 placeholder-gray-500"
              placeholder="vehiculo, Marca etc..."
              required
            />
            <button
              type="reset"
              className="flex absolute inset-y-0 right-0 items-center pr-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 stroke-gray-800"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button
            type="submit"
            className="inline-flex items-center rounded-r-2xl py-2.5 px-3  text-sm font-medium text-[#222222] bg-[#c2e94e] border border-[#c2e94e] hover:bg-[#94b338] focus:ring-4 focus:outline-none duration-300"
          >
            <svg
              aria-hidden="true"
              className="mr-2 -ml-1 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            Buscar
          </button>
        </form>
      </div>
      <div className="hidden md:flex flex-row items-center gap-8 font-medium">
        {userSession ? (
          <Dropdown />
        ) : (
          <>
            <Link
              href="/login"
              className="hover:text-[#C4FF0D] text-gray-300 duration-500"
            >
              Iniciar sesion
            </Link>
            <Link
              href="/register"
              className="hover:text-[#C4FF0D] text-gray-300 duration-500"
            >
              Registrarse
            </Link>
          </>
        )}
      </div>
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="focus:outline-none ml-2 hover:bg-[#373636] px-1 py-1 rounded-lg duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 fill-gray-300 stroke-[#C4FF0D]"
          >
            <path fillRule="evenodd" d="M4 5h16M4 12h16m-7 7h7" />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div ref={menuRef}>
          {userSession ? (
            <div className="absolute right-0 z-50 w-56 mt-2 origin-top-right top-16 bg-[#222222] divide-y divide-gray-100 rounded-md shadow-lg">
              <div className="py-1">
                <Link
                  href="/user"
                  className="block px-4 py-2 text-sm hover:text-[#C4FF0D] duration-300  text-gray-300 hover:bg-[#494949] "
                >
                  Mi cuenta
                </Link>
                <Link
                  href="/publicar-vehiculo"
                  className="block px-4 py-2 text-sm hover:text-[#C4FF0D] duration-300 text-gray-300 hover:bg-[#494949]"
                >
                  Publicar mi vehículo
                </Link>
                <Link
                  href="/ayuda"
                  className="block px-4 py-2 text-sm hover:text-[#C4FF0D] duration-300 text-gray-300 hover:bg-[#494949]"
                >
                  Centro de ayuda
                </Link>
                <button
                  type="button"
                  className="flex flex-row gap-2 px-4 mt-2 text-start py-2 text-sm w-full duration-300 text-red-700 hover:bg-[#494949]"
                  onClick={handleLogOut}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                    <path d="M15 12h-12l3 -3" />
                    <path d="M6 15l-3 -3" />
                  </svg>
                  Cerrar sesión
                </button>
              </div>
            </div>
          ) : (
            <div className="absolute z-50 right-0 w-56 mt-2 origin-top-right top-16 bg-[#222222] divide-y divide-gray-100 rounded-md shadow-lg">
              <div className="py-1">
                <Link
                  href="/login"
                  className="block px-4 py-2 text-sm hover:text-[#C4FF0D] duration-300 text-gray-300 hover:bg-[#494949] "
                >
                  Iniciar sesion
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-2 text-sm hover:text-[#C4FF0D] duration-300 text-gray-300 hover:bg-[#494949]"
                >
                  Registrarme
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
