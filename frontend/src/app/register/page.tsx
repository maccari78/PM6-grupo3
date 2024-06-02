'use client'
import React, { useEffect, useState } from "react";
import IUserData from "../interfaces/IRegisterProps";
import { validateRegister } from "@/helpers/validateRegister";
import axios from "axios";
import IRegisterErrorProps from "../interfaces/IRegisterErrorProps";

const Register = () => {

  const initialUserData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: 0,
    nDni: 0,
    city: '',
    state: '',
    country: '',
    zip_code: '',
    address: ''
  }
  const [userData, setUserData] = useState<IUserData>(initialUserData);

  const [errors, setErrors] = useState<IRegisterErrorProps>({});

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

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      setErrors({ ...errors, confirmPassword: 'Las contraseñas no coinciden' });
      return;
    }
    const formErrors = {};

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const auth = { ...userData, nDni: Number(userData.nDni), phone: Number(userData.phone) }

    axios.post('http://localhost:3001/auth/signup', auth)
      .then(response => {
        if (response.data.success) {
          setUserData(initialUserData);
          alert(`Usuario registrado correctamente`);
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        alert('Ha ocurrido un error en la conexión');
        console.error('Error:', error);
      });
  }

  const handleGoogleAuth = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/auth/google/login')
      // const { data } = await axios.get('http://localhost:3001/auth/google/redirect')
      return data;
    } catch (error: any) {
      return {
        message: error.message,
        status: error.response?.status
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-bl from-[#222222] to-[#313139] font-sans text-white">
      <div className="max-w-xl mx-auto p-8 flex-wrap z-10 bg-[#222222] rounded-lg ">
        <h2 className="text-2xl font-bold mb-6 text-center">Registrarse</h2>
        <div
          className="relative inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div>
        <form onSubmit={handleOnSubmit}>
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
                value={userData.name}
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
                value={userData.email}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
          </div>
          <div className="flex gap-8">
            <div className="mb-4">
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
              {errors.nDni && <p className="text-red-500 text-sm">{errors.nDni}</p>}
            </div>
            <div className="mb-4">
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
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
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
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
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
                value={userData.city}
              />
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>
            <div className="mb-4">
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
              {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
            </div>
          </div>
          <div className="flex gap-8">
            <div className="mb-4">
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
              {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
            </div>
            <div className="mb-4">
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
              {errors.zip_code && <p className="text-red-500 text-sm">{errors.zip_code}</p>}
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
                value={userData.password}
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
        <button type="button" onClick={handleGoogleAuth}>Continuar con google</button>
      </div>
    </div>
  );
};

export default Register;
