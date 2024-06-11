"use client";

import { useRouter } from "next/navigation";
import { IPost } from "../VehiclesComponent/interfaces/IPost";
import Swal from "sweetalert2";

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
  postState,
  pricePost,
  startDate,
  endDate,
  userToken,
  id,
}: {
  postState: IPost | undefined;
  pricePost: number | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  userToken: string | undefined;
  id: string;
}) => {
  const router = useRouter();

  const fetchCheckout = async () => {
    if (!id) {
      console.error("Error: ID is undefined");
      return;
    }

    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("userSession")
    ) {
      if (!postState?.car.availability) {
        Swal.fire({
          icon: "error",
          title: "Lo sentimos...",
          text: "Esta publicacion esta inactiva",
        });
        return;
      } else if (
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
            const storageRent = window.localStorage.getItem("checkoutPost");
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
        }
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
      <button
        onClick={fetchCheckout}
        className="w-full h-[30px] mt-2 px-3 py-2 text-sm content-center justify-center items-center  md:h-10 text-[#222222] md:py-5 flex md:text-base font-semibold bg-[#C4FF0D] rounded-lg shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#c3ff0d92] hover:cursor-pointer"
      >
        Reserva ahora!
      </button>
    </>
  );
};

export default ButtonCheckout;
