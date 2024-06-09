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
import { JwtPayload } from './interfaces/payload.interfaces';
import Stripe from 'stripe';
import { Payment } from './interfaces/payment.interfaces';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental) private rentalRepository: Repository<Rental>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Posts) private postRepository: Repository<Posts>,
    @InjectRepository(Car) private carRepository: Repository<Car>,
    private jwtService: JwtService,
  ) {}
  async create(createRentalDto: CreateRentalDto, currentUser: string, postId) {
    const { name, price, description, image_url, ...rest } = createRentalDto;

    const secret = process.env.JWT_SECRET;
    const payload: JwtPayload = await this.jwtService.verify(currentUser, {
      secret,
    });
    const payment: Payment = {
      name,
      price,
      description,
      image_url,
    };
    return await this.createWhithJWT(payload, rest, postId, payment);
  }

  async createWhithJWT(
    payload: JwtPayload,
    rest: Partial<Rental>,
    postId: string,
    payment: Payment,
  ) {
    const rental_user = await this.userRepository.findOne({
      where: { email: payload.sub },
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
    if (findPost.user.email === rental_user.email)
      throw new BadRequestException('No puedes alquilar tu propio vehiculo');
    newRental.users = [rental_user, findPost.user];
    const findCar = await this.carRepository.findOne({
      where: { id: findPost.car.id },
    });
    console.log(findCar);

    if (!findCar) throw new NotFoundException('Vehiculo no encontrado');
    if (findCar.availability === false)
      throw new BadRequestException('El vehiculo ya se encuentra alquilado');
    newRental.posts = findPost;

    const rental = await this.rentalRepository.save(newRental);
    const carUpdate = await this.carRepository.update(findPost.car.id, {
      availability: false,
    });
    if (carUpdate.affected === 0)
      throw new BadRequestException('Error al actualizar el vehiculo');
    if (!rental)
      throw new BadRequestException(
        'Error al crear el contrato, verifique las relaciones con otras entidades',
      );
    return await this.payment(payment, rental.id);
  }

  async findAll() {
    const contracts = await this.rentalRepository.find({
      relations: ['users', 'posts'],
    });
    if (!contracts)
      throw new NotFoundException('No hay contratos en la base de datos');
    return contracts;
  }

  async findOne(id: string) {
    const contract = await this.rentalRepository.findOne({
      where: { id },
      relations: ['users'],
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

  async payment(dataPayment: Payment, id: string) {
    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
    console.log(stripe);
    const INTERNAL_API_SUCESS = process.env.INTERNAL_API_SUCESS;
    const INTERNAL_API_CANCEL = process.env.INTERNAL_API_CANCEL;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            product_data: {
              name: dataPayment.name,
              description: dataPayment.description,
              images: [dataPayment.image_url],
            },
            currency: 'usd',

            unit_amount: dataPayment.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${INTERNAL_API_SUCESS}/${id}`,
      cancel_url: `${INTERNAL_API_CANCEL}/${id}`,
    });
    console.log(session.url);

    return session.url;
  }

  async paymentSucess(id: string) {
    const contract = await this.rentalRepository.findOne({
      where: { id },
      relations: ['users', 'posts', 'posts.user'],
    });
    if (!contract) throw new NotFoundException('Contrato no encontrado');
    const userPosts = contract.posts.user.id;
    const userPay = contract.users.filter((user) => user.id !== userPosts);

    console.log(userPay[0]);

    return 'Compra pagada con exito';
  }

  async paymentCancel(id: string) {
    const contract = await this.rentalRepository.findOne({
      where: { id },
      relations: ['users', 'posts', 'posts.user'],
    });
    if (!contract) throw new NotFoundException('Contrato no encontrado');
    await this.carRepository.update(contract.posts.car.id, {
      availability: true,
    });
    const deleted = await this.rentalRepository.delete(contract.id);
    if (deleted.affected === 0)
      throw new NotFoundException('Error al eliminar el contrato');
    return 'Contrato cancelado con exito';
  }
}
