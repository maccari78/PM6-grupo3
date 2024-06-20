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
  
  export interface IReview {
    id: string;
    rating: number;
    comment: string;
    created_at: Date;
    updated_at: Date;
    user: IUser;
    post: IPost;
  }
  
  export interface IPost {
    id: string;
    title: string;
    description: string;
    price: number;
    isDeleted: boolean;
    created_at: Date;
    updated_at: Date;
  }