"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Dropdown from "../DropdownNavbar/Dropdown";
import Swal from "sweetalert2";

const apiUser = process.env.NEXT_PUBLIC_API_GET_USERS_TOKEN;

export interface IUserDta {
  name: string;
  image_url: string;
}

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [userSession, setUserSession] = useState<boolean>(false);
  const [token, setToken] = useState<string | undefined>();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [userDta, setUserDta] = useState<IUserDta | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("userSession")
    ) {
      const userToken = localStorage.getItem("userSession");
      setUserSession(!!userToken);
      const parsedSession = JSON.parse(userToken!);
      setToken(parsedSession.token!);
    } else {
      setUserSession(false);
    }
  }, [pathname]);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        setLoading(true);
        try {
          const res = await fetch(`${apiUser}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token!}`,
            },
          });
          const data: IUserDta = await res.json();
          setUserDta(data);
        } catch (error: any) {
          console.log(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    if (userSession === true) {
      fetchUser();
    }
  }, [token]);

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
    <header className="flex flex-row justify-around items-center bg-[#222222] text-white p-6 font-sans">
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
        <form className="flex items-center h-[30px] md:h-[42px]">
          <div className="relative h-full  w-full">
            <input
              type="text"
              id="voice-search"
              className="bg-gray-300 h-full border rounded-l-2xl text-sm outline-none text-gray-900  focus:border-[#c2e94e] block w-full pl-3 p-2.5 placeholder-gray-500 placeholder:text-[10px] md:placeholder:text-[13px]"
              placeholder="Modelo, Marca etc..."
            />
            <button
              type="reset"
              className="flex flex-row absolute inset-y-0 right-0 items-center pr-3 "
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
                className="w-4 h-4 stroke-gray-800 hover:bg-gray-400 rounded-xl duration-200"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button
            type="submit"
            className="inline-flex h-full items-center  rounded-r-2xl py-2.5 px-3 hover:shadow-xl text-sm  bg-[#c2e94e] border border-[#c2e94e] hover:bg-[#94b338] focus:ring-4 focus:outline-none duration-300"
          >
            <svg
              aria-hidden="true"
              className="md:mr-2 -ml-1 w-5 h-5 stroke-[#222222]"
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
            <p className="font-medium text-[#222222] hidden md:flex">Buscar</p>
          </button>
        </form>
      </div>
      <div className="hidden md:flex flex-row items-center  font-medium">
        {userSession ? (
          <Dropdown userDta={userDta!} loading={loading} />
        ) : (
          <>
            <Link
              href="/login"
              className="hover:text-[#C4FF0D] text-gray-300 duration-500 pr-3 border-r-[2px] border-r-gray-300"
            >
              Iniciar sesion
            </Link>
            <Link
              href="/register"
              className="hover:text-[#C4FF0D] text-gray-300 duration-500 pl-3"
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
            <div className="absolute right-0 z-50 w-56 mt-2 origin-top-right top-16 bg-[#333333] divide-y divide-gray-100 rounded-md shadow-lg">
              <div className="py-1">
                <Link
                  href="/user"
                  className="flex items-center gap-1 flex-row px-4 py-2 text-sm hover:text-[#C4FF0D] duration-300 text-gray-300 hover:bg-[#494949]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 stroke-[#C4FF0D]"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                  </svg>
                  Mi cuenta
                </Link>

                <Link
                  href="/vehicleForm"
                  className="flex items-center gap-1 flex-row px-4 py-2 text-sm hover:text-[#C4FF0D] hover:stroke-[#C4FF0D] duration-300 text-gray-300 hover:bg-[#494949]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 stroke-[#C4FF0D]"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 21v-4a3 3 0 0 1 3 -3h5" />
                    <path d="M9 17l3 -3l-3 -3" />
                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                    <path d="M5 11v-6a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-9.5" />
                  </svg>
                  Publicar mi vehículo
                </Link>
                <Link
                  href="/ayuda"
                  className="flex items-center gap-1 flex-row px-4 py-2 text-sm hover:text-[#C4FF0D] hover:stroke-[#C4FF0D] duration-300 text-gray-300 hover:bg-[#494949]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 stroke-[#C4FF0D]"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M12 17l0 .01" />
                    <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
                  </svg>
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
                  className="flex items-center gap-1 flex-row  px-4 py-2 text-sm hover:text-[#C4FF0D] duration-300 text-gray-300 hover:bg-[#494949] "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 stroke-[#C4FF0D]"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8" />
                    <path d="M14 19l2 2l4 -4" />
                    <path d="M9 8h4" />
                    <path d="M9 12h2" />
                  </svg>
                  Iniciar sesion
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-1 flex-row  px-4 py-2 text-sm hover:text-[#C4FF0D] duration-300 text-gray-300 hover:bg-[#494949]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 stroke-[#C4FF0D]"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3.5 5.5l1.5 1.5l2.5 -2.5" />
                    <path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />
                    <path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />
                    <path d="M11 6l9 0" />
                    <path d="M11 12l9 0" />
                    <path d="M11 18l9 0" />
                  </svg>
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
