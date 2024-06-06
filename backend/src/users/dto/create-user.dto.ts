import { PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  // @Transform((value) => Number(value))
  nDni: number;

  // @IsString()
  // rExpiration: string;

  @IsNumber()
  @IsNotEmpty()
  // @Transform((value) => Number(value))
  phone: number;

  // ABAJO ES ADRESS
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  zip_code: string;
}

export class signIn extends PickType(CreateUserDto, ['email', 'password']) {}
