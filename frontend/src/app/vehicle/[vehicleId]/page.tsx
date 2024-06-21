"use client";

import dynamic from "next/dynamic";
import ButtonCheckout from "@/components/ButtonCheckout/ButtonCheckout";
import DateRangePicker from "@/components/DateRangePicker/DateRangePicker";
import Reviews from "@/components/Reviews/Reviews";
import { IPost } from "@/components/VehiclesComponent/interfaces/IPost";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Tooltip } from "flowbite-react";
import SkeletonDashboard from "@/components/sketelons/SkeletonDashboard";
import { IRentalPost } from "@/components/VehiclesComponent/interfaces/IRentalPost";
import CalendarPost from "@/components/CalendarPost/CalendarPost";
import CarouselVehicle from "@/components/CarouselVehicle/CarouselVehicle";
const DynamicMapLocation = dynamic(
  () => import("../../../components/MapLocation/MapLocation"),
  { ssr: false }
);

const apiPostUrl = process.env.NEXT_PUBLIC_API_POSTS;
if (!apiPostUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_API_POSTS is not set");
}

const VehicleDetail = ({ params }: { params: { vehicleId: string } }) => {
  const bookedDates = [
    new Date("2024-06-10T00:00:00Z").toISOString().replace(".000Z", ""),
    new Date("2024-06-15T00:00:00Z").toISOString().replace(".000Z", ""),
    new Date("2024-06-20T00:00:00Z").toISOString().replace(".000Z", ""),
  ];

  const [postState, setPostState] = useState<IPost | undefined>();
  const [pricePost, setPricePost] = useState<number>();
  const [startDate, setStartDate] = useState<string | undefined>();
  const [userToken, setUserToken] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [mediaRating, setMediaRating] = useState<number>();
  const [totalReviews, setTotalReviews] = useState<number>();
  const [rentals, setRentals] = useState<IRentalPost[]>();
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [startDateRentals, setStartDateRentals] = useState<
    string[] | undefined
  >();
  const [endDateRentals, setEndtDateRentals] = useState<string[] | undefined>();
  const [imgsPost, setImgsPost] = useState<string[]>();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userSession = localStorage.getItem("userSession");
      if (userSession) {
        const parsedSession = JSON.parse(userSession);
        setUserToken(parsedSession.token);
      }
    }

    const fetchDta = async () => {
      setLoading(true);
      try {
        const post = await fetch(`${apiPostUrl}/${params.vehicleId}`, {
          method: "GET",
        });
        const data: IPost = await post.json();
        setPostState(data);
        setImgsPost(data.car.image_url);
        setTotalReviews(data.review.length);

        const rentals = data.rentals.map((rental) => {
          return {
            ...rental,
            users: rental.users.filter((user) => user.id !== data.user.id),
          };
        });
        setRentals(rentals);
        const startDate = rentals.map((rental) => {
          return rental.rentalStartDate;
        });

        const endDate = rentals.map((rental) => {
          return rental.rentalEndDate;
        });

        setStartDateRentals(startDate);
        setEndtDateRentals(endDate);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDta();
  }, []);

  useEffect(() => {
    if (postState) {
      const mediaRating = () => {
        let sumaRating = 0;
        let cantidadReviews = postState.review.length;
        postState.review.map((review) => {
          sumaRating += review.rating;
          let mediaRating = Math.round(sumaRating / cantidadReviews);
          setMediaRating(mediaRating);
        });
      };

      mediaRating();
    }
  }, [postState]);

  const handleSetPrice = (newPrice: number) => {
    setPricePost(newPrice);
  };

  const handleStartDate = (date: string) => {
    setStartDate(date);
  };

  const handleEndDate = (date: string) => {
    setEndDate(date);
  };

  const handleShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  if (loading) {
    return <SkeletonDashboard />;
  }

  return (
    <>
      <div className="bg-[#444343] flex flex-col items-center md:flex-row  md:items-start justify-evenly min-h-screen pt-10 ">
        <div className="flex flex-col w-[70%] md:w-[40%] justify-between my-5">
          <div className="flex flex-col md:justify-start ">
            <h1 className=" text-lg md:text-3xl font-semibold text-gray-100">
              {postState?.title}
            </h1>
            <div className="flex flex-row  items-end">
              <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse mt-3">
                {mediaRating === 1 && (
                  <>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-gray-300 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-gray-300 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-gray-300 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-gray-300 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  </>
                )}

                {mediaRating === 2 && (
                  <>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-gray-300 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-gray-300 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-gray-300 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  </>
                )}
                {mediaRating === 3 && (
                  <>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-gray-300 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-gray-300 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  </>
                )}

                {mediaRating === 4 && (
                  <>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-gray-300 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  </>
                )}
                {mediaRating === 5 && (
                  <>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  </>
                )}
              </div>
              {totalReviews ? (
                <p className="text-gray-400 text-sm mb-[2px]">
                  {totalReviews} reseñas
                </p>
              ) : (
                <p className="text-gray-400 text-[15px]">
                  Esta publicacion no tiene reseñas
                </p>
              )}
            </div>

            <div className=" mt-3 ">
              <CarouselVehicle imgs={imgsPost} />
            </div>
          </div>

          <div className="flex mt-3 flex-col justify-around h-[500px] md:h-[400px] max-h-[100%]">
            <div className="flex flex-col  pb-4 border-b-[1px] border-[#c2e94e]">
              <h1 className="text-lg md:text-2xl font-semibold text-gray-100">
                Descripcion
              </h1>
              <ul className="text-base text-gray-300   mt-2">
                <li className="text-sm md:text-base">
                  - {postState?.description}
                </li>
              </ul>
            </div>
            <div className="flex flex-col border-b-[1px] border-b-[#c2e94e] py-4">
              <h1 className="text-lg md:text-2xl text-gray-100 font-semibold ">
                Datos del vehiculo
              </h1>
              <ul className="space-y-1 text-gray-300  list-inside">
                <li className=" flex items-center space-x-3 rtl:space-x-reverse">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#C4FF0D"
                    stroke="#222222"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                    <path d="M8 9h1l3 3l3 -3h1" />
                    <path d="M8 15l2 0" />
                    <path d="M14 15l2 0" />
                    <path d="M9 9l0 6" />
                    <path d="M15 9l0 6" />
                  </svg>
                  <span className="text-sm md:text-base">
                    Marca:{" "}
                    <span className="font-semibold  text-[#c2e94e]">
                      {postState?.car?.brand ? postState?.car.brand : 'No data'}
                    </span>
                  </span>
                </li>
                <li className=" flex items-center space-x-3 rtl:space-x-reverse">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#C4FF0D"
                    stroke="#222222"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 8h8v8h-8z" />
                    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                    <path d="M16 16l3.3 3.3" />
                    <path d="M16 8l3.3 -3.3" />
                    <path d="M8 8l-3.3 -3.3" />
                    <path d="M8 16l-3.3 3.3" />
                  </svg>
                  <span className="text-sm md:text-base">
                    Modelo:{" "}
                    <span className="font-semibold text-[#c2e94e]">
                      {postState?.car.model ? postState?.car.model : 'No data'}
                    </span>
                  </span>
                </li>
                <li className=" flex items-center space-x-3 rtl:space-x-reverse">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#C4FF0D"
                    stroke="#222222"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4" />
                    <path d="M18 14v4h4" />
                    <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                    <path d="M15 3v4" />
                    <path d="M7 3v4" />
                    <path d="M3 11h16" />
                  </svg>
                  <span className="text-sm md:text-base">
                    Año:{" "}
                    <span className="font-semibold text-[#c2e94e]">
                      {postState?.car.year}
                    </span>
                  </span>
                </li>
                <li className=" flex items-center space-x-3 rtl:space-x-reverse">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#C4FF0D"
                    stroke="#222222"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 17a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                    <path d="M16 17a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                    <path d="M5 9l2 -4h7.438a2 2 0 0 1 1.94 1.515l.622 2.485h3a2 2 0 0 1 2 2v3" />
                    <path d="M10 9v-4" />
                    <path d="M2 7v4" />
                    <path d="M22.001 14.001a4.992 4.992 0 0 0 -4.001 -2.001a4.992 4.992 0 0 0 -4 2h-3a4.998 4.998 0 0 0 -8.003 .003" />
                    <path d="M5 12v-3h13" />
                  </svg>
                  <span className="text-sm md:text-base">
                    Kilometraje:{" "}
                    <span className="font-semibold text-[#c2e94e]">
                      {postState?.car.mileage}
                    </span>
                  </span>
                </li>
                <li className=" flex items-center space-x-3 rtl:space-x-reverse">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#C4FF0D"
                    stroke="#222222"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" />
                    <path d="M8.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                    <path d="M12.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                    <path d="M16.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                  </svg>
                  <span className="text-sm md:text-base">
                    Color:{" "}
                    <span className="font-semibold text-[#c2e94e]">
                      {postState?.car.color}
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-5 pb-4">
            <div>
              <div className="flex flex-row items-center duration-200 "></div>
              <h1 className="font-sans text-lg md:text-2xl font-semibold text-gray-100 ">
                ¡Reserva!
              </h1>
            </div>

            <div className="w-full">
              <DateRangePicker
                handleStartDate={handleStartDate}
                handleEndDate={handleEndDate}
                price={postState?.price}
                handleSetPrice={handleSetPrice}
                bookedDates={bookedDates}
              />
            </div>

            <div className="flex flex-col py-4 border-t-[2px] border-t-[#c2e94e] gap-3">
              <div className="flex flex-row items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 fill-[#c2e94e]"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" />
                </svg>
                <h1 className="text-2xl text-gray-100 font-semibold">
                  Localizacion
                </h1>
              </div>
              <div className="flex flex-col items-center md:items-start gap-9 md:flex-row">
                <DynamicMapLocation
                  lat={postState?.user.addresses[0]?.latitude!}
                  lon={postState?.user.addresses[0]?.longitude!}
                />
                <div className="flex flex-col items-center  gap-3">
                  <div className="flex flex-row h-[70px] items-center gap-3">
                    <span className="flex w-3 h-3  bg-blue-500 rounded-full"></span>
                    <p className="text-gray-100 md:text-xl">
                      Ubicacion del vehiculo
                    </p>
                  </div>
                  <div className="flex flex-col w-[80%] gap-5 bg-gray-200 rounded-xl px-3 py-3 items-center">
                    <p className="font-bold text-2xl text-center text-[#222222]">
                      Deja tu reseña aca abajo
                    </p>
                    <div className="flex justify-center items-center rounded-3xl px-1 py-1 animate-bounce bg-[#222222]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-8 h-8e stroke-[#C4FF0D]"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 5l0 14" />
                        <path d="M18 13l-6 6" />
                        <path d="M6 13l6 6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex  flex-col h-full  w-[70%] md:w-[30%] justify-center items-center my-5">
          <div className="flex flex-col shadow-2xl rounded-t-xl md:w-[295px] w-full h-[200px] items-center justify-center bg-[#222222] px-5 py-5 md:h-[230px]  border-t-[2px] boder-gray-300">
            <div className="flex flex-row items-center ">
              <svg
                className="w-4 h-4  md:w-6  md:h-6 text-[#C4FF0D] "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z" />
              </svg>
              <h1 className="ml-2 md:ml-3 text-base md:text-2xl text-gray-100 font-semibold">
                Propietario
              </h1>
            </div>
            <div className="mt-5 flex flex-col">
              <div className="flex flex-row w-full h-[50%]  gap-3 justify-start">
                <Link href='/user/[userId]' as={`user/${postState?.user?.id}`}>
                <div className=" w-[50px] ">
                  <img
                    src={postState?.user.image_url}
                    alt="Foto de perfil usuario"
                    className="rounded-full h-10 w-10"
                    />
                </div>
                    </Link>
                <div className="flex flex-col  justify-center">
                  <h1 className="text-gray-100 text-sm md:text-lg ">
                    {postState?.user.name}
                  </h1>
                  <p className="text-gray-300 text-sm md:text-[12px] mb-5">
                    {postState?.user.email}
                  </p>
                </div>
              </div>
              <div className="flex flex-row mt-4 justify-center">
                <Tooltip
                  content={`+${postState?.user.phone}`}
                  className="bg-[#b0d63f] text-[#22222]"
                  arrow={false}
                  placement="right"
                  animation="duration-500"
                >
                  <Button className="border-[2px] border-[#C4FF0D] rounded-3xl  bg-transparent transition-none  enabled:hover:bg-transparent">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="fill-[#C4FF0D] w-4 h-4"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M9 3a1 1 0 0 1 .877 .519l.051 .11l2 5a1 1 0 0 1 -.313 1.16l-.1 .068l-1.674 1.004l.063 .103a10 10 0 0 0 3.132 3.132l.102 .062l1.005 -1.672a1 1 0 0 1 1.113 -.453l.115 .039l5 2a1 1 0 0 1 .622 .807l.007 .121v4c0 1.657 -1.343 3 -3.06 2.998c-8.579 -.521 -15.418 -7.36 -15.94 -15.998a3 3 0 0 1 2.824 -2.995l.176 -.005h4z" />
                    </svg>
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>

          <div className="flex flex-col shadow-2xl w-full md:w-[295px] h-auto bg-[#222222] px-5 py-5  items-center ">
            <div className="flex flex-col gap-3 items-center">
              <div className="flex flex-row items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#C4FF0D"
                  className="w-4 h-4 md:w-6 md:h-6"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.051 6.844a1 1 0 0 0 -1.152 -.663l-.113 .03l-2.684 .895l-2.684 -.895l-.113 -.03a1 1 0 0 0 -.628 1.884l.109 .044l2.316 .771v.976l-1.832 2.75l-.06 .1a1 1 0 0 0 .237 1.21l.1 .076l.101 .06a1 1 0 0 0 1.21 -.237l.076 -.1l1.168 -1.752l1.168 1.752l.07 .093a1 1 0 0 0 1.653 -1.102l-.059 -.1l-1.832 -2.75v-.977l2.316 -.771l.109 -.044a1 1 0 0 0 .524 -1.221zm-3.949 -4.184a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3z" />
                </svg>
                <h1 className="text-gray-200 font-semibold text-sm md:text-xl  ml-1 mr-2">
                  Disponibilidad:{" "}
                </h1>
              </div>
              {postState?.car.availability ? (
                <span className="bg-[#b0d63f] text-[12px] text-[#222222] font-semibold  md:text-sm me-2  md:px-2.5 md:py-0.5 rounded ">
                  Disponible
                </span>
              ) : (
                <span className="bg-red-800 text-[12px] text-gray-300 font-semibold  md:text-sm  me-2  md:px-2.5 md:py-0.5 rounded ">
                  No disponible
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col rounded-b-xl w-full gap-5 shadow-2xl md:w-[295px] h-[290px] bg-[#222222] px-5 py-5 border-b-[2px]  border-gray-300 items-center ">
            <div className="flex w-full justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#C4FF0D"
                className="w-4 h-4 md:w-6 md:h-6"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 2a1 1 0 0 1 .993 .883l.007 .117v1.068l13.071 .935a1 1 0 0 1 .929 1.024l-.01 .114l-1 7a1 1 0 0 1 -.877 .853l-.113 .006h-12v2h10a3 3 0 1 1 -2.995 3.176l-.005 -.176l.005 -.176c.017 -.288 .074 -.564 .166 -.824h-5.342a3 3 0 1 1 -5.824 1.176l-.005 -.176l.005 -.176a3.002 3.002 0 0 1 1.995 -2.654v-12.17h-1a1 1 0 0 1 -.993 -.883l-.007 -.117a1 1 0 0 1 .883 -.993l.117 -.007h2zm0 16a1 1 0 1 0 0 2a1 1 0 0 0 0 -2zm11 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2z" />
              </svg>
              <h1 className="text-gray-200 text-base md:text-2xl font-semibold ml-1">
                Reserva
              </h1>
            </div>
            <div className="flex flex-col w-full pb-5 justify-around border-b-gray-300 border-b-[1px]">
              <div className="flex flex-row w-full items-center gap-2 justify-start">
                <h1 className="text-2xl text-gray-300">
                  ${postState?.price} US
                </h1>

                <p className="text-[#b0d63f]">Dia</p>
              </div>
              <div className="flex w-full justify-center">
                <ButtonCheckout
                  startDateRentals={startDateRentals}
                  endDateRentals={endDateRentals}
                  postState={postState}
                  id={params.vehicleId}
                  pricePost={pricePost}
                  startDate={startDate}
                  endDate={endDate}
                  userToken={userToken}
                />
                ;
              </div>
            </div>
            <div className="flex flex-row justify-between items-center w-full">
              <h1 className="text-xl text-gray-300">Total: </h1>
              {pricePost === undefined ? (
                <p className="text-xl text-[#b0d63f]">${postState?.price} US</p>
              ) : (
                <p className="text-xl text-[#b0d63f]">${pricePost} US</p>
              )}
            </div>
          </div>

          <div className="flex flex-col mt-5 rounded-b-xl rounded-t-xl w-full gap-5 shadow-2xl md:w-[295px] h-[290px] bg-[#222222] px-5 py-5 border-b-[2px] border-t-[2px] border-gray-300 items-center">
            <h1 className="text-xl text-gray-200 font-semibold">
              ¡No te preocupes!
            </h1>
            <p className="text-justify text-gray-300">
              Puedes ver este calendario para saber que fechas estan ocupadas
              por otros usuarios y reservar para otra fecha
            </p>
            <button
              onClick={handleShowCalendar}
              className="flex flex-row hover:bg-[#303030] px-3 py-3 rounded-xl duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 stroke-[#b0d63f]"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                <path d="M16 3v4" />
                <path d="M8 3v4" />
                <path d="M4 11h16" />
                <path d="M11 15h1" />
                <path d="M12 15v3" />
              </svg>
              <p className="text-[#b0d63f]">Ver calendario</p>
            </button>
          </div>
        </div>
      </div>

      <Reviews reviews={postState?.review} idPost={params.vehicleId} />
      {showCalendar && (
        <CalendarPost
          handleShowCalendar={handleShowCalendar}
          rentals={rentals}
        />
      )}
    </>
  );
};

export default VehicleDetail;
