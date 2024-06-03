export interface IPost {
  id: string;
  title: string;
  description: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  car: {
    id: string;
    brand: string;
    model: string;
    year: number;
    mileage: string;
    color: string;
    price: number;
    availability: boolean;
    image_url: string;
  };
}
