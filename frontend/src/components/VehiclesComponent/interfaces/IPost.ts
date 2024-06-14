import { IReview } from "@/components/Reviews/interfaces/IReview";

export interface IPost {
  id: string;
  title: string;
  description: string;
  price: number;
  user: {
    id: string;
    name: string;
    email: string;
    image_url: string;
    phone: string;
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
  review: IReview[];
}
