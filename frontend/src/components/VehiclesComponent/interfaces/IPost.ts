export interface IPost {
  id: string;
  title: string;
  description: string;
  price: number;
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
    availability: boolean;
    image_url: string[];
  };
}
