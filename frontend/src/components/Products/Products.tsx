const Products = () => {
  return (
    <div className="flex flex-row my-10 mx-10 ">
      <div className="flex flex-col justify-between bg-[#A29E9E] px-5 py-5 rounded-lg border-double border-4 border-[#d4e79c]">
        <div className="mb-10">
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

        <div className="mb-10">
          <h1 className="text-[#C4FF0D]">Color</h1>
          <ul>
            <li>
              <div className="flex items-center me-4">
                <input
                  id="blue-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  focus:ring-blue-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="green-checkbox"
                  className="ms-2 text-sm font-medium text-[#222222] dark:text-gray-300"
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
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded  focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="green-checkbox"
                  className="ms-2 text-sm font-medium text-[#222222] dark:text-gray-300"
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
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded  focus:ring-black dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="black-checkbox"
                  className="ms-2 text-sm font-medium text-[#222222] dark:text-gray-300"
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
                  className="w-4 h-4 text-gray-400 bg-gray-100 border-gray-300 rounded  focus:ring-white dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="black-checkbox"
                  className="ms-2 text-sm font-medium text-[#222222] dark:text-gray-300"
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
                  className="w-4 h-4 text-red-800 bg-gray-100 border-gray-300 rounded  focus:ring-red-800 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="red-checkbox"
                  className="ms-2 text-sm font-medium text-[#222222] dark:text-gray-300"
                >
                  Rojo
                </label>
              </div>
            </li>
          </ul>
        </div>

        <div className="mb-10">
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
                Camiones
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Products;
