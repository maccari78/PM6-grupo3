"use client";
import SkeletonDashboard from "@/components/sketelons/SkeletonDashboard";
import { validateLogin } from "@/helpers/validateLogin";
import { IErrorlogin, Ilogin } from "@/interfaces/ILogin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { LuEye } from "react-icons/lu";
import { FiEyeOff } from "react-icons/fi";

const apiUrl = process.env.NEXT_PUBLIC_API_SIGNIN_URL;
if (!apiUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_API_POSTS is not set");
}

const authApi = process.env.NEXT_PUBLIC_API_AUTH_LOGIN;

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
  const [showPassword, setShowPassword] = useState(false);

  console.log(error.password);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });

    const errors = validateLogin(userData);
    setError(errors);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
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
        setIsLoading(false);
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
      setIsLoading(false);
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

  const handleShowPass = () => {
    setShowPassword(!showPassword);
  };

  if (isLoading) {
    return <SkeletonDashboard></SkeletonDashboard>;
  }
  return (
    <>
      <div className="min-h-screen bg-[url('/background_register_2.svg')] flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 className="font-bold text-center text-white text-2xl mb-5">
            Bienvenido a{" "}
            <strong className="text-2xl text-[#C4FF0D]">YouDrive!</strong>
          </h1>
          <div className="bg-[#464545] border-2 border-[#a0c434] shadow w-full rounded-lg divide-y divide-y-gray-200">
            <div className="px-5 py-7">
              <form onSubmit={handleSubmit}>
                <label className="font-semibold text-sm text-gray-200 pb-1 block">
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
                      ? "border-[1px] focus:outline-[#b7e237] rounded-full px-3 py-2 mt-1 mb-2 text-sm w-full ring-red-500 text-red-700 border-red-600"
                      : "border-[1px]  focus:outline-[#b7e237] rounded-full px-3 py-2 mt-1 text-sm w-full "
                  }
                />
                {error.email && (
                  <p className="text-sm text-red-500 lg:mt-0 ">{error.email}</p>
                )}
                <label className="font-semibold text-sm text-gray-200 pb-1 mt-5 block">
                  Contraseña
                </label>
                <div className="flex flex-col">
                  <div className="flex flex-row items-center justify-center">
                    <input
                      id="password-login"
                      name="password"
                      value={userData.password}
                      type={showPassword ? "text" : "password"}
                      onChange={handleChange}
                      required
                      className={
                        error.password
                          ? "border-[1px] focus:outline-[#b7e237] rounded-full px-3 py-2 mt-1 mb-2 text-sm w-full ring-red-500 text-red-700 border-red-600"
                          : "border-[1px]  focus:outline-[#b7e237] rounded-full px-3 py-2 mt-1  text-sm w-full"
                      }
                    />
                    <button
                      type="button"
                      onClick={handleShowPass}
                      className="hover:bg-[#222222] px-2 rounded-xl py-2 flex flex-row justify-center items-center duration-200"
                    >
                      {showPassword ? (
                        <LuEye className=" text-[#a6cc32]" />
                      ) : (
                        <FiEyeOff className=" text-[#a6cc32]" />
                      )}
                    </button>
                  </div>
                  {error.password && (
                    <p className="text-sm text-red-500  lg:mt-0">
                      {error.password}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className=" w-full h-[30px] mt-5 px-3 py-2 text-sm content-center justify-center items-center  md:h-10 text-[#222222] md:py-5 flex md:text-base font-semibold bg-[#C4FF0D] rounded-lg shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#c3ff0d92] hover:cursor-pointer"
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
            <div className="p-8">
              <div className="flex flex-row justify-center">
                {/* <button
                  type="button"
                  className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                >
                  Twitter
                </button> */}
                <Link href={`${authApi}`}>
                  <button className="max-w-xs flex px-6 py-2 text-sm leading-5 font-bold text-center uppercase align-middle items-center rounded border border-gray-300 gap-3 text-gray-700 bg-white cursor-pointer transition-transform duration-600 ease-in-out hover:scale-105">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMidYMid"
                      viewBox="0 0 256 262"
                      className="h-6"
                    >
                      <path
                        fill="#4285F4"
                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                      ></path>
                      <path
                        fill="#34A853"
                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                      ></path>
                      <path
                        fill="#FBBC05"
                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                      ></path>
                      <path
                        fill="#EB4335"
                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                      ></path>
                    </svg>
                    Continuar con Google
                  </button>
                </Link>

                {/* <button
                  type="button"
                  className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                >
                  Github
                </button> */}
              </div>
            </div>
          </div>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center justify-start sm:text-left whitespace-nowrap">
                <Link href="/">
                  <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-200 hover:bg-[#464545] focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
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
