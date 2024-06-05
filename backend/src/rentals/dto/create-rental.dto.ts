import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRentalDto {
  @IsString()
  @IsNotEmpty()
  rentalStartDate: string;

  @IsString()
  @IsNotEmpty()
  rentalEndDate: string;

  @IsString()
  @IsNotEmpty()
  postId: string;
}
