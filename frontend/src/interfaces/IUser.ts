export interface IUser {
  id: string;
  token: string;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: Date;
  updated_at: Date;
  image_url: string;
}
export interface Address {
  address: string;
  city: string;
  country: string;
  id: string;
  state: string;
  zip_code: string;
}

export interface Car {
  availability: boolean;
  brand: string;
  color: string;
  created_at: string;
  id: string;
  image_url: string[];
  mileage: string;
  model: string;
  public_id: string[];
  updated_at: string;
  year: number;
}

export interface Notification {
  createdAt: string;
  id: string;
  template_message: string;
}

export interface Post {
  car: Car;
  created_at: string;
  description: string;
  id: string;
  price: string | null;
  title: string;
  updated_at: string;
  public_id: string | null;
}

export interface Rental {
  createdAt: string;
  id: string;
  posts: {
    car: Car;
    id: string;
    title: string;
    description: string;
    price?: string | null;
    created_at: string;
  };
  rentalEndDate: string;
  rentalStartDate: string;
  updatedAt: string;
  users: Array<IUser>;
  totalCost: number;
}

export interface Review {
  comment: string;
  created_at: string;
  id: string;
  post: {
    id: string;
    title: string;
    description: string;
  };
  rating: number;
  updated_at: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface IUserData {
  id: string;
  email: string;
  password: string;
  name: string;
  nDni: number;
  rExpiration: string;
  aboutMe: string | null;
  addresses: Address[];
  car: Car[];
  createdAt: string;
  image_url: string;
  phone: string | null;
  notifications: Notification[];
  post: Post[];
  rentals: Rental[];
  reviews: Review[];
  roles: string[];
  updatedAt: string;
  userGoogle: boolean;
  zip_code: string;
  city: string;
}
export interface IUserAdm {
  id: string;
  email: string;
  name: string;
  nDnI: number;
  nExpiration: string ;
  phone: string;
  image_url: string;
  public_id: string 
  userGoogle: boolean;
  aboutMe: string;
  roles: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface IUserDataAdm {
  id: string;
  email: string;
  password: string;
  name: string;
  nDni: number;
  rExpiration: string;
  aboutMe: string | null;
  addresses: Address[];
  car: Car[];
  createdAt: string;
  image_url: string;
  phone: string | null;
  notifications: Notification[];
  post: Post[];
  rentals: Rental[];
  reviews: Review[];
  roles: string;
  updatedAt: string;
  userGoogle: boolean;
  zip_code: string;
  city: string;
}