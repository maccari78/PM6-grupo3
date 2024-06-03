import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  brand: string;
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  model: string;
  @IsNumber()
  @IsNotEmpty()
  year: number;
  @IsString()
  @IsNotEmpty()
  mileage: string;
  @IsString()
  color: string;

  @IsString()
  @IsOptional()
  image_url: string[];
}
