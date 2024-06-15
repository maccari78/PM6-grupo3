import { User } from 'src/users/entities/user.entity';

export interface ChatClient {
  to: string;
  message: string;
}

export interface MessageChat {
  sender: Partial<User>;
  receiver: Partial<User>;
  message: string;
  room_id: string;
  image?: string;
  date_created?: Date;
}
