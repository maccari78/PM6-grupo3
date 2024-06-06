export interface ChatClient {
  to: string;
  message: string;
}

export interface MessageChat {
  sender: string;
  receiver: string;
  message: string;
  room_id: string;
  image?: string;
  date_created?: Date;
}
