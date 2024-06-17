import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
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
import { NotificationsService } from 'src/notifications/notifications.service';
import { RentalPrev } from './entities/rentalPrev.entity';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental) private rentalRepository: Repository<Rental>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Posts) private postRepository: Repository<Posts>,
    @InjectRepository(Car) private carRepository: Repository<Car>,
    @InjectRepository(RentalPrev)
    private rentalPrevRepository: Repository<RentalPrev>,
    private notificationService: NotificationsService,
    private jwtService: JwtService,
  ) {}
  async create(
    createRentalDto: CreateRentalDto,
    currentUser: string,
    postId: string,
  ) {
    const { name, description, image_url, rentalStartDate, rentalEndDate } =
      createRentalDto;

    const secret = process.env.JWT_SECRET;
    const payload: JwtPayload = await this.jwtService.verify(currentUser, {
      secret,
    });

    const rental_user = await this.userRepository.findOne({
      where: { email: payload.sub },
    });

    if (!rental_user) throw new NotFoundException('Usuario no encontrado');

    const findPost = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['car', 'user'],
    });
    if (!findPost)
      throw new NotFoundException('Publicación no encontrada en la BD');
    if (findPost.user.email === rental_user.email)
      throw new BadRequestException('No puedes alquilar tu propio vehiculo');

    const findCar = await this.carRepository.findOne({
      where: { id: findPost.car.id },
    });
    if (!findCar) throw new NotFoundException('Vehiculo no encontrado');

    // Calcular la duración del alquiler en días
    const startDate = new Date(rentalStartDate);
    const endDate = new Date(rentalEndDate);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);

    // Calcular el costo total
    const totalCost = dayDiff * findPost.price;
    const newPrevContract = this.rentalPrevRepository.create({
      startDate: rentalStartDate,
      endDate: rentalEndDate,
      totalCost,
      userEmail: rental_user.email,
      postId: findPost.id,
      daysRemaining: dayDiff,
    });

    const prevRental = await this.rentalPrevRepository.save(newPrevContract);
    if (!prevRental)
      throw new BadRequestException(
        'Error al crear el pre-contrato, verifique los datos enviados',
      );

    const payment: Payment = {
      name: name,
      price: totalCost,
      description: description,
      image_url,
    };

    const url = await this.payment(payment, prevRental.id);

    if (url) {
      return url;
    } else {
      await this.rentalPrevRepository.delete(prevRental.id);
      throw new BadRequestException('Error al realizar el pago');
    }
  }

  async createRental(rentalPrev: string) {
    const findRentalPrev = await this.rentalPrevRepository.findOne({
      where: { id: rentalPrev },
    });
    if (!findRentalPrev)
      throw new NotFoundException('Pre-contrato no encontrado');
    const rental_user = await this.userRepository.findOne({
      where: { email: findRentalPrev.userEmail },
    });

    if (!rental_user) throw new NotFoundException('Usuario no encontrado');

    const findPost = await this.postRepository.findOne({
      where: { id: findRentalPrev.postId },
      relations: ['car', 'user'],
    });
    if (!findPost)
      throw new NotFoundException('Publicación no encontrada en la BD');
    const room_id = findPost.id + rental_user.id;
    const newRental = this.rentalRepository.create({
      rentalEndDate: findRentalPrev.endDate,
      rentalStartDate: findRentalPrev.startDate,
      totalCost: findRentalPrev.totalCost,
      daysRemaining: findRentalPrev.daysRemaining,
      room_id,
    });
    if (!newRental)
      throw new BadRequestException(
        'Error al crear el contrato, verifique los datos',
      );
    newRental.users = [rental_user, findPost.user];
    newRental.posts = findPost;
    const rental = await this.rentalRepository.save(newRental);
    if (!rental)
      throw new BadRequestException(
        'Error al crear el contrato, verifique las relaciones con otras entidades',
      );
    if (findPost.car?.availability) {
      const carUpdate = await this.carRepository.update(findPost.car.id, {
        availability: false,
      });
      if (carUpdate.affected === 0)
        throw new BadRequestException('Error al actualizar el vehiculo');
    }
    await this.rentalPrevRepository.delete(findRentalPrev.id);
    return rental.id;
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

            unit_amount: dataPayment.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${INTERNAL_API_SUCESS}/${id}`,
      cancel_url: `${INTERNAL_API_CANCEL}/${id}`,
    });

    if (session.url === null) {
      await this.rentalRepository.delete(id);
      throw new BadRequestException('Error al realizar el pago');
    }

    return session.url;
  }

  async paymentSucess(id: string) {
    const contractID = await this.createRental(id);
    console.log(contractID);
    if (!contractID) throw new NotFoundException('El contrato no fue creado');
    const contract = await this.rentalRepository.findOne({
      where: { id: contractID },
      relations: ['users', 'posts', 'posts.user'],
    });

    console.log('Este es el contrato:', contract);

    if (!contract) throw new NotFoundException('Contrato no encontrado');
    const userPosts = contract.posts?.user?.id;
    const userPay = contract.users?.filter((user) => user.id !== userPosts);

    const owner = contract.posts?.user;
    const contractPost = contract.posts;

    if (!userPay) throw new NotFoundException('Error al realizar el pago');

    await this.notificationService.newNotification(
      owner.email,
      'rentedVehicle',
      contractPost,
    );

    await this.notificationService.newNotification(
      userPay[0].email,
      'payConstancy',
    );

    return 'Compra pagada con exito';
  }

  async paymentCancel(id: string) {
    const preContract = await this.rentalPrevRepository.delete(id);

    if (!preContract) throw new NotFoundException('Contrato no encontrado');

    return 'Contrato cancelado con exito';
  }
  async getChat(token: string) {
    const secret = process.env.JWT_SECRET;
    const payload: JwtPayload = await this.jwtService.verify(token, {
      secret,
    });
    if (!payload) throw new UnauthorizedException('token invalido');
    const rentals = await this.rentalRepository
      .createQueryBuilder('rental')
      .leftJoinAndSelect('rental.users', 'user')
      .where('user.email = :email', { email: payload.sub })
      .getMany();

    if (!rentals.length) {
      throw new NotFoundException(
        'No hay registros de chats en la base de datos',
      );
    }
    const rentalIds = rentals.map((rental) => rental.id);
    const completeRentals = await this.rentalRepository
      .createQueryBuilder('rental')
      .leftJoinAndSelect('rental.users', 'user')
      .leftJoinAndSelect('rental.posts', 'post')
      .whereInIds(rentalIds)
      .getMany();

    return completeRentals;
  }
  //  ! POR SI ALGUNA VEZ SUCEDE LO MISMO, CON ESTO SE PUEDEN RECUPERAR RELACIONES DE POST CON RENTALS
  // async putRelation() {
  //   const rentals = await this.rentalRepository
  //     .createQueryBuilder('rental')
  //     .leftJoinAndSelect('rental.posts', 'post')
  //     .getMany();

  //   return Promise.all(
  //     rentals.map(async (rental) => {
  //       if (!rental.posts && rental.room_id) {
  //         const postId = rental.room_id.substring(0, 36);
  //         console.log(postId);

  //         const post = await this.postRepository
  //           .createQueryBuilder('rental')
  //           .where('id = :id', { id: postId })
  //           .getOne();
  //         if (!post) throw new NotFoundException('Publicacion no encontrada');
  //         rental.posts = post;
  //         await this.rentalRepository.save(rental);
  //       }
  //     }),
  //   );
  // }
}
