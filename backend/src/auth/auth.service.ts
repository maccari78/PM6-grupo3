import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/addresses/entities/address.entity';
import { CreateUserDto, signIn } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    private jwtService: JwtService,
  ) {}
  async signIn(user: signIn) {
    const { email, password } = user;
    const userDB = await this.userRepository.findOneBy({ email });
    if (!userDB) throw new BadRequestException('Credenciales incorrectas 1');
    const pass = await bcrypt.compare(password, userDB.password);
    if (!pass) throw new BadRequestException('Credenciales incorrectas 2');
    const payload = { sub: userDB.id, email: userDB.email };
    const token = this.jwtService.sign(payload);
    return { message: 'Login exitoso', token: token };
  }

  async signUp(user: CreateUserDto) {
    console.log(user);

    const duplicateUser = await this.userRepository.findOneBy({
      email: user.email,
    });
    console.log(duplicateUser);

    if (duplicateUser)
      throw new BadRequestException('El ya se encuentra registrado');

    const { email, name, password, nDni, rExpiration, phone, ...rest } = user;
    const newUser = this.userRepository.create({
      email,
      name,
      password,
      nDni,
      rExpiration,
      phone,
    });
    const hashPass = await bcrypt.hash(newUser.password, 10);
    if (!hashPass)
      throw new BadRequestException('Error al cifrar la contraseña');
    newUser.password = hashPass;
    const newAdress = await this.addressRepository.save({
      ...rest,
    });
    newUser.addresses = [newAdress];
    await this.userRepository.save(newUser);

    return newUser;
  }
}
