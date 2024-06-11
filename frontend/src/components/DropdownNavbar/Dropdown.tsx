import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";

const Dropdown: React.FC = () => {
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
          text: "Haz cerrado sesion con exito.",
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
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="hidden md:inline-flex justify-center w-full px-4 py-2 text-sm font-medium  text-gray-300 bg-[#444343] rounded-md focus:outline-none"
      >
        Mi cuenta
      </button>
      {isOpen && (
        <div className="absolute z-50 right-0 w-56 mt-2 origin-top-right top-12 bg-[#222222] divide-y divide-gray-100 rounded-md shadow-lg">
          <div className="py-1">
            <Link
              href="/user"
              className="block px-4 py-2 text-sm hover:text-[#C4FF0D] duration-300 text-gray-300 hover:bg-[#494949]"
            >
              Mi cuenta
            </Link>
            <Link
              href="/vehicleForm"
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
              className="block px-4 mt-2 text-start py-2 text-sm w-full hover:text-[#C4FF0D] duration-300 text-gray-300 hover:bg-[#494949]"
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
