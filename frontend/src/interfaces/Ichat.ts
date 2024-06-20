import { IPost } from "@/components/VehiclesComponent/interfaces/IPost";

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
    posts: IPost;
}

export interface MessageChat {
    sender?: string;
    receiver?:string;
    message?: string;
    room_id?: string;
    image?: string;
    date_created?: Date;
}

export interface Ireceiver{
    aboutMe: string
    createdAt: string
    email:string
    id:string
    image_url:string
    isDeleted:boolean
    nDni:number
    name:string
    password:string
    phone:string
    public_id:string
    rExpiration:string
    roles:string
    updatedAt:Date
    userGoogle:boolean
}
export interface Isender{
    aboutMe: string
    createdAt: string
    email:string
    id:string
    image_url:string
    isDeleted:boolean
    nDni:number
    name:string
    password:string
    phone:string
    public_id:string
    rExpiration:string
    roles:string
    updatedAt:Date
    userGoogle:boolean
}

export interface ITUserChat {
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

export interface ITRentalChat {
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

export interface TMessageChat {
    sender?: ITUserChat;
    receiver?:ITUserChat;
    message?: string;
    room_id?: string;
    image?: string;
    date_created: Date | string;
}



  