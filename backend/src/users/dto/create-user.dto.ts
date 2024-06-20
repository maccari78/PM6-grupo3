import { ApiProperty, PickType } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsEmail({}, { message: 'El email no es valido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'El dni es requerido' })
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
  nDni: number;

  // @IsString()
  // rExpiration: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'El telefono es requerido' })
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
  phone: number;

  // ABAJO ES ADDRESS
  @ApiProperty()
  @IsNotEmpty({ message: 'La dirección es requerida' })
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La ciudad es requerida' })
  @IsString()
  @MaxLength(50)
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  zip_code: string;
}

export class signIn extends PickType(CreateUserDto, ['email', 'password']) {}
