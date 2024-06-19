import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './entities/post.entity';
import { Repository } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Car } from 'src/cars/entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsService } from 'src/cars/cars.service';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload } from 'src/rentals/interfaces/payload.interfaces';
import { JwtService } from '@nestjs/jwt';
import { FiltersPosts } from './interfaces/filter.interfaces';
import { Review } from 'src/reviews/entities/review.entity';
import { Rental } from 'src/rentals/entities/rental.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { Address } from 'src/addresses/entities/address.entity';
import Fuse from 'fuse.js';

@Injectable()
export class PostsService {
  constructor(
    private readonly carService: CarsService,
    @InjectRepository(Car) private carRepository: Repository<Car>,
    @InjectRepository(Posts) private postRepository: Repository<Posts>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(Rental) private rentalRepository: Repository<Rental>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    private notificationService: NotificationsService,
    private jwtService: JwtService,
  ) {}

  async getPostsByFilterServices(filters: FiltersPosts) {
    if (filters.year && typeof filters.year !== 'number') {
      filters.year = Number(filters.year);
    }
    if (filters.price && typeof filters.price !== 'number') {
      filters.price = Number(filters.price);
    }
    const query = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.car', 'car');

    if (filters.brand) {
      query.andWhere('car.brand = :brand', { brand: filters.brand });
    }
    if (filters.model) {
      query.andWhere('car.model = :model', { model: filters.model });
    }
    if (filters.year) {
      query.andWhere('car.year = :year', { year: filters.year });
    }
    if (filters.mileage) {
      console.log('Entra al if?', filters);

      query.andWhere('car.mileage = :mileage', { mileage: filters.mileage });
    }
    if (filters.color) {
      query.andWhere('car.color = :color', { color: filters.color });
    }
    if (filters.price) {
      query.andWhere('car.price = :price', { price: filters.price });
    }

    const posts = await query.getMany();
    console.log(posts);

    if (posts.length === 0) {
      throw new NotFoundException('No se encontraron resultados');
    } else {
      return posts;
    }
  }

  //Con paginacion
  // async getPostsAllServices(page: number, limit: number) {
  //   let posts = await this.postRepository.find({
  //     relations: {
  //       user: true,
  //       car: true,
  //       review: true},
  //   });
  //   if (!posts) throw new NotFoundException('No se encontraron publicaciones');

  //   const start = (page - 1) * limit;
  //   const end = page * limit;
  //   posts = posts.slice(start, end);

  //   return posts;
  // }

  //Sin paginacion
  async getPostsAllServices() {
    const posts = await this.postRepository.find({
      relations: {
        user: true,
        car: true,
        review: true,
      },
    });
    if (!posts) throw new NotFoundException('No se encontraron publicaciones');

    return posts;
  }

  async getPostsServiceId(id: string) {
    const postsId = await this.postRepository.findOne({
      where: { id },
      relations: ['user', 'car', 'review', 'user.addresses', 'rentals'],
    });
    if (!postsId) {
      return `publicación con ${id} no encontrado`;
    }
    return postsId;
  }

