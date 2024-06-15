"use client"
import Sidebar from '@/components/DashboardComponents/Sidebar';
import SkeletonDashboard from '@/components/sketelons/SkeletonDashboard';
import { IUserData } from '@/interfaces/IUser';
import { ListedCarCardProps } from '@/interfaces/dashboard';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const apiUrl = process.env.NEXT_PUBLIC_API_GET_USERS_TOKEN;
if (!apiUrl) {
  throw new Error('Environment variable NEXT_PUBLIC_API_GET_USERS_TOKEN is not set');
}

const DashboardVendedor: React.FC = () => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<IUserData | null >(null);
  const [loading, setLoading] = useState<boolean>(true);
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
          icon: "error"
        });
        redirect("/login")
      }
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error:any) {
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    };

    if (userToken) {
      fetchData();
    }
  }, [userToken]);

  console.log(userData)
if (loading) {
  return <SkeletonDashboard />;
}
  return (
    <>
    <div className='bg-[#313139]'>
    <Sidebar/>    
    <div className="p-4 max-w-6xl mx-auto rounded-xl bg-[#313139]">
      {/* Sección de bienvenida */}
      <div className="bg-[#333333] rounded-lg shadow-md p-6 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Bienvenido, <span className='text-[#C4FF0D]'>{userData?.name}</span></h1>
          <p className="text-slate-300 mt-2">Estamos encantados de verte de nuevo. Aquí tienes un resumen de tu actividad reciente y herramientas para gestionar tus ventas.</p>
        </div>
        <Link href='/vehicleForm'>
        <button className=" px-4 py-2  bg-[#232326] text-white rounded hover:bg-[#131212]">
          Crear Nueva Publicación
        </button>
        </Link>
      </div>
      
      {/* Sección de ventas recientes */}
      <div className="bg-[#333333] rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-[#C4FF0D]">Tus alquileres Recientes</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
               {userData?.rentals.map((rent) => (
          <SaleCard
          carModel={rent.posts.car.brand}
                   saleDate={rent.rentalStartDate}
                   price={rent.totalCost}
          imageUrl={rent.posts.car.image_url[0]}
        />
              
            ))}
          {/* Agrega más SaleCards según sea necesario */}
        </div>
      </div>

      {/* Sección de vehículos listados */}
      <div className="bg-[#333333] rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-[#C4FF0D]">Tus Vehículos Listados</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userData?.post.map((rent) => (
          <ListedCarCard
          carModel={rent.title}
          price={rent.price}
          imageUrl={rent.car?.image_url[0]}
        />
              
            ))}

          {/* Agrega más ListedCarCards según sea necesario */}
        </div>
      </div>

      {/* Sección de estadísticas de ventas */}
      <div className="bg-[#333333] rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-[#C4FF0D]">Estadísticas de Ventas</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title="Alquileres Totales"
            value="120"
            description="Total de Alquileres recibidos en la plataforma"
          />
          <StatCard
            title="Ingresos"
            value="$240,000"
            description="Ingresos generados"
          />
          <StatCard
            title="Promedio de Precio"
            value="$20,000"
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
  price: string;
  imageUrl: string;
}

const SaleCard: React.FC<SaleCardProps> = ({ carModel, saleDate, price, imageUrl }) => (
  <div className="bg-[#2d2d2d] p-4 rounded-lg shadow">
    <img className="w-full h-32 object-cover rounded-t-lg" src={imageUrl} alt={carModel} />
    <div className="mt-2">
      <h4 className="text-slate-100 font-bold text-lg">{carModel}</h4>
      <p className="text-slate-400 text-sm mt-1">Fecha de venta: {saleDate}</p>
      <p className="text-gray-100 font-semibold mt-2">{price}</p>
    </div>
  </div>
);

// Componente para mostrar un vehículo listado

const ListedCarCard: React.FC<ListedCarCardProps> = ({ carModel, price, imageUrl }) => (
  <div className="bg-[#2d2d2d] p-4 rounded-lg shadow">
    <img className="w-full h-32 object-cover rounded-t-lg" src={imageUrl} alt={carModel} />
    <div className="mt-2">
      <h4 className=" text-slate-100 font-bold text-lg">{carModel}</h4>
      <p className="text-slate-400 font-semibold mt-2">{price}</p>
      <div className="text-center mt-4">
        <button className="px-4 py-2 bg-[#232326] text-white rounded hover:bg-[#131212]">
          Ver más detalles
        </button>
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