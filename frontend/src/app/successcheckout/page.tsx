"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Success = () => {
  const router = useRouter();

  const handleRemoveRent = () => {
    if (window !== undefined && window.localStorage) {
      window.localStorage.removeItem("checkoutPost");
    }
  };

  useEffect(() => {
    if (
      typeof window !== undefined &&
      !window.localStorage.getItem("checkoutPost")
    ) {
      Swal.fire({
        title: "Ha ocurrido un error!",
        text: "No haz realizado ninguna compra!",
        icon: "error",
      });

      router.push("/");
    } else if (
      typeof window !== undefined &&
      !window.localStorage.getItem("userSession")
    ) {
      Swal.fire({
        title: "Ha ocurrido un error!",
        text: "Debes iniciar sesion!",
        icon: "error",
      });

      router.push("/login");
    }
  });

  return (
    <div className="flex flex-col bg-[url('/background_register_2.svg')] min-h-screen items-center">
      <div className="flex flex-col mt-10 gap-3 items-center justify-centers">
        <h1 className="text-[15px] md:text-3xl text-[#c3ff0da9]">
          ¡Renta realizada con exito!
        </h1>
        <p className="text-[10px] text-center md:text-lg text-gray-100">
          En unos minutos te llegara a tu E-mail la confirmacion de tu pago y
          sus detalles. ¡Gracias por elegirnos!
        </p>
        <div className="md:w-1/2 text-center">
          <img src="https://i.gifer.com/PXAH.gif" alt="" />
        </div>
        <Link href="/">
          {" "}
          <button
            onClick={handleRemoveRent}
            className="text-lg flex flex-row text-gray-300 hover:text-[#c3ff0da9] justify-between items-center px-2 py-2 hover:bg-[#555454] rounded-xl duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-5 h-5 md:w-6 md:h-6"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l14 0" />
              <path d="M5 12l6 6" />
              <path d="M5 12l6 -6" />
            </svg>
            <p className="text-[15px] md:text-lg hover:text-[#c3ff0da9]">
              Volver a la pagina principal
            </p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
