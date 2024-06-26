"use client";
import Sidebar from "@/components/DashboardComponents/Sidebar";
import SkeletonDashboard from "@/components/sketelons/SkeletonDashboard";
import { IUserData } from "@/interfaces/IUser";
import { ListedCarCardProps } from "@/interfaces/dashboard";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const apiUrl = process.env.NEXT_PUBLIC_API_GET_USERS_TOKEN;
if (!apiUrl) {
  throw new Error(
    "Environment variable NEXT_PUBLIC_API_GET_USERS_TOKEN is not set"
  );
}

const DashboardVendedor: React.FC = () => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPrice, SetTotalPrice] = useState<number>(0);
  const [averagePrice, SetAveragePrice] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userSession = localStorage.getItem("userSession");
      if (userSession) {
        const parsedSession = JSON.parse(userSession);
        setUserToken(parsedSession.token);
      } else {
        Swal.fire({
          title: "Error de acceso",
          text: "Necesitas estar logueado para ingresar",
          icon: "error",
        });
        redirect("/login");
      }
    }
  }, [router]);
  useEffect(() => {
    if (userData?.rentals) {
      const total = userData.rentals.reduce(
        (acc, element) => acc + Number(element.totalCost),
        0
      );
      //? const total2 = userData?.post.reduce((acc, element) => acc + Number(element.price), 0);
      const average = total / userData.rentals.length;
      SetTotalPrice(total);
      SetAveragePrice(average);
      if (isNaN(average)) SetAveragePrice(0);
    }
  }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.NEXT_PUBLIC_CUSTOM_HEADERS_KEY;
      setLoading(true);
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
            [apiKey!]: process.env.NEXT_PUBLIC_CUSTOM_HEADERS_VALUE!,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching user data");
        }

        const data = await response.json();
        setUserData(data);
        console.log(data);
      } catch (error: any) {
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    };

    if (userToken) {
      fetchData();
    }
  }, [userToken]);

  console.log(userData);
  if (loading) {
    return <SkeletonDashboard />;
  }
  return (
    <>
      <div className="bg-[#313139]">
        <Sidebar />
        <div className="p-4 max-w-6xl mx-auto rounded-xl bg-[#313139]">
          {/* Sección de bienvenida */}
          <div className="bg-[#333333] rounded-lg shadow-md p-6 mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-100">
                Bienvenido,{" "}
                <span className="text-[#C4FF0D]">{userData?.name}</span>
              </h1>
              <p className="text-slate-300 mt-2">
                Estamos encantados de verte de nuevo. Aquí tienes un resumen de
                tu actividad reciente y herramientas para gestionar tus ventas.
              </p>
            </div>
            <Link href="/vehicleForm">
              <button className=" px-4 py-2  bg-[#232326] text-white rounded hover:bg-[#131212]">
                Crear Nueva Publicación
              </button>
            </Link>
          </div>

          {/* Sección de ventas recientes */}
          <div className="bg-[#333333] rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-[#C4FF0D]">
              Tus Alquileres Activos
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userData?.rentals?.length !== 0 ? (
                userData?.rentals.map((rent) => (
                  // eslint-disable-next-line react/jsx-key
                  <SaleCard
                    carModel={rent.posts.car.brand}
                    saleDate={rent.rentalStartDate}
                    reservationEndDate={rent.rentalEndDate}
                    price={rent.totalCost}
                    imageUrl={rent.posts.car.image_url[0]}
                  />
                ))
              ) : (
                <p className="text-gray-300 text-m">
                  No tienes alquileres recientes
                </p>
              )}
              {/* Agrega más SaleCards según sea necesario */}
            </div>
          </div>

          {/* Sección de vehículos listados */}
          <div className="bg-[#333333] rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-[#C4FF0D]">
              Todos tus Vehículos Listados
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userData?.post?.length !== 0 ? (
                userData?.post.map((rent) => (
                  // eslint-disable-next-line react/jsx-key
                  <ListedCarCard
                    key={rent.id}
                    carModel={rent.title}
                    price={rent.price}
                    imageUrl={rent.car?.image_url[0]}
                    idPost={rent.id}
                  />
                ))
              ) : (
                <p className="text-gray-300 text-m">
                  No tienes vehículos listados
                </p>
              )}

              {/* Agrega más ListedCarCards según sea necesario */}
            </div>
          </div>

          {/* Sección de estadísticas de alquileres */}
          <div className="bg-[#333333] rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#C4FF0D]">
              Estadísticas de Alquileres
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatCard
                title="Alquileres Totales"
                value={String(userData?.rentals.length)}
                description="Total de Alquileres recibidos en la plataforma"
              />
              <StatCard
                title="Ingresos"
                value={`$ ${totalPrice}`}
                description="Ingresos generados"
              />
              <StatCard
                title="Promedio de Precio"
                value={`$ ${averagePrice}`}
                description="Precio promedio de los vehículos alquilados"
              />
              {/* Agrega más StatCards según sea necesario */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Componente para mostrar una venta reciente
interface SaleCardProps {
  carModel: string;
  saleDate: string;
  reservationEndDate: string;
  price: number;
  imageUrl: string;
}

const SaleCard: React.FC<SaleCardProps> = ({
  carModel,
  saleDate,
  reservationEndDate,
  price,
  imageUrl,
}) => (
  <div className="bg-[#2d2d2d] p-4 rounded-lg shadow">
    <img
      className="w-full h-32 object-cover rounded-t-lg"
      src={imageUrl}
      alt={carModel}
    />
    <div className="mt-2">
      <h4 className="text-slate-100 font-bold text-lg">{carModel}</h4>
      <p className="text-slate-400 text-sm mt-1">
        Inicio del alquiler: {saleDate}
      </p>
      <p className="text-slate-400 text-sm mt-1">
        Fin del alquiler: {reservationEndDate}
      </p>
      <p className="text-gray-100 font-semibold mt-2">{`$ ${price}`}</p>
    </div>
  </div>
);

// Componente para mostrar un vehículo listado

const ListedCarCard: React.FC<ListedCarCardProps> = ({
  carModel,
  price,
  imageUrl,
  idPost,
}) => (
  <div className="bg-[#2d2d2d] p-4 rounded-lg shadow">
    <img
      className="w-full h-32 object-cover rounded-t-lg"
      src={imageUrl}
      alt={carModel}
    />
    <div className="mt-2">
      <h4 className=" text-slate-100 font-bold text-lg">{carModel}</h4>
      <p className="text-slate-400 font-semibold mt-2">{`$ ${price}/dia`}</p>
      <div className="text-center mt-4 flex align-middle justify-between ">
        <Link href='/vehicle/[vehicleId]' as={`vehicle/${idPost}`}>
          <button className="px-4 py-2 bg-[#232326] text-white rounded hover:bg-[#131212]">
            Ver más detalles
          </button>
        </Link>

        <Link
          href='/rent/[rentId]'
          as={`rent/${idPost}`}
          className="text-gray-300 align-middle justify-center content-center text-sm md:text-base hover:text-[#C4FF0D] hover:underline"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 fill-[] stroke-[#C4FF0D]  "
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
            <path d="M16 5l3 3" />
          </svg>
        </Link>
      </div>
    </div>
  </div>
);

// Componente para mostrar estadísticas de ventas
interface StatCardProps {
  title: string;
  value: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description }) => (
  <div className="bg-[#2d2d2d] p-4 rounded-lg shadow">
    <h4 className=" text-slate-100 font-bold text-lg">{title}</h4>
    <p className="text-slate-200 font-semibold text-2xl mt-2">{value}</p>
    <p className="text-slate-400 text-sm mt-1">{description}</p>
  </div>
);

export default DashboardVendedor;
