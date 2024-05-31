const Filters: React.FC = () => {
  return (
    <div className="flex flex-col w-[200px] justify-around items-center bg-[#A29E9E] px-5 py-5 rounded-lg border-solid border-2 border-[#d4e79c]">
      <div className="mb-5 w-[152px] flex flex-col justify-start">
        <h1 className="text-lg text-[#C4FF0D]">Marca</h1>
        <ul>
          <li>
            <a href="" className="text-[#222222]">
              Kia
            </a>
          </li>
          <li>
            <a href="" className="text-[#222222]">
              Chevrolet
            </a>
          </li>
          <li>
            <a href="" className="text-[#222222]">
              Mazda
            </a>
          </li>
          <li>
            <a href="" className="text-[#222222]">
              Ford
            </a>
          </li>
          <li>
            <a href="" className="text-[#222222]">
              Nissan
            </a>
          </li>
        </ul>
      </div>

      <div className="mb-5 w-[152px] flex flex-col justify-start">
        <h1 className="text-[#C4FF0D]">Color</h1>
        <ul>
          <li>
            <div className="flex items-center me-4">
              <input
                id="blue-checkbox"
                type="checkbox"
                value=""
                className=" relative w-4 h-4 rounded-sm appearance-none focus:cursor-pointer focus:outline-none bg-blue-900 checked:bg-blue-700 "
              />
              <label
                htmlFor="green-checkbox"
                className="ms-2 text-base  text-[#222222]"
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
                value=""
                className="relative w-4 h-4 rounded-sm appearance-none focus:cursor-pointer focus:outline-none bg-green-900 checked:bg-green-700 "
              />
              <label
                htmlFor="green-checkbox"
                className="ms-2 text-base text-[#222222]"
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
                value=""
                className="relative w-4 h-4 rounded-sm appearance-none focus:cursor-pointer focus:outline-none bg-gray-800 checked:bg-gray-900 "
              />
              <label
                htmlFor="black-checkbox"
                className="ms-2 text-base  text-[#222222]"
              >
                Negro
              </label>
            </div>
          </li>
          <li>
            <div className="flex items-center me-4">
              <input
                id="blanco-checkbox"
                type="checkbox"
                value=""
                className="relative w-4 h-4 rounded-sm appearance-none focus:cursor-pointer focus:outline-none bg-gray-200 checked:bg-gray-50 "
              />
              <label
                htmlFor="black-checkbox"
                className="ms-2 text-base  text-[#222222]"
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
                value=""
                className="relative w-4 h-4 rounded-sm appearance-none focus:cursor-pointer focus:outline-none bg-red-900 checked:bg-red-700 "
              />
              <label
                htmlFor="red-checkbox"
                className="ms-2 text-base  text-[#222222]"
              >
                Rojo
              </label>
            </div>
          </li>
        </ul>
      </div>

      <div className="mb-5 w-[152px] flex flex-col justify-start">
        <h1 className="text-lg text-[#C4FF0D]">Tipo</h1>
        <ul>
          <li>
            <a href="" className="text-[#222222]">
              4*4
            </a>
          </li>
          <li>
            {" "}
            <a href="" className="text-[#222222]">
              SUV
            </a>
          </li>
          <li>
            {" "}
            <a href="" className="text-[#222222]">
              Sedan
            </a>
          </li>
          <li>
            {" "}
            <a href="" className="text-[#222222]">
              Deportivos
            </a>
          </li>
          <li>
            {" "}
            <a href="" className="text-[#222222]">
              Camionetas
            </a>
          </li>
        </ul>
      </div>

      <div className="mb-5 w-[152px] flex flex-col justify-start">
        <h1 className="text-lg text-[#C4FF0D]">Precio</h1>
        <ul>
          <li>
            <a href="" className="text-[#222222] text-sm">
              $1.000.000-$1.500.000
            </a>
          </li>
          <li>
            {" "}
            <a href="" className="text-[#222222] text-sm">
              Hasta $ 2.000.0000
            </a>
          </li>
          <li>
            {" "}
            <a href="" className="text-[#222222] text-sm">
              Menos de $ 1.000.000
            </a>
          </li>
          <li>
            {" "}
            <a href="" className="text-[#222222] text-sm">
              Mas de $ 1.300.000
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filters;
