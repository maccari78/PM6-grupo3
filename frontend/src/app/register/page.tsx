"use client";
import React, { useEffect, useState } from "react";
import IUserData from "../../interfaces/IRegisterProps";
import { validateRegister } from "@/helpers/validateRegister";
import axios from "axios";
import IRegisterErrorProps from "../../interfaces/IRegisterErrorProps";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import SkeletonDashboard from "@/components/sketelons/SkeletonDashboard";
import { LuEye } from "react-icons/lu";
import { FiEyeOff } from "react-icons/fi";

const apiUrl = process.env.NEXT_PUBLIC_API_SIGNUP_URL;
if (!apiUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_API_POSTS is not set");
}

const authApi = process.env.NEXT_PUBLIC_API_AUTH_LOGIN;

const Register = () => {
  const router = useRouter();

  const initialUserData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: 0,
    nDni: 0,
    city: "",
    state: "",
    country: "",
    zip_code: "",
    address: "",
  };
  const [userData, setUserData] = useState<IUserData>(initialUserData);
  const [errors, setErrors] = useState<IRegisterErrorProps>({});
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userToken = localStorage.getItem("userSession");
      setToken(JSON.parse(userToken!));
      userToken && redirect("/");
    }
  }, []);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserData((prevState) => {
      const updatedUserData = {
        ...prevState,
        [name]: value,
      };

      setErrors(validateRegister(updatedUserData));
      return updatedUserData;
    });
  };

  const handleBlur = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setErrors((prevState) => ({
      ...prevState,
      [name]:
        value.trim() === ""
          ? "Debes completar este campo"
          : (prevState as any)[name],
    }));
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Las contraseñas no coinciden" });
      return;
    }
    const formErrors = {};

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const auth = {
      ...userData,
      nDni: Number(userData.nDni),
      phone: Number(userData.phone),
    };
    setIsLoading(true);
    axios
      .post(apiUrl, auth)
      .then((response) => {
        if (response.data) {
          setUserData(initialUserData);
          Swal.fire({
            title: "Usuario registrado correctamente",
            text: "El usuario pudo registrarse correctamente en la aplicacion",
            icon: "success",
          });
          setIsLoading(false);
          router.push("/login");
        } else {
          Swal.fire({
            title: "Error al Registrarse",
            text: `${response.data}`,
            icon: "error",
          });
          setIsLoading(false);
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error al Registrarse",
          text: "Ha ocurrido un error en la conexión",
          icon: "error",
        });
        setIsLoading(false);
        console.error("Error:", error);
      });
  };

  const handleShowPass = () => {
    setShowPassword(!showPassword);
  };

  if (isLoading) {
    return <SkeletonDashboard></SkeletonDashboard>;
  }

  return (
    <div className="font-sans text-white m-0 bg-[url('/background_register_2.svg')] bg-no-repeat bg-cover relative z-3 w-full pt-[70px] px-[30px] pb-[44px] flex justify-center items-center min-h-screen bg-gray-900 h-min ">
      <div className="px-20 py-6 rounded-[12px] bg-black/10 ">
        <h2 className="text-2xl font-bold mb-6 text-center">
          ¡Registrate ahora!
        </h2>
        <div className="max-w-sm mx-auto">
          <form onSubmit={handleOnSubmit}>
            <div className="flex gap-8">
              <div className="mb-4 w-1/2">
                <label className="block text-white" htmlFor="name">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full mt-2 px-3 py-2 border rounded-lg focus:outline-none text-black focus:border-blue-500"
                  required
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                  value={userData.name}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>
              <div className="mb-4 w-1/2">
                <label className="block text-white mb-2" htmlFor="email">
                  Correo Electrónico
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none text-black focus:border-blue-500"
                  required
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                  value={userData.email}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
            </div>
            <div className="flex gap-8">
              <div className="mb-4 w-1/2">
                <label className="block text-white mb-2" htmlFor="nDni">
                  DNI
                </label>
                <input
                  type="number"
                  id="nDni"
                  name="nDni"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none text-black focus:border-blue-500"
                  required
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                  value={userData.nDni}
                />
                {errors.nDni && (
                  <p className="text-red-500 text-sm">{errors.nDni}</p>
                )}
              </div>
              <div className="mb-4 w-1/2">
                <label className="block text-white mb-2" htmlFor="phone">
                  Número de telefono
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none text-black focus:border-blue-500"
                  required
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                  value={userData.phone}
                />
                {errors.phone && (
                  <p className="text-red-500 w-fit text-sm">{errors.phone}</p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-white" htmlFor="address">
                Dirección
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="w-full mt-2 px-3 py-2 border rounded-lg focus:outline-none text-black focus:border-blue-500"
                required
                onChange={handleOnChange}
                onBlur={handleBlur}
                value={userData.address}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>
            <div className="flex gap-8">
              <div className="mb-4 w-1/2">
                <label className="block text-white mb-2" htmlFor="city">
                  Ciudad
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none text-black focus:border-blue-500"
                  required
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                  value={userData.city}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city}</p>
                )}
              </div>
              <div className="mb-4 w-1/2">
                <label className="block text-white mb-2" htmlFor="state">
                  Estado
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none text-black focus:border-blue-500"
                  required
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                  value={userData.state}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state}</p>
                )}
              </div>
            </div>
            <div className="flex gap-8">
              <div className="mb-4 w-1/2">
                <label className="block text-white mb-2" htmlFor="country">
                  País
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none text-black focus:border-blue-500"
                  required
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                  value={userData.country}
                />
                {errors.country && (
                  <p className="text-red-500 text-sm">{errors.country}</p>
                )}
              </div>
              <div className="mb-4 w-1/2">
                <label className="block text-white mb-2" htmlFor="zip_code">
                  Código postal
                </label>
                <input
                  type="text"
                  id="zip_code"
                  name="zip_code"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none text-black focus:border-blue-500"
                  required
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                  value={userData.zip_code}
                />
                {errors.zip_code && (
                  <p className="text-red-500 text-sm">{errors.zip_code}</p>
                )}
              </div>
            </div>
            <div className="flex gap-8">
              <div className="mb-4 w-1/2">
                <label className="block text-white mb-2" htmlFor="password">
                  Contraseña
                </label>
                <div className="flex row">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none text-black focus:border-blue-500"
                    required
                    onChange={handleOnChange}
                    onBlur={handleBlur}
                    value={userData.password}
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
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <div className="mb-4 w-1/2">
                <label
                  className="block text-white mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirmar Contraseña
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none text-black focus:border-blue-500"
                  required
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className=" w-3/4  text-black py-2 rounded-lg  transition  mb-4 bg-[#C4FF0D] shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#c3ff0d92]"
              >
                Registrarse
              </button>
            </div>
          </form>
          <div className="flex justify-center">
            <Link
              href={`${authApi}`}
              className="w-3/4 transition duration-200 border border-gray-200 text-slate-50 hover:shadow-[#c3ff0d92] py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center"
            >
              Ingresar con Google
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
