interface IVehicleData {
    title: string;
    description: string;
    price: number;
    color: string;
    model: string;
    image: FileList | null;
    brand: string;
    year: number;
    mileage: string;
}

export default IVehicleData;