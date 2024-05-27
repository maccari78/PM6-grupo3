import { PartialType } from '@nestjs/mapped-types';
import { CreateRentalDto } from './create-rental.dto';

export class UpdateRentalDto extends PartialType(CreateRentalDto) {}
