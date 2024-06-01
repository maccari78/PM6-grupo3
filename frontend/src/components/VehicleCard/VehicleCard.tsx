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
}) => {
  return (
    <div className="flex flex-col items-center h-[400px] min-h-[100px]  w-[350px]  mb-5 bg-[#222222] rounded-xl shadow-xl">
      <div className="h-[196px] w-full">
        <img
          src={carImg}
          alt="You Drive car"
          className="rounded-t-xl h-full w-full"
        />
      </div>
      <div className="w-[85%] h-[152px] items-center  mt-4">
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
          <p className="text-gray-300 text-sm ">{description}</p>
        </div>

        <div className="flex w-full justify-between items-center mt-5">
          <span className="bg-[#b0d63f]  text-[#222222] font-semibold  text-sm  me-2 px-2.5 py-0.5 rounded ">
            Km: {carMileage}
          </span>

          <Link href={`/vehicle/${id}`}>
            <button className="relative px-8 py-1 rounded-md text-[#222222] bg-gray-300 isolation-auto z-10 border-2 border-[#C4FF0D] before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#C4FF0D] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700">
              Ver mas
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
