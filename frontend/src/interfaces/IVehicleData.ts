interface IVehicleData {
	title: string;
	description: string;
	price: number;
	color: string;
	model: string;
	file: FileList | null;
	brand: string;
	year: number;
	mileage: string;
	image_url: string[];
}

export default IVehicleData;
