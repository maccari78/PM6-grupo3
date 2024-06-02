import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/addresses/entities/address.entity';
import { CreateUserDto, signIn } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserGoogle } from './types/userGoogle.type';

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
    if (!userDB) throw new BadRequestException('Credenciales incorrectas');
    if (userDB.userGoogle)
      throw new BadRequestException(
        'Credenciales creadas mediante google, por favor elegir ese metodo de ingreso',
      );
    const pass = await bcrypt.compare(password, userDB.password);
    if (!pass) throw new BadRequestException('Credenciales incorrectas');
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
    // ENVIO DE EMAIL!
    return { message: 'Usuario registrado con exito!' };
  }
  async validateUser(user: UserGoogle) {
    console.log('AuthService');
    const findUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: user.email })
      .getOne();
    console.log(findUser, 'BUSQUEDA FALLLIA O NO?');
    console.log(user.token, 'ESTE ES EL TOKEN');
    if (findUser)
      return {
        message: 'Inicio de sesión exitosamente mediante Google',
        token: user.token,
      };
    console.log(
      'Usuario no encontrado. Ingresando datos en la base de datos....',
    );

    const newUser = this.userRepository.create({
      email: user.email,
      name: user.displayName,
      image_url: user.image_url,
      userGoogle: true,
    });
    return await this.userRepository.save(newUser);
  }
  async findUser(id: string) {
    console.log(id);

    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
    console.log(user);
    return user;
  }
}
