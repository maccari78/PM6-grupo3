import Products from "@/components/Products/Products";

export default function Home() {
  return (
    <div className="bg-[#444343] text-white flex flex-col  min-h-screen">
      <section className="md:h-[900px] w-full flex justify-center">
        <div className="md:h-full h-[250px]  w-full bg-no-repeat bg-contain shadow-xl md:bg-cover bg-[url('../../public/imagenBanner2.jpg')] flex md:justify-center items-center ">
          <div className="flex flex-col ml-5 md:ml-0 md:mr-96 justify-between items-center">
            <div className="rounded-2xl border-gray-300 border-2 md:border-4 md:mb-4 backdrop-blur-md">
              <h1 className="md:text-7xl text-base font-medium px-2 py-2 md:px-4 md:py-4  text-gray-300 text-center antialiased">
                La{" "}
                <mark className="px-2 text-[#c9ff25] bg-gray-300 rounded-2xl shadow-2xl">
                  mejor
                </mark>{" "}
                pagina <br />
                de alquiler de rodados
              </h1>
            </div>
            <a
              href="#vehiculos"
              className="w-[90px] h-[30px] mt-2 px-3 py-2 text-[10px]  md:w-[200px] md:h-[70px] text-[#222222] md:px-5 md:py-5 md:text-2xl font-semibold bg-[#C4FF0D] rounded-lg shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#c3ff0d92] hover:cursor-pointer"
            >
              Ver vehiculos
            </a>
          </div>
        </div>
      </section>

      <section
        id="vehiculos"
        className="w-full md:mt-4 flex flex-col justify-around"
      >
        <div className="flex flex-col w-full justify-center items-center">
          <h1 className="text-xl md:text-4xl font-bold ">¡Vehiculos!</h1>
          <p className="text-sm md:text-lg text-[#dcffc1] font-bold">
            {" "}
            Amplia variedad y a los mejores precios del mercado
          </p>
        </div>
        <Products />
      </section>
    </div>
  );
}
