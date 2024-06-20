export interface ICar {
  id: string;
  description: string;
  carId: string | undefined;
  carImg: string[] | undefined;
  carBrand: string | undefined;
  carModel: string | undefined;
  carYear: number | undefined;
  carMileage: string | undefined;
  carPrice: number | undefined;
  carAvailability: boolean | undefined;
}
