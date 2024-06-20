import { ReservationCardProps } from "@/interfaces/dashboard";
import React, { useState } from "react";
import Swal from "sweetalert2";

const apiPostUrl = process.env.NEXT_PUBLIC_API_POSTS;

const ReservationCard: React.FC<ReservationCardProps> = ({
  carModel,
  reservationDate,
  reservationEndDate,
  price,
  imageUrl,
  idPost,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleCancelReservation = async () => {
    Swal.fire({
      title: "Estas seguro de cancelar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cancelar reserva!",
      cancelButtonText: "Cerrar",
    }).then((result) => {
      if (result.isConfirmed) {
        const cancelReservation = async () => {
          setLoading(true);
          try {
            const response = await fetch(`${apiPostUrl}/cancel/${idPost}`, {
              method: "POST",
            });
            await Swal.fire({
              title: "Reserva cancelada!",
              text: "Has cancelado la reserva con exito!",
              icon: "success",
            });

            window.location.reload();
          } catch (error: any) {
            Swal.fire({
              title: "Ha ocurrido un error!",
              text: `${error.message}`,
              icon: "error",
            });
          } finally {
            setLoading(false);
          }
        };
        cancelReservation();
      }
    });
  };

  return (
    <div className="bg-[#313139] p-4 rounded-lg shadow">
      {imageUrl && (
        <img
          className="w-full h-32 object-cover rounded-t-lg"
          src={imageUrl}
          alt={carModel}
        />
      )}
      <div className="mt-2">
        <h4 className="text-slate-100 font-bold text-lg">{carModel}</h4>
        <p className="text-gray-300 text-sm mt-1">
          Inicio de reserva: {reservationDate}
        </p>
        <p className="text-gray-300 text-sm mt-1">
          fin de reserva: {reservationEndDate}
        </p>
        <p className="text-gray-200 font-semibold mt-2">{price}</p>

        {loading ? (
          <button
            onClick={handleCancelReservation}
            className="mt-4 flex flex-row justify-center items-center bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700"
          >
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </button>
        ) : (
          <button
            onClick={handleCancelReservation}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700"
          >
            Cancelar Reserva
          </button>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;
