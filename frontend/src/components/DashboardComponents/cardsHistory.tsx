import React from "react";

const CardsHistory = () => {
  return (
    <>
      <article className="bg-white  p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer border">
        <a
          target="_self"
          href="/blog/slug"
          className="absolute opacity-0 top-0 right-0 left-0 bottom-0"
        ></a>
        <div className="relative mb-4 rounded-2xl">
          <img
            className="max-h-80 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
            src="https://cdn.motor1.com/images/mgl/LQgOR/s1/lanzamiento-ford-f-150-raptor.webp"
            alt=""
          />
        

          <a
            className="flex justify-center items-center bg-red-700 bg-opacity-80 z-10 absolute top-0 left-0 w-full h-full text-white rounded-2xl opacity-0 transition-all duration-300 transform group-hover:scale-105 text-xl group-hover:opacity-100"
            href="/blog/slug"
            target="_self"
            rel="noopener noreferrer"
          >
            Ver publicacion
            <svg
              className="ml-2 w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              ></path>
            </svg>
          </a>
        </div>
        <div className="flex justify-between items-center w-full pb-4 mb-auto">
          <div className="flex items-center">
            <div className="pr-3">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src="https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg"
                alt=""
              />
            </div>
            <div className="flex flex-1">
              <div className="">
                <p className="text-sm font-semibold ">Morris Muthigani</p>
                <p className="text-sm text-gray-500">19/03/2024</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="text-sm flex items-center text-gray-500 ">
              2 Days ago
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <h3 className="font-medium text-xl leading-8">
          <a
            href="/blog/slug"
            className="block relative group-hover:text-red-700 transition-colors duration-200 "
          >
            Instant Help at Your Fingertips
          </a>
        </h3>
      </article>
    </>
  );
};

export default CardsHistory;
