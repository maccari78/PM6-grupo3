import { IsEnum, /* IsString */ } from 'class-validator';
import { Role as RoleEnum } from '../utils/role.enum';

export class CreateRoleDto {
  @IsEnum(RoleEnum)
  name: RoleEnum;
}


