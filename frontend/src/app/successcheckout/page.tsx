import Link from "next/link";

const Success = () => {
  const handleRemoveRent = () => {
    if (window !== undefined && window.localStorage) {
      window.localStorage.removeItem("checkoutPost");
    }
  };

  return (
    <div className="flex flex-col bg-[#444343] min-h-screen items-center">
      <div className="flex flex-col mt-10 gap-3 items-center">
        <h1 className="text-3xl text-[#c3ff0da9]">¡Compra exitosa!</h1>
        <Link href="/">
          {" "}
          <button
            onClick={handleRemoveRent}
            className="text-lg flex flex-row text-gray-300 hover:text-[#c3ff0da9] justify-between items-center px-2 py-2 hover:bg-[#555454] rounded-xl duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l14 0" />
              <path d="M5 12l6 6" />
              <path d="M5 12l6 -6" />
            </svg>
            Volver a la pagina principal
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
