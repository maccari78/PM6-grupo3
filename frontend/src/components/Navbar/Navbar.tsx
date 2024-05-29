'use client'
import { IUser } from "@/app/interfaces/IUser";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {

  const pathname = usePathname();

  const [userSession, setUserSession] = useState<IUser>();
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userToken = localStorage.getItem('userSession');
      setUserSession(JSON.parse(userToken!));
    }
  }, [pathname])

  return (
    <>
      <header className="flex flex-row justify-between items-center bg-[#222222] text-white p-6 font-sans">
        <div className="flex flex-row gap-4 items-center">
          <Image
            src='/logo.png'
            width={160}
            height={90}
            alt="Logo de la aplicacion You Drive">
          </Image>
          <form className="flex gap-4 w-28 md:w-52">
            <input type="string" placeholder="Buscar" className="h-8 rounded-md focus:outline-none text-black p-2"></input>
            <button type="button" className="b-none bg-transparent"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-4 fill-white"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg></button>
          </form>
        </div>
        <div className="flex flex-row items-center gap-8 font-medium">
          <Link href="#">Iniciar sesion</Link>
          <Link href="#">Registrarse</Link>
          <Link href="#" className="mr-2">Mi cuenta</Link>
        </div>
      </header>
    </>

  )

}
export default Navbar;
