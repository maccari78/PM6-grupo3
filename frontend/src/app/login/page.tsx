"use client";
import SkeletonDashboard from "@/components/sketelons/SkeletonDashboard";
import { validateLogin } from "@/helpers/validateLogin";
import { IErrorlogin, Ilogin } from "@/interfaces/ILogin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const apiUrl = process.env.NEXT_PUBLIC_API_SIGNIN_URL;
if (!apiUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_API_POSTS is not set");
}

const Login = () => {
  interface ApiError {
    message: string;
    error: string;
    statusCode: number;
  }
  const router = useRouter();

  const [userData, setUserData] = useState<Ilogin>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<IErrorlogin>({
    email: "",
    password: "",
  });
  const [errorAPI, setErrorAPI] = useState<ApiError | null>(null);
  const [session, setSession] = useState({ token: null });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const errors = validateLogin(userData);
    setError(errors);
  }, [userData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true)
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
      });

      if (!response.ok) {
        setIsLoading(false)
        const errorData: ApiError = await response.json();
        throw errorData;
      }

      const json = await response.json();

      const token = json;
      localStorage.setItem("userSession", JSON.stringify(token));
      setSession({ token });
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
        icon: "success",
        title: "Has iniciado sesion con exito",
      });
      router.push("/");
    } catch (err) {
      setIsLoading(false)
      if (typeof err === "object" && err !== null && "message" in err) {
        // Si el error es un objeto y contiene la propiedad 'message'
        const apiError = err as ApiError;
        setErrorAPI(apiError);
        Swal.fire({
          title: "Error al iniciar sesion",
          text: `${apiError.message}`,
          icon: "error",
        });
      } else if (err instanceof Error) {
        // Si el error es una instancia de Error nativa
        setErrorAPI({
          message: err.message,
          error: "Error",
          statusCode: 500,
        });
        alert(`Error: ${err.message}`);
      } else {
        // Otro tipo de error
        const unknownError: ApiError = {
          message: "Ha ocurrido un error desconocido",
          error: "Unknown Error",
          statusCode: 500,
        };
        setErrorAPI(unknownError);
        Swal.fire({
          title: "Por favor intentelo más tarde",
          text: `${unknownError.message}`,
          icon: "error",
        });
      }
    }
  };

  if (isLoading) {
    return <SkeletonDashboard></SkeletonDashboard>
  }
  return (
    <>
      <div className="min-h-screen bg-[url('/background_register_2.svg')] flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 className="font-bold text-center text-white text-2xl mb-5">
            Bienvenido a YouDrive!
          </h1>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7">
              <form onSubmit={handleSubmit}>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  E-mail
                </label>
                <input
                  id="email-login"
                  name="email"
                  value={userData.email}
                  required
                  onChange={handleChange}
                  type="text"
                  className={
                    error.email
                      ? "border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full ring-red-500 text-red-700 border-red-600"
                      : "border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  }
                />
                {error.email && (
                  <p className="text-sm text-red-500 lg:mt-0 ">{error.email}</p>
                )}
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Contraseña
                </label>
                <input
                  id="password-login"
                  name="password"
                  value={userData.password}
                  type="password"
                  onChange={handleChange}
                  required
                  className={
                    error.password
                      ? "border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full ring-red-500 text-red-700 border-red-600"
                      : "border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  }
                />
                {error.password && (
                  <p className="text-sm text-red-500 lg:mt-0">
                    {error.password}
                  </p>
                )}
                <button
                  type="submit"
                  className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                  <span className="inline-block mr-2">Iniciar Sesion</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </form>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 gap-1">
                {/* <button
                  type="button"
                  className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                >
                  Twitter
                </button> */}
                <a href="http://localhost:3001/auth/google/login">
                  <button
                    type="button"
                    className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                  >
                    Google
                  </button>
                </a>

                {/* <button
                  type="button"
                  className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                >
                  Github
                </button> */}
              </div>
            </div>
            <div className="py-5">
              <div className="grid grid-cols-2 gap-1">
                <div className="text-center sm:text-left whitespace-nowrap">
                  <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block align-text-top"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="inline-block ml-1">
                      Olvide mi contraseña
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center justify-start sm:text-left whitespace-nowrap">
                <Link href="/">
                  <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block align-text-top"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    <span className="inline-block ml-1">Volver al inicio</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
