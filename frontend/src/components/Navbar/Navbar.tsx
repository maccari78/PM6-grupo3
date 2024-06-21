"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Dropdown from "../DropdownNavbar/Dropdown";
import Swal from "sweetalert2";
import { MdConnectWithoutContact } from "react-icons/md";
import { MdOutlineQuestionAnswer } from "react-icons/md";

import { SearchResult, Post, Car } from "./interfaces/INavbar";

const apiUser = process.env.NEXT_PUBLIC_API_GET_USERS_TOKEN;
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface IUserDta {
  name: string;
  image_url: string;
  roles?: string;
}

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [userSession, setUserSession] = useState<boolean>(false);
  const [token, setToken] = useState<string | undefined>();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [userDta, setUserDta] = useState<IUserDta | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult | null>(null);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleClickOutsideDos = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideDos, true);
    return () => {
      document.removeEventListener("click", handleClickOutsideDos, true);
    };
  }, []);

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

    setLoading(false);
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
          const roles = data.roles || "";
          setUserRole(roles);
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

  const search = async (query: string) => {
    if (query) {
      try {
        const response = await fetch(
          `${apiBaseUrl}/searching?q=${query}`
        );

        if (!response.ok) {
          throw new Error(
            "Fallo el buscador fetch en la busqueda de resultados"
          );
        }

        const data = (await response.json()) as SearchResult;

        if (!data || (data.posts.length === 0 && data.cars.length === 0)) {
          setNoResults(true);
          setResults(null);
        } else {
          setNoResults(false);
        }

        return data;
      } catch (error: any) {
        console.error(error.message);
        setNoResults(true);
        setResults(null);
      }
    } else {
      console.log("No has escrito nada");
    }
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query === "") {
      setShowResults(false);
      setResults(null);
      setNoResults(false);
    } else {
      try {
        const data = await search(query);
        setResults(data || null);
        setShowResults(true);
      } catch (error) {
        console.error(error);
        setResults(null);
        setShowResults(true);
      }
    }
  };

  const handleResetInput = () => {
    setQuery("");
    setShowResults(false);
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setQuery(event.target.value);
    } else {
      setQuery("");
      setShowResults(false);
    }
  };

  const handleLinkClick = () => {
    setShowResults(false);
  };

  return (
    <header className="flex flex-row justify-around items-center bg-[#222222] text-white h-[80px] font-sans">
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
      {/* Searching */}
      <div className=" md:w-[400px]">
        <form
          onSubmit={handleSearch}
          className="flex items-center h-[30px] md:h-[42px]"
        >
          <div ref={searchRef} className="relative h-full  w-full">
            <input
              type="text"
              value={query}
              onChange={onChangeInput}
              name="search"
              className="bg-gray-300 h-full border rounded-l-2xl text-sm outline-none text-gray-900  focus:border-[#c2e94e] block w-full pl-3 p-2.5 placeholder-gray-500 placeholder:text-[10px] md:placeholder:text-[13px]"
              placeholder="Titulo, Marca, Modelo etc..."
            />
            <button
              type="reset"
              className="flex flex-row absolute inset-y-0 right-0 items-center pr-3 "
              onClick={handleResetInput}
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

        {query === "" ? (
          <div className="hidden flex-col gap-5 bg-[#3b3b3b] justify-center px-4 rounded-2xl mt-1 py-3 w-[500px]"></div>
        ) : (
          showResults && (
            <div className="absolute z-40 overflow-y-clip  flex flex-col gap-5 bg-[#3b3b3b] justify-center px-4 rounded-2xl mt-1 py-3 w-[500px]">
              {noResults ? (
                <h2 className="text-lg font-bold text-[#c2e94e]">
                  No se encontraron resultados...
                </h2>
              ) : (
                <ul>
                  {results?.posts?.map((post) => {
                    const titleSlice = post.title.slice(0, 20);

                    return (
                      <Link
                        key={post.id}
                        href='/vehicle/[vehicleId]'
                        as={`vehicle/${post.id}`}
                        onClick={handleLinkClick}
                      >
                        <li className="flex flex-row gap-5 items-center py-[4px] hover:bg-[#222222]  rounded-xl duration-200">
                          <div className="w-[50] h-[50px]">
                            <img
                              src={post.car.image_url[0]}
                              alt="imagen carro"
                              className="w-full h-full rounded-xl"
                            />
                          </div>
                          <p className="text-gray-200 text-[18px]">
                            {titleSlice}...
                          </p>
                          <p className="text-gray-200 text-[18px]">
                            <strong className="text-[#C4FF0D]">$</strong>
                            {post.price}
                          </p>
                        </li>
                      </Link>
                    );
                  })}

                  {results?.cars.map((car) => {
                    return (
                      <div key={car.id} className="flex flex-col ">
                        <div className="flex flex-row items-center gap-1 mb-3 py-1">
                          <div>
                            <img
                              src={car.image_url[0]}
                              alt="imagen carro"
                              className="w-[50] h-[50px] rounded-xl"
                            />
                          </div>
                          <p>{car.brand}</p>
                          <p>{car.model}</p>
                          <p>({car.color})</p>
                          {car.post.map((post) => {
                            return (
                              <Link
                                key={post.id}
                                href='/vehicle/[vehicleId]'
                                as={`vehicle/${post.id}`}
                                onClick={handleLinkClick}
                              >
                                <li className="flex flex-row gap-5 items-center py-[4px] hover:bg-[#222222] px-4 rounded-xl duration-200">
                                  <p className="text-[#c2e94e] text-[18px] hover:underline">
                                    Ver
                                  </p>
                                </li>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </ul>
              )}
            </div>
          )
        )}
      </div>

      <div className="hidden md:flex flex-row gap-10 h-full items-center ">
        <div className="hidden md:flex flex-row  h-full items-center hover:border-b-[1px] hover:border-b-[#C4FF0D] focus:border-b-[#C4FF0D] duration-150">
          <button className="flex flex-row items-center justify-center">
            <Link
              href="/about"
              className="text-[15px] leading-5 text-gray-100 font-medium hover:text-[#C4FF0D] duration-150"
            >
              Sobre nosotros
            </Link>
          </button>
        </div>

        <div className="hidden md:flex flex-row  h-full items-center hover:border-b-[1px] hover:border-b-[#C4FF0D] focus:border-b-[#C4FF0D] duration-150">
          <button className="flex flex-row items-center justify-center">
            <Link
              href="/answers"
              className="text-[15px] leading-5 text-gray-100 font-medium hover:text-[#C4FF0D] duration-150"
            >
              Preguntas frecuentes
            </Link>
          </button>
        </div>

        <div className="hidden md:flex flex-row h-full items-center hover:border-b-[1px] hover:border-b-[#C4FF0D] focus:border-b-[#C4FF0D] duration-150">
          <button className="flex flex-row items-center justify-center">
            <Link
              href="/contact"
              className="text-[15px] leading-5 text-gray-100 font-medium hover:text-[#C4FF0D] duration-150"
            >
              Contacto
            </Link>
          </button>
        </div>
      </div>

      <div className="hidden md:flex flex-row items-center  font-medium">
        {loading ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin fill-[#C4FF0D]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : userSession ? (
          <Dropdown userDta={userDta!} loading={loading}  userRole={userRole}  />
        ) : (
          <>
            <Link
              href="/login"
              className="hover:text-[#C4FF0D] text-gray-300 duration-500 pr-3 "
            >
              Iniciar sesion
            </Link>
            <Link
              href="/register"
              className="text-[#222222] font-semibold hover:bg-[#c2e94e] duration-500 px-5 bg-[#C4FF0D] rounded-xl flex flex-row gap-1 items-center justify-center py-1"
            >
              Registrarse
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
                className="w-5 h-5 stroke-[#222222] font-bold"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                <path d="M9 12h12l-3 -3" />
                <path d="M18 15l3 -3" />
              </svg>
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
                {userRole &&
                  (userRole.includes("admin") ||
                    userRole.includes("superadmin")) && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-1 flex-row px-4 py-2 text-sm hover:text-[#C4FF0D] duration-300 text-gray-300 hover:bg-[#494949]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 stroke-[#C4FF0D]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                        />
                      </svg>
                      Administracion
                    </Link>
                  )}
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
                <Link
                  href="/about"
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
                    <path d="M3 7h10v10h-10z" />
                    <path d="M6 10h4" />
                    <path d="M8 10v4" />
                    <path d="M8.104 17c.47 2.274 2.483 4 4.896 4a5 5 0 0 0 5 -5v-7h-5" />
                    <path d="M18 18a4 4 0 0 0 4 -4v-5h-4" />
                    <path d="M13.003 8.83a3 3 0 1 0 -1.833 -1.833" />
                    <path d="M15.83 8.36a2.5 2.5 0 1 0 .594 -4.117" />
                  </svg>
                  Sobre nosotros
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-1 flex-row px-4 py-2 text-sm hover:text-[#C4FF0D] hover:stroke-[#C4FF0D] duration-300 text-gray-300 hover:bg-[#494949]"
                >
                  <MdConnectWithoutContact className=" w-5 h-5 text-[#C4FF0D]" />
                  Contacto
                </Link>
                <Link
                  href="/answers"
                  className="flex items-center gap-1 flex-row px-4 py-2 text-sm hover:text-[#C4FF0D] hover:stroke-[#C4FF0D] duration-300 text-gray-300 hover:bg-[#494949]"
                >
                  <MdOutlineQuestionAnswer className=" w-5 h-5 text-[#C4FF0D]" />
                  Preguntas frecuentes
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
            <div className="absolute z-50 right-0 w-56 mt-2 origin-top-right top-16 bg-[#333333] divide-y divide-gray-100 rounded-md shadow-lg">
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
                  className="flex items-center gap-1 flex-row  px-4 py-2 text-sm hover:text-[#C4FF0D] duration-300  text-gray-300 hover:bg-[#494949]"
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
                <Link
                  href="/about"
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
                    <path d="M3 7h10v10h-10z" />
                    <path d="M6 10h4" />
                    <path d="M8 10v4" />
                    <path d="M8.104 17c.47 2.274 2.483 4 4.896 4a5 5 0 0 0 5 -5v-7h-5" />
                    <path d="M18 18a4 4 0 0 0 4 -4v-5h-4" />
                    <path d="M13.003 8.83a3 3 0 1 0 -1.833 -1.833" />
                    <path d="M15.83 8.36a2.5 2.5 0 1 0 .594 -4.117" />
                  </svg>
                  Sobre nosotros
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-1 flex-row px-4 py-2 text-sm hover:text-[#C4FF0D] hover:stroke-[#C4FF0D] duration-300 text-gray-300 hover:bg-[#494949]"
                >
                  <MdConnectWithoutContact className=" w-5 h-5 text-[#C4FF0D]" />
                  Contacto
                </Link>
                <Link
                  href="/answers"
                  className="flex items-center gap-1 flex-row px-4 py-2 text-sm hover:text-[#C4FF0D] hover:stroke-[#C4FF0D] duration-300 text-gray-300 hover:bg-[#494949]"
                >
                  <MdOutlineQuestionAnswer className=" w-5 h-5 text-[#C4FF0D]" />
                  Preguntas frecuentes
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
