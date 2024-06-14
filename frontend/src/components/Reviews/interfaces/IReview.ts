export interface IReview {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    email: string;
    name: string;
    password: string;
    nDni: number;

    phone: string;
    image_url: string;
    roles: string;
    createdAt: string;
    updatedAt: string;
  };
  post: {
    id: string;
    title: string;
    description: string;
    price: string;
    created_at: string;
    updated_at: string;
  };
}
