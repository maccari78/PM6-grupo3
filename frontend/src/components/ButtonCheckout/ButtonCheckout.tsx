"use client";

import { useRouter } from "next/navigation";
import { IPost } from "../VehiclesComponent/interfaces/IPost";
import Swal from "sweetalert2";
import { useState } from "react";
import { IRentalPost } from "../VehiclesComponent/interfaces/IRentalPost";

interface IRental {
  rentalStartDate: string;
  rentalEndDate: string;
  price: number;
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!apiBaseUrl) {
  throw new Error(
    "Environment variable NEXT_PUBLIC_API_GET_USERS_TOKEN is not set"
  );
}

const ButtonCheckout = ({
  startDateRentals,
  endDateRentals,
  postState,
  pricePost,
  startDate,
  endDate,
  userToken,
  id,
}: {
  startDateRentals: string[] | undefined;
  endDateRentals: string[] | undefined;
  postState: IPost | undefined;
  pricePost: number | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  userToken: string | undefined;
  id: string;
}) => {
  const router = useRouter();

  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const fetchCheckout = async () => {
    if (!id) {
      console.error("Error: ID is undefined");
      return;
    }

    if (startDateRentals && startDate) {
      const hasError = startDateRentals.some((date) => date === startDate);
      if (hasError) {
        Swal.fire({
          icon: "warning",
          title: "Elige una fecha valida",
          text: "Debes elegir una fecha que no haya sido ocupada, mira el calendario para saber que fechas estan ocupadas ",
        });
        return;
      }
    }

    if (endDateRentals && endDate) {
      const hasError = endDateRentals.some((date) => date === endDate);
      if (hasError) {
        Swal.fire({
          icon: "warning",
          title: "Elige una fecha valida",
          text: "Debes elegir una fecha que no haya sido ocupada, mira el calendario para saber que fechas estan ocupadas ",
        });
        return;
      }
    }

    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("userSession")
    ) {
      if (
        !startDate ||
        !endDate ||
        startDate.trim() === "" ||
        endDate.trim() === ""
      ) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Debes elegir de que fecha a que fecha deseas reservar el vehiculo",
        });
        return;
      } else {
        Swal.fire({
          title: "¿Estas seguro de reservar?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, ¡Quiero reservar!",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            setLoadingButton(true);

            const callCheckout = async () => {
              try {
                if (postState) {
                  const rentalData: IRental = {
                    rentalStartDate: startDate!,
                    rentalEndDate: endDate!,
                    price: pricePost!,
                  };

                  window.localStorage.setItem(
                    "checkoutPost",
                    JSON.stringify(rentalData)
                  );
                  const storageRent =
                    window.localStorage.getItem("checkoutPost");
                  const postToRental: IRental = JSON.parse(storageRent!);

                  const res = await fetch(`${apiBaseUrl}/rentals/${id}`, {
                    method: "POST",
                    body: JSON.stringify({
                      rentalStartDate: postToRental.rentalStartDate,
                      rentalEndDate: postToRental.rentalEndDate,
                      name: postState.title,
                      price: postToRental.price,
                      image_url: postState.car.image_url[0],
                      description: postState.description,
                    }),
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${userToken!}`,
                    },
                  });

                  if (!res.ok) {
                    throw new Error(`Error: ${res.statusText}`);
                  }

                  const session = await res.json();
                  window.location.href = session.url;
                } else {
                  console.error(
                    "Error: Missing required postState, startDate, endDate, or pricePost"
                  );
                }
              } catch (error: any) {
                console.log(error.message);
              } finally {
                setLoadingButton(false);
              }
            };
            callCheckout();
          }
        });
      }
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Debes iniciar sesión",
      });
      router.push("/login");
    }
  };

  return (
    <>
      {loadingButton ? (
        <button
          onClick={fetchCheckout}
          className="w-full h-[30px] mt-2 px-3 py-2 text-sm content-center justify-center items-center  md:h-10 text-[#222222] md:py-5 flex md:text-base font-semibold bg-[#C4FF0D] rounded-lg shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#c3ff0d92] hover:cursor-pointer"
        >
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-100"
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
          onClick={fetchCheckout}
          className="w-full h-[30px] mt-2 px-3 py-2 text-sm content-center justify-center items-center  md:h-10 text-[#222222] md:py-5 flex md:text-base font-semibold bg-[#C4FF0D] rounded-lg shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#c3ff0d92] hover:cursor-pointer"
        >
          Reserva ahora!
        </button>
      )}
    </>
  );
};

export default ButtonCheckout;
