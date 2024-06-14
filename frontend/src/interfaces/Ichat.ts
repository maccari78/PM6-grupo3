export interface IUserChat {
    id: string;
    email: string;
    name: string;
    password: string;
    nDni: number;
    nExpiration: string | null;
    phone: string;
    image_url: string;
    public_id: string | null;
    userGoogle: boolean;
    aboutMe: string | null;
    roles: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IRentalChat {
    id: string;
    rentalStartDate: string;
    rentalEndDate: string;
    daysRemaining: number;
    room_id: string;
    totalCost: string;
    createdAt: string;
    updatedAt: string;
    users: IUserChat[];
}