"use client";

import { IPost } from "@/components/VehiclesComponent/interfaces/IPost";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IRental {
  rentalStartDate: string;
  rentalEndDate: string;
  price: number;
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiPostUrl = process.env.NEXT_PUBLIC_API_POSTS;

const Successcheckout = ({ params }: { params: { id: string } }) => {
  const [postToRental, setPostToRental] = useState<IRental>();
  const [postState, setPostState] = useState<IPost>();
  const [resFromApi, setResFromApi] = useState<any>();
  const [userToken, setUserToken] = useState<string>();

  console.log(
    postToRental?.rentalStartDate,
    postToRental?.rentalEndDate,
    postState?.title,
    postToRental?.price,
    postState?.description,
    postState?.car.image_url[0]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const post = await fetch(`${apiPostUrl}/${params.id}`, {
          method: "GET",
        });
        const data = await post.json();
        setPostState(data);
      } catch (error: any) {
        console.log(error.message);
      }
      if (typeof window !== undefined && window.localStorage) {
        const storageRent = window.localStorage.getItem("checkoutPost");
        const userSession = window.localStorage.getItem("userSession");
        if (storageRent) {
          setPostToRental(JSON.parse(storageRent));
        }
        if (userSession) {
          const parsedSession = JSON.parse(userSession);
          setUserToken(parsedSession.token);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/rentals/${params.id}`, {
          method: "POST",
          body: JSON.stringify({
            rentalStartDate: postToRental?.rentalStartDate,
            rentalEndDate: postToRental?.rentalEndDate,
            name: postState?.title,
            price: postToRental?.price,
            description: postState?.description,
            image_url: postState?.car.image_url[0],
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken!}`,
          },
        });

        const data = (await res).json();
        setResFromApi(data);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchRental();
  }, [postToRental, postState]);

  const handleRemoveCheckout = () => {
    window.localStorage.removeItem("checkoutPost");
  };

  return (
    <div className="flex flex-col bg-[#444343] min-h-screen items-center">
      <div className="flex flex-col mt-10 gap-3 items-center">
        <h1 className="text-3xl text-[#c3ff0da9]">¡Compra exitosa!</h1>
        <Link href="/">
          {" "}
          <button
            onClick={handleRemoveCheckout}
            className="text-lg flex flex-row text-gray-300 hover:text-[#c3ff0da9] justify-between items-center px-2 py-2 hover:bg-[#555454] rounded-xl duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l14 0" />
              <path d="M5 12l6 6" />
              <path d="M5 12l6 -6" />
            </svg>
            Volver a la pagina principal
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Successcheckout;
