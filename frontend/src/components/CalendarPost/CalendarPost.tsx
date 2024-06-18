import React from "react";
import { IRentalPost } from "../VehiclesComponent/interfaces/IRentalPost";

interface IShowFunction {
  (): void;
}

const CalendarPost: React.FC<{
  handleShowCalendar: IShowFunction;
  rentals: IRentalPost[] | undefined;
}> = ({ handleShowCalendar, rentals }) => {
  return (
    <div className="shadow-custom-vmax fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto px-5 py-5 bg-[#2e2e2e] rounded-lg flex flex-col gap-3 items-center">
      {rentals!.length > 0 ? (
        <>
          <h2 className="text-xl text-gray-200 font-bold mb-2">Rentas</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-[#c2e94e] uppercase bg-gray-800 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nombre de usuario
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Foto de perfil
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Dia de inicio
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Dia de fin
                  </th>
                </tr>
              </thead>
              <tbody>
                {rentals?.map((rental) => {
                  return (
                    <tr key={rental.id} className="bg-transparent border-b">
                      {rental.users.map((user) => {
                        return (
                          <React.Fragment key={user.id}>
                            <th
                              scope="row"
                              className="px-6 font-medium text-gray-300 whitespace-nowrap "
                            >
                              {user.name}
                            </th>
                            <td className="flex flex-row justify-center px-6  text-gray-300 h-[50px] ">
                              <img
                                src={user.image_url}
                                alt="foto de perfil usuario"
                                className="h-10 w-10 rounded-full "
                              />
                            </td>
                          </React.Fragment>
                        );
                      })}
                      <td className="px-6  text-gray-300">
                        {rental.rentalStartDate}
                      </td>
                      <td className="px-6  text-gray-300">
                        {rental.rentalEndDate}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <button
            onClick={handleShowCalendar}
            className="w-[100px] h-[30px] mt-2 px-3 py-2 text-sm content-center justify-center items-center  md:h-10 text-[#222222] md:py-5 flex md:text-base font-semibold bg-[#C4FF0D] rounded-lg shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#c3ff0d92] hover:cursor-pointer"
          >
            Cerrar
          </button>
        </>
      ) : (
        <div className="flex flex-col gap-2 items-center">
          <div className="h-[30%] w-[80%]">
            <img
              src="https://i.gifer.com/PSYr.gif"
              alt="gif not found rent"
              className="rounded-xl h-full w-full"
            />
          </div>
          <h2 className="text-2xl font-semibold text-gray-200">
            ¡Nadie ha rentado este vehiculo todavia!
          </h2>
          <button
            onClick={handleShowCalendar}
            className="w-[100px] h-[30px] mt-2 px-3 py-2 text-sm content-center justify-center items-center  md:h-10 text-[#222222] md:py-5 flex md:text-base font-semibold bg-[#C4FF0D] rounded-lg shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#c3ff0d92] hover:cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
};

export default CalendarPost;
