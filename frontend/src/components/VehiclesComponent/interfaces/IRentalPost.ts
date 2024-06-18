import { IUser } from "@/interfaces/IUser";

export interface IRentalPost {
  createdAt: string;
  daysRemaining: number;
  id: string;
  rentalEndDate: string;
  rentalStartDate: string;
  room_id: string;
  totalCost: string;
  updatedAt: string;
  users: IUser[];
}
