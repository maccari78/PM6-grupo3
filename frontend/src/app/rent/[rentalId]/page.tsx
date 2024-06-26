"use client";
import validate from "@/helpers/validate";
import { useEffect, useState } from "react";
import IVehicleData from "../../../interfaces/IVehicleData";
import IErrorsVehicleForm from "../../../interfaces/IErrorsVehicleForm";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import SkeletonDashboard from "@/components/sketelons/SkeletonDashboard";
import Swal from "sweetalert2";

const UploadPost = ({ params }: { params: { rentalId: string } }) => {
  const id = params.rentalId;
  const router = useRouter();
  console.log(router);
  const apiUrl = `${process.env.NEXT_PUBLIC_API_POSTS}/${id}`;
  if (!apiUrl) {
    throw new Error("Environment variable NEXT_PUBLIC_API_POSTS is not set");
  }

  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [userSession, setUserSession] = useState<string | null>(null);
  const [errors, setErrors] = useState<IErrorsVehicleForm>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [deleteImage, setDeleteImage] = useState<string[]>([]);
  const [vehicleData, setVehicleData] = useState<IVehicleData>({
    title: "",
    description: "",
    price: 0,
    color: "",
    model: "",
    file: null,
    brand: "",
    year: 0,
    mileage: "",
    image_url: [],
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userSession = localStorage.getItem("userSession");
      if (userSession) {
        const parsedSession = JSON.parse(userSession);
        setToken(parsedSession.token);
      }
      !userSession && router.push("/login");
    }
  }, []);

  // Cargar los datos del vehículo
  useEffect(() => {
    const fetchVehicleData = async () => {
      const apiKey = process.env.NEXT_PUBLIC_CUSTOM_HEADERS_KEY;
      setIsLoading(true);
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            [apiKey!]: process.env.NEXT_PUBLIC_CUSTOM_HEADERS_VALUE!,
          },
        });

        const vehicleProps = {
          title: response.data.title,
          description: response.data.description,
          price: response.data.price,
          color: response.data.car.color,
          model: response.data.car.model,
          file: response.data.image_url,
          brand: response.data.car.brand,
          year: response.data.car.year,
          mileage: response.data.car.mileage,
          image_url: response.data.car.image_url,
        };
        setVehicleData(vehicleProps);
        setIsLoading(false);

        if (response.data.ownerId === userSession) {
          setIsOwner(true);
        }
      } catch (error) {
        console.error("Error al cargar los datos del vehículo:", error);
      }
    };

    fetchVehicleData();
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === "file") {
      setVehicleData((prevData) => ({
        ...prevData,
        [name]: files,
      }));
      if (files) {
        const filesArray = Array.from(files);
        const previewsArray: string[] = [];

        filesArray.forEach((file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            previewsArray.push(reader.result as string);
            if (previewsArray.length === filesArray.length) {
              setImagePreview(previewsArray);
            }
          };
          reader.readAsDataURL(file);
        });
      }
    } else {
      setVehicleData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "" ? "Este campo es requerido" : "",
    }));
  };

  const hasErrors = (): boolean => {
    return Object.values(vehicleData).some(
      (value) => value === "" || value == 0 || value === null
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar los datos del vehículo
    const validationErrors = validate(vehicleData);
    setErrors(validationErrors);

    // Si no hay errores de validación, proceder con el envío
    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();
      formData.append("title", vehicleData.title);
      formData.append("description", vehicleData.description);
      formData.append("price", vehicleData.price.toString());
      formData.append("color", vehicleData.color);
      formData.append("model", vehicleData.model);
      formData.append("brand", vehicleData.brand);
      formData.append("year", vehicleData.year.toString());
      formData.append("mileage", vehicleData.mileage);

      // Si hay archivos, adjuntarlos al formData
      if (vehicleData.file && vehicleData.file.length > 0) {
        for (let i = 0; i < vehicleData.file.length; i++) {
          formData.append("file", vehicleData.file[i]);
        }
      }
      if (deleteImage.length > 0) {
        deleteImage.forEach((url) => {
          formData.append("image_url", url);
        });
      }
      setIsLoading(true);
      
      try {
      const apiKey = process.env.NEXT_PUBLIC_CUSTOM_HEADERS_KEY;
        // Enviar los datos al servidor
        const response = await axios.put(apiUrl, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            [apiKey!]: process.env.NEXT_PUBLIC_CUSTOM_HEADERS_VALUE!,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Respuesta del servidor:", response);
        if (response.data) {
          Swal.fire("Vehiculo actualizado correctamente!");
          setIsLoading(false);
          router.push("/");
        } else {
          const errorMessage =
            response.data?.message || "Respuesta del servidor no válida.";
          Swal.fire({
            title: "Error",
            text: `${errorMessage}`,
          });
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error al actualizar el vehículo:", error);
        setIsLoading(false);
        Swal.fire({
          title: "Error",
          text: "Hubo un error al intentar actualizar la publicación",
        });
      }
    }
  };

  // if (!isOwner) {
  //     return <div>No tienes permiso para editar esta publicación.</div>;
  // }

  if (isLoading) {
    return <SkeletonDashboard />;
  }

  const handleRemoveImage = (index: number) => {
    const updatedPreviews = [...imagePreview];
    updatedPreviews.splice(index, 1);
    setImagePreview(updatedPreviews);

    if (vehicleData.file) {
      const updatedFiles = Array.from(vehicleData.file);
      updatedFiles.splice(index, 1);
      setVehicleData((prevData) => ({
        ...prevData,
        file:
          updatedFiles.length > 0
            ? (updatedFiles as unknown as FileList)
            : null,
      }));
    }
  };
  const handleRemoveExistingImage = (src: string) => {
    const updatedImageUrls = vehicleData?.image_url?.filter(
      (url) => url !== src
    );
    setVehicleData((prevData) => ({
      ...prevData,
      image_url: updatedImageUrls,
    }));

    setDeleteImage((prevState) => [...prevState, src]);
  };
  console.log(vehicleData.image_url, deleteImage);

  const brands = [
    "Kia",
    "Chevrolet",
    "Mazda",
    "Ford",
    "Toyota",
    "Ferrari",
    "Honda",
    "Volkswagen",
    "Audi",
    "Jeep",
    "Mercedes-Benz",
    "Fiat",
    "Renault",
    "Nissan",
    "Peugeot",
    "BMW",
    "Otra..."
  ];

  const models = [
    "F-150",
    "Sorento",
    "Camaro",
    "Picanto",
    "Focus",
    "Stradale",
    "A3",
    "Compas",
    "Corolla",
    "Golf",
    "Fiesta",
    "Territory",
    "Otro...",
  ];

  return (
    <div className="bg-gradient-to-bl from-[#222222] to-[#313139] font-sans text-white">
      <div className="flex flex-col gap-2 p-4 items-center">
        <h1 className="text-4xl font-semibold mt-6">¡Edita tu vehículo!</h1>
        <span className="text-xl">Ajusta los detalles necesarios.</span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-8 flex-wrap bg-[#222222] rounded"
      >
        <div className="block mb-4">
          <label className=" text-slate-50">Título</label>
          <input
            name="title"
            type="text"
            value={vehicleData.title}
            onChange={handleChange}
            required
            className="w-full px-3 mt-3 py-2 border rounded text-[#222222]"
          />
          {errors.title && <span className="text-red-500">{errors.title}</span>}
        </div>
        <div className="block mb-4">
          <label className=" text-slate-50">Descripción</label>
          <textarea
            name="description"
            value={vehicleData.description}
            onChange={handleChange}
            required
            className="w-full px-3 mt-3 py-2 border rounded text-[#222222]"
          />
          {errors.description && (
            <span className="text-red-500">{errors.description}</span>
          )}
        </div>
        <div className="flex gap-8">
          <div className="mb-4">
            <label className="text-slate-50">Valor</label>
            <input
              name="price"
              type="number"
              value={vehicleData.price}
              onChange={handleChange}
              required
              className="w-full px-3 mt-3 py-2 border rounded text-[#222222]"
            />
            {errors.price && (
              <span className="text-red-500">{errors.price}</span>
            )}
          </div>
          <div className="mb-4 w-1/2">
            <label className="text-slate-50">Selecciona la marca</label>
            <select
              name="brand"
              value={vehicleData.brand}
              onChange={handleChange}
              required
              className="w-full px-3 mt-3 py-2 border rounded text-[#222222]"
            >
              <option value="" disabled>
                Selecciona la marca...
              </option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            {errors.brand && (
              <span className="text-red-500">{errors.brand}</span>
            )}
          </div>
        </div>
        <div className="flex gap-8">
          <div className="mb-4 w-1/2">
            <label className="text-slate-50">Selecciona el color</label>
            <select
              name="color"
              value={vehicleData.color}
              onChange={handleChange}
              required
              className="w-full px-3 mt-3 py-2 border rounded text-[#222222]"
            >
              <option value="" disabled>
                Selecciona el color...
              </option>
              <option value="Azul">Azul</option>
              <option value="Verde">Verde</option>
              <option value="Negro">Negro</option>
              <option value="Blanco">Blanco</option>
              <option value="Rojo">Rojo</option>
            </select>
            {errors.color && (
              <span className="text-red-500">{errors.color}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="text-slate-50">Modelo</label>
            <select
              name="model"
              value={vehicleData.model}
              onChange={handleChange}
              required
              className="w-full px-3 mt-3 py-2 border rounded text-[#222222]"
            >
              <option value="" disabled>
                Selecciona el modelo...
              </option>
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
            {errors.model && (
              <span className="text-red-500">{errors.model}</span>
            )}
          </div>
        </div>
        <div className="flex gap-8">
          <div className="mb-4 w-1/2">
            <label className="text-slate-50">Año</label>
            <input
              name="year"
              type="number"
              value={vehicleData.year}
              onChange={handleChange}
              required
              className="w-full px-3 mt-3 py-2 border rounded text-[#222222]"
            />
            {errors.year && <span className="text-red-500">{errors.year}</span>}
          </div>
          <div className="mb-4 w-1/2">
            <label className="text-slate-50">Selecciona el kilometraje</label>
            <select
              name="mileage"
              value={vehicleData.mileage}
              onChange={handleChange}
              required
              className="w-full px-3 mt-3 py-2 border rounded text-[#222222]"
            >
              <option value="" disabled>
                Selecciona el kilometraje...
              </option>
              <option value="Menos de 50.000km">Menos de 50.000km</option>
              <option value="50.000km - 100-000km">50.000km - 100-000km</option>
              <option value="100.000km - 150.000km">
                100.000km - 150.000km
              </option>
              <option value="Más de 150.000km">Más de 150.000km</option>
            </select>
            {errors.mileage && (
              <span className="text-red-500">{errors.mileage}</span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="text-slate-50">Fotos</label>
          <input
            name="file"
            type="file"
            accept="image/*"
            multiple
            className="w-full px-3 mt-3 py-4 border rounded text-slate-50"
            onChange={handleChange}
            required
          />
          {errors.image && <span className="text-red-500">{errors.image}</span>}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={hasErrors()}
            className="mb-6 w-32 items-center bg-[#C4FF0D] text-[#222222] py-2 rounded disabled:bg-slate-300"
          >
            Actualizar
          </button>
        </div>
        {vehicleData.image_url && vehicleData?.image_url?.length > 0 && (
          <p className="text-[#C4FF0D] text-center text-lg font-semibold mb-5">
            Tus imagenes actuales
          </p>
        )}
        {vehicleData?.image_url &&
          vehicleData?.image_url?.map((url) => (
            <div
              key={url}
              style={{
                position: "relative",
                display: "inline-block",
                margin: "10px",
              }}
            >
              <img
                style={{ width: "200px", height: "200px" }}
                src={url}
                alt={url}
              />
              <button
                type="button"
                onClick={() => handleRemoveExistingImage(url)}
                className=" bg-red-500 text-white rounded-full relative -top-5 -right-10 p-2"
              >
                Eliminar Imagen
              </button>
            </div>
          ))}
        {imagePreview.length > 0 && (
          <p className="text-[#C4FF0D] text-center text-lg font-semibold mb-5">
            Nuevas imagenes
          </p>
        )}
        {imagePreview.map((preview, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              display: "inline-block",
              margin: "10px",
            }}
          >
            <img
              src={preview}
              alt={`preview ${index}`}
              style={{ width: "200px", height: "200px" }}
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className=" bg-red-500 text-white rounded-full relative -top-5 -right-10 p-2"
            >
              Eliminar imagen
            </button>
          </div>
        ))}
      </form>
    </div>
  );
};

export default UploadPost;
