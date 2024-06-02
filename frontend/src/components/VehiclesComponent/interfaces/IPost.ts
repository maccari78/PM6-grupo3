export interface IPost {
  id: number;
  title: string;
  description: string;
  user_id: {
    id: number;
    name: string;
    lastname: string;
    email: string;
  };
  cars_id: {
    id: number;
    brand: string;
    model: string;
    year: number;
    mileage: string;
    color: string;
    price: number;
    type: string;
    availability: boolean;
    image_url: string;
  };
}
