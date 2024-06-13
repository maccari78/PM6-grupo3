"use Client";

import { SetStateAction, useEffect, useState } from "react";

const Pagination = ({
  setCurrentPage,
  currentPage,
  nPages,
}: {
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  currentPage: number;
  nPages: number;
}) => {
  const [nPagesArr, setNpagesArr] = useState<string[]>();

  const next = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  const previus = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const pageSelect = (page: string) => {
    const newPage = parseInt(page);
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const convertArray = () => {
      const nPagesNum = nPages;
      const nPagesArray = [];

      for (let i = 1; i <= nPagesNum!; i++) {
        nPagesArray.push(i.toString());
      }

      setNpagesArr(nPagesArray);
    };

    convertArray();
  }, [nPages]);

  return (
    <div className="border-t-[1px] border-gray-300 py-3 flex flex-row justify-between">
      <div className="flex flex-row">
        <h1>
          Mostrando pagina{" "}
          <strong className="text-[#C4FF0D]">{currentPage}</strong> de{" "}
          <strong className="text-[#C4FF0D]">{nPages}</strong>
        </h1>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <button
              onClick={previus}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-300  border-l-[1px] border-[#C4FF0D] hover:bg-[#222222]  hover:text-[#C4FF0D] duration-300  "
            >
              Anterior
            </button>
          </li>
          {nPagesArr?.map((page) => {
            return (
              <li key={page}>
                <button
                  onClick={() => pageSelect(page)}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-300   hover:text-[#C4FF0D] duration-300"
                >
                  {page}
                </button>
              </li>
            );
          })}
          <li>
            <button
              onClick={next}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-300  border-r-[1px] border-[#C4FF0D] hover:bg-[#222222]  hover:text-[#C4FF0D] duration-300"
            >
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
