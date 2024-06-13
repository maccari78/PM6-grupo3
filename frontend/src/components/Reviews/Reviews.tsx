const Reviews = () => {
  return (
    <div className="flex flex-col items-center  bg-[#444343]">
      <div className="py-6 px-10 bg-[#C4FF0D] rounded-2xl">
        <h1 className="text-2xl font-semibold text-[#222222]">Reseñas</h1>
      </div>
      <div className="flex flex-row w-[80%]  justify-between my-10">
        <div className="flex flex-col w-[40%]">
          <h1>Deja tu reseña</h1>
          <div>
            <h1>Puntuacion</h1>
          </div>
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
            <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
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
