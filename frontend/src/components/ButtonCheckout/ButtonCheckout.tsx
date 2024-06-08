"use client";

import { useRouter } from "next/navigation";
import { IPost } from "../VehiclesComponent/interfaces/IPost";
import Swal from "sweetalert2";

const ButtonCheckout = ({
  postState,
  pricePost,
  startDate,
  endDate,
}: {
  postState: IPost | undefined;
  pricePost: number | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
}) => {
  const router = useRouter();

  const fetchCheckout = async () => {
    if (
      typeof window !== undefined &&
      window.localStorage.getItem("userSession")
    ) {
      try {
        if (postState) {
          window.localStorage.setItem(
            "checkoutPost",
            JSON.stringify({
              rentalStartDate: startDate,
              rentalEndDate: endDate,
              price: pricePost,
            })
          );
        }

        const res = await fetch("http://localhost:3000/api/checkout", {
          method: "POST",
          body: JSON.stringify({ postState, pricePost }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const session = await res.json();
        window.location.href = session.url;
      } catch (error: any) {
        console.log(error.message);
      }
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        background: "#cbcbcb",
        color: "#aa1808",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        backdrop: "swal2-backdrop-show",
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        iconColor: "#aa1808",
        title: "Debes iniciar sesion",
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
