import { MapLocationProps } from "@/components/MapLocation/MapLocation";
import { IReview } from "@/components/Reviews/interfaces/IReview";
import { IUser } from "@/interfaces/IUser";
import { ITRentalChat } from "@/interfaces/Ichat";
import { IRentalPost } from "./IRentalPost";

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
    addresses: [
      {
        latitude: number | null;
        longitude: number | null;
      }
    ];
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
  rentals: IRentalPost[];
}
