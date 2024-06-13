import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateChatDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  sender?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  receiver?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  room_id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image?: string;
}
