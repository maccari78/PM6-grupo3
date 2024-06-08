import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRentalDto {
  @IsString()
  @IsNotEmpty()
  rentalStartDate: string;

  @IsString()
  @IsNotEmpty()
  rentalEndDate: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  image_url: string;
}
