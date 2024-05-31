import Products from "@/components/Products/Products";

export default function Home() {
  return (
    <div className="bg-[#444343] text-white flex flex-col  min-h-screen">
      <section className="h-[900px] w-full flex justify-center">
        <div className="h-full w-full bg-no-repeat bg-cover bg-[url('../../public/imagenBanner2.jpg')] flex justify-center items-center ">
          <div className="flex flex-col mr-96 items-center">
            <div className="rounded-2xl border-4 mb-4 backdrop-blur-md">
              <h1 className="text-7xl font-medium px-4 py-4  text-[#ffffff] text-center antialiased">
                La{" "}
                <mark className="px-2 text-[#222222] bg-[#c2f330] rounded">
                  mejor
                </mark>{" "}
                pagina <br />
                de alquiler de rodados
              </h1>
            </div>
            <a
              href="#vehiculos"
              className="w-[200px] h-[70px] text-[#222222] px-5 py-5 text-2xl font-semibold bg-[#C4FF0D] rounded-lg shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#c3ff0d92] hover:cursor-pointer"
            >
              Ver vehiculos
            </a>
          </div>
        </div>
      </section>

      <section
        id="vehiculos"
        className="w-full mt-4 flex flex-col justify-around"
      >
        <div className="flex flex-col w-full justify-center items-center">
          <h1 className="text-4xl font-bold ">¡Vehiculos!</h1>
          <p className="text-lg text-[#dcffc1] font-bold">
            {" "}
            Amplia variedad y a los mejores precios del mercado
          </p>
        </div>
        <Products />
      </section>
    </div>
  );
}
