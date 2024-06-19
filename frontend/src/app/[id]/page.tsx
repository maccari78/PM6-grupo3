'use client'
import SalePostCard from "@/components/DashboardComponents/PostUser";
import ReviewCard from "@/components/DashboardComponents/ReviewCard";
import Sidebar from "@/components/DashboardComponents/Sidebar";
import SkeletonDashboard from "@/components/sketelons/SkeletonDashboard";
import { IUserData } from "@/interfaces/IUser";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface UserPageProps {
  params: {
    id: string;
  };
}

const apiUrl = process.env.NEXT_PUBLIC_API_USERS;

const UserProfile = ({ params }: UserPageProps) => {
  const { id } = params;
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  console.log(id);

  useEffect(() => {
    axios.get(`${apiUrl}/${params.id}`).then((response) => {
      setUserData(response.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <SkeletonDashboard />;
  }

  return (
    <>
      <div className="bg-[#313139] p-6"></div>
      <div className="bg-[#313139]">
        <Sidebar />
        <div className="max-w-6xl mx-auto rounded-xl">
          <div className="flex justify-center">
            <img
              src={userData?.image_url}
              alt="Profile"
              className="w-32 h-32 rounded-full"
            />
          </div>
          <div className="text-center mt-2">
            <h2 className="text-lg font-medium text-gray-100">
              {userData?.name}
            </h2>
            <p className="text-sm text-gray-300">
              {userData?.addresses.length !== 0
                ? `${userData?.addresses[0]?.city}, ${userData?.addresses[0]?.country}`
                : ""}
            </p>
          </div>
          <div className="px-6 py-4">
            <p className="text-gray-100 text-base">{userData?.aboutMe}</p>
          </div>
          <div className="px-6 py-4">
            <h3 className="text-xl font-semibold pb-1 text-[#C4FF0D]">
              Alquileres publicados
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4 pb-5 sm:grid-cols-3">
              {userData?.post?.length !== 0 ? (
                userData?.post?.map((rent) => (
                  <SalePostCard
                    key={rent.id}
                    productName={rent.title}
                    productDescription={rent.description}
                    price={rent.price}
                    imageUrl={rent.car?.image_url[0]}
                  />
                ))
              ) : (
                <p className="text-gray-300 text-m">
                  No hay publicaciones disponibles
                </p>
              )}
            </div>
            <h3 className="text-lg font-medium text-[#C4FF0D]">Comentarios</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {userData?.reviews?.length !== 0 ? (
                userData?.reviews?.map((review) => (
                  <ReviewCard
                    key={review.id}
                    rating={review.rating}
                    comment={review.comment}
                    createdAt={review.created_at}
                  />
                ))
              ) : (
                <p className="text-gray-300 text-m pb-4 mb-2">
                  No hay comentarios disponibles
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
