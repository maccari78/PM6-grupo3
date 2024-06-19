import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  image_url?: string;

  @IsOptional()
  @IsString()
  aboutMe: string;

  @IsOptional()
  @IsString()
  rExpiration: string;

  @IsOptional()
  @IsString()
  roles: string;

  @IsOptional()
  @IsBoolean()
  userGoogle: boolean;
}
