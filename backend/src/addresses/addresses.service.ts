import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Car } from 'src/cars/entities/car.entity';
import { geolocationService } from './geolocation.service';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
    private readonly geolocation: geolocationService,
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

  async updateAddress(addressId: string, updateAddressDto: UpdateAddressDto) {
    await this.addressRepository.update(addressId, updateAddressDto);
    const foundAddressArr = await this.addressRepository.find({
      where: { id: addressId },
      relations: ['user'],
    });

    const foundAddress = foundAddressArr[0];

    if (!foundAddress) throw new NotFoundException('Dirección no encontrada');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = foundAddress;

    rest.latitude = Number(rest.latitude);
    rest.longitude = Number(rest.latitude);

    const updatedAddress = this.addressWithGeolocation(
      foundAddress.user.id,
      rest,
    );

    return updatedAddress;
  }

  async deleteAddress(id: string) {
    const address = await this.addressRepository.findOneBy({ id });

    if (!address) throw new NotFoundException('Dirección no encontrada');

    await this.addressRepository.delete({ id });

    return address;
  }
  async addressWithGeolocation(
    userId: string,
    createAddressDto: CreateAddressDto,
  ) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const { address, city, state, country, zip_code } = createAddressDto;

    const fullAddress = `${address}, ${city}, ${state}, ${country}, ${zip_code}`;

    const { latitude, longitude } =
      await this.geolocation.getCordinates(fullAddress);

    if (latitude) {
      await this.addressRepository.update(
        { user: { id: userId } },
        {
          latitude,
          longitude,
        },
      );
    }

    const updatedAddress = await this.addressRepository.findOneBy({
      user: { id: userId },
    });
    return updatedAddress;
  }
}
