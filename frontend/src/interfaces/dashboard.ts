export interface StatCardProps {
	title: string;
	value: string;
	description: string;
}
export interface ReservationCardProps {
	carModel: string;
	reservationDate: string;
	price: number | null | undefined;
	imageUrl: string | undefined;
}
export interface ListedCarCardProps {
	carModel: string;
	price: string | null | undefined;
	imageUrl: string;
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
