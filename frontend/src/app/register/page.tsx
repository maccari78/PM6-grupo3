'use client'
import React, { useEffect, useState } from "react";
import IUserData from "../interfaces/IRegisterProps";
import { validateRegister } from "@/helpers/validateRegister";
import Image from "next/image";

interface IErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  city?: string;
  phoneNumber?: string;
}

const Register = () => {

  const [userData, setUserData] = useState<IUserData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState<IErrors>({});

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserData(prevState => {
      const updatedUserData = {
        ...prevState,
        [name]: value
      };

      setErrors(validateRegister(updatedUserData));
      return updatedUserData;
    });
  }

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setErrors(prevState => ({
      ...prevState,
      [name]: value.trim() === '' ? 'Este campo es requerido' : (prevState as any)[name]
    }));
  }

  return (
    <>
      <div className=" flex items-center justify-center min-h-screen bg-gradient-to-bl from-[#222222] to-[#313139] font-sans text-white">
        <div className="max-w-xl mx-auto p-8 flex-wrap z-10 bg-[#222222] rounded-lg ">
          <h2 className="text-2xl font-bold mb-6 text-center">Registrarse</h2>
          <div
            className="relative inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
          </div>
          <form>
            <div className="flex gap-8">
              <div className="mb-4">
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
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div className="mb-4">
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
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
            </div>
            <div className="flex gap-8">
              <div className="mb-4">
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
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="phoneNumber">
                  Numero de telefono
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none text-black focus:border-blue-500"
                  required
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
              </div>
            </div>
            <div className="flex gap-8">
              <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="password">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none text-black focus:border-blue-500"
                  required
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
              <div className="mb-6">
                <label className="block text-white mb-2" htmlFor="confirmPassword">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none text-black focus:border-blue-500"
                  required
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#C4FF0D] text-black py-2 rounded-lg hover:bg-[#c8ff24] transition duration-300"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
