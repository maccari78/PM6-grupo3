import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/rentals/interfaces/payload.interfaces';
import { Address } from 'src/addresses/entities/address.entity';
import { UpdateAddressDto } from 'src/addresses/dto/update-address.dto';
import * as bcrypt from 'bcrypt';
import { AddressesService } from 'src/addresses/addresses.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    private fileUploadService: FileUploadService,
    private addressesService: AddressesService,
    private jwtService: JwtService,
  ) {}

  async findAll() {
    const users = await this.userRepository.find({
      where: { isDeleted: false },
    });

    if (users.length === 0 || !users)
      throw new NotFoundException('No se encontraron usuarios');
    const usersWithoutPassword = users.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return rest;
    });
    return usersWithoutPassword;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id, isDeleted: false },
      relations: [
        'car',
        'post',
        'post.car',
        'rentals',
        'notifications',
        'addresses',
        'reviews',
      ],
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    return rest;
  }

  async getUserByRent(token: string) {
    const currentUser = token?.split(' ')[1];
    if (!currentUser)
      throw new NotFoundException('No hay un usuario autenticado');
    const payload: JwtPayload = await this.jwtService.verify(currentUser, {
      secret: process.env.JWT_SECRET,
    });

    if (!payload) throw new NotFoundException('Error al decodificar token');
    const user = await this.userRepository.findOne({
      where: { email: payload.sub, isDeleted: false },
      relations: [
        'car',
        'car.post',
        'post',
        'post.car',
        'rentals',
        'rentals.posts.car',
        'rentals.posts.user',
        'rentals.posts',
        'rentals.users',
        'notifications',
        'addresses',
        'reviews',
      ],
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
    const { password, rentals, ...rest } = user;
    const userId = rest.id;

    const filterRentals = rentals.filter(
      (rental) => rental.posts?.user?.id === userId,
    );

    const returnUser: Omit<User, 'password'> = {
      id: rest.id,
      email: rest.email,
      name: rest.name,
      nDni: rest.nDni,
      rExpiration: rest.rExpiration,
      phone: rest.phone,
      image_url: rest.image_url,
      public_id: rest.public_id,
      userGoogle: rest.userGoogle,
      aboutMe: rest.aboutMe,
      roles: rest.roles,
      isDeleted: rest.isDeleted,
      createdAt: rest.createdAt,
      updatedAt: rest.updatedAt,
      car: rest.car,
      post: rest.post,
      notifications: rest.notifications,
      addresses: rest.addresses,
      reviews: rest.reviews,
      rentals: filterRentals,
    };
    return returnUser;
  }
  async getUserForDashboard(token: string) {
    const currentUser = token?.split(' ')[1];
    if (!currentUser)
      throw new NotFoundException('No hay un usuario autenticado');
    const payload: JwtPayload = await this.jwtService.verify(currentUser, {
      secret: process.env.JWT_SECRET,
    });

    if (!payload) throw new NotFoundException('Error al decodificar token');
    const user = await this.userRepository.findOne({
      where: { email: payload.sub, isDeleted: false },
      relations: [
        'car',
        'car.post',
        'post',
        'post.car',
        'rentals',
        'rentals.posts.car',
        'rentals.posts.user',
        'rentals.users',
        'notifications',
        'addresses',
        'reviews',
      ],
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, rentals, ...rest } = user;
    const userId = rest.id;
    const filterRentals = rentals.filter(
      (rental) => rental?.posts?.user?.id !== userId,
    );
    const returnUser: Omit<User, 'password'> = {
      id: rest.id,
      email: rest.email,
      name: rest.name,
      nDni: rest.nDni,
      rExpiration: rest.rExpiration,
      phone: rest.phone,
      image_url: rest.image_url,
      public_id: rest.public_id,
      userGoogle: rest.userGoogle,
      aboutMe: rest.aboutMe,
      roles: rest.roles,
      isDeleted: rest.isDeleted,
      createdAt: rest.createdAt,
      updatedAt: rest.updatedAt,
      car: rest.car,
      post: rest.post,
      notifications: rest.notifications,
      addresses: rest.addresses,
      reviews: rest.reviews,
      rentals: filterRentals,
    };
    console.log(returnUser);

    return returnUser;
  }

  async update(
    token: string,
    updateUserDto: UpdateUserDto,
    updateAdress?: UpdateAddressDto,
    file?: Express.Multer.File,
  ) {
    console.log(token);

    console.log(updateUserDto);
    console.log(updateAdress);

    const { password, ...rest } = updateUserDto;

    const currentUser = token?.split(' ')[1];
    if (!currentUser)
      throw new NotFoundException('No hay un usuario autenticado');
    const payload: JwtPayload = await this.jwtService.verify(currentUser, {
      secret: process.env.JWT_SECRET,
    });

    if (!payload) throw new NotFoundException('Error al decodificar token');
    const user = await this.userRepository.findOne({
      where: { email: payload.sub, isDeleted: false },
      relations: ['addresses'],
    });

    console.log(user);

    if (!user) throw new NotFoundException('Usuario no encontrado');

    await this.changePassword(password, user.password, user.id);

    const updateUser = await this.userRepository.update(user.id, rest);

    const adress = user.addresses[0!];

    if (updateAdress.address && user.addresses.length !== 0) {
      await this.addressesService.updateAddress(adress.id, updateAdress);
    }

    if (!adress && this.hasDefinedValue(updateAdress)) {
      const addresses = this.hasDefinedValue(updateAdress);
      if (addresses !== false) {
        const newAddress = await this.addressRepository.save(addresses);
        user.addresses = [newAddress];
        await this.userRepository.save(user);
      }
    }
    if (updateUser.affected === 0)
      throw new NotFoundException('Error al actualizar usuario');
    if (!file) {
      return { message: 'Usuario actualizado con exito' };
    }

    const uploadedImage = await this.fileUploadService.updateProfilePicture(
      user.id,
      file,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (!uploadedImage)
      throw new NotFoundException('Error al actualizar imagen');
    return { message: 'Usuario actualizado con exito' };
  }

  async changePassword(password: string, currentPassword: string, id: string) {
    if (!password) return;
    if (password === 'undefined' || password === 'null') return;
    const compare: boolean = await bcrypt.compare(password, currentPassword);
    if (!compare) {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) throw new NotFoundException('Usuario no encontrado');
      const newPassword = await bcrypt.hash(password, 10);
      if (!newPassword)
        throw new NotFoundException('Error al cifrar la contraseña');
      await this.userRepository.update(user.id, { password: newPassword });
    }
    return;
  }

  hasDefinedValue(obj: UpdateAddressDto) {
    const result: UpdateAddressDto = {};
    let hasDefinedValue = false;

    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
        result[key] = obj[key];
        hasDefinedValue = true;
      }
    }

    return hasDefinedValue ? result : false;
  }
  async putByID(
    id: string,
    updateUserDto: UpdateUserDto,
    updateAdress?: UpdateAddressDto,
    file?: Express.Multer.File,
  ) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['addresses'],
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    const { password, ...rest } = updateUserDto;

    // //check if the user is there
    // if (roles && roles !== user.roles) {
    //   const currentUser = await this.getCurrentUser(); // Obtener el usuario actual (ajusta según tu lógica de autenticación)
    //   if (currentUser.roles !== Role.SuperAdmin) {
    //     throw new UnauthorizedException('Solo el SuperAdmin puede cambiar roles');
    //   }
    // }

    await this.changePassword(password, user.password, user.id);

    const updateUser = await this.userRepository.update(user.id, rest);

    const adress = user.addresses[0!];

    if (updateAdress.address) {
      await this.addressesService.updateAddress(adress.id, updateAdress);
    }

    if (!adress && this.hasDefinedValue(updateAdress)) {
      const addresses = this.hasDefinedValue(updateAdress);
      if (addresses !== false) {
        const newAddress = await this.addressRepository.save(addresses);
        user.addresses = [newAddress];
        await this.userRepository.save(user);
      }
    }
    if (updateUser.affected === 0)
      throw new NotFoundException('Error al actualizar usuario');
    if (!file) {
      return { message: 'Usuario actualizado con exito' };
    }

    const uploadedImage = await this.fileUploadService.updateProfilePicture(
      user.id,
      file,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (!uploadedImage)
      throw new NotFoundException('Error al actualizar imagen');
    return { message: 'Usuario actualizado con exito' };
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    const updateUser = await this.userRepository.delete(id);
    if (updateUser.affected === 0)
      throw new NotFoundException('Error al eliminar usuario');
    return 'Usuario eliminado con exito';
  }

  async softDelete(id: string): Promise<{ message: string }> {
    const car = await this.userRepository.findOneBy({ id });

    if (!car) {
      throw new NotFoundException(
        `El usuario con ID ${id} no se ha encontrado`,
      );
    }
    await this.userRepository.update(id, { isDeleted: true });
    return { message: 'El usuario a sido borrado logicamente con exito' };
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email, isDeleted: false },
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }
}
