export interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
}
export interface ReservationCardProps {
  carModel: string;
  reservationDate: string;
  reservationEndDate: string;
  price: number | string | undefined;
  imageUrl: string | undefined;
  idPost: string | undefined;
}
export interface ListedCarCardProps {
  carModel: string;
  price: string | null | undefined;
  imageUrl: string;
  idPost: string | undefined;
}
export interface PublicationCardProps {
  carModel: string;
  postDate: string;
  author: string;
  imageUrl: string;
}

export interface ReviewCardProps {
  rating: number;
  comment: string;
  createdAt: string;
}
export interface SalePostCardProps {
  productName: string;
  productDescription: string;
  price: string | null | undefined;
  imageUrl: string;
}
