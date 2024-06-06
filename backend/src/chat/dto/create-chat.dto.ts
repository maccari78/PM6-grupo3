import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  @IsNotEmpty()
  sender: string;
  @IsString()
  @IsNotEmpty()
  receiver: string;
  @IsString()
  @IsNotEmpty()
  message: string;
  @IsString()
  @IsNotEmpty()
  room_id: string;
}
