import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { IUserDta } from "../Navbar/Navbar";
import {
  MdConnectWithoutContact,
  MdOutlineQuestionAnswer,
} from "react-icons/md";

const Dropdown: React.FC<{
  userDta: IUserDta | undefined;
  loading: boolean;
  userRole: string | null;
}> = ({ userDta, loading, userRole }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className="relative w-[200px] inline-block text-left"
      ref={dropdownRef}
    >
      <button
        onClick={toggleDropdown}
        className="hidden md:flex  flex-row gap-1 items-center justify-center w-full py-1 text-sm hover:underline hover:bg-[#444343] duration-200 rounded-md focus:outline-none"
      >
        <div className="w-[20%]">
          <img
            src={userDta?.image_url}
            alt="imagen de usuario"
            className="rounded-full w-8 h-8"
          />
        </div>
        <div className="flex flex-row items-center">
          <p className="text-gray-200 ">{userDta?.name}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-4 stroke-gray-200"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M18 13l-6 6" />
            <path d="M6 13l6 6" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 right-0 w-56 mt-2 origin-top-right top-12 bg-[#333333] divide-y divide-gray-100 rounded-md shadow-lg">
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

            <button
              type="button"
              className="flex flex-row gap-2 px-4 mt-2 text-start py-2 text-sm w-full  duration-300 text-red-700 hover:bg-[#494949]"
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
      )}
    </div>
  );
};

export default Dropdown;
