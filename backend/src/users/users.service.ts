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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    private fileUploadService: FileUploadService,

    private jwtService: JwtService,
  ) {}

  async findAll() {
    const users = await this.userRepository.find();

    if (users.length === 0 || !users)
      throw new NotFoundException('No se encontraron usuarios');
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: [
        'car',
        'post',
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

  async getUserByToken(token: string) {
    const currentUser = token?.split(' ')[1];
    if (!currentUser)
      throw new NotFoundException('No hay un usuario autenticado');
    const payload: JwtPayload = await this.jwtService.verify(currentUser, {
      secret: process.env.JWT_SECRET,
    });

    if (!payload) throw new NotFoundException('Error al decodificar token');
    const user = await this.userRepository.findOne({
      where: { email: payload.sub },
      relations: [
        'car',
        'car.post',
        'post',
        'post.car',
        'rentals',
        'rentals.posts.car',
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

  async update(
    token: string,
    updateUserDto: UpdateUserDto,
    updateAdress?: UpdateAddressDto,
    file?: Express.Multer.File,
  ) {
    const currentUser = token?.split(' ')[1];
    if (!currentUser)
      throw new NotFoundException('No hay un usuario autenticado');
    const payload: JwtPayload = await this.jwtService.verify(currentUser, {
      secret: process.env.JWT_SECRET,
    });

    if (!payload) throw new NotFoundException('Error al decodificar token');
    const user = await this.userRepository.findOne({
      where: { email: payload.sub },
      relations: ['addresses'],
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const updateUser = await this.userRepository.update(user.id, updateUserDto);

    const adress = user.addresses[0!];

    if (adress) {
      await this.addressRepository.update(adress.id, updateAdress);
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
      return 'Usuario actualizado con exito';
    }

    const uploadedImage = await this.fileUploadService.updateProfilePicture(
      user.id,
      file,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = uploadedImage;
    return { message: 'Usuario actualizado con exito', ...rest };
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

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    const updateUser = await this.userRepository.delete(id);
    if (updateUser.affected === 0)
      throw new NotFoundException('Error al eliminar usuario');
    return 'Usuario eliminado con exito';
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }
}
