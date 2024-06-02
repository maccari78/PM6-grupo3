import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private fileUploadService: FileUploadService,
  ) {}

  async findAll() {
    const users = await this.userRepository.find();
    if (!users) throw new NotFoundException('No se encontraron usuarios');
    return users;
  }

  findOne(id: string) {
    const user = this.userRepository.findOne({
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
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    file?: Express.Multer.File,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    const updateUser = await this.userRepository.update(id, updateUserDto);
    if (updateUser.affected === 0)
      throw new NotFoundException('Error al actualizar usuario');
    if (!file) {
      return 'Usuario actualizado con exito';
    }
    const uploadedImage = await this.fileUploadService.uploadProfilePicture(
      file,
      user.id,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = uploadedImage;
    return { message: 'Usuario actualizado con exito', ...rest };
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    const updateUser = await this.userRepository.delete(id);
    if (updateUser.affected === 0)
      throw new NotFoundException('Error al eliminar usuario');
    return 'Usuario eliminado con exito';
  }
}
