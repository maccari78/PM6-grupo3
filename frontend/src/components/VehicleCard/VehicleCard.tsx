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
      const reduceDescription = `${descriptionLenght.slice(0, 70)}...`;
      setDescriptionReduce(reduceDescription);
    };

    descriptionCharacters();
  }, []);

  return (
    <div className="flex flex-col items-center h-[400px] min-h-[100px]  w-[350px]  mb-5 bg-[#222222] rounded-xl shadow-xl md:mr-4">
      <div
        className=" flex h-[196px]  bg-cover rounded-t-xl items-start  w-full"
        style={{ backgroundImage: `url(${carImg[0]})` }}
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
            {description.length > 70 ? descriptionReduce : description}
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
      </div>
    </div>
  );
};

export default VehicleCard;
