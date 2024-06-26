import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { NoProfanity } from '../decorators/wordValidator.decorator';

export class CreatePostDto {
  //characteristics of the Posts
  @ApiProperty()
  @IsString()
  @NoProfanity()
  title: string;

  @ApiProperty()
  @IsString()
  @NoProfanity()
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
  @NoProfanity()
  brand: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  @NoProfanity()
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
  @NoProfanity()
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
