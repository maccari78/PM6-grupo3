'use client'
import { useState } from "react";

const VehicleForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [color, setColor] = useState("");
    const [vehicleModel, setVehicleModel] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [brand, setBrand] = useState("");
    const [vehicleYear, setVehicleYear] = useState("");
    const [mileage, setMileage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="bg-[#2c2c2c] font-sans text-white">
            <div className="flex flex-col gap-2 p-4 items-center">
                <h1 className=" text-xl font-semibold mt-6">¡Publica tu vehiculo ahora!</h1>
                <span className="text-lg">Rápido, sencillo, y gratuito.</span>
            </div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 flex-wrap bg-[#222222] rounded">
                    <div className="block mb-4">
                        <label className=" text-slate-50">Título</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded text-[#222222]"
                        />
                    </div>
                    <div className="block mb-4">
                        <label className=" text-slate-50">Descripción</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded text-[#222222]"
                        />
                    </div>

                <div className="flex gap-8">
                    <div className="mb-4">
                        <label className="text-slate-50">Valor</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded text-[#222222]"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-slate-50">Marca</label>
                        <input
                            type="string"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded text-[#222222]"
                        />
                    </div>
                </div>
                <div  className="flex gap-8">
                    <div className="mb-4">
                        <label className="text-slate-50">Color</label>
                        <input
                            type="text"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded text-[#222222]"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-slate-50">Modelo</label>
                        <input
                            type="text"
                            value={vehicleModel}
                            onChange={(e) => setVehicleModel(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded text-[#222222]"
                        />
                    </div>
                </div>
                <div  className="flex gap-8">
                    <div className="mb-4 w-1/2">
                        <label className="text-slate-50">Año</label>
                        <input
                            type="number"
                            value={vehicleYear}
                            onChange={(e) => setVehicleYear(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded text-[#222222]"
                        />
                    </div>
                    <div className="mb-4 w-1/2">
                        <label className="text-slate-50">Kilometraje</label>
                        <input
                            type="string"
                            value={mileage}
                            onChange={(e) => setMileage(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded text-[#222222]"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="text-slate-50">Fotos</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        required
                        className="w-full px-3 py-4 border rounded text-slate-50"
                    />
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
