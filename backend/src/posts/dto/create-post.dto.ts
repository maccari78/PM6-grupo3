import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreatePostDto {
  //characteristics of the Posts
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @Transform(({ value }) => {
    if (typeof value === 'number') {
      return value;
    }
    const transformedValue = Number(value);
    if (isNaN(transformedValue)) {
      throw new Error('El valor no es numero');
    }
    return transformedValue;
  })
  price: number;

  //characteristics of the car
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
  @Transform(({ value }) => {
    if (typeof value === 'number') {
      return value;
    }
    const transformedValue = Number(value);
    if (isNaN(transformedValue)) {
      throw new Error('El valor no es numero');
    }
    return transformedValue;
  })
  year: number;

  @IsString()
  @IsNotEmpty()
  mileage: string;

  @IsString()
  color: string;

  // @IsString()
  // user_id: string;

  // @IsString()
  // @IsOptional()
  // @IsArray()
  // image_url: string[];
}
