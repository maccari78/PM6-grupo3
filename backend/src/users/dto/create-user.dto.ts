import { PickType } from '@nestjs/swagger';
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
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @IsString()
  @MinLength(1)
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;

  @IsNumber()
  @IsNotEmpty({ message: 'El dni es requerido' })
  // @Transform((value) => Number(value))
  nDni: number;

  // @IsString()
  // rExpiration: string;

  @IsNumber()
  @IsNotEmpty({ message: 'El telefono es requerido' })
  // @Transform((value) => Number(value))
  phone: number;

  // ABAJO ES ADRESS
  @IsNotEmpty({ message: 'La dirección es requerida' })
  @IsString()
  address: string;

  @IsNotEmpty({ message: 'La ciudad es requerida' })
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
