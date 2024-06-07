'use client'
import React, { useEffect, useState } from "react";
import SkeletonDashboard from "../sketelons/SkeletonDashboard";
import { IUserData } from "@/interfaces/IUser";

import { redirect, useRouter } from "next/navigation";


const Config = () => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userSession = localStorage.getItem("userSession");
      if (userSession) {
        const parsedSession = JSON.parse(userSession);
        setUserToken(parsedSession.token);
      } else {
        setLoading(false)
        alert("Necesitas estar logueado para ingresar");
        redirect("/login");
      }
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/users/token`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching user data");
        }

        const data = await response.json();
        setUserData(data);
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
    return <SkeletonDashboard/>;
  }
  return(
    <>
    <div className="bg-[#313139]">
      <div className="flex flex-col items-center p-4">
      <img
        src={userData?.image_url}
        alt="Profile"
        className="w-32 h-32 rounded-full"
      />
      <button className="mt-4 px-4 py-2 bg-[#232326] text-white rounded hover:bg-[#333335]">
        Cambiar imagen de perfil
      </button>
    </div>
    <div className=" bg-[#A29E9E] shadow-md rounded px-8 ml-32 mr-32 pt-6 pb-8 flex flex-col">
  <div className="-mx-3 md:flex mb-6">
    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
        Email
      </label>
      <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" disabled id="grid-first-name" type="text" placeholder={userData?.email}/>
      <p className="text-red text-xs italic">Tu mail no puede ser modificado</p>
    </div>
    <div className="md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
        Cambiar Nombre 
      </label>
      <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder={userData?.name}/>
    </div>
  </div>
  <div className="-mx-3 md:flex mb-6">
    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
        Contraseña
      </label>
      <input disabled className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password" type="password" placeholder="******************"/>
      <button className="text-grey-dark text-xs italic text-blue-800">Cambiar Contraseña</button>
    </div>
    <div className="md:w-1/2 px-3 flex mb-6 md:mb-0">
        <div className="md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="flex uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                celular
            </label>
            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password" type="text" placeholder={userData?.phone}/>
        </div>
        <div className=" md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Documento
            </label>
            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password" type="text" placeholder={userData?.nDni.toString()}/>
        </div>
    </div>
  </div>
  
  <div className="-mx-3 md:flex mb-2">
    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
        Provincia
      </label>
      <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-city" type="text" placeholder={userData?.addresses[0].city}/>
    </div>
    <div className="md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
        Codigo Postal
      </label>
      <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-zip" type="text" placeholder={userData?.addresses[0].zip_code}/>
    </div>
    <div className="md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
        Vencimiento del registro
      </label>
      <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-zip" type="text" placeholder={userData?.rExpiration}/>
    </div>

  </div>
  
  <button className="mt-4 px-4 py-2 bg-[#232326] text-white rounded hover:bg-[#333335]">
        Guardar cambios
    </button>
</div>
</div>
<div className="p-6 bg-[#313139]"></div>
    </>
)};

export default Config;
