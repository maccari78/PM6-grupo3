import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private user = [
    { email: 'ema@mail.com', name: 'ema', password: '1234' },
    { email: 'juan@mail.com', name: 'juan', password: 'abcd' },
    { email: 'luisa@mail.com', name: 'luisa', password: '5678' },
    { email: 'carlos@mail.com', name: 'carlos', password: 'efgh' },
    { email: 'ana@mail.com', name: 'ana', password: 'ijkl' },
    { email: 'pedro@mail.com', name: 'pedro', password: 'mnop' },
    { email: 'maria@mail.com', name: 'maria', password: 'qrst' },
    { email: 'pablo@mail.com', name: 'pablo', password: 'uvwx' },
    { email: 'laura@mail.com', name: 'laura', password: 'yz12' },
    { email: 'jorge@mail.com', name: 'jorge', password: '3456' },
  ];
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async seeder() {
    Promise.all(
      this.user.map(async (user) => {
        await this.userRepository.save(user);
        return 'Usuarios creados con exito';
      }),
    );
  }
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
