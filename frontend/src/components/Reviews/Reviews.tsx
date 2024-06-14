"use client";

import { useState } from "react";

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex flex-col items-center  bg-[#444343]">
      <div className="py-6 px-10 bg-[#C4FF0D] rounded-2xl">
        <h1 className="text-2xl font-semibold text-[#222222]">Reseñas</h1>
      </div>
      <div className="flex flex-row w-[80%]  justify-between my-10">

        <div className="flex flex-col w-[40%] gap-5">
          <div className="w-full flex flex-row gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 fill-[#c2e94e]"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 3a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-4.724l-4.762 2.857a1 1 0 0 1 -1.508 -.743l-.006 -.114v-2h-1a4 4 0 0 1 -3.995 -3.8l-.005 -.2v-8a4 4 0 0 1 4 -4zm-4 9h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2m2 -4h-8a1 1 0 1 0 0 2h8a1 1 0 0 0 0 -2" />
            </svg>
            <h1 className="text-xl font-semibold text-gray-300">
              Deja tu reseña
            </h1>
          </div>
          <form className="flex flex-col gap-7">
            <div className="flex flex-col">
              <h1 className="text-[#c2e94e]">¿Cuanta calificacion le das?</h1>
              <div className="flex flex-row items-center">
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;

                  return (
                    <label key={index} className="mx-[2px]">
                      <input
                        className="hidden"
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                      />
                      <svg
                        className="cursor-pointer w-5 h-5 duration-100"
                        viewBox="0 0 24 24"
                        fill={
                          ratingValue <= (hover || rating)
                            ? "#ffc107"
                            : "#e4e5e9"
                        }
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    </label>
                  );
                })}
                <p className="ml-3 text-sm text-gray-400">
                  <strong className="text-yellow-300">{rating}</strong> de{" "}
                  <strong className="text-yellow-300">{5}</strong> estrellas
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <textarea
                id="message"
                className=" resize-y h-[90px]  w-[70%] text-sm text-gray-300 bg-transparent  outline-none  placeholder-gray-300 border-b-[1px] focus:border-b-[1px] focus:border-b-[#C4FF0D]"
                placeholder="Escribe una reseña aqui..."
              ></textarea>
              <button className="w-[90px] h-[40px] text-sm font-medium text-gray-300 hover:text-[#222222] hover:font-medium bg-[#222222] cursor-pointer rounded-3xl border-2 border-[#c2e94e] shadow-[inset_0px_-2px_0px_1px_#c2e94e] group hover:bg-[#c2e94e] transition duration-300 ease-in-out">
                Enviar
              </button>
            </div>
          </form>
        </div>


        <div className="flex flex-col w-[50%]">
          <article>
            <div className="flex items-center mb-4">
              <img
                className="w-10 h-10 me-4 rounded-full"
                src="/docs/images/people/profile-picture-5.jpg"
                alt=""
              />
              <div className=" dark:text-white">
                <p className="text-gray-200 text-lg font-semibold">
                  Camilo Sierra
                </p>
                <p className="text-base text-gray-400">
                  Se unio en agosto 2014
                </p>
              </div>
            </div>
            <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-gray-300 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            </div>

            <footer className="mb-5 text-sm text-gray-400">

              <p>Subido en Colombia en marzo 3, 2017</p>
            </footer>
            <p className="mb-2 text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus aut vitae eaque maiores, tenetur fugiat, totam
              dolorum fuga odio soluta, maxime sunt placeat. Accusamus
              perferendis culpa corrupti eius hic ullam!
            </p>
            <aside>
              <div className="flex items-center mt-3">
                <a
                  href="#"
                  className="ps-4 text-sm font-medium text-[#c2e94e] hover:underline  border-gray-200  border-s md:mb-0"
                >
                  Reportar
                </a>
              </div>
            </aside>
          </article>
        </div>
      </div>
      <div className="my-5"></div>
    </div>
  );
};

export default Reviews;
