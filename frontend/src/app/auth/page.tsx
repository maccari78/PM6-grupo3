"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/Loaders/loaderAuth";

const Auth: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const sessionData: { [key: string]: string } = {};

    params.forEach((value, key) => {
      sessionData[key] = value;
      console.log(`Parametro guardado: ${key} = ${value}`);
    });

    localStorage.setItem("userSession", JSON.stringify(sessionData));

    setTimeout(() => {
      setLoading(false);
      router.push("/user");
    }, 2000);
  }, [router, searchParams]);

  return (
    <div>
      <h1 className="mt-4 text-center font-bold font-sans text-4xl">
        AUTENTICANDO TUS CREDENCIALES...
      </h1>
      <div className="flex items-center justify-center h-screen">
        <div className='flex justify-center items-center"'>
          {loading ? <Loader /> : <Loader />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
