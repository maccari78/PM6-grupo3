"use client";

import { IPost } from "@/components/VehiclesComponent/interfaces/IPost";
import { useEffect, useState } from "react";

const VehicleDetail = ({ params }: { params: { id: string } }) => {
  const [postState, setPostState] = useState<IPost>();

  useEffect(() => {
    const fetchDta = async () => {
      const post = await fetch(`http://localhost:3001/posts/${params.id}`, {
        method: "GET",
      });
      const data = await post.json();
      setPostState(data);
    };

    fetchDta();
  }, []);

  return (
    <div className="bg-[#444343] flex flex-col items-center md:flex-row  md:items-start justify-evenly min-h-screen">
      <div className="flex flex-col w-[70%] md:w-[40%] justify-between my-5">
        <div className="flex flex-col md:justify-start ">
          <h1 className=" text-lg md:text-3xl font-semibold text-gray-100">
            {postState?.title}
          </h1>
          <div className=" mt-9 ">
            <img
              src="https://acnews.blob.core.windows.net/imgnews/medium/NAZ_918487fd7b3e4c6b8f3eefb369a0853b.webp"
              alt="Ford F-150"
              className="h-auto w-[50%] shadow-xl rounded-t-xl md:rounded-xl"
            />
          </div>
        </div>

        <div className="flex flex-col justify-around h-[350px] max-h-[100%]">
          <div className="flex flex-col  pb-4 border-b-[1px] border-b-gray-200">
            <h1 className="text-lg md:text-2xl font-semibold text-gray-100">
              Descripcion
            </h1>
            <ul className="text-base text-gray-300   mt-2">
              <li className="text-sm md:text-base">{postState?.description}</li>
            </ul>
          </div>
          <div className="flex flex-col  py-4">
            <h1 className="text-xl md:text-2xl text-gray-100 font-semibold ">
              Datos del vehiculo
            </h1>
            <ul className="space-y-1 text-gray-300  list-inside">
              <li className=" flex items-center space-x-3 rtl:space-x-reverse">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#C4FF0D"
                  stroke="#222222"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                  <path d="M8 9h1l3 3l3 -3h1" />
                  <path d="M8 15l2 0" />
                  <path d="M14 15l2 0" />
                  <path d="M9 9l0 6" />
                  <path d="M15 9l0 6" />
                </svg>
                <span className="text-sm md:text-base">
                  Marca:{" "}
                  <span className="font-semibold  text-[#c2e94e]">
                    {postState?.car.brand}
                  </span>
                </span>
              </li>
              <li className=" flex items-center space-x-3 rtl:space-x-reverse">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#C4FF0D"
                  stroke="#222222"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 8h8v8h-8z" />
                  <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                  <path d="M16 16l3.3 3.3" />
                  <path d="M16 8l3.3 -3.3" />
                  <path d="M8 8l-3.3 -3.3" />
                  <path d="M8 16l-3.3 3.3" />
                </svg>
                <span className="text-sm md:text-base">
                  Modelo:{" "}
                  <span className="font-semibold text-[#c2e94e]">
                    {postState?.car.model}
                  </span>
                </span>
              </li>
              <li className=" flex items-center space-x-3 rtl:space-x-reverse">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#C4FF0D"
                  stroke="#222222"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4" />
                  <path d="M18 14v4h4" />
                  <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                  <path d="M15 3v4" />
                  <path d="M7 3v4" />
                  <path d="M3 11h16" />
                </svg>
                <span className="text-sm md:text-base">
                  Año:{" "}
                  <span className="font-semibold text-[#c2e94e]">
                    {postState?.car.year}
                  </span>
                </span>
              </li>
              <li className=" flex items-center space-x-3 rtl:space-x-reverse">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#C4FF0D"
                  stroke="#222222"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 17a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path d="M16 17a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path d="M5 9l2 -4h7.438a2 2 0 0 1 1.94 1.515l.622 2.485h3a2 2 0 0 1 2 2v3" />
                  <path d="M10 9v-4" />
                  <path d="M2 7v4" />
                  <path d="M22.001 14.001a4.992 4.992 0 0 0 -4.001 -2.001a4.992 4.992 0 0 0 -4 2h-3a4.998 4.998 0 0 0 -8.003 .003" />
                  <path d="M5 12v-3h13" />
                </svg>
                <span className="text-sm md:text-base">
                  Kilometraje:{" "}
                  <span className="font-semibold text-[#c2e94e]">
                    {postState?.car.mileage}
                  </span>
                </span>
              </li>
              <li className=" flex items-center space-x-3 rtl:space-x-reverse">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#C4FF0D"
                  stroke="#222222"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" />
                  <path d="M8.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                  <path d="M12.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                  <path d="M16.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                </svg>
                <span className="text-sm md:text-base">
                  Color:{" "}
                  <span className="font-semibold text-[#c2e94e]">
                    {postState?.car.color}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex  flex-col w-[70%] md:w-[30%] justify-between items-center my-5">
        <div className="flex flex-col rounded-t-xl md:w-[295px] w-full h-[200px] items-center justify-center bg-[#222222] px-5 py-5 md:h-[230px]  border-t-[2px] boder-gray-300">
          <div className="flex flex-row items-center ">
            <svg
              className="w-4 h-4  md:w-6  md:h-6 text-[#C4FF0D] "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z" />
            </svg>
            <h1 className="ml-2 md:ml-3 text-base md:text-2xl text-gray-100 font-semibold">
              Propietario
            </h1>
          </div>
          <div className="my-5">
            <ol>
              <li className="text-gray-300 text-sm md:text-base mb-5">
                {postState?.user.name}
              </li>
              <li className="text-gray-300 text-sm md:text-base mb-5">
                {postState?.user.email}
              </li>
            </ol>
          </div>
        </div>

        <div className="flex flex-col rounded-b-xl w-full md:w-[295px] h-[290px] bg-[#222222] px-5 py-5 border-b-[2px]  border-gray-300 items-center ">
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#C4FF0D"
                className="w-4 h-4 md:w-6 md:h-6"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" />
              </svg>
              <h1 className="text-gray-100 text-base md:text-2xl ml-1 font-semibold">
                Ubicacion
              </h1>
            </div>
            <div className="w-[80%] my-3">
              <img
                src="https://img2.freepnges.com/20231226/czo/transparent-icon-map-pinned-location-city-name-nearby-park-map-with-pinned-location-road-sign-and-1710956059592.webp"
                alt="ubicacion vehiculo"
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="flex flex-row items-center">
            <div className="flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#C4FF0D"
                className="w-4 h-4 md:w-6 md:h-6"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.051 6.844a1 1 0 0 0 -1.152 -.663l-.113 .03l-2.684 .895l-2.684 -.895l-.113 -.03a1 1 0 0 0 -.628 1.884l.109 .044l2.316 .771v.976l-1.832 2.75l-.06 .1a1 1 0 0 0 .237 1.21l.1 .076l.101 .06a1 1 0 0 0 1.21 -.237l.076 -.1l1.168 -1.752l1.168 1.752l.07 .093a1 1 0 0 0 1.653 -1.102l-.059 -.1l-1.832 -2.75v-.977l2.316 -.771l.109 -.044a1 1 0 0 0 .524 -1.221zm-3.949 -4.184a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3z" />
              </svg>
              <h1 className="text-gray-100 text-sm md:text-base ml-1 mr-2">
                Disponibilidad:{" "}
              </h1>
            </div>
            {postState?.car.availability ? (
              <span className="bg-[#b0d63f]  text-[#222222] font-semibold  text-[11px] md:text-sm me-2  md:px-2.5 md:py-0.5 rounded ">
                En Stock
              </span>
            ) : (
              <span className="bg-red-800  text-gray-300 font-semibold  text-[11px] md:text-sm me-2  md:px-2.5 md:py-0.5 rounded ">
                Sin Stock
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;
