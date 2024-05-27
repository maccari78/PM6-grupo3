import { PartialType } from '@nestjs/mapped-types';
import { CreateAdressDto } from './create-adress.dto';

export class UpdateAdressDto extends PartialType(CreateAdressDto) {}