  async AddPostsServices(
    posts: CreatePostDto,
    currentUser: string,
    files?: Express.Multer.File[],
  ) {
    const { title, description, price, ...rest } = posts;
    const secret = process.env.JWT_SECRET;
    const payload: JwtPayload = await this.jwtService.verify(currentUser, {
      secret,
    });
    console.log(payload);

    if (!payload) throw new UnauthorizedException('token invalido 3');
    const user = await this.userRepository.findOne({
      where: { email: payload.sub },
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const newCar = await this.carService.createdCar(files, rest, user.id);
    if (!newCar) throw new BadRequestException('No se pudo crear el auto');
    const newPosts = this.postRepository.create({ title, description, price });

    newPosts.car = newCar;
    newPosts.user = user;

    const postsSaved = await this.postRepository.save(newPosts);
    if (!postsSaved) {
      throw new BadRequestException('No se pudo insertar la publicación');
    }

    if (Array.isArray(postsSaved)) {
      throw new BadRequestException('postsSaved no es un array');
    }

    await this.postRepository.update(postsSaved.id, { car: newCar });

    return 'Publicación insertada';
  }

  async cancel(id: string) {
    const reservation = await this.postRepository.findOne({
      where: { id },
      relations: ['car', 'rentals'],
    });
    if (!reservation) throw new Error('Reservation not found');

    reservation.isDeleted = true;
    reservation.car.availability = true;

    //Delete rental when cancel reservation
    await Promise.all(
      reservation.rentals.map(async (rental) => {
        await this.rentalRepository.delete(rental.id);
      }),
    );

    await this.postRepository.save(reservation);
  }

  async sendToCancelReservation(id: string) {
    // Cancelar la reserva llamando al método cancel
    await this.cancel(id);
    console.log(' INICIO Probando de envio de email propietario y inquilino');

    // const contractID = await this.cancel(id);
    // console.log(contractID);
    // // if (!contractID) throw new NotFoundException('El contrato no fue creado');

    const contract = await this.rentalRepository.findOne({
      where: { id },
      relations: ['users', 'posts'],
    });
    // console.log('Este es el contrato:', contract);
    if (!contract) throw new NotFoundException('Contrato no encontrado');

    // Obtener el ID del usuario que publicó la reserva
    const userPosts = contract.posts?.user?.id;

    // Obtener el usuario que realizó la reserva (excluyendo al propietario del post)
    const userPay = contract.users?.filter((user) => user.id !== userPosts);
    if (!userPay || userPay.length === 0)
      throw new NotFoundException('Error al realizar el pago');

    const owner = contract.posts?.user;
    const contractPost = contract.posts;

    // Enviar notificación al propietario sobre la cancelación
    await this.notificationService.newNotification(
      owner.email,
      'cancelReservation',
      contractPost,
    );

    // Enviar notificación al inquilino sobre la cancelación
    await this.notificationService.newNotification(
      userPay[0].email,
      'cancelTenantReservation',
    );
    console.log(' FIN Probando de envio de email propietario y inquilino');
    return 'Reserva cancelada con éxito';
  }

  async UpdatePostsServices(
    id: string,
    posts: UpdatePostDto,
    token: string,
    files?: Express.Multer.File[],
  ) {
    const { title, description, price, image_url, ...rest } = posts;
    console.log(id, 'ID EN SERVICE');

    const secret = process.env.JWT_SECRET;
    const payload: JwtPayload = await this.jwtService.verify(token, {
      secret,
    });
    if (!payload) throw new UnauthorizedException('token invalido 3');
    const user = await this.userRepository.findOne({
      where: { email: payload.sub },
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const findPosts = await this.postRepository.findOne({
      where: { id },
      relations: ['car', 'user'],
    });
    console.log(findPosts, 'FIND POSTS EN SERVICE');

    if (!findPosts)
      throw new NotFoundException(`No se encontro publicación con ${id}`);
    if (findPosts.user.id !== user.id)
      throw new UnauthorizedException(
        'No tiene permisos para actualizar esta publicación',
      );
    const car = await this.carRepository.findOneBy({
      id: findPosts.car.id,
    });
    if (!car) throw new NotFoundException('Auto no encontrado');
    if (files?.length === 0 || !files) {
      const updateCar = await this.carRepository.update(car.id, rest);
      if (!updateCar)
        throw new BadRequestException('No se pudo actualizar el auto');
      const updatePost = await this.postRepository.update(id, {
        title,
        description,
        price,
      });
      if (!updatePost)
        throw new BadRequestException('No se pudo actualizar la publicación');
      if (image_url) {
        await this.carService.removeImageUrl(car.id, image_url);
      }
      return 'Publicación actualizada';
    }

    const updateCar = await this.carService.update(car.id, rest, files);
    if (!updateCar)
      throw new BadRequestException('No se pudo actualizar el auto');
    await this.postRepository.update(id, {
      title,
      description,
      price,
    });
    if (image_url) {
      const updateImage = await this.carService.removeImageUrl(
        car.id,
        image_url,
      );
      if (!updateImage)
        throw new BadRequestException('No se pudo borrar la imagen');
      return 'Publicación actualizada';
    }
    return 'Publicación actualizada';
  }

  async softDelete(id: string): Promise<{ message: string }> {
    const car = await this.carRepository.findOne({
      where: { id },
      relations: ['post'],
    });

    if (!car) {
      throw new NotFoundException(
        `El automóvil con ID ${id} no se ha encontrado`,
      );
    }

    car.isDeleted = true;
    await this.carRepository.save(car);

    const postsToUpdate = car.post.map((post) => ({
      id: post.id,
      isDeleted: true,
    }));
    await this.postRepository.save(postsToUpdate);

    return { message: 'El automóvil ha sido borrado lógicamente con éxito' };
  }

  async restoreCar(id: string): Promise<void> {
    const car = await this.carRepository.findOne({
      where: { id },
      withDeleted: true,
      relations: ['post'],
    });
    if (!car) {
      throw new NotFoundException(
        `El automóvil con ID ${id} no se ha encontrado`,
      );
    }

    car.isDeleted = false;
    await this.carRepository.save(car);

    const postsToUpdate = car.post.map((post) => ({
      id: post.id,
      isDeleted: false,
    }));
    await this.postRepository.save(postsToUpdate);
  }

  async getPostsByDate(location) {
    // const allPosts = await this.postRepository.find({
    //   relations: ['rental'],
    // });
    // return allPosts;
    const posts = await this.postRepository.find({
      relations: ['car', 'car.user.addresses'],
    });

    const availablePosts = posts.filter((post) => {
      return post.car.availability === true;
    });

    if (!location) {
      return availablePosts;
    }

    const addresses = availablePosts.flatMap((post) =>
      post.car.user.addresses.map((address) => ({
        post,
        address,
      })),
    );

    const fuse = new Fuse(addresses, {
      keys: ['address.city', 'address.state', 'address.country'],
      includeScore: true,
      threshold: 0.49,
      ignoreLocation: true,
    });

    const results = fuse.search(location);

    const postsWithAddresses = results.map((result) => {
      const { post, address } = result.item;
      return {
        id: post.id,
        title: post.title,
        description: post.description,
        price: post.price,
        isDeleted: post.isDeleted,
        created_at: post.created_at,
        updated_at: post.updated_at,
        car: post.car,
        address,
      };
    });

    return postsWithAddresses;
  }
  //Prueba xd
}
