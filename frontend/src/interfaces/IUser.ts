export interface IUser {
    token: string;
    name: string;
    email: string;
    password: string;
    role: string;
    created_at: Date;
    updated_at: Date;
}


export interface IUserData {
    id: string;
    email: string;
    name: string;
    password: string;
    nDni: number;
    rExpiration: string;
    phone: string;
    image_url: string;
    public_id: string | null;
    userGoogle: boolean;
    aboutMe: string | null;
    createdAt: string;
    updatedAt: string;
    car: any[];
    post: any[];
    rentals: any[];
    notifications: any[];
    addresses: Address[];
    reviews: any[];
  }
  
 export interface Address {
    id: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zip_code: string;
  }