import { useState } from "react";
import { FiltersProps } from "./interface/IFilterProps";

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMileage, setSelectedMileage] = useState<string | null>(null);

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    onFilterChange({
      brand,
    });
  };

  const handleColorChange = (color: string) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [color];
    setSelectedColors(newColors);
    onFilterChange({
      color: newColors,
    });
  };

  const handleMileageChange = (mileage: string) => {
    setSelectedMileage(mileage);
    onFilterChange({
      mileage,
    });
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    onFilterChange({
      model,
    });
  };

  return (
    <div className="flex flex-col w-[230px] mb-5 md:mb-0 md:w-[235px] justify-around items-center bg-[#A29E9E] px-4 py-5 rounded-lg border-solid border-2 border-[#d4e79c]">
      <div className="mb-5 w-full flex flex-col justify-start">
        <h1 className="text-lg text-[#C4FF0D]">Marca</h1>
        <ul>
          {["Kia", "Chevrolet", "Mazda", "Ford", "Ferrari"].map((brand) => (
            <li key={brand}>
              <button
                onClick={() => handleBrandChange(brand)}
                className="text-[#222222] text-sm md:text-base  w-full flex justify-start rounded-xl hover:px-2 hover:translate-x-1 hover:bg-[#c3ff0dad] duration-300"
              >
                {brand}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-5 w-full flex flex-col justify-start">
        <h1 className="text-lg text-[#C4FF0D]">Modelo</h1>
        <ul>
          {["F-150", "Sorento", "Camaro", "Stradale", "Picanto"].map(
            (model) => (
              <li key={model} className="flex justify-start">
                <button
                  onClick={() => handleModelChange(model)}
                  className="text-[#222222] text-sm md:text-base w-full flex justify-start rounded-xl hover:px-2 hover:translate-x-1 hover:bg-[#c3ff0dad] duration-300"
                >
                  {model}
                </button>
              </li>
            )
          )}
        </ul>
      </div>

      <div className="mb-5 w-full flex flex-col justify-start">
        <h1 className="text-[#C4FF0D]">Color</h1>
        <ul>
          <li>
            <div className="flex items-center me-4">
              <input
                id="blue-checkbox"
                type="checkbox"
                value="Azul"
                checked={selectedColors.includes("Azul")}
                onChange={() => handleColorChange("Azul")}
                className=" relative w-4 h-4 rounded-sm appearance-none focus:cursor-pointer focus:outline-none bg-blue-900 checked:bg-blue-700 "
              />
              <label
                htmlFor="blue-checkbox"
                className="ms-2 text-sm md:text-base  text-[#222222]"
              >
                Azul
              </label>
            </div>
          </li>
          <li>
            <div className="flex items-center me-4">
              <input
                id="green-checkbox"
                type="checkbox"
                value="Verde"
                checked={selectedColors.includes("Verde")}
                onChange={() => handleColorChange("Verde")}
                className="relative w-4 h-4 rounded-sm appearance-none focus:cursor-pointer focus:outline-none bg-green-900 checked:bg-green-700 "
              />
              <label
                htmlFor="green-checkbox"
                className="ms-2 text-sm md:text-base text-[#222222]"
              >
                Verde
              </label>
            </div>
          </li>
          <li>
            <div className="flex items-center me-4">
              <input
                id="black-checkbox"
                type="checkbox"
                value="Negro"
                checked={selectedColors.includes("Negro")}
                onChange={() => handleColorChange("Negro")}
                className="relative w-4 h-4 rounded-sm appearance-none focus:cursor-pointer focus:outline-none bg-gray-800 checked:bg-gray-900 "
              />
              <label
                htmlFor="black-checkbox"
                className="ms-2 text-sm md:text-base  text-[#222222]"
              >
                Negro
              </label>
            </div>
          </li>
          <li>
            <div className="flex items-center me-4">
              <input
                id="white-checkbox"
                type="checkbox"
                value="Blanco"
                checked={selectedColors.includes("Blanco")}
                onChange={() => handleColorChange("Blanco")}
                className="relative w-4 h-4 rounded-sm appearance-none focus:cursor-pointer focus:outline-none bg-gray-200 checked:bg-gray-50 "
              />
              <label
                htmlFor="black-checkbox"
                className="ms-2 text-sm md:text-base text-[#222222]"
              >
                Blanco
              </label>
            </div>
          </li>
          <li>
            <div className="flex items-center me-4">
              <input
                id="red-checkbox"
                type="checkbox"
                value="Rojo"
                checked={selectedColors.includes("Rojo")}
                onChange={() => handleColorChange("Rojo")}
                className="relative w-4 h-4 rounded-sm appearance-none focus:cursor-pointer focus:outline-none bg-red-900 checked:bg-red-700 "
              />
              <label
                htmlFor="red-checkbox"
                className="ms-2 text-sm md:text-base  text-[#222222]"
              >
                Rojo
              </label>
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
              onClick={() => handleMileageChange("Mas de 150.000km")}
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
