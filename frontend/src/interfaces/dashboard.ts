export interface StatCardProps {
    title: string;
    value: string;
    description: string;
  }
  export interface ReservationCardProps {
    carModel: string;
    reservationDate: string;
    price: string;
    imageUrl: string;
}
export interface PublicationCardProps {
    carModel: string;
    postDate: string;
    author: string;
    imageUrl: string;
  }

 export interface ReviewCardProps {
    rating: string;
    text: string;
  }