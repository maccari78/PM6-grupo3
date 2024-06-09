import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sender: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  receiver: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  room_id: string;
}
