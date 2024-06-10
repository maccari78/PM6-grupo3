import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreatePostDto {
  //characteristics of the Posts
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
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
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  brand: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  model: string;

  @ApiProperty()
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

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mileage: string;

  @ApiProperty()
  @IsString()
  color: string;

  // @IsString()
  // user_id: string;

  // @IsString()
  // @IsOptional()
  // @IsArray()
  // image_url: string[];
}
