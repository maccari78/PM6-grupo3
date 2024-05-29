import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  create(createAddressDto: CreateAddressDto) {
    return createAddressDto;
  }

  findAll() {
    return `This action returns all addresses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adress`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return updateAddressDto;
  }

  remove(id: number) {
    return `This action removes a #${id} adress`;
  }
}
