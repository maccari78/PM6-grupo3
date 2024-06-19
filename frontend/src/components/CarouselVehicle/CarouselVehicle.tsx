import { useState } from "react";
import { BiSolidChevronRight, BiSolidChevronLeft } from "react-icons/bi";
import "./animate.css";

interface Props {
  imgs: string[] | undefined;
}

const CarouselVehicle = ({ imgs }: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? imgs!.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === imgs!.length ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel w-[80%]  rounded-xl relative flex flex-col">
      <div className="carousel-images">
        {imgs?.map((img, index) => (
          <img
            key={index}
            src={img}
            className={`w-full aspect-video transition-opacity rounded-2xl duration-300 ease-in-out ${
              currentIndex === index ? "active" : "inactive"
            }`}
          />
        ))}
      </div>
      <div>
        <button
          className="left-btn absolute top-1/2 transform -translate-y-3/4 text-lg border-0 bg-[#222222] bg-opacity-80 text-[#C4FF0D] p-4 flex justify-center items-center cursor-pointer hover:bg-opacity-100 left-0"
          onClick={handlePrevious}
        >
          <BiSolidChevronLeft />
        </button>
        <button
          className="right-btn absolute top-1/2 transform -translate-y-3/4 text-lg border-0 bg-[#222222] bg-opacity-80 text-[#C4FF0D] p-4 flex justify-center items-center cursor-pointer hover:bg-opacity-100 right-0"
          onClick={handleNext}
        >
          <BiSolidChevronRight />
        </button>
      </div>
      <div className="flex self-center gap-2 my-4 ">
        {imgs?.map((_, index) => (
          <div
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CarouselVehicle;
