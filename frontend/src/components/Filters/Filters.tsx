import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { IFilter } from "../ShowAndDeleteFilter/ShowAndDeleteFilter";

export interface FiltersProps {
  (filters: any): void;
}

const Filters: React.FC<{
  onFilterChange: FiltersProps;
  filters: IFilter | null;
}> = ({ onFilterChange, filters }) => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMileage, setSelectedMileage] = useState<string | null>(null);
  const [optionsBrand, setOptionsBrand] = useState<boolean>(false);
  const [optionsModel, setOptionsModel] = useState<boolean>(false);

  useEffect(() => {
    setSelectedBrand(filters?.selectedBrand!);
    setSelectedModel(filters?.selectedModel!);
    setSelectedColors(filters?.selectedColors! || []);
    setSelectedMileage(filters?.selectedMileage!);
  }, [filters]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    onFilterChange({
      selectedModel,
      selectedColors,
      selectedMileage,
      selectedBrand: brand,
    });
  };

  const handleColorChange = (color: string) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [color];
    setSelectedColors(newColors);
    onFilterChange({
      selectedColors: newColors,
      selectedModel,
      selectedMileage,
      selectedBrand,
    });
  };

  const handleMileageChange = (mileage: string) => {
    setSelectedMileage(mileage);
    onFilterChange({
      selectedMileage: mileage,
      selectedBrand,
      selectedColors,
      selectedModel,
    });
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    onFilterChange({
      selectedModel: model,
      selectedMileage,
      selectedBrand,
      selectedColors,
    });
  };

  const handleOptionsBrandShow = () => {
    setOptionsBrand(!optionsBrand);
  };

  const handleOptionsModelShow = () => {
    setOptionsModel(!optionsModel);
  };

  return (
    <div className="flex flex-col w-[230px] mb-5 md:mb-0 md:w-[235px] justify-around items-center bg-[#A29E9E] px-4 py-5 rounded-lg border-solid border-2 border-[#d4e79c]">
      <div className="mb-5 w-full flex flex-col justify-start">
        <h1 className="text-lg text-[#C4FF0D]">Marca</h1>
        <ul>
          {["Kia", "Chevrolet", "Mazda", "Ford", "Toyota"].map((brand) => (
            <li key={brand}>
              <button
                onClick={() => handleBrandChange(brand)}
                className="text-[#222222] text-sm md:text-base  w-full flex justify-start rounded-xl hover:px-2 hover:translate-x-1 hover:bg-[#c3ff0dad] duration-300"
              >
                {brand}
              </button>
            </li>
          ))}
          <button
            onClick={handleOptionsBrandShow}
            className="mt-2 flex flex-row gap-2 text-sm items-center bg-[#b1dd2e] text-[#222222] rounded-xl px-3 py-1 hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#c3ff0d92] hover:cursor-pointer"
          >
            Ver otras
            <FaArrowDown className="w-3 h-3 text-[#222222]" />
          </button>
        </ul>
        <ul className="bg-[#222222] mt-[200px]  w-[200px] overflow-y-auto max-h-60 rounded-xl absolute z-40 ">
          {optionsBrand &&
            [
              "Ferrari",
              "Honda",
              "Volkswagen",
              "Audi",
              "Jeep",
              "Mercedes-Benz",
              "Fiat",
              "Renault",
              "Nissan",
              "Peugeot",
              "BMW",
            ].map((optionBrand) => {
              return (
                <li key={optionBrand}>
                  <button
                    onClick={() => handleBrandChange(optionBrand)}
                    className="text-[#c3ff0dad] text-sm  px-3 py-2  w-full flex justify-start   hover:bg-black duration-300"
                  >
                    {optionBrand}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>

      <div className="mb-5 w-full flex flex-col justify-start">
        <h1 className="text-lg text-[#C4FF0D]">Modelo</h1>
        <ul>
          {["F-150", "Sorento", "Camaro", "Picanto", "Focus"].map((model) => (
            <li key={model} className="flex justify-start">
              <button
                onClick={() => handleModelChange(model)}
                className="text-[#222222] text-sm md:text-base w-full flex justify-start rounded-xl hover:px-2 hover:translate-x-1 hover:bg-[#c3ff0dad] duration-300"
              >
                {model}
              </button>
            </li>
          ))}
          <button
            onClick={handleOptionsModelShow}
            className="mt-2 flex flex-row gap-2 text-sm items-center bg-[#b1dd2e] text-[#222222] rounded-xl px-3 py-1 hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#c3ff0d92] hover:cursor-pointer"
          >
            Ver otras
            <FaArrowDown className="w-3 h-3 text-[#222222]" />
          </button>
        </ul>
        <ul className="bg-[#222222] mt-[200px]  w-[200px] overflow-y-auto max-h-60 rounded-xl  z-40 absolute ">
          {optionsModel &&
            [
              "Stradale",
              "A3",
              "Compas",
              "Corolla",
              "Golf",
              "Fiesta",
              "Territory",
            ].map((optionModel) => {
              return (
                <li key={optionModel}>
                  <button
                    onClick={() => handleModelChange(optionModel)}
                    className="text-[#c3ff0dad] text-sm  px-3 py-2  w-full flex justify-start   hover:bg-black duration-300"
                  >
                    {optionModel}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>

      <div className="mb-5 w-full flex flex-col justify-start">
        <h1 className="text-[#C4FF0D]">Color</h1>
        <ul>
          <li>
            <div className="inline-flex items-center">
              <label
                className="relative flex cursor-pointer items-center rounded-full py-2"
                htmlFor="checkbox-8"
                data-ripple-dark="true"
              >
                <input
                  type="checkbox"
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                  id="checkbox-8"
                  checked={selectedColors.includes("Azul")}
                  onChange={() => handleColorChange("Azul")}
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </label>
              <h1 className="ms-2 text-sm md:text-base  text-[#222222]">
                Azul
              </h1>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <label
                className="relative flex cursor-pointer items-center rounded-full py-2"
                htmlFor="checkbox-3"
                data-ripple-dark="true"
              >
                <input
                  type="checkbox"
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                  id="checkbox-3"
                  checked={selectedColors.includes("Verde")}
                  onChange={() => handleColorChange("Verde")}
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </label>
              <h1 className="ms-2 text-sm md:text-base  text-[#222222]">
                Verde
              </h1>
            </div>
          </li>
          <li>
            <div className="inline-flex items-center">
              <label
                className="relative flex cursor-pointer items-center rounded-full py-2"
                htmlFor="checkbox-8"
                data-ripple-dark="true"
              >
                <input
                  type="checkbox"
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-black checked:bg-black checked:before:bg-black hover:before:opacity-10"
                  id="checkbox-8"
                  checked={selectedColors.includes("Negro")}
                  onChange={() => handleColorChange("Negro")}
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </label>
              <h1 className="ms-2 text-sm md:text-base  text-[#222222]">
                Negro
              </h1>
            </div>
          </li>
          <li>
            <div className="inline-flex items-center">
              <label
                className="relative flex cursor-pointer items-center rounded-full py-2"
                htmlFor="checkbox-8"
                data-ripple-dark="true"
              >
                <input
                  type="checkbox"
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-white checked:bg-white checked:before:bg-white hover:before:opacity-10"
                  id="checkbox-8"
                  checked={selectedColors.includes("Blanco")}
                  onChange={() => handleColorChange("Blanco")}
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 fill-black stroke-black"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </label>
              <h1 className="ms-2 text-sm md:text-base  text-[#222222]">
                Blanco
              </h1>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <label
                className="relative flex cursor-pointer items-center rounded-full py-2"
                htmlFor="checkbox-2"
                data-ripple-dark="true"
              >
                <input
                  type="checkbox"
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  id="checkbox-2"
                  checked={selectedColors.includes("Rojo")}
                  onChange={() => handleColorChange("Rojo")}
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </label>
              <h1 className="ms-2 text-sm md:text-base text-[#222222]">Rojo</h1>
            </div>
          </li>
        </ul>
      </div>

      <div className="mb-5 w-full flex flex-col justify-start">
        <h1 className="text-lg text-[#C4FF0D]">Kilometraje</h1>
        <ul className="flex flex-col justify-start">
          <li className="flex justify-start items-start">
            <button
              onClick={() => handleMileageChange("Menos de 50.000km")}
              className="text-[#222222] text-sm md:text-base  w-full flex justify-start rounded-xl hover:px-2 hover:translate-x-1 hover:bg-[#C4FF0D] duration-300"
            >
              Menos de 50.000Km
            </button>
          </li>
          <li className="flex justify-start items-start">
            <button
              onClick={() => handleMileageChange("50.000km - 100.000km")}
              className="text-[#222222] text-sm md:text-base  w-full flex justify-start rounded-xl hover:px-2 hover:translate-x-1 hover:bg-[#c3ff0dad] duration-300"
            >
              50.000Km-100.000Km
            </button>
          </li>
          <li className="flex justify-start items-start">
            <button
              onClick={() => handleMileageChange("100.000km - 150.000km")}
              className="text-[#222222] text-sm md:text-base  w-full flex justify-start rounded-xl hover:px-2 hover:translate-x-1 hover:bg-[#c3ff0dad] duration-300"
            >
              100.000Km-150.000Km
            </button>
          </li>
          <li className="flex justify-start items-start">
            <button
              onClick={() => handleMileageChange("Más de 150.000km")}
              className="text-[#222222] text-sm md:text-base  w-full flex justify-start rounded-xl hover:px-2 hover:translate-x-1 hover:bg-[#c3ff0dad] duration-300"
            >
              Mas de 150.000Km
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filters;
