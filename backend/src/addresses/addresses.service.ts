import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async getAddresses(page: number, limit: number) {
    let addresses = await this.addressRepository.find();

    const start = (page - 1) * limit;
    const end = start + limit;

    addresses = addresses.slice(start, end);
    return addresses;
  }

  async getAddressById(id: string) {
    const address = await this.addressRepository.findOneBy({ id });

    if (!address) throw new NotFoundException('Dirección no encontrada');

    return address;
  }

  async newAddress(id: string, createAddressDto: CreateAddressDto) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    const newAddress = this.addressRepository.create(createAddressDto);
    newAddress.user = user;

    return await this.addressRepository.save(newAddress);
  }

  async updateAddress(id: string, updateAddressDto: UpdateAddressDto) {
    await this.addressRepository.update(id, updateAddressDto);
    const address = this.addressRepository.findOneBy({ id });

    if (!address) throw new NotFoundException('Dirección no encontrada');
    return address;
  }

  async deleteAddress(id: string) {
    const address = await this.addressRepository.findOneBy({ id });

    if (!address) throw new NotFoundException('Dirección no encontrada');

    await this.addressRepository.delete({ id });

    return address;
  }
}
