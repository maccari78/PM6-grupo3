import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRentalDto {
  @IsDate()
  @IsNotEmpty()
  rentalStartDate: Date;

  @IsDate()
  @IsNotEmpty()
  rentalEndDate: Date;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  carId: number;
}

