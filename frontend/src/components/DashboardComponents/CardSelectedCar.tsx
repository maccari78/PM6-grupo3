import React from "react";

const CardSelectedCar = () => {
  return (
    <>
      <div>
        <div className="flex flex-col shadow-md cursor-pointer w-96 hover:-translate-y-1 duration-300">
          <div className="inline relative group h-48">
            <img
              className="absolute rounded-t object-cover h-full w-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7afpdN0xanIc94pkQyf-REbWzljaGT3ccnA&s"
              alt="Product Preview"
            />

            <div
              className="flex flex-row absolute justify-end
                    h-16 w-full bottom-0 px-3 space-x-2
                    bg-none opacity-0 group-hover:opacity-100
                    group-hover:bg-gradient-to-t from-black/20 via-gray-800/20 to-transparent 
                    transition-all ease-in-out duration-200 delay-100"
            >
            </div>
          </div>

          <div className="flex flex-col bg-white rounded-b p-3">
            <div className="text-sm font-semibold text-gray-900 hover:underline truncate">
              Awesome Fantastic Super Uber Harika Merveilleux Pro Ultra Max Plus
              Plus Makeup Stuff
            </div>

            <div className="text-xxs text-gray-400 truncate mt-1">
              by
              <a className="font-semibold hover:underline"> EgoistDeveloper </a>
              in
              <a className="font-semibold hover:underline"> e-commerce </a>
            </div>

            <div className="text-sm text-gray-600 font-bold mt-4 mb-1">$23</div>

            <div className="flex flex-row mt-2">
              <div className="flex flex-row flex-auto justify-center">
                <a
                  className="flex text-xs border px-3 my-auto py-2 
                        border-amber-500 group hover:bg-amber-500 
                        rounded-xss
                        transition-all duration-200"
                >
                  <i
                    className="mdi mdi-eye-outline text-amber-700
                            group-hover:text-white delay-100"
                  ></i>

                  <div
                    className="text-xxs text-amber-700 font-semibold ml-2
                            group-hover:text-white delay-100"
                  >
                    Ver publicacion
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardSelectedCar;
