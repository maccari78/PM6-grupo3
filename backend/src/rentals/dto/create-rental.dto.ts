import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRentalDto {
  @IsDate()
  @IsNotEmpty()
  rentalStartDate: string;

  @IsDate()
  @IsNotEmpty()
  rentalEndDate: string;

  @IsNumber()
  @IsNotEmpty()
  postId: string;
}
