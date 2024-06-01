import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Car } from 'src/cars/entities/car.entity';
import { Posts } from 'src/posts/entities/post.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental) private rentalRepository: Repository<Rental>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Posts) private postRepository: Repository<Posts>,
    @InjectRepository(Car) private carRepository: Repository<Car>,
    // private jwtService: JwtService,
  ) {}
  async create(createRentalDto: CreateRentalDto /*currentUser: string*/) {
    const { postId, user_id, ...rest } = createRentalDto;
    // const secret = process.env.JWT_SECRET_KEY;
    // const payload = this.jwtService.verify(currentUser, {
    //   secret,
    // });
    const rental_user = await this.userRepository.findOne({
      where: { id: user_id },
    });
    if (!rental_user) throw new NotFoundException('Usuario no encontrado');

    const newRental = this.rentalRepository.create(rest);
    if (!newRental)
      throw new BadRequestException(
        'Error al crear el contrato, verifique los datos',
      );
    const findPost = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['car', 'user'],
    });
    if (!findPost)
      throw new NotFoundException('Publicación no encontrada en la BD');
    newRental.users = [rental_user, findPost.user];
    const findCar = this.carRepository.findOne({
      where: { id: findPost.car.id },
    });
    if (!findCar) throw new NotFoundException('Vehiculo no encontrado');
    // LOGICA DE PAGO!!!! SI ES TRUE PASO AL SIGUIENTE PASO!
    // asdjaksdjaskj
    // ad
    const carUpdate = await this.carRepository.update(findPost.car.id, {
      availability: false,
    });
    if (carUpdate.affected === 0)
      throw new BadRequestException('Error al actualizar el vehiculo');

    newRental.car = findPost.car;

    const rental = await this.rentalRepository.save(newRental);
    if (!rental)
      throw new BadRequestException(
        'Error al crear el contrato, verifique las relaciones con otras entidades',
      );
    return 'Contrato creado con exito';
  }

  async findAll() {
    const contracts = await this.rentalRepository.find();
    if (!contracts)
      throw new NotFoundException('No hay contratos en la base de datos');
    return contracts;
  }

  async findOne(id: string) {
    const contract = await this.rentalRepository.findOne({
      where: { id },
      relations: ['car', 'users'],
    });
    if (!contract) throw new NotFoundException('Contrato no encontrado');
    return contract;
  }

  async update(id: string, updateRentalDto: UpdateRentalDto) {
    const contract = await this.rentalRepository.findOne({
      where: { id },
    });
    if (!contract) throw new NotFoundException('Contrato no encontrado');
    const updated = await this.rentalRepository.update(id, updateRentalDto);
    if (updated.affected === 0)
      throw new NotFoundException('Contrato no encontrado');
    return 'Contrato actualizado con exito';
  }

  async remove(id: string) {
    const contract = await this.rentalRepository.findOne({
      where: { id },
    });
    if (!contract) throw new NotFoundException('Contrato no encontrado');
    const deleted = await this.rentalRepository.delete(id);
    if (deleted.affected === 0)
      throw new NotFoundException('Error al eliminar el contraro');
    return 'Contrato eliminado con exito';
  }
}
