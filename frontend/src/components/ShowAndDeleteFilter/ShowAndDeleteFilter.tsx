interface notShowFilter {
  deleteFilter: () => void;
  filters: any;
}

const ShowAndDeleteFilter: React.FC<notShowFilter> = ({
  deleteFilter,
  filters,
}) => {
  return (
    <div className="flex flex-row justify-around mb-4">
      <span className="bg-[#c9ff25]  flex flex-row justify-between text-gray-800 text-sm md:text-lg font-medium me-2 px-2 py-0.5 rounded-xl">
        <p>{filters.brand && filters.brand}</p>
        <p>{filters.model && filters.model}</p>
        <p>{filters.color && filters.color}</p>
        <p>{filters.mileage && filters.mileage}</p>
        <p>{filters.price && filters.price}</p>

        <button
          className="ml-1  hover:bg-[#d4f574] transition-all rounded-lg"
          onClick={deleteFilter}
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
      </span>{" "}
    </div>
  );
};

export default ShowAndDeleteFilter;
