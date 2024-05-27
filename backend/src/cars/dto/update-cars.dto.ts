import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-cars.dto';

export class UpdateCarDto extends PartialType(CreateCarDto) {}
