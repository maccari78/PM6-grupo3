import Link from "next/link";
import React from "react";

const NotfoundPage = () => {
  return (
    <>
      <style>
        @import
        url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);
      </style>
      <div className="min-w-screen min-h-screen bg-[#444343] flex items-center p-5 lg:p-20 overflow-hidden relative">
        <div className="flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
          <div className="w-full md:w-1/2">
            <div className="mb-10 md:mb-20 text-gray-600 font-light">
              <h1 className="font-black uppercase text-3xl lg:text-5xl text-[#C4FF0D] mb-10">
                No encontramos lo que buscas!
              </h1>
              <p>La pagina que estas buscando no existe</p>
              <p>Intenta buscarla nuevamente o puedes volver al inicio.</p>
            </div>
            <div className="mb-20 md:mb-0">
              <Link href="/">
                <button className="text-lg font-light outline-none focus:outline-none transform transition-all hover:scale-110 text-yellow-500 hover:text-[#C4FF0D`]">
                  <i className="mdi mdi-arrow-left mr-2"></i>Volver al inicio
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 text-center">
            <img
              src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
              alt=""
            />
          </div>
        </div>
        <div className="w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform"></div>
        <div className="w-96 h-full bg-yellow-200 bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform"></div>
      </div>
    </>
  );
};

export default NotfoundPage;
