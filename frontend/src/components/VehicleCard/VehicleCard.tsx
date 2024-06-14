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

  useEffect(() => {
    const descriptionCharacters = () => {
      const descriptionLenght = description;
      const reduceDescription = `${descriptionLenght.slice(0, 80)}...`;
      setDescriptionReduce(reduceDescription);
    };

    descriptionCharacters();
  }, []);

  return (
    <div className="flex flex-col items-center h-[400px] min-h-[100px]  w-[350px]  mb-5 bg-[#222222] rounded-xl shadow-xl md:mr-4">
      <div className="h-[196px] w-full">
        <img
          src={carImg[0]}
          alt="You Drive car"
          className="rounded-t-xl h-full w-full"
        />
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
          <p className="text-gray-300 text-sm ">
            {description.length > 80 ? descriptionReduce : description}
          </p>
        </div>

        <div className="flex w-full justify-between items-center mt-5">
          <span className="bg-[#b0d63f]  text-[#222222] font-semibold  text-[12px]  me-2 px-2.5 py-0.5 rounded ">
            Km: {carMileage}
          </span>
          <div className="flex h-[40px]">
            <Link href={`/vehicle/${id}`}>
              <button className="flex flex-row gap-1 font-semibold items-center justify-center relative h-full px-8 py-1 rounded-md text-[#222222] bg-gray-300 isolation-auto z-10 border-2 border-[#C4FF0D] before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#C4FF0D] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700">
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
            </Link>
          </div>
        </div>
        <div className="mt-2">
          {carAvailability ? (
            <span className="flex flex-row gap-2 items-center  border-[#454645] border-[1px] w-[110px] me-2  md:px-2.5 md:py-0.5 rounded ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3 w-3 fill-[#C4FF0D]"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 3.34a10 10 0 1 1 -4.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 4.995 -8.336z" />
              </svg>
              <p className="text-gray-300 font-semibold  text-[11px] ">
                Disponible
              </p>
            </span>
          ) : (
            <span className="flex flex-row justify-evenly items-center  border-[#454645] border-[1px] w-[100px] me-2  md:px-2.5 md:py-0.5 rounded ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3 w-3 fill-red-800"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 3.34a10 10 0 1 1 -4.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 4.995 -8.336z" />
              </svg>
              <p className="text-gray-300 font-semibold  text-[11px] ">
                No disponible
              </p>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
