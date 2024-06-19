"use client";
import { useEffect, useState } from "react";
import { ICar } from "./interfaces/ICar";
import Link from "next/link";

const VehicleCard: React.FC<ICar> = ({
  id,
  carId,
  description,
  carImg,
  carBrand,
  carModel,
  carYear,
  carMileage,
  carPrice,
  carAvailability,
}) => {
  const [descriptionReduce, setDescriptionReduce] = useState<
    string | undefined
  >();
  const [loadingOn, setLoadingOn] = useState<boolean>(false);

  useEffect(() => {
    const descriptionCharacters = () => {
      const descriptionLenght = description;
      const reduceDescription = `${descriptionLenght?.slice(0, 70)}...`;
      setDescriptionReduce(reduceDescription);
    };

    descriptionCharacters();
  }, []);

  const handleOnClick = () => {
    setLoadingOn(true);
  };

  return (
    <div className="flex flex-col items-center h-[400px] min-h-[100px]  w-[350px]  mb-5 bg-[#222222] rounded-xl shadow-xl md:mr-4">
      <div
        className=" flex h-[196px]  bg-cover rounded-t-xl items-start  w-full"
        style={{ backgroundImage: `url(${carImg![0]})` }}
      >
        {carAvailability ? (
          <span className="flex flex-row rounded-tl-xl justify-evenly items-center  w-[110px]   bg-[#222222] md:pr-2.5 md:py-0.5  ">
            <span className="flex w-3 h-3  bg-[#C4FF0D] rounded-full"></span>
            <p className="text-gray-200 font-semibold  text-[12px] ">
              Disponible
            </p>
          </span>
        ) : (
          <span className="flex flex-row justify-evenly rounded-tl-xl items-center   bg-[#222222] w-[120px]  md:pr-2.5 md:py-0.5  ">
            <span className="flex w-3 h-3  bg-red-800 rounded-full"></span>
            <p className="text-gray-200 font-semibold  text-[12px]">
              No disponible
            </p>
          </span>
        )}
      </div>
      <div className="w-[85%] h-[152px] items-center   mt-4">
        <div className="flex  justify-between h-[full] w-full">
          <h1 className="text-xl font-semibold  text-gray-300">
            {carBrand} {carModel} {carYear}
          </h1>
          <p className="text-xl text-gray-300">
            <strong className="text-[#C4FF0D]">$</strong>
            {carPrice}
          </p>
        </div>

        <div className="flex w-full justify-start  mt-5">
          <p className="text-gray-300 text-[13px]">
            {description?.length && description?.length > 70 ? descriptionReduce : description}
          </p>
        </div>

        <div className="flex w-full justify-between items-center mt-5">
          <span className="bg-[#b0d63f]  text-[#222222] font-semibold  text-[12px]  me-2 px-2.5 py-0.5 rounded ">
            Km: {carMileage}
          </span>
          <div className="flex h-[40px]">
            <Link href={`/vehicle/${id}`}>
              {loadingOn ? (
                <button
                  onClick={handleOnClick}
                  className="flex flex-row gap-1 font-semibold items-center justify-center relative h-full px-8 py-1 rounded-md text-[#222222] bg-gray-300 isolation-auto z-10 border-2 border-[#C4FF0D] before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#C4FF0D] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
                >
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
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
                </button>
              ) : (
                <button
                  onClick={handleOnClick}
                  className="flex flex-row gap-1 font-semibold items-center justify-center relative h-full px-8 py-1 rounded-md text-[#222222] bg-gray-300 isolation-auto z-10 border-2 border-[#C4FF0D] before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#C4FF0D] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
                >
                  Ver
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 fill-[#c3ff0d61] stroke-current"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M7 10l6 0" />
                    <path d="M10 7l0 6" />
                    <path d="M21 21l-6 -6" />
                  </svg>
                </button>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
