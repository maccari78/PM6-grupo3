import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRentalDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  rentalStartDate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  rentalEndDate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image_url: string;
}
