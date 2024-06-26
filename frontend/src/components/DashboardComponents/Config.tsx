"use client";
import React, { useEffect, useState } from "react";
import SkeletonDashboard from "../sketelons/SkeletonDashboard";
import { IUserData } from "@/interfaces/IUser";
import { redirect, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import LoaderBasic from "../Loaders/loaderBasic";

const apiUserUrl = process.env.NEXT_PUBLIC_API_GET_USERS_TOKEN;
const apiUpdateUser = process.env.NEXT_PUBLIC_API_UPDATE_USER;

const Config = () => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  const [loadinData, setLoadingData] = useState<boolean>(true);
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);

  const handlePasswordChangeClick = () => {
    setIsPasswordEnabled((prevState) => !prevState);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userSession = localStorage.getItem("userSession");
      if (userSession) {
        const parsedSession = JSON.parse(userSession);
        setUserToken(parsedSession.token);
      } else {
        setLoading(false);
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
    const fetchData = async () => {
      setLoading(true);
      try {
      const apiKey = process.env.NEXT_PUBLIC_CUSTOM_HEADERS_KEY;

        const response = await fetch(`${apiUserUrl}`, {
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
        console.log(data);

        setUserData(data);
      } catch (error: any) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userToken) {
      fetchData();
    }
  }, [userToken]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData((prevData) => {
      if (prevData) {
        return {
          ...prevData,
          [name]: value,
          addresses: [{ ...prevData.addresses[0], [name]: value }],
        };
      }
      return prevData;
    });
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
      setNewProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingData(false);
    const formData = new FormData();
    if (newProfilePicture) {
      formData.append("file", newProfilePicture);
    }
    if (userData) {
      // Convertir phone y nDni a números
      const phone = Number(userData.phone);
      const nDni = Number(userData.nDni);

      if (isNaN(phone) || isNaN(nDni)) {
        Swal.fire({
          title: "Error al actualizar los datos",
          text: "El teléfono y el DNI deben ser números válidos",
          icon: "error",
        });
        return;
      }

      // Añadir los datos al FormData
      formData.append("name", userData.name);
      formData.append("password", userData.password);
      formData.append("phone", phone.toString());
      formData.append("nDni", nDni.toString());
      formData.append("address", userData.addresses[0]?.address);
      formData.append("city", userData.addresses[0]?.city);
      formData.append("state", userData.addresses[0]?.state);
      formData.append("country", userData.addresses[0]?.country);
      formData.append("zip_code", userData.addresses[0]?.zip_code);
      formData.append("rExpiration", userData.rExpiration);
    }
    Swal.fire({
      title: "¿Estás seguro de realizar los cambios?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
      const apiKey = process.env.NEXT_PUBLIC_CUSTOM_HEADERS_KEY;
          const response = await fetch(`${apiUpdateUser}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${userToken}`,
            [apiKey!]: process.env.NEXT_PUBLIC_CUSTOM_HEADERS_VALUE!,

            },
            body: formData,
          });

          if (!response.ok) {
            Swal.fire({
              title: "Error al actualizar los datos",
              text: "Los datos no pudieron actualizarse, inténtelo nuevamente",
              icon: "error",
            });
            throw new Error("Error updating user data");
          }

          const updatedData = await response.json();
          // setUserData(updatedData);
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
          setLoadingData(true);
          Toast.fire({
            icon: "success",
            title: "Sus datos se actualizaron correctamente",
          });
          window.location.replace("/settings");
        } catch (error: any) {
          Swal.fire({
            title: "Error al actualizar los datos",
            text: "Los datos no pudieron actualizarse, inténtelo nuevamente",
            icon: "error",
          });
          console.error("Error:", error);
        }
      }
    });
  };

  if (loading) {
    return <SkeletonDashboard />;
  }
  const handleRemoveImage = () => {
    setImagePreview(null);
    setNewProfilePicture(null);
  };
  return (
    <>
      <div className="bg-[#313139]">
        <div className="flex flex-col items-center p-4 font text-indigo-50">
          {imagePreview === null ? (
            <>
              <img
                src={userData?.image_url}
                alt="Profile"
                className="w-32 h-32 rounded-full"
              />
              <input type="file" onChange={handlePictureChange} />
            </>
          ) : (
            <>
              <img
                src={imagePreview}
                alt="Profile"
                className="w-32 h-32 rounded-full"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="bg-indigo-50 hover:bg-[#C4FF0D] text-slate-950 font-bold mt-2 py-1 px-1 border border-slate-950 rounded text-sm"
              >
                Eliminar imagen
              </button>
            </>
          )}
        </div>
        <div className="flex flex-col items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-[#A29E9E] shadow-md px-8 mx-32 pt-6 pb-8 flex flex-col max-w-6xl rounded-xl"
          >
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  disabled
                  type="text"
                  placeholder={userData?.email}
                />
                <p className="text-red text-xs italic">
                  Tu mail no puede ser modificado
                </p>
              </div>
              <div className="md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                  Cambiar Nombre
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  type="text"
                  name="name"
                  value={userData?.name || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                  Contraseña
                </label>
                <input
                  disabled={!isPasswordEnabled}
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                  type="password"
                  name="password"
                  placeholder="******************"
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={handlePasswordChangeClick}
                  className="text-grey-dark text-xs italic text-blue-800"
                >
                  Cambiar Contraseña
                </button>
              </div>
              <div className="md:w-1/2 px-3 flex mb-6 md:mb-0">
                <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="flex uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                    Celular
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                    type="text"
                    name="phone"
                    placeholder={userData?.phone || ""}
                    value={userData?.phone || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                    Documento
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                    type="text"
                    name="nDni"
                    value={userData?.nDni || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="md:w-1/3 px-3">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                    V. Registro
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    type="text"
                    name="rExpiration"
                    value={userData?.rExpiration || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="-mx-3 md:flex md:flex-wrap mb-2">
              <div className="md:w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                  Dirección
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  type="text"
                  name="address"
                  value={userData?.addresses[0]?.address || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:w-1/2 px-3 mb-6">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                  Ciudad
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  type="text"
                  name="city"
                  value={userData?.addresses[0]?.city || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:w-1/2 px-3 mb-6">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                  Provincia
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  type="text"
                  name="state"
                  value={userData?.addresses[0]?.state || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                  País
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  type="text"
                  name="country"
                  value={userData?.addresses[0]?.country || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                  Código Postal
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  type="text"
                  name="zip_code"
                  value={userData?.addresses[0]?.zip_code || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-[#232326] text-white rounded hover:bg-[#333335]"
            >

              {loadinData ? "Guardar cambios" : <LoaderBasic />}

            </button>
          </form>
        </div>
      </div>
      <div className="p-6 bg-[#313139]"></div>
    </>
  );
};

export default Config;
