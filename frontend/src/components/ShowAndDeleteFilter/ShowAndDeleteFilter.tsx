export interface IFilter {
  selectedModel: string | null;
  selectedBrand: string | null;
  selectedColors: string[] | null;
  selectedMileage: string | null;
}

interface ShowAndDeleteFilterProps {
  deleteFilter: (filterType: keyof IFilter, value?: string) => void;
  filters: IFilter;
}

const ShowAndDeleteFilter: React.FC<ShowAndDeleteFilterProps> = ({
  deleteFilter,
  filters,
}) => {
  return (
    <div className="flex flex-row gap-3 justify-center mb-4">
      {filters.selectedBrand && (
        <span className="bg-[#c9ff25]  flex flex-row justify-between text-gray-800 text-sm md:text-lg font-medium me-2 px-2 py-0.5 rounded-xl">
          <p>{filters?.selectedBrand}</p>

          <button
            className="ml-1  hover:bg-[#d4f574] transition-all rounded-lg"
            onClick={() => deleteFilter("selectedBrand")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </span>
      )}

      {filters?.selectedColors &&
        filters?.selectedColors.map((color) => {
          return (
            <span
              key={color}
              className="bg-[#c9ff25]  flex flex-row justify-between text-gray-800 text-sm md:text-lg font-medium me-2 px-2 py-0.5 rounded-xl"
            >
              <p>{color}</p>

              <button
                className="ml-1  hover:bg-[#d4f574] transition-all rounded-lg"
                onClick={() => deleteFilter("selectedColors", color)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18 6l-12 12" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            </span>
          );
        })}

      {filters?.selectedMileage && (
        <span className="bg-[#c9ff25]  flex flex-row justify-between text-gray-800 text-sm md:text-lg font-medium me-2 px-2 py-0.5 rounded-xl">
          <p>{filters.selectedMileage}</p>

          <button
            className="ml-1  hover:bg-[#d4f574] transition-all rounded-lg"
            onClick={() => deleteFilter("selectedMileage")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </span>
      )}

      {filters?.selectedModel && (
        <span className="bg-[#c9ff25]  flex flex-row justify-between text-gray-800 text-sm md:text-lg font-medium me-2 px-2 py-0.5 rounded-xl">
          <p>{filters.selectedModel}</p>

          <button
            className="ml-1  hover:bg-[#d4f574] transition-all rounded-lg"
            onClick={() => deleteFilter("selectedModel")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </span>
      )}
    </div>
  );
};

export default ShowAndDeleteFilter;
