import React from "react";
import CardsHistory from "./cardsHistory";
import CardSelectedCar from "./CardSelectedCar";
import Link from "next/link";

const MainContent = () => {
  return (
    <>
      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-3 bg-[#313139] p-1">
        <div className="header p-4 col-span-full rounded-lg border bg-[#A29E9E]">
          <h1 className="text-center align-middle text-white text-4xl font-bold bg-clip-text">
            Bienvendio <span className="text-[#C4FF0D]"> [Nombre de usuario]</span>!
          </h1>
        </div>
        <div className="font-bold col-span-12 rounded-lg border  bg-[#A29E9E] sm:col-span-8 flex flex-col items-center justify-center p-4">
          <h2 className="text-center mb-4 text-white text-2xl">
            Reservas activas
          </h2>
          <CardSelectedCar />
          <button className="mt-4 px-4 py-2 bg-[#313139] text-white rounded hover:bg-[#45454b]">
            Cancelar Reserva
          </button>
        </div>
        <div className="col-span-12 rounded-lg border font-bold bg-[#A29E9E] p-8 sm:col-span-4">
          <h2 className="text-center text-gray-100 text-2xl">
            Mensajes pendientes
          </h2>
          <div className=" mt-7 flex justify-center">
            <h3 className="text-center text-white text-lg">
              5 mensajes sin leer
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 ml-2 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
          </div>
          <div className="flex justify-end mt-7">
            <h3 className=" text-white"><Link href="/message">Ver mas..</Link></h3>
          </div>
        </div>

        <div className="footer col-span-12 rounded-lg border mb-4  bg-[#A29E9E] p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CardsHistory />
            <CardsHistory />
            <CardsHistory />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;
