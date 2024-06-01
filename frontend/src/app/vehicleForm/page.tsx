'use client'
import validate from "@/helpers/validate";
import { useState } from "react";
import IVehicleData from "../interfaces/IVehicleData";
import IErrorsVehicleForm from "../interfaces/IErrorsVehicleForm";


const VehicleForm = () => {

    const [errors, setErrors] = useState<IErrorsVehicleForm>({});
    const [vehicleData, setVehicleData] = useState<IVehicleData>({
        title: '',
        description: '',
        price: '',
        color: '',
        vehicleModel: '',
        image: null,
        brand: '',
        vehicleYear: '',
        mileage: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setVehicleData(prevData => ({
            ...prevData,
            [name]: value
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: value.trim() === '' ? 'Este campo es requerido' : ''
        }));
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: value.trim() === '' ? 'Este campo es requerido' : ''
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate(vehicleData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const uploadedImages = await Promise.all(
                    Array.from(vehicleData.image!).map(async (file) => {
                        const formData = new FormData();
                        formData.append("file", file);
                        formData.append("upload_preset", "g3henry"); 

                        const res = await fetch(
                            "https://api.cloudinary.com/v1_1/dkent00db/image/upload", 
                            {
                                method: "POST",
                                body: formData,
                            }
                        );

                        const data = await res.json();
                        console.log(data)
                        return data.secure_url;
                    })
                );

                const vehicleDataWithImages = {
                    ...vehicleData,
                    image: uploadedImages
                };

                const response = await fetch("/api/vehicles", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(vehicleDataWithImages),
                });

                if (response.ok) {
                    alert("Vehículo publicado con éxito");
                } else {
                    alert("Error al publicar el vehículo");
                }
            } catch (error) {
                console.error("Error al subir las imágenes o publicar el vehículo", error);
            }
        }
    };


    return (
        <div className="bg-[#2c2c2c] font-sans text-white">
            <div className="flex flex-col gap-2 p-4 items-center">
                <h1 className=" text-4xl font-semibold mt-6">¡Publica tu vehículo ahora!</h1>
                <span className="text-xl">Rápido, sencillo, y gratuito.</span>
            </div>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-8 flex-wrap bg-[#222222] rounded">
                <div className="block mb-4">
                    <label className=" text-slate-50">Título</label>
                    <input
                        name="title"
                        type="text"
                        value={vehicleData.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className="w-full px-3 mt-3 py-2 border rounded text-[#222222]"
                    />
                    {errors.title && <span className="text-red-500">{errors.title}</span>}
                </div>
                <div className="block mb-4">
                    <label className=" text-slate-50">Descripción</label>
                    <textarea
                        name='description'
                        value={vehicleData.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className="w-full px-3 mt-3 py-2 border rounded text-[#222222]"
                    />
                    {errors.description && <span className="text-red-500">{errors.description}</span>}
                </div>
                <div className="flex gap-8">
                    <div className="mb-4">
                        <label className="text-slate-50">Valor</label>
                        <input
                            name='price'
                            type="number"
                            value={vehicleData.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className="w-full px-3 mt-3 py-2 border rounded text-[#222222]"
                        />
                        {errors.price && <span className="text-red-500">{errors.price}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="text-slate-50">Marca</label>
                        <input
                            name='brand'
                            type="text"
                            value={vehicleData.brand}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className="w-full px-3 mt-3 py-2 border rounded text-[#222222]"
                        />
                        {errors.brand && <span className="text-red-500">{errors.brand}</span>}
                    </div>
                </div>
                <div className="flex gap-8">
                    <div className="mb-4">
                        <label className="text-slate-50">Color</label>
                        <input
                            name='color'
                            type="text"
                            value={vehicleData.color}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className="w-full px-3 mt-3 py-2 border rounded text-[#222222]"
                        />
                        {errors.color && <span className="text-red-500">{errors.color}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="text-slate-50">Modelo</label>
                        <input
                            name='vehicleModel'
                            type="text"
                            value={vehicleData.vehicleModel}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className="w-full px-3 mt-3 py-2 border rounded text-[#222222]"
                        />
                        {errors.vehicleModel && <span className="text-red-500">{errors.vehicleModel}</span>}
                    </div>
                </div>
                <div className="flex gap-8">
                    <div className="mb-4 w-1/2">
                        <label className="text-slate-50">Año</label>
                        <input
                            name='vehicleYear'
                            type="number"
                            value={vehicleData.vehicleYear}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className="w-full px-3 mt-3 py-2 border rounded text-[#222222]"
                        />
                        {errors.vehicleYear && <span className="text-red-500">{errors.vehicleYear}</span>}
                    </div>
                    <div className="mb-4 w-1/2">
                        <label className="text-slate-50">Kilometraje</label>
                        <input
                            name='mileage'
                            type="text"
                            value={vehicleData.mileage}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className="w-full px-3 mt-3 py-2 border rounded text-[#222222]"
                        />
                        {errors.mileage && <span className="text-red-500">{errors.mileage}</span>}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="text-slate-50">Fotos</label>
                    <input
                        name='image'
                        type="file"
                        accept="image/*"
                        required
                        multiple
                        className="w-full px-3 mt-3 py-4 border rounded text-slate-50"
                    />
                    {errors.image && <span className="text-red-500">{errors.image}</span>}
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="mb-6 w-32 items-center bg-[#C4FF0D] text-[#222222] py-2 rounded">
                        Publicar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VehicleForm;

